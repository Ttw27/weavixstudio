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

