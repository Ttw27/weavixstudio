from fastapi import FastAPI, APIRouter, HTTPException, Depends, Header
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import json
import jwt
import httpx
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
    "resend_api_key", "google_ads_id", "facebook_ads_id",
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


# ========== EMAIL NOTIFICATION ==========
async def send_lead_email(lead: dict):
    """Send admin notification via Resend if resend_api_key + admin_notify_email set."""
    api_key = await get_setting("resend_api_key")
    to_addr = await get_setting("admin_notify_email")
    studio = await get_setting("studioName", "Your Studio")
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
        async with httpx.AsyncClient(timeout=15) as cx:
            r = await cx.post(
                "https://api.resend.com/emails",
                headers={"Authorization": f"Bearer {api_key}", "Content-Type": "application/json"},
                json={
                    "from": f"{studio} <onboarding@resend.dev>",
                    "to": [to_addr],
                    "subject": f"New readiness plan — {lead.get('business_name')}",
                    "html": body,
                },
            )
            if r.status_code >= 400:
                logger.warning(f"Resend error {r.status_code}: {r.text[:300]}")
    except Exception as e:
        logger.exception(f"Resend send failed: {e}")


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

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()