from fastapi import FastAPI, APIRouter, HTTPException, Depends, Header
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import json
import asyncio
import jwt
import resend
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional, Any
import uuid
from datetime import datetime, timezone, timedelta


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")  # Ignore MongoDB's _id field
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

# --- Leads (Readiness Plan submissions) ---
class LeadCreate(BaseModel):
    model_config = ConfigDict(extra="ignore")

    business_name: str
    industry: str
    industry_other: str = ""
    business_size: str
    biggest_time_drain: str
    biggest_time_drain_other: str = ""
    current_tools: list[str] = []
    current_tools_other: str = ""
    interested_in: list[str] = []
    interested_in_other: str = ""
    monthly_software_spend: str = ""
    name: str
    email: str
    phone: str = ""
    extra_notes: str = ""

class Lead(LeadCreate):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    status: str = "new"

@api_router.post("/leads", response_model=Lead)
async def create_lead(input: LeadCreate):
    lead = Lead(**input.model_dump())
    doc = lead.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.leads.insert_one(doc)
    logger.info(f"New readiness-plan lead: {lead.business_name} ({lead.email})")
    # Fire-and-forget email notification (won't block)
    try:
        await send_lead_email(doc)
    except Exception as e:
        logger.exception(f"Lead email send failed: {e}")
    return lead

@api_router.get("/leads", response_model=List[Lead])
async def list_leads(admin_token: str = ""):
    # Lightweight protection — clients pass ?admin_token=... matching env var
    expected = os.environ.get('ADMIN_TOKEN', '')
    if not expected or admin_token != expected:
        return []
    leads = await db.leads.find({}, {"_id": 0}).sort("created_at", -1).to_list(1000)
    for lead in leads:
        if isinstance(lead.get('created_at'), str):
            lead['created_at'] = datetime.fromisoformat(lead['created_at'])
    return leads


# ========== ADMIN AUTH ==========
JWT_SECRET = os.environ.get('JWT_SECRET', 'change-me-jwt-secret')
ADMIN_PASSWORD_DEFAULT = os.environ.get('ADMIN_PASSWORD', 'admin')

class AdminLoginInput(BaseModel):
    password: str

class AdminTokenOut(BaseModel):
    token: str

def make_token():
    payload = {
        "role": "admin",
        "exp": datetime.now(timezone.utc) + timedelta(days=14),
    }
    return jwt.encode(payload, JWT_SECRET, algorithm="HS256")

async def require_admin(authorization: Optional[str] = Header(default=None)):
    if not authorization or not authorization.lower().startswith("bearer "):
        raise HTTPException(401, "Missing token")
    token = authorization.split(" ", 1)[1]
    try:
        jwt.decode(token, JWT_SECRET, algorithms=["HS256"])
    except jwt.PyJWTError:
        raise HTTPException(401, "Invalid token")
    return True

async def get_setting(key: str, default=None):
    doc = await db.settings.find_one({"key": key}, {"_id": 0})
    return doc["value"] if doc else default

async def set_setting(key: str, value):
    await db.settings.update_one(
        {"key": key},
        {"$set": {"key": key, "value": value, "updated_at": datetime.now(timezone.utc).isoformat()}},
        upsert=True,
    )

@api_router.post("/admin/login", response_model=AdminTokenOut)
async def admin_login(input: AdminLoginInput):
    stored_pw = await get_setting("admin_password", ADMIN_PASSWORD_DEFAULT)
    if input.password != stored_pw:
        raise HTTPException(401, "Wrong password")
    return AdminTokenOut(token=make_token())


# ========== SETTINGS ==========
class SettingsUpdate(BaseModel):
    model_config = ConfigDict(extra="allow")

# Defaults for site settings, returned when nothing stored yet
PUBLIC_SETTINGS_KEYS = [
    "studioName", "tagline", "location", "establishedYear",
    "whatsappNumber", "whatsappMessage", "calendlyUrl", "email",
    "instagram", "linkedin", "x_url",
    "seo_default_title", "seo_default_description", "seo_default_og_image",
    "ga_measurement_id",
]
ADMIN_ONLY_KEYS = [
    "admin_password", "admin_notify_email",
    "resend_api_key", "resend_from_email",
    "google_ads_id", "facebook_ads_id",
]
SEO_PAGE_KEYS = [
    "seo_home", "seo_work", "seo_services", "seo_examples", "seo_process",
    "seo_contact", "seo_readiness",
]

@api_router.get("/settings")
async def public_settings():
    """Public settings — used by the live site. Sensitive keys excluded."""
    out = {}
    for k in PUBLIC_SETTINGS_KEYS + SEO_PAGE_KEYS:
        v = await get_setting(k)
        if v is not None:
            out[k] = v
    # Reveal whether key admin connections are configured (boolean only)
    out["_has_resend"] = bool(await get_setting("resend_api_key"))
    return out

@api_router.get("/admin/settings", dependencies=[Depends(require_admin)])
async def admin_settings():
    """All settings (including sensitive). Admin only."""
    out = {}
    for k in PUBLIC_SETTINGS_KEYS + ADMIN_ONLY_KEYS + SEO_PAGE_KEYS:
        v = await get_setting(k)
        out[k] = v if v is not None else ""
    return out

@api_router.put("/admin/settings", dependencies=[Depends(require_admin)])
async def update_settings(payload: SettingsUpdate):
    body = payload.model_dump()
    allowed = set(PUBLIC_SETTINGS_KEYS + ADMIN_ONLY_KEYS + SEO_PAGE_KEYS)
    updated = []
    for k, v in body.items():
        if k in allowed:
            await set_setting(k, v)
            updated.append(k)
    return {"updated": updated}


# ========== LEADS (admin) ==========
class LeadStatusUpdate(BaseModel):
    status: str  # new | contacted | qualified | closed | spam

@api_router.get("/admin/leads", response_model=List[Lead], dependencies=[Depends(require_admin)])
async def admin_list_leads():
    leads = await db.leads.find({}, {"_id": 0}).sort("created_at", -1).to_list(1000)
    for lead in leads:
        if isinstance(lead.get('created_at'), str):
            lead['created_at'] = datetime.fromisoformat(lead['created_at'])
    return leads

@api_router.patch("/admin/leads/{lead_id}", dependencies=[Depends(require_admin)])
async def update_lead_status(lead_id: str, payload: LeadStatusUpdate):
    res = await db.leads.update_one({"id": lead_id}, {"$set": {"status": payload.status}})
    if res.matched_count == 0:
        raise HTTPException(404, "Lead not found")
    return {"ok": True}

@api_router.delete("/admin/leads/{lead_id}", dependencies=[Depends(require_admin)])
async def delete_lead(lead_id: str):
    await db.leads.delete_one({"id": lead_id})
    return {"ok": True}


# ========== PROJECTS (CMS for live projects + examples) ==========
class ProjectInput(BaseModel):
    model_config = ConfigDict(extra="ignore")

    # Required identity
    title: str
    slug: str = ""               # auto-generated from title if blank
    summary: str                 # 1-2 sentence pitch shown on cards

    # Category & taxonomy
    category: str = "other"      # hospitality / trades / health / etc. or custom
    tags: list[str] = []         # ["Website", "AI", "Ads", "Automation", "App", "Social"]

    # Audience tier — controls which tier-blurb shows on /examples
    tier: str = "growing"        # starter | growing | established

    # Marketing copy
    what_we_did: list[str] = []  # bullet points
    outcomes: list[str] = []     # the "what changed / what helped" bullets
    client_quote: str = ""
    client_quote_by: str = ""

    # Links + media
    live_url: str = ""
    image_url: str = ""          # hero image — paste ANY url for now
    gallery: list[str] = []      # optional extra screenshots (urls)

    # Display
    featured: bool = False
    published: bool = True
    order: int = 0

    # Card preview (for the playful mock-style cards on /work)
    bg_color: str = ""           # e.g. "var(--p-pink)" or "#FFDD4A"
    fg_color: str = ""

class Project(ProjectInput):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


def _slugify(s: str) -> str:
    out = "".join(c if c.isalnum() else "-" for c in s.lower())
    # Collapse consecutive dashes & trim
    while "--" in out:
        out = out.replace("--", "-")
    return out.strip("-")


def _project_to_doc(p: Project) -> dict:
    d = p.model_dump()
    d["created_at"] = d["created_at"].isoformat()
    d["updated_at"] = d["updated_at"].isoformat()
    return d


def _doc_to_project(d: dict) -> dict:
    """Strip Mongo internals & coerce datetime fields for Pydantic."""
    d = {k: v for k, v in d.items() if k != "_id"}
    for f in ("created_at", "updated_at"):
        if isinstance(d.get(f), str):
            try:
                d[f] = datetime.fromisoformat(d[f])
            except Exception:
                d[f] = datetime.now(timezone.utc)
    return d


@api_router.get("/projects", response_model=List[Project])
async def list_projects_public():
    """Public — only published projects, ordered by featured then order then created."""
    docs = await db.projects.find(
        {"published": True},
        {"_id": 0},
    ).to_list(1000)
    parsed = [_doc_to_project(d) for d in docs]
    parsed.sort(key=lambda p: (
        0 if p.get("featured") else 1,
        p.get("order", 0),
        p.get("created_at") or datetime.min,
    ))
    return parsed


@api_router.get("/admin/projects", response_model=List[Project], dependencies=[Depends(require_admin)])
async def list_projects_admin():
    docs = await db.projects.find({}, {"_id": 0}).to_list(1000)
    parsed = [_doc_to_project(d) for d in docs]
    parsed.sort(key=lambda p: (
        0 if p.get("featured") else 1,
        p.get("order", 0),
        p.get("created_at") or datetime.min,
    ))
    return parsed


@api_router.post("/admin/projects", response_model=Project, dependencies=[Depends(require_admin)])
async def create_project(input: ProjectInput):
    data = input.model_dump()
    if not data.get("slug"):
        data["slug"] = _slugify(data["title"])
    proj = Project(**data)
    await db.projects.insert_one(_project_to_doc(proj))
    return proj


@api_router.put("/admin/projects/{project_id}", response_model=Project, dependencies=[Depends(require_admin)])
async def update_project(project_id: str, input: ProjectInput):
    data = input.model_dump()
    if not data.get("slug"):
        data["slug"] = _slugify(data["title"])
    data["updated_at"] = datetime.now(timezone.utc).isoformat()
    res = await db.projects.update_one({"id": project_id}, {"$set": data})
    if res.matched_count == 0:
        raise HTTPException(404, "Project not found")
    doc = await db.projects.find_one({"id": project_id}, {"_id": 0})
    return Project(**_doc_to_project(doc))


@api_router.delete("/admin/projects/{project_id}", dependencies=[Depends(require_admin)])
async def delete_project(project_id: str):
    await db.projects.delete_one({"id": project_id})
    return {"ok": True}


# ========== EXAMPLES (illustrative business types shown on /examples) ==========
class ExampleInput(BaseModel):
    model_config = ConfigDict(extra="ignore")

    slug: str = ""                # was `id` in the JS file (e.g. "cafe")
    icon: str = ""                # emoji
    industry: str
    size: str = ""
    color: str = "yellow"         # yellow / pink / mint / blue / ink
    tagline: str

    before: list[str] = []
    integrated: list[str] = []
    ai: list[str] = []

    quote: str = ""
    quoteBy: str = ""

    results: list[dict] = []      # [{k: "...", v: "..."}]

    category: str = "other"       # maps to categories on /examples page
    tier: str = "growing"         # starter / growing / established

    published: bool = True
    order: int = 0

class Example(ExampleInput):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


def _example_to_doc(e: Example) -> dict:
    d = e.model_dump()
    d["created_at"] = d["created_at"].isoformat()
    d["updated_at"] = d["updated_at"].isoformat()
    return d


def _doc_to_example(d: dict) -> dict:
    d = {k: v for k, v in d.items() if k != "_id"}
    for f in ("created_at", "updated_at"):
        if isinstance(d.get(f), str):
            try:
                d[f] = datetime.fromisoformat(d[f])
            except Exception:
                d[f] = datetime.now(timezone.utc)
    return d


@api_router.get("/examples", response_model=List[Example])
async def list_examples_public():
    docs = await db.examples.find({"published": True}, {"_id": 0}).to_list(1000)
    parsed = [_doc_to_example(d) for d in docs]
    parsed.sort(key=lambda e: (e.get("order", 0), e.get("created_at") or datetime.min))
    return parsed


@api_router.get("/admin/examples", response_model=List[Example], dependencies=[Depends(require_admin)])
async def list_examples_admin():
    docs = await db.examples.find({}, {"_id": 0}).to_list(1000)
    parsed = [_doc_to_example(d) for d in docs]
    parsed.sort(key=lambda e: (e.get("order", 0), e.get("created_at") or datetime.min))
    return parsed


@api_router.post("/admin/examples", response_model=Example, dependencies=[Depends(require_admin)])
async def create_example(input: ExampleInput):
    data = input.model_dump()
    if not data.get("slug"):
        data["slug"] = _slugify(data["industry"])
    ex = Example(**data)
    await db.examples.insert_one(_example_to_doc(ex))
    return ex


@api_router.put("/admin/examples/{example_id}", response_model=Example, dependencies=[Depends(require_admin)])
async def update_example(example_id: str, input: ExampleInput):
    data = input.model_dump()
    if not data.get("slug"):
        data["slug"] = _slugify(data["industry"])
    data["updated_at"] = datetime.now(timezone.utc).isoformat()
    res = await db.examples.update_one({"id": example_id}, {"$set": data})
    if res.matched_count == 0:
        raise HTTPException(404, "Example not found")
    doc = await db.examples.find_one({"id": example_id}, {"_id": 0})
    return Example(**_doc_to_example(doc))


@api_router.delete("/admin/examples/{example_id}", dependencies=[Depends(require_admin)])
async def delete_example(example_id: str):
    await db.examples.delete_one({"id": example_id})
    return {"ok": True}


async def seed_examples_if_empty():
    """One-time seed: if the examples collection is empty and we have a seed JSON, populate it."""
    count = await db.examples.count_documents({})
    if count > 0:
        return
    seed_path = ROOT_DIR / "seed_examples.json"
    if not seed_path.exists():
        return
    try:
        with open(seed_path) as f:
            seed_data = json.load(f)
        docs = []
        for i, item in enumerate(seed_data):
            # JS `id` becomes `slug` (stable business type identifier)
            slug = item.get("id") or _slugify(item.get("industry", ""))
            ex = Example(
                slug=slug,
                icon=item.get("icon", ""),
                industry=item.get("industry", ""),
                size=item.get("size", ""),
                color=item.get("color", "yellow"),
                tagline=item.get("tagline", ""),
                before=item.get("before", []),
                integrated=item.get("integrated", []),
                ai=item.get("ai", []),
                quote=item.get("quote", ""),
                quoteBy=item.get("quoteBy", ""),
                results=item.get("results", []),
                category=item.get("category", "other"),
                tier=item.get("tier", "growing"),
                published=item.get("published", True),
                order=item.get("order", i),
            )
            docs.append(_example_to_doc(ex))
        await db.examples.insert_many(docs)
        logger.info(f"Seeded {len(docs)} examples from {seed_path}")
    except Exception as e:
        logger.exception(f"Example seed failed: {e}")


# ========== CATEGORIES (lightweight: stored as a single setting list) ==========
DEFAULT_CATEGORIES = [
    {"id": "hospitality", "label": "Hospitality"},
    {"id": "trades", "label": "Trades & home services"},
    {"id": "health", "label": "Health & wellness"},
    {"id": "pro-services", "label": "Professional services"},
    {"id": "retail-ecom", "label": "Retail / e-commerce"},
    {"id": "creator", "label": "Creator / digital business"},
    {"id": "education", "label": "Education / coaching"},
    {"id": "property", "label": "Property / estate"},
    {"id": "other", "label": "Other"},
]


@api_router.get("/categories")
async def public_categories():
    custom = await get_setting("custom_categories", [])
    return DEFAULT_CATEGORIES + (custom or [])


@api_router.get("/admin/categories", dependencies=[Depends(require_admin)])
async def admin_categories():
    custom = await get_setting("custom_categories", [])
    return {"defaults": DEFAULT_CATEGORIES, "custom": custom or []}


class CategoryPayload(BaseModel):
    label: str


@api_router.post("/admin/categories", dependencies=[Depends(require_admin)])
async def add_category(payload: CategoryPayload):
    custom = await get_setting("custom_categories", []) or []
    cid = _slugify(payload.label)
    if cid in [c["id"] for c in DEFAULT_CATEGORIES + custom]:
        raise HTTPException(400, "Category already exists")
    custom.append({"id": cid, "label": payload.label})
    await set_setting("custom_categories", custom)
    return {"id": cid, "label": payload.label}


@api_router.delete("/admin/categories/{cid}", dependencies=[Depends(require_admin)])
async def delete_category(cid: str):
    custom = await get_setting("custom_categories", []) or []
    custom = [c for c in custom if c["id"] != cid]
    await set_setting("custom_categories", custom)
    return {"ok": True}


# ========== EMAIL NOTIFICATION ==========
async def send_lead_email(lead: dict):
    """Send admin notification via Resend if resend_api_key + admin_notify_email set."""
    api_key = await get_setting("resend_api_key")
    to_addr = await get_setting("admin_notify_email")
    studio = await get_setting("studioName", "Your Studio")
    from_email = await get_setting("resend_from_email", "onboarding@resend.dev")
    if not api_key or not to_addr:
        logger.info("Resend not configured; skipping email notification.")
        return
    body = f"""
    <h2>New readiness plan submission</h2>
    <p><strong>Business:</strong> {lead.get('business_name')}</p>
    <p><strong>Name:</strong> {lead.get('name')} &lt;{lead.get('email')}&gt;</p>
    <p><strong>Phone:</strong> {lead.get('phone') or '—'}</p>
    <p><strong>Industry:</strong> {lead.get('industry')} ({lead.get('industry_other') or '—'})</p>
    <p><strong>Size:</strong> {lead.get('business_size')}</p>
    <p><strong>Biggest time drain:</strong> {lead.get('biggest_time_drain')} ({lead.get('biggest_time_drain_other') or '—'})</p>
    <p><strong>Interested in:</strong> {', '.join(lead.get('interested_in', []))}</p>
    <p><strong>Interested-in (other):</strong> {lead.get('interested_in_other') or '—'}</p>
    <p><strong>Current tools:</strong> {', '.join(lead.get('current_tools', []))}</p>
    <p><strong>Monthly SaaS spend:</strong> {lead.get('monthly_software_spend') or '—'}</p>
    <p><strong>Extra notes:</strong> {lead.get('extra_notes') or '—'}</p>
    """
    try:
        resend.api_key = api_key
        params = {
            "from": f"{studio} <{from_email}>",
            "to": [to_addr],
            "subject": f"New readiness plan — {lead.get('business_name')}",
            "html": body,
        }
        # Run the sync SDK call in a thread so we don't block the event loop
        result = await asyncio.to_thread(resend.Emails.send, params)
        logger.info(f"Resend email queued: {result.get('id') if isinstance(result, dict) else result}")
    except Exception as e:
        logger.exception(f"Resend send failed: {e}")


@api_router.post("/admin/test-email", dependencies=[Depends(require_admin)])
async def admin_test_email():
    """Trigger a test Resend email so the admin can verify setup."""
    api_key = await get_setting("resend_api_key")
    to_addr = await get_setting("admin_notify_email")
    studio = await get_setting("studioName", "Your Studio")
    from_email = await get_setting("resend_from_email", "onboarding@resend.dev")
    if not api_key:
        raise HTTPException(400, "resend_api_key is not set in Admin → Integrations.")
    if not to_addr:
        raise HTTPException(400, "admin_notify_email is not set in Admin → Integrations.")
    try:
        resend.api_key = api_key
        result = await asyncio.to_thread(
            resend.Emails.send,
            {
                "from": f"{studio} <{from_email}>",
                "to": [to_addr],
                "subject": f"Test email from {studio}",
                "html": f"<p>This is a test email from your {studio} admin dashboard. If you got this, Resend is wired up correctly. ✨</p>",
            },
        )
        return {"ok": True, "id": result.get("id") if isinstance(result, dict) else None}
    except Exception as e:
        logger.exception(f"Resend test send failed: {e}")
        raise HTTPException(500, f"Resend error: {e}")


# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    
    # Convert to dict and serialize datetime to ISO string for MongoDB
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    # Exclude MongoDB's _id field from the query results
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    
    # Convert ISO string timestamps back to datetime objects
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    
    return status_checks

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("startup")
async def startup_seed():
    await seed_examples_if_empty()


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()