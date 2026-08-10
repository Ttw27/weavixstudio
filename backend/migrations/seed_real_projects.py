"""
Seed: load the six real Weavix Studio projects into the projects collection.

Run once:  python3 /app/backend/migrations/seed_real_projects.py
Idempotent: upserts by slug, preserves existing ids and created_at.

Projects: swap-my-face-tees, yourownprint, planlete, huge-hoods,
          the-gift-project, flower-atelier

NOTE ON FIELDS
--------------
The core fields (title, summary, what_we_did, outcomes, tags, live_url,
image_url, gallery, featured, published, order, bg_color, fg_color) map
directly onto the ProjectInput model and render today.

Four richer fields are also written to each document: `signature`,
`ownership`, `replaced` and `closing`. The current ProjectInput model uses
extra="ignore", so these are stored in Mongo but NOT returned by the API
until the model + detail page are extended to surface them. They are here so
the copy lives in one place and is ready the moment the detail page grows a
"signature mechanism / what they own / what it replaced" section.
Nothing breaks by including them now.
"""
import asyncio
import os
import uuid
from datetime import datetime, timezone
from pathlib import Path

from dotenv import load_dotenv
from motor.motor_asyncio import AsyncIOMotorClient

ROOT = Path(__file__).resolve().parents[1]
load_dotenv(ROOT / ".env")
client = AsyncIOMotorClient(os.environ["MONGO_URL"])
db = client[os.environ["DB_NAME"]]


PROJECTS = [
    {
        "slug": "swap-my-face-tees",
        "title": "Swap My Face Tees",
        "summary": "Custom face-swap t-shirts for stag dos, hen parties and group events — with an in-browser design studio that turns a phone photo into a print-ready order, no designer ever touching it.",
        "category": "ecommerce",
        "tags": [
            "Website",
            "E-commerce",
            "AI"
        ],
        "tier": "established",
        "live_url": "https://www.swapmyface.co.uk",
        "image_url": "",
        "gallery": [],
        "featured": true,
        "published": true,
        "order": 1,
        "bg_color": "#161616",
        "fg_color": "#FFDD4A",
        "what_we_did": [
            "A live design tool that removes the designer — upload a photo, the face is cut out automatically, drag it onto illustrated templates with custom text, fonts and colours, previewed live. What comes out is print-ready.",
            "Three ways to order: one design for the whole group, a different photo for each person, or a fully done-for-you concierge service.",
            "Volume pricing that adjusts itself as the group grows.",
            "A full shop behind it — secure checkout, automatic confirmation emails, GDPR-compliant photo consent built in from the start.",
            "A staff dashboard that runs the whole operation: every order in one place, print-ready files per person in one click, template catalogue, homepage features, discount codes, pricing tiers and reviews.",
            "An internal recreate tool — an order from Amazon, Etsy or WhatsApp rebuilt in the exact same builder and exported for print in one click, so every sale ends up in one system.",
            "Built-in SEO for the searches real customers actually use.",
            "A bespoke back-office intelligence layer watches the ad accounts, flags what's slipping, suggests changes and reviews performance in plain English — so the shop runs its own marketing without an agency.",
            "A print-house production queue — every paid order flows across one board (paid → in production → printed → shipped) with the print-ready files attached to each, so the workshop never digs through emails to find what to print next.",
            "A 'make them laugh' design generator — upload the stag or birthday person's face and, instead of a blank canvas, the tool proposes finished gag designs built around that specific face and themed to the occasion, turning 'I don't know what to make' into 'pick your favourite of these six'."
        ],
        "outcomes": [
            "Photo → print-ready in one click",
            "Every order, any platform, in one system",
            "No marketplace fees — owned outright",
            "The design job done by the customer, not an expert"
        ],
        "client_quote": "",
        "client_quote_by": "",
        "signature": "One photo upload becomes a complete, print-ready order package in one click — for every person in the order, whether they bought on the website or somewhere else entirely. The job that used to mean emailing a designer and waiting for a proof happens in the browser before checkout.",
        "ownership": "Custom-built and owned outright — no page-builder, no marketplace fees, no per-order cut to anyone. The design tool, the catalogue, the customer list and the order history are theirs, shaped around exactly how the business actually runs rather than bent to fit a rented template.",
        "replaced": "A bought storefront template, a separate personalisation app, and a manual process for rebuilding orders that come from other platforms — collapsed into one owned system.",
        "closing": "And all of it lives in one place — their own branded operating system, in their name, running their business their way."
    },
    {
        "slug": "yourownprint",
        "title": "YourOwnPrint",
        "summary": "A custom print and workwear platform for a Leicester printer — an in-browser design studio, full kit and squad configurators, and a supplier import and reordering engine that turns a phone photo into a print-ready order without a designer ever touching it.",
        "category": "ecommerce",
        "tags": [
            "Website",
            "E-commerce",
            "AI"
        ],
        "tier": "established",
        "live_url": "https://your-own-print.vercel.app",
        "image_url": "",
        "gallery": [],
        "featured": true,
        "published": true,
        "order": 2,
        "bg_color": "#0F3D2E",
        "fg_color": "#F7F5F2",
        "what_we_did": [
            "A full-canvas design studio — live garment mockup in the chosen colour, drag/resize/rotate artwork, live font picker, layer stack and multi-placement, plus a cut-down single-placement designer for quick chest logos.",
            "Guided configurators for every kind of group order — Full Squad Configurator, Sports Outfit Configurator, Team Kit Builder and fight-night / event kit set-ups — each a step-by-step flow so a whole team can be kitted out without a single email.",
            "Real AI image processing — one-tap background removal plus poster / sketch / cartoon / enhance effects, flattened and scaled to the real print area on order.",
            "A full supplier import system — CSV upload that ingests tens of thousands of cells from the client's supplier feed, mirrors every supplier image into the client's own storage, and auto-categorises and industry-tags each product on the way in.",
            "A backend reordering system — repeat and bulk workforce orders rebuilt in a click from a saved order, so a returning customer restocks uniforms without redesigning anything.",
            "Acquisition-and-retention tooling woven through the site — quantity-break pricing that rewards bigger orders, saved designs and reorder prompts, quote-request capture merged into one lead feed, and follow-up hooks that keep new and returning business moving through the funnel.",
            "Four separate Stripe checkout flows (single, cart, leavers' hoodies, bulk workforce) with server-side quantity discounting and a VAT engine that zero-rates children's clothing.",
            "A bespoke back-office intelligence layer — watches the ad accounts, flags what's underperforming, suggests changes and reviews the numbers in plain English, so the print business runs its own marketing without an agency.",
            "A full admin platform — orders dashboard, merged enquiries/quote feed, page-copy CMS with images and video in the database, navigation editor, reviews and moderated Q&A.",
            "A full mobile rebuild with finger-drag, sliding sheets over a pinned canvas, and hand-fixed iOS Safari viewport behaviour.",
            "A print-house production queue — every paid order flows across one board (paid → in production → printed → shipped) with the print-ready files attached to each, so the workshop never digs through emails to find what to print next.",
            "Logo-to-full-kit generation — a team uploads their crest once and the system auto-generates the entire kit mocked up in their colours (home, away, training top, hoodie, bag), ready to approve as a set. The day's work a kit designer charges for, done in the browser."
        ],
        "outcomes": [
            "Phone photo → print-ready in ~30 seconds",
            "Whole teams kitted out via configurators",
            "Supplier feed imported + reordering built in",
            "Runs its own ads — no agency"
        ],
        "client_quote": "",
        "client_quote_by": "",
        "signature": "A customer uploads a photo from their phone, taps once to strip the background, positions it live on a photographic mockup of the actual garment in the actual colour — and that same placement is flattened and scaled to the real print area at production. The job that used to mean emailing a designer and waiting for a proof happens in the browser, in about thirty seconds, before checkout — and for a whole squad at once through the configurators.",
        "ownership": "Everything — the source code, the database, the design tool, the configurators, and the entire catalogue including images mirrored into their own storage rather than hotlinked to a supplier who could pull them tomorrow. The customer list and order history sit in their database, not a platform's. The Stripe account is theirs. And the back-office intelligence layer means the ad accounts are theirs to run too — no monthly licence, no agency, no vendor who can change the terms.",
        "replaced": "Shopify plus the Qtomiser personalisation app — roughly £50–100+ a month in recurring fees for a design tool built to someone else's spec and a storefront constrained by someone else's theme. Plus manual jobs: checking orders by querying the database, sending receipts by hand, categorising a supplier feed one item at a time.",
        "closing": "And all of it lives in one place — their own branded operating system, in their name, running their business their way."
    },
    {
        "slug": "planlete",
        "title": "Planlete",
        "summary": "A UK training platform that turns a five-minute questionnaire into a fully periodised four-week programme, delivered as a private web app the athlete logs into — with a professional builder for coaches and physios.",
        "category": "saas",
        "tags": [
            "Website",
            "AI",
            "App"
        ],
        "tier": "established",
        "live_url": "https://planlete.co.uk",
        "image_url": "",
        "gallery": [],
        "featured": true,
        "published": true,
        "order": 3,
        "bg_color": "#1A1F2B",
        "fg_color": "#8AE38A",
        "what_we_did": [
            "A two-stage AI generation engine — a specialist-standards pre-call per sport, then the full programme build — across nine-plus goal pathways from powerlifting to combat to endurance, each with its own logic.",
            "Family-based guardrails per sport category so a boxer's block can't come back looking like a bodybuilder's, plus full four-week periodisation with real deloads and per-exercise reasoning.",
            "A semantic validation layer checking every plan against the customer's actual equipment, available days, session length and training setup — with an auto-trim that reduces sets rather than deleting exercises.",
            "The athlete web app — week tabs, per-set weight/rep/RPE logging, cycle-aware load display pulling from real history ('target 92.5kg, you did 90kg last cycle'), experience-scaled progression, built-in timers and one-tap exercise video lookup.",
            "A derived-plan flow so a customer can buy their next block built from the one they just finished.",
            "Stripe checkout with webhook-driven background generation and a fallback so customers who pay then close the tab still get their plan, plus a 48-hour correction window and self-service plan recovery.",
            "A coach/B2B side — a professional builder with credential gating and a client-pays path.",
            "A full admin platform — CMS, funnel analytics, support inbox, a week-by-week plan editor, and email alerting to the founder on any failed generation.",
            "A bespoke back-office intelligence layer watches acquisition and ad spend, flags what's converting, and reviews the funnel in plain English — so growth is run in-house, not outsourced.",
            "A coach dashboard for the B2B side — every client's plan, adherence and stall points on one screen, turning the builder from a plan generator into a retention tool that shows a coach exactly who needs a nudge.",
            "A personalised 'your week ahead' video — the athlete's actual sessions assembled into a narrated walkthrough, so they open Monday to a coach talking them through their own week, with every exercise auto-linked to a demonstration."
        ],
        "outcomes": [
            "Questionnaire → periodised plan in under 3 min",
            "One-off payment, no subscription",
            "Plans that respond to what you actually lifted",
            "Same engine powers a coach builder"
        ],
        "client_quote": "",
        "client_quote_by": "",
        "signature": "Before Planlete writes a single set, it asks a specialist coach what the rules are — an AI pre-call generates the non-negotiable standards for that exact sport and injects them into the build. A validation layer then checks the finished plan against your real equipment, real days and real session length before it's allowed to ship. That's the two jobs you'd normally pay a sport-specific coach for — knowing what a boxer's week must contain, and sanity-checking it against your actual life — done automatically, for a one-off fee.",
        "ownership": "The whole thing, owned outright — a real repository, not a locked page-builder export, with the original third-party app-platform branding stripped out and replaced with owned code. Every customer, order, plan, log and lead sits in his own database. The customer list, including email-captured sample leads, is his and exportable forever. Payments go direct through his own Stripe. No monthly platform fee, and no vendor who can change the terms.",
        "replaced": "The PDF training plan — static and obsolete the week after you buy it — replaced with a living app that responds to logged performance. A third-party AI app-builder's boilerplate, ripped out for fully owned code. And a per-seat coaching-platform subscription, replaced by delivery, logging and progression on infrastructure he owns.",
        "closing": "And all of it lives in one place — his own branded operating system, in his name, running his business his way."
    },
    {
        "slug": "huge-hoods",
        "title": "Huge Hoods",
        "summary": "An oversized clothing brand with a bespoke three-size system and a custom sizing engine that tells any customer — adult or child — exactly where the hem will land on their body before they buy.",
        "category": "ecommerce",
        "tags": [
            "Website",
            "E-commerce",
            "Ads"
        ],
        "tier": "established",
        "live_url": "https://hugehoods.co.uk",
        "image_url": "",
        "gallery": [],
        "featured": true,
        "published": true,
        "order": 4,
        "bg_color": "#161616",
        "fg_color": "#FFDD4A",
        "what_we_did": [
            "Four interactive fit finders — adult and kids, hoodie and tee — each returning a recommended fit and an estimated hem position for that specific body, embedded on the product page inches from the buy button.",
            "Kids fit finders that run age-plus-build logic, outputting UK average height for the age, an adjusted working height and where the hem lands.",
            "A full product page rebuild ordered for cold ad traffic — every page a self-contained landing page, because ads point at product URLs, not the homepage.",
            "A complete kids range built from scratch, mixing kids and adult garments after the discovery that kids ranges top out too small to stay oversized on a 13-year-old.",
            "A bestie generator built as a social-media tool — two friends hit match and it pairs two 'mood' designs for them together, each pickable by size and dropped into the cart as a matched set, turning a bit of fun into a two-person order.",
            "A six-slot tag taxonomy across all 521 products driving a Google Shopping feed, plus SEO title rewrites across the full catalogue.",
            "Meta advertising rebuilt from the account up — campaign and ad set built programmatically against the brand's own pixel, with a full four-year ROAS reconstruction establishing the creative and frequency rules.",
            "A six-month social system — eight repeating card formats generated programmatically at 1080×1080, scheduled by bulk CSV across roughly 185 days.",
            "A bespoke back-office intelligence layer that watches the account it brought in-house — flagging frequency fatigue, creative drop-off and spend anomalies, and reviewing ROAS in plain English, so the brand keeps running its own ads without handing the pixel back to an agency.",
            "Return-reason capture wired back into the fit finder — every return logged against the height and fit the model predicted, so the sizing engine sharpens on real outcomes and the category's biggest cost becomes its training data.",
            "An 'on you' size preview — the fit finder's hem calculation rendered visually, drawing the hem line on a body silhouette scaled to the customer's real height, so they see 'below the knee on me' rather than reading a measurement."
        ],
        "outcomes": [
            "Height in → hem position out, two taps",
            "Native theme code, no app fees",
            "Ad account brought fully in-house",
            "521 products, one tag taxonomy"
        ],
        "client_quote": "",
        "client_quote_by": "",
        "signature": "The moment you sell three oversized fits instead of one, you inherit a sizing conversation no other brand has to have. The fit finder turns it into a two-tap answer — give it a height, or for kids an age and build, and a shoulder-height model validated against real customer measurements tells you exactly where the hoodie will sit: mid-thigh, knee, below the knee. The judgement a tailor or a support agent used to make, made instantly on the product page.",
        "ownership": "Every interactive feature is native theme code, not a rented app — the fit finders, size guides and generators sit in the theme, so there are no monthly app fees and no vendor who can deprecate a feature. The catalogue, tag taxonomy and Shopping feed are the brand's own structured data, portable anywhere. And the ad account came home: campaigns had been run inside an outside agency's account, meaning the brand didn't own the pixel history it had paid for. Everything now runs in-house, on its own pixel.",
        "replaced": "PageFly — four size-guide pages rebuilt into native theme sections. Sizing apps and size-chart plugins, replaced by purpose-built logic no off-the-shelf app could produce. The manual sizing conversation of emails, DMs and returns. The agency retainer, brought back in-house. And daily hand-built social, replaced by programmatic cards and bulk scheduling.",
        "closing": "And all of it lives in one place — their own branded operating system, in their name, running their business their way."
    },
    {
        "slug": "the-gift-project",
        "title": "The Gift Project",
        "summary": "A UK personalised-gifts retailer rebuilt from a stock Shopify theme into an editorial-grade store with its own design system, bespoke merchant-editable sections, and a review-to-social content pipeline.",
        "category": "ecommerce",
        "tags": [
            "Website",
            "E-commerce",
            "Design"
        ],
        "tier": "growing",
        "live_url": "https://www.the-gift-project.com",
        "image_url": "",
        "gallery": [],
        "featured": false,
        "published": true,
        "order": 5,
        "bg_color": "#F7F5F2",
        "fg_color": "#C8102E",
        "what_we_did": [
            "A full design system coded from scratch — a Fraunces/Karla type pairing and a warm neutral palette, loaded natively in the theme, taking a generic store to Not On The High Street polish without leaving Shopify.",
            "Nine bespoke Liquid sections, each merchant-configurable in the theme editor rather than hard-coded — how-it-works, product grids with per-card editable CTAs, page headers with breadcrumbs the theme didn't do, grouped link lists, flavour and info blocks.",
            "A proportional SVG jar-size comparator — four jar shapes drawn to one shared scale, solving 'what does 350g actually look like next to 1kg' without a photographer.",
            "A food-compliance accordion with per-mix ingredients, allergen and nutrition tables, built so new mixes are added without touching code.",
            "A third-party options app restyled into a native-looking picker via CSS only — including a fix for a real accessibility bug in the app's own markup that made option text untappable on mobile.",
            "Navigation rebuilt from 39 items with 16 duplicates down to a clean 24 across four columns.",
            "Catalogue engineering — all 4,182 products reprocessed with corrected tags, SEO titles and Google Shopping fields against a master reference, with smart collections running off a single clean rule.",
            "A review-to-social pipeline — 6,141 reviews filtered to the 715 with customer photos, turned into a contact sheet and an 18-post scheduling CSV running to late 2026.",
            "A bespoke back-office intelligence layer watching ad performance and flagging what to change, so the store's marketing is reviewed continuously without an agency retainer.",
            "Personalisation-proof approval — the customer sees a live preview of their exact engraved or printed text before paying, killing the 'that's not what I typed' returns that plague personalised gifts.",
            "A peak-season readiness board — Valentine's and Christmas stock, supplier lead times and order cut-off dates on one view, so the busiest weeks of the year are planned, not survived.",
            "An occasion concierge — the customer answers three questions (who, occasion, vibe) and the store assembles a personalised gift edit from its own live catalogue, wrapped as a real suggestion rather than a 4,000-product grid to wade through."
        ],
        "outcomes": [
            "Stock theme → editorial-grade store",
            "Sections the owner edits himself",
            "4,182 products re-engineered",
            "No page-builder subscription"
        ],
        "client_quote": "",
        "client_quote_by": "",
        "signature": "The catalogue re-indexes itself. All 4,182 products were reprocessed against a single master reference — tags, SEO titles and Shopping fields corrected in one pass — with smart collections running off one clean exclusion rule, so the store organises itself as products are added rather than being sorted by hand.",
        "ownership": "A build like this lives entirely in the theme, owned outright. The design system is a plain CSS asset, not a subscription. The bespoke sections are Liquid files in the repo — they don't stop working if a bill goes unpaid. The full catalogue is a portable CSV source of truth, and the reviews are exported and held, not locked in a widget. The Meta ads are built as standard single-image posts specifically so each leaves behind a reusable post ID — an accumulating, owned library of proven creative.",
        "replaced": "A leftover GemPages install and PageFly pages, migrated to native templates. A paid gift-quiz app. Bought premium section packs. And the standing cost of a developer on call for every layout change — the sections are merchant-configurable, so the owner edits them himself.",
        "closing": "And all of it lives in one place — their own branded operating system, in their name, running their business their way."
    },
    {
        "slug": "flower-atelier",
        "title": "Flower Atelier",
        "summary": "A Leicester luxury florist's entire operation — shop, workshop bookings, portfolio and eleven service pages — rebuilt off a closed AI platform onto infrastructure she owns outright, with an AI visual-quote builder and an AI email desk running behind it.",
        "category": "service",
        "tags": [
            "Website",
            "E-commerce",
            "CMS"
        ],
        "tier": "growing",
        "live_url": "https://floweratelier.co.uk",
        "image_url": "",
        "gallery": [],
        "featured": false,
        "published": true,
        "order": 6,
        "bg_color": "#2C2A28",
        "fg_color": "#E8B4B8",
        "what_we_did": [
            "A custom CMS the owner runs herself — editable homepage, full catalogue with a purpose-built gallery manager, a categorised portfolio, and a genuine service-page builder (eyebrow, split headline, subheading, hero, CTA — all per page).",
            "An AI visual-quote builder — she describes the brief and it generates a genuine visual quote showing the actual stems and arrangement being proposed, not random stock flowers, with an estimated price built from live Holland flower-market costings. A real, sendable quote in minutes instead of an evening.",
            "An AI email and customer-service desk — incoming enquiries are read, sorted and prioritised automatically, with drafted replies sitting ready to send, so nothing waits in an inbox during a busy Valentine's or wedding week.",
            "Stripe Checkout on the official SDK with a signed webhook, plus a separate deposit-aware checkout for workshops that takes a part-payment and tracks the outstanding balance independently.",
            "A Cloudflare R2 image pipeline with one upload endpoint that routes by folder automatically, so a photo taken on her phone at an event is live and correctly filed in seconds.",
            "Dynamic navigation that builds itself from the database and respects an active flag — hide a page and it vanishes from the menu instantly.",
            "Eleven-plus service and occasion pages, including two purpose-built commercial landing pages — workshops for pubs and venues, and for care homes and hospices — written in deliberately different registers to rank on separate long-tail searches.",
            "A bespoke back-office intelligence layer — watches her ad spend, flags what's working, suggests changes and reviews the account in plain English, so she markets the studio without an agency.",
            "A full migration off the originating AI platform's proprietary SDK, plus a build-tooling migration off a deprecated toolchain.",
            "A seasonal availability engine feeding the quote builder — it knows what's actually in season, so it never quotes peonies in December, making every AI visual quote genuinely deliverable rather than just beautiful.",
            "A wedding and event timeline — each big booking becomes a countdown with deposit stages, a final-numbers date and the flower order auto-drafted from the agreed quote, so nothing is scrambled together the week before.",
            "A sympathy tribute designer — a gentle guided tool that takes the relationship, favourite flowers and a few words and composes a tribute arrangement visual, with the meaning behind each stem explained and priced live, so the most delicate quote in floristry is handled with dignity at any hour."
        ],
        "outcomes": [
            "Cut free from platform lock-in",
            "AI visual quotes with real Holland costings",
            "AI email desk drafts replies automatically",
            "Owns repo, database, storage and domain"
        ],
        "client_quote": "",
        "client_quote_by": "",
        "signature": "She describes an arrangement and the platform builds the quote — a genuine visual of the actual stems being proposed, not stock imagery, priced from live Holland flower-market costings and ready to send in minutes. The quoting, sourcing-price and design judgement a florist normally does by hand of an evening, done in the browser — and underneath it, real records are invisibly separated from demo content so no deployment can ever destroy a product, portfolio piece or page of copy.",
        "ownership": "Everything. The repository is on her own GitHub. The database is her own cluster. Every photograph sits in a Cloudflare bucket she controls. Stripe is her account — card payments land in her bank with no intermediary. The domain and hosting are hers. The CMS, the quote builder and the email desk are hers, not a licence or a plugin: standard React, FastAPI and MongoDB, no proprietary anything — if Weavix disappeared tomorrow, the site keeps running and any developer can pick it up. That's precisely the trap we pulled her out of.",
        "replaced": "Platform lock-in on the AI site builder the original was welded to — unhostable anywhere else until we severed the dependency. A Squarespace/Shopify-class monthly subscription plus its booking and gallery add-ons. A separate booking SaaS, now handled natively. And paying a developer per change — every image, price, headline, phone number and whole new landing page is now a field in her admin panel.",
        "closing": "And all of it lives in one place — her own branded operating system, in her name, running her business her way."
    }
]


async def upsert(p: dict):
    now = datetime.now(timezone.utc).isoformat()
    existing = await db.projects.find_one({"slug": p["slug"]}, {"_id": 0})
    if existing:
        patch = dict(p)
        patch["updated_at"] = now
        patch.pop("order", None)  # don't stomp any manual re-ordering already done
        await db.projects.update_one({"slug": p["slug"]}, {"$set": patch})
        return f"UPDATE  {p['slug']}"
    doc = dict(p)
    doc["id"] = str(uuid.uuid4())
    doc["created_at"] = now
    doc["updated_at"] = now
    await db.projects.insert_one(doc)
    return f"INSERT  {p['slug']}"


async def main():
    print(f"Projects before: {await db.projects.count_documents({})}")
    for p in PROJECTS:
        print("  " + await upsert(p))
    print(f"Projects after:  {await db.projects.count_documents({})}")
    print("Done. View/edit any of them at /admin → Projects.")


if __name__ == "__main__":
    asyncio.run(main())
