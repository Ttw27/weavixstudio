# PRD — Your Studio (Marketing / Portfolio Site)

## Original problem statement
"I want a professional website that showcases my websites I have created, simple and also how AI automation can help a business and how we create apps and AI integration to streamline your business, also Ad management or just ad video and image and or social media management"

## User choices
- Goal: Both lead generation + portfolio showcase
- Portfolio: Placeholder projects for now (editable later)
- Contact: WhatsApp + Calendly links only (no contact form)
- Branding: Placeholder "Your Studio" (easy to edit)
- Visual style: Designer's choice → Swiss Brutalist dark theme

## Architecture
- **Frontend**: React (CRA) + Tailwind, framer-motion, react-fast-marquee, lucide-react
- **Backend**: FastAPI (default template, unused by UI) + MongoDB (available but not used)
- **Styling**: index.css with custom brutalist utility classes; Bricolage Grotesque (display) + IBM Plex Mono (body)
- **Content config**: `/app/frontend/src/lib/siteConfig.js` — single file to edit all copy, projects, testimonials, WhatsApp number, Calendly URL, socials

## User personas
- **Prospect** — visits site, scans work, clicks Calendly or WhatsApp to start a conversation
- **Studio owner (user)** — edits siteConfig.js to swap placeholder content for real projects, real WhatsApp #, real Calendly URL

## Core requirements (static)
- Fixed navbar with smooth-scroll to sections
- Hero with massive typography + dual CTAs (Calendly + WhatsApp)
- Kinetic marquee of service tags
- Services grid (6 cards: Web, AI Automation, App Dev, Ad Management, Social Media, Creative Studio)
- Portfolio tetris grid (6 placeholder projects with images + metrics)
- Process section (4 phases, massive outline numbers)
- Testimonials (3 placeholder quotes + headshots)
- Contact section with bold Calendly + WhatsApp CTAs + FAQ (3 Q&A)
- Footer with social links
- Sticky floating WhatsApp button (always visible)
- Fully responsive (1440 / 1024 / 768 / 375 verified)

## What's been implemented — 2025-12-XX
- [x] Design guidelines (Archetype 4: Swiss Brutalist dark)
- [x] Site config with 6 services, 6 projects, 3 testimonials, 4 process steps, 3 FAQs
- [x] All 9 section components + sticky WhatsApp
- [x] Brutalist typography + motion + noise texture + grayscale hover images
- [x] Mobile nav + responsive layout
- [x] testing_agent_v3 frontend pass: 100%

## Prioritized backlog
### P0 (user action required before launch)
- Swap placeholders in `siteConfig.js`: studioName, whatsappNumber (real intl. format), calendlyUrl, email, socials URLs
- Replace 6 placeholder project entries with real case studies (title, client, kind, summary, image, metrics)
- Replace 3 testimonial quotes + names + headshots with real ones
- Consider using 6 unique images (currently 2 Unsplash images reused across projects)

### P1 (nice-to-haves)
- Dedicated case study pages (/work/:id) with deeper narrative
- Simple blog / insights section powered by markdown
- SEO meta tags + Open Graph images per section
- Contact form option (email delivery via Resend) as alternative to WhatsApp
- Analytics (Plausible / GA4) to measure CTA click-through

### P2 (future)
- i18n (multi-language)
- CMS (Sanity / Payload) so studio owner can edit content without code
- Animated cursor / Lenis smooth scroll

## Next tasks list
1. Provide real WhatsApp #, Calendly URL, business name, email
2. Share real project data + case study images
3. Collect testimonials from past clients
4. Pick analytics tool + we wire it up


## 2026-02-15 — Readiness Plan embedded on Contact page
- Extracted the multi-step questionnaire into `frontend/src/components/site/ReadinessForm.jsx` (single shared component).
- `/readiness-plan` continues to host the full standalone page (now using the shared form).
- `/contact` page now renders the existing Contact CTAs (Calendly + WhatsApp + FAQ) **and** embeds the full Readiness Plan questionnaire below — visitors can submit without leaving the page.
- "Other" free-text inputs are now surfaced when the user picks "Something else" for industry / time-drain / interests, plus a free-text field for additional tools. Backend already supported these (`industry_other`, `biggest_time_drain_other`, `interested_in_other`, `current_tools_other`).

## Backlog (open)
- P0: End-to-end test of Admin auth + Settings + SEO flow (testing_agent_v3_fork) — never run after the big Admin rewrite.
- P1: Document & lock down admin password in `/app/memory/test_credentials.md` (currently default `admin`).
- P1: Wire Resend for real lead-notification emails (key managed in Admin).
- P2: Google Ads + Facebook Ads API integrations (keys stored in Admin).
- P2: Replace placeholder portfolio with real projects.
- P3: Optional refactor of `server.py` into routes/ + models/.


## 2026-02-15 — Iteration 12 + 13: Admin E2E, Resend, Mobile sticky CTA
**Fixes shipped + tested (testing_agent_v3_fork iter 12 → 13):**
- Backend Resend refactor: switched from raw httpx to official `resend` SDK with `asyncio.to_thread` per playbook (`/app/backend/server.py:226-262`).
- New backend endpoint `POST /api/admin/test-email` (JWT-protected) lets admins send a one-click test email to verify Resend setup. Returns 400 with friendly message when key/recipient missing.
- New admin setting `resend_from_email` (defaults to `onboarding@resend.dev`, switch to verified-domain sender once configured).
- Frontend: `StickyWhatsApp.jsx` now renders BOTH a yellow "Get my plan" pill (Link to `/readiness-plan`) AND the WhatsApp pill on every page; hidden on `/readiness-plan` and `/contact` so it doesn't duplicate the inline form. Both pills are touch-friendly on mobile.
- Admin login screen copy updated (no longer says "default password is admin" — now seeded with a strong random password from `.env`).
- AdminPage Settings tab gained a "Send test email" button with success/error feedback (data-testid `settings-test-email`).
- `/app/memory/test_credentials.md` now documents the live admin password.
- Bug fixes from iter 12:
  - `Footer.jsx` was reading `siteConfig` directly → now uses `useSiteSettings()` so saved studioName/socials reflect in the footer immediately.
  - `index.html` had a static `<meta name="description">` and stale `<title>` that conflicted with react-helmet-async (two tags in the DOM). Removed both → Helmet is the single source of truth.
  - `SiteSettings.jsx` `mergeWithDefaults(null)` was returning bare `defaultConfig` (no `.seo`) on initial render → now always returns the merged shape, so `settings.seo` is defined from first render.

**Results:** Backend 26/26 pytest pass · Frontend 4/4 retests pass · `retest_needed: False`.



## 2026-02-22 — Iteration 14: Projects CMS + dual-audience messaging
**Shipped:**
- **Backend**: new `projects` MongoDB collection with full CRUD. Endpoints: public `GET /api/projects` (published-only, ordered by featured→order→created), admin `POST/GET/PUT/DELETE /api/admin/projects/{id}` (JWT). Auto-slug from title. Categories endpoints: `GET /api/categories` (9 defaults + custom), `POST/DELETE /api/admin/categories` for custom additions. All in `/app/backend/server.py` lines ~220-400. **45/45 pytest pass.**
- **Admin UI**: new **Projects** tab in `/admin` (`/app/frontend/src/components/admin/ProjectsTab.jsx`). Full project form: title, slug, summary, category dropdown, audience tier, service tags, what_we_did bullets, outcomes bullets, client quote, live URL, image URL, gallery URLs, featured/published toggles, display order. Inline CategoryManager.
- **Public `/work` page** rewired to fetch live CMS projects (`LiveProjects.jsx`). "Fresh start" empty state when CMS is empty.
- **`/work/:slug` detail page** (`ProjectDetailPage.jsx`) with title, summary, hero image, what-we-did, what-changed, gallery, client quote, CTA band.
- **Home auto-swap**: shows real projects when CMS populated, falls back to static Portfolio mockups when empty.
- **Hero copy rewrite**: dual-audience messaging — "saves you time / saves you money / wins you customers" + addresses both AI-novices and AI-savvy users.
- **New `SalesHooks` band** on home with three punchy cards + "are we a fit?" reassurance band.
- **`AudienceTierPicker`** on `/examples`: three tiers (Just starting / Growing / Established) that filter the 33 examples to the audience-appropriate subset.
- **CSS bug fix**: `.card-blunt` and `.sticker` changed from `background:` shorthand to `background-color:` so Tailwind overrides win consistently.

**Backlog (open):**
- 🟢 **P1** — Cloudflare R2 image upload integration (user has keys to share later; for now images are URL pastes).
- 🟢 **P2** — Add the user's 7-8 real live projects content via Admin → Projects (user's task).
- 🟢 **P2** — Resend "thanks, we'll be in touch" confirmation email to the lead themselves.
- 🟢 **P2** — Google Ads + Facebook Ads API live reporting.
- 🟢 **P3** — Optional refactor of `server.py` into routes/ + models/.



## 2026-07-01 — Iteration 15: Examples CMS + Weavix branding
**Shipped:**
- **Examples CMS**: new `examples` collection with full admin CRUD. Endpoints public `GET /api/examples`, admin `POST/GET/PUT/DELETE /api/admin/examples/{id}` (JWT). Startup seed from `seed_examples.json` populates 24 illustrative business examples. **58/58 backend pytest pass.**
- **Admin Examples tab** (`ExamplesTab.jsx`): full form editor — emoji icon, industry, tagline, size, category, tier, colour, before/integrated/ai bullets, quote, results (k/v pairs), order, published. Search + reorder + inline delete.
- **/examples** now fetches from API with static fallback. Tier picker uses DB `_tier` field + static `matches` for safety.
- **Weavix Studio branding**: rename applied to DB settings + siteConfig defaults + index.html title. Logo image in navbar at h-12 md:h-16.
- **Favicons**: 32/180/512/ico sizes generated from cropped W-mark and wired into index.html.
- **Email**: `hello@weavixstudio.com` set in DB + static fallback.
- **CSS fix**: `.card-blunt` moved to `@layer components` so Tailwind `bg-*` utilities override consistently.
- **Home**: 3 CTA cards (Get my plan / Book a chat / Message us).
- **/contact**: readiness form above CTAs, no duplicate Get-my-plan card.
- **Copy**: hero reverted to "so 2018" opening + dual-audience paragraph. SalesHooks says "right now" (removed 2026).

**Deployment status**: PASS · deployment_agent OK · 58/58 backend · 100% frontend · ready to deploy.



## 2026-07-01 — Iteration 16: Business OS repositioning
**Shipped (positioning + content upgrade — no new endpoints):**
- **3 new hero examples** at order 0/1/2 (Florist, Workwear, Business OS design studio) with rich OS-flavored copy: full website + backend + AI spec, 4 metrics each, quotes.
- **24 existing taglines** rewritten via `/app/backend/migrations/reframe_examples_as_os.py` (idempotent).
- **Drawer labels renamed** on `/examples`: BEFORE → "before we started", INTEGRATED → "the operating system we built", AI → "custom AI running quietly".
- **`/examples` hero rewritten**: "What does a business OS actually look like?" — "The website is just the doorway visitors walk through."
- **New `OperatingSystemStrip` component** on home (between AiReady and AiFrustration): 8 capability cards — headline "The operating system is where the money is."
- **Total examples**: 27 (was 24).

**Tests**: 58/58 backend · 100% frontend · zero regressions · deployment_agent PASS.

**Deploy-ready.**

