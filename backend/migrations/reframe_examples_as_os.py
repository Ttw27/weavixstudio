"""
Migration: reframe Examples as "business operating systems" and add 3 hero showcases.

Run once: python3 /app/backend/migrations/reframe_examples_as_os.py
Idempotent: safe to re-run (upserts by slug).
"""
import asyncio
import json
import os
import sys
import uuid
from datetime import datetime, timezone
from pathlib import Path

from dotenv import load_dotenv
from motor.motor_asyncio import AsyncIOMotorClient

ROOT = Path(__file__).resolve().parents[1]
load_dotenv(ROOT / ".env")
client = AsyncIOMotorClient(os.environ["MONGO_URL"])
db = client[os.environ["DB_NAME"]]


# ============================================================
# 3 NEW HERO EXAMPLES — richly detailed OS builds
# ============================================================
HERO_EXAMPLES = [
    {
        "slug": "florist",
        "icon": "💐",
        "industry": "Florist & Workshop Space",
        "size": "1 shop · owner + 2 staff · UK-wide delivery",
        "color": "pink",
        "tagline": "A florist who sells bouquets, box templates, workshop tickets and Christmas wreaths — all from one calm dashboard she runs while making arrangements.",
        "before": [
            "Squarespace site with clunky checkout",
            "Instagram DMs for custom orders",
            "Excel sheet for workshop bookings",
            "Bank transfer for deposits (chasing constantly)",
            "Canva every morning for the day's story posts"
        ],
        "integrated": [
            "Website (public): bouquet shop · workshop calendar · box-template designer where customers style their own gift · delivery slot picker with post-code pricing",
            "Backend (she runs daily): content-ad generator (product photo in, three ad variants out) · main-page banner generator (seasonal, one-click) · product image transformer (removes backgrounds, adds studio lighting)",
            "Backend: lead management inbox — every DM, form and email in one thread · deposit engine for workshops (auto-refunds on cancel) · supplier order sheet with auto-reorder points",
            "Backend: Christmas wreath waitlist auto-manager · gift-note printer · delivery-round optimiser for van drops"
        ],
        "ai": [
            "AI writes Instagram captions in her voice, ready to schedule",
            "AI replies to \"do you have anything under £40?\" DMs with the top 3 matching bouquets and adds them to cart",
            "AI drafts customer thank-you emails with the actual bouquet photo the day after delivery",
            "AI predicts next week's stem order from the last 4 weeks of sales + weather forecast"
        ],
        "quote": "The workshop tickets used to be a spreadsheet nightmare. Now people book, pay a deposit, and my Sunday looks like flower arranging — not admin.",
        "quoteBy": "Owner · florist, York",
        "results": [
            {"k": "Owner admin time", "v": "-14 hrs/wk"},
            {"k": "Workshop no-shows", "v": "-71%"},
            {"k": "Avg order value", "v": "+38%"},
            {"k": "Instagram → sale", "v": "+3.2× conv"}
        ],
        "category": "retail",
        "tier": "growing",
        "order": 0,
        "published": True,
    },
    {
        "slug": "workwear",
        "icon": "👕",
        "industry": "Workwear & Uniform Brand",
        "size": "B2B · 8 staff · 400+ clients",
        "color": "yellow",
        "tagline": "Not a website with AI — an entire sales operating system. Logo fixer, quote builder, showkit creator, ad tracker. All under one roof.",
        "before": [
            "WordPress site with Contact Form 7",
            "Illustrator for every custom logo mockup (hours per quote)",
            "Word doc quote templates copy-pasted daily",
            "Zoho for CRM (ignored)",
            "Facebook Ads Manager in one tab, Google Ads in another"
        ],
        "integrated": [
            "Website (public): product catalogue with live customisation preview · self-serve quote builder for small orders · portfolio of brands they clothe",
            "Backend: product showkit creator — drop in a client's uniform photo, get a full range of branded mockups back",
            "Backend: AI logo fixer — customer uploads a fuzzy JPG from 2011, we hand back a clean vector + colour palette",
            "Backend: backend logo creator (from prompt or brief) for clients who don't have one yet",
            "Backend: lead chaser — auto-follows up quotes at day 2, day 5, day 10 in the owner's voice, stops the second the client replies",
            "Backend: quote-to-PDF generator — line items, branding preview, terms, e-sign, all in one branded PDF sent from the app",
            "Backend: ad tracking dashboard — every Meta & Google campaign, cost-per-lead by product line, single-screen"
        ],
        "ai": [
            "AI drafts quote copy from a 2-line brief (e.g. \"12 polos, embroidered chest logo, mixed sizes\")",
            "AI suggests upsell (matching hats, high-vis) based on the industry the client is in",
            "AI writes ad creative + product descriptions per audience segment",
            "AI reviews low-performing ads weekly and suggests 3 alternate hooks to test"
        ],
        "quote": "Quote turnaround used to be next day. Now it's under 20 minutes. We're winning jobs we'd lost before because we were too slow.",
        "quoteBy": "Sales director · workwear brand, Manchester",
        "results": [
            {"k": "Quote turnaround", "v": "next day → 18 min"},
            {"k": "Quote-to-order rate", "v": "+52%"},
            {"k": "Sales admin hours", "v": "-22 hrs/wk"},
            {"k": "Ad cost-per-lead", "v": "-34%"}
        ],
        "category": "retail",
        "tier": "established",
        "order": 1,
        "published": True,
    },
    {
        "slug": "business-os",
        "icon": "🧠",
        "industry": "Design Studio (Business OS only, no public website)",
        "size": "Solo founder · £180k revenue · everything internal",
        "color": "ink",
        "tagline": "No public website. Just an operating system that runs their whole business — one dashboard, one login, everything.",
        "before": [
            "Notion for tasks (kept re-organising, never used)",
            "Photoshop + Illustrator for every design",
            "Buffer for scheduling posts",
            "A stack of PDF invoices in a Google Drive folder",
            "Screenshots and screen-record apps to send client feedback"
        ],
        "integrated": [
            "Backend: AI day-restructurer — dumps in a brain-splurge, orders it by revenue impact, gives the day's priority top 3",
            "Backend: prompt-ready design generator — brand kit locked in, generates on-brand designs from a one-line prompt",
            "Backend: product image generation — new SKUs get lifestyle shots without a photoshoot",
            "Backend: ad content generation + tracking — writes, mocks, publishes, tracks; all inside the OS",
            "Backend: design enhance / upscale / tidy — customer's rough logo → print-ready in one pass",
            "Backend: print-ready design creation — takes a design and preps it for A3, sticker sheet, business card, Instagram all at once",
            "Backend: client-facing gallery share (only bit that's public) — clean, branded, one-off share links"
        ],
        "ai": [
            "AI reads the founder's inbox each morning and drafts the day's task list, ranked",
            "AI turns rough sketches or verbal descriptions into on-brand designs in seconds",
            "AI upscales, tidies and prepares any file for print without leaving the OS",
            "AI writes captions, ad copy and email replies in the founder's voice (learnt from past output)"
        ],
        "quote": "I stopped needing 8 tools and a project manager. It's just me and my OS — and I ship more in a day now than I used to in a week.",
        "quoteBy": "Founder · design studio, remote",
        "results": [
            {"k": "SaaS spend cut", "v": "-£340/mo"},
            {"k": "Designs shipped", "v": "+3.8×"},
            {"k": "Client turnaround", "v": "5 days → same day"},
            {"k": "Founder deep-work hrs", "v": "+18 hrs/wk"}
        ],
        "category": "digital",
        "tier": "established",
        "order": 2,
        "published": True,
    },
]

# ============================================================
# TAGLINE PUNCH-UPS for the existing 24 (matched by slug)
# Each one leans harder into the "OS behind the doorway" framing.
# ============================================================
TAGLINE_PUNCHUPS = {
    "cafe": "One calm operating system that runs the till, the roster, the suppliers, the reviews — and gives her Sundays back.",
    "dental": "Replaced 6 tools with one calm patient OS — booking, reminders, files, intake, payments, comms.",
    "trades": "A field-services OS that quotes on the drive home, invoices from the van and chases leads while he's on the tools.",
    "coach": "A one-login OS: bookings + payments + client dashboards + AI programme drafts — no more Notion + Calendly + WhatsApp juggling.",
    "salon": "Every appointment, product, deposit and Instagram post — one OS the front desk actually loves.",
    "yoga": "A studio OS that fills classes, chases memberships, writes the newsletters and knows who's about to churn.",
    "law-firm": "A quiet legal OS: AI-drafted intake briefs, doc portals, matter tracking, invoicing — all inside one calm dashboard.",
    "estate-agent": "One property OS: photo → listing copy → floorplan overlay → viewings → offers → chain visibility. In one screen.",
    "accountant": "A practice OS that turns 40 emails a day into a single triaged queue with AI-drafted replies waiting for approval.",
    "restaurant-chain": "One operating system across 3 restaurants — kitchen displays, staff shifts, deposits for private hire, review replies.",
    "boutique-hotel": "The full guest lifecycle in one OS — booking, upsell, in-stay chat, reviews — replacing a stack of PMS + email + Slack tools.",
    "cycling-club": "A community OS: memberships, ride sign-ups, kit shop, sponsors, newsletter — all self-serving to the committee.",
    "wedding-planner": "A wedding-day OS: client portal, RSVPs, vendor payments, run-of-day, gallery delivery. No more spreadsheet chaos.",
    "podcaster": "A creator OS: show-notes writer, Shorts clip generator, sponsor tracker, publisher — one login runs the whole show.",
    "ecom": "A DTC operating system: post-purchase upsell, review drips, ad creative gen, unit economics — under one roof.",
    "tutor": "A tutoring OS: lesson booking, homework portal, progress reports to parents, invoicing — everything one tap away.",
    "personal-trainer": "A PT operating system that builds programmes with AI, tracks form via video, chases missed sessions and invoices automatically.",
    "physio": "A rehab OS: intake AI, exercise video library, home-programme reminders, invoicing, GDPR-clean records.",
    "florist-basic": "A florist ops system — orders, deposits, delivery routes, wreath waitlists — behind a beautiful shop front.",
    "footballer-coach": "A coaching OS: session bookings, video breakdowns, parent updates, payment plans — one login for a solo operator.",
    "landscaping": "A field-ops OS: quotes on site, invoicing from the truck, aftercare drips, seasonal maintenance reminders.",
    "removals": "A logistics OS: instant quote from photos, driver route optimiser, deposit engine, review chaser.",
    "gp-clinic": "A patient OS: triage AI, appointments, follow-up drips, private consultation payments — under one dashboard.",
    "driving-school": "An instructor OS: lesson booking, theory-practice quizzes, block-booking discount engine, parent progress reports.",
}


async def upsert_example(data: dict):
    """Insert if new (by slug), otherwise update fields — never disturb the id."""
    now_iso = datetime.now(timezone.utc).isoformat()
    existing = await db.examples.find_one({"slug": data["slug"]}, {"_id": 0})
    if existing:
        patch = {**data, "updated_at": now_iso}
        # Preserve id + created_at
        patch.pop("id", None)
        patch.pop("created_at", None)
        await db.examples.update_one({"slug": data["slug"]}, {"$set": patch})
        return f"UPDATE {data['slug']}"
    else:
        doc = {
            **data,
            "id": str(uuid.uuid4()),
            "created_at": now_iso,
            "updated_at": now_iso,
        }
        await db.examples.insert_one(doc)
        return f"INSERT {data['slug']}"


async def main():
    print("=== Reframe: Examples as Business Operating Systems ===\n")

    # 1. Bump existing examples' order by +3 to make room for the 3 heroes
    print("→ Bumping existing example order +3 to make room…")
    await db.examples.update_many({}, {"$inc": {"order": 3}})
    n = await db.examples.count_documents({})
    print(f"  {n} examples nudged.\n")

    # 2. Insert / upsert the 3 hero examples (order 0, 1, 2)
    print("→ Upserting 3 hero showcases…")
    for ex in HERO_EXAMPLES:
        r = await upsert_example(ex)
        print(f"  {r}: {ex['industry']}")

    # 3. Punch up taglines on existing 24
    print("\n→ Punching up taglines on existing examples…")
    updated = 0
    for slug, new_tagline in TAGLINE_PUNCHUPS.items():
        r = await db.examples.update_one(
            {"slug": slug},
            {"$set": {"tagline": new_tagline, "updated_at": datetime.now(timezone.utc).isoformat()}},
        )
        if r.matched_count:
            updated += 1
            print(f"  ✎ {slug}")
        else:
            print(f"  ? (no match) {slug}")
    print(f"\n  {updated} taglines refreshed.")

    # 4. Final tally
    total = await db.examples.count_documents({})
    print(f"\n=== Done. {total} examples in DB. ===")

    client.close()


if __name__ == "__main__":
    asyncio.run(main())
