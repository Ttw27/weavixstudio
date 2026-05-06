// Rich content for each service detail page.
// Goal: give prospects "I need this" moments — ideas they hadn't thought of.

export const servicesContent = {
  websites: {
    slug: "websites",
    code: "01",
    title: "Website Development",
    heroColor: "yellow",
    tagline: "A site that actually converts — not just a pretty brochure.",
    intro:
      "Most small-business sites leak money. They load slow, read like a template, and give prospects zero reason to pick up the phone. We build sites that look sharp AND pull their weight — fast, measurable, and easy for your team to update.",
    painPoints: [
      {
        title: "Your site is embarrassing to share",
        body: "It looks dated, reads like everyone else's, and the DIY builder has stopped impressing anyone.",
      },
      {
        title: "You have no idea where leads come from",
        body: "No tracking, no analytics, no lead-scoring. Marketing feels like guesswork.",
      },
      {
        title: "You can't update it yourself",
        body: "Every copy tweak needs a developer, a Slack message, and a three-day wait.",
      },
    ],
    ideas: [
      {
        tag: "lead gen",
        title: "A quote calculator that qualifies before you speak",
        body: "Prospects pick 3 options, get an instant range, and only the serious ones land in your inbox — with context.",
      },
      {
        tag: "trust",
        title: "A live 'who we're helping right now' section",
        body: "Pulled from your CRM. Social proof that updates itself and shows you're busy (in a good way).",
      },
      {
        tag: "booking",
        title: "A Calendly-free booking flow built into your site",
        body: "Prospects pick a slot, answer 3 questions, and arrive on the call already warmed up.",
      },
      {
        tag: "content",
        title: "A blog you'll actually post on",
        body: "One-click publishing from Notion. No CMS training, no 'let me just email the dev'.",
      },
      {
        tag: "speed",
        title: "A site that loads in under a second",
        body: "90+ Lighthouse scores, edge-deployed, image-optimised. Google (and your customers) will notice.",
      },
      {
        tag: "portal",
        title: "A private client portal behind the marketing site",
        body: "Logins, documents, updates, invoices — all branded, all yours, no new SaaS subscription.",
      },
      {
        tag: "smart",
        title: "A site that personalises copy by industry",
        body: "A visitor from a restaurant sees restaurant wording. From a clinic, clinic wording. Same site, 2x conversion.",
      },
      {
        tag: "ops",
        title: "Forms that write to Slack + CRM + spreadsheet at once",
        body: "No more copy-pasting leads. No more missed enquiries. Everyone sees everything in real time.",
      },
    ],
    deliverables: [
      { t: "Design system", b: "Reusable tokens, components, pages — so your site stays consistent as it grows." },
      { t: "Next.js / React build", b: "Modern stack, fast, SEO-ready, future-proof." },
      { t: "CMS you'll use", b: "Sanity or Notion-powered — edit copy like you edit a doc." },
      { t: "Analytics + heat-maps", b: "Plausible or GA4 + Hotjar. Know exactly what's working." },
      { t: "Lead routing", b: "Forms → CRM → Slack → email. One submission, everywhere it needs to be." },
      { t: "90+ Lighthouse", b: "Performance, SEO and accessibility audited before we ship." },
    ],
    relatedProjects: ["northline", "orsino"],
    faq: [
      { q: "How long does a site take?", a: "Most marketing sites ship in 4–6 weeks. Web apps: 8–12 weeks depending on scope." },
      { q: "Do you do ongoing updates?", a: "Yes — flat monthly retainer for copy changes, new pages, A/B tests and maintenance." },
    ],
  },

  "ai-automation": {
    slug: "ai-automation",
    code: "02",
    title: "AI Automation",
    heroColor: "pink",
    tagline: "Give your team back 20 hours a week. Seriously.",
    intro:
      "Every business has invisible tasks that eat hours: chasing emails, copying data between tools, summarising calls, qualifying leads. AI is now cheap enough and good enough to do most of them better than a junior staff member — and never takes a sick day. We find the boring work, wrap AI around it, and ship it into your existing tools.",
    painPoints: [
      {
        title: "You're drowning in inbound",
        body: "Half your day is replying to the same 10 questions. Good leads get lost in the noise.",
      },
      {
        title: "Your team copy-pastes for a living",
        body: "Same info, 4 different tools, every day. You know it's daft. You don't have time to fix it.",
      },
      {
        title: "You don't know what's actually happening",
        body: "Reports live in three heads. By the time you pull a number, it's already stale.",
      },
    ],
    ideas: [
      {
        tag: "inbound",
        title: "An AI that qualifies every lead overnight",
        body: "Reads their email, checks their website, scores them 0-100, drafts a personal reply, and books warm ones to Calendly — while you sleep.",
      },
      {
        tag: "support",
        title: "A support agent that handles 70% of tickets",
        body: "Trained on your docs, answers in your tone of voice, hands off gracefully when it's not sure. Available 24/7.",
      },
      {
        tag: "back-office",
        title: "Invoice & receipt auto-reconciliation",
        body: "Forwarded receipts get parsed, matched to vendors, categorised, and posted to Xero/QuickBooks. Saves one finance hire.",
      },
      {
        tag: "meetings",
        title: "Calls that summarise themselves",
        body: "Every Zoom/Meet call auto-transcribed, summarised, action-items posted to Slack, CRM updated. No more 'who was going to send that?'",
      },
      {
        tag: "sales",
        title: "AI-drafted follow-ups with your voice",
        body: "After every call, a draft follow-up email appears in your outbox — referencing what was actually said. You hit send.",
      },
      {
        tag: "content",
        title: "A content multiplier",
        body: "Feed it one podcast / video / long-form post. Out comes 5 reels scripts, 10 tweets, 3 emails, a blog post. All in your voice.",
      },
      {
        tag: "monitoring",
        title: "Competitor & review watchdog",
        body: "Pings you the second a competitor changes pricing, drops a feature, or a review mentions your brand. Nothing missed.",
      },
      {
        tag: "hiring",
        title: "Resume screener that actually screens",
        body: "500 applicants? An AI ranks them against your ideal profile, surfaces the top 20, and drafts intro emails.",
      },
      {
        tag: "reporting",
        title: "A weekly AI report that writes itself",
        body: "Every Monday, a plain-English summary of your KPIs (revenue, leads, spend, reviews) lands in your inbox. No dashboards needed.",
      },
    ],
    deliverables: [
      { t: "Workflow audit", b: "Half-day with your team. We map every repetitive task and rank by leverage." },
      { t: "Agent / pipeline build", b: "Custom LLM agents or deterministic pipelines — we pick the right tool per job." },
      { t: "Integrations", b: "CRM (HubSpot/Pipedrive), Slack, email, Sheets, Notion, your custom DB." },
      { t: "Guardrails & approvals", b: "Human-in-the-loop where it matters. Auto-pilot where it doesn't." },
      { t: "Monitoring dashboard", b: "See exactly what the AI did, what it escalated, what it cost." },
      { t: "Training for your team", b: "So you own it, not us." },
    ],
    relatedProjects: ["halden"],
    faq: [
      { q: "Will it replace my staff?", a: "No — it amplifies them. Our clients usually redeploy people to higher-value work, not let them go." },
      { q: "What about data privacy?", a: "We default to private deployments (your cloud or a dedicated tenant). No training on your data, ever." },
      { q: "What does it cost to run?", a: "Typically $50–$500/month in API costs for most SMB use cases. Payback is usually < 8 weeks." },
    ],
  },

  "app-dev": {
    slug: "app-dev",
    code: "03",
    title: "App Development + AI",
    heroColor: "blue",
    tagline: "Mobile & web apps where AI isn't a feature — it's the product.",
    intro:
      "The best new apps don't bolt AI on at the end. They're built around it. We design and ship iOS, Android and web apps where the AI does the heavy lifting — chat, vision, voice, recommendations, even acting on your user's behalf. Idea → App Store in 10–14 weeks.",
    painPoints: [
      {
        title: "You have an idea but no dev team",
        body: "You've sketched it on napkins. You need someone senior enough to say 'yes, but simpler'.",
      },
      {
        title: "Your existing app is 'just a dashboard'",
        body: "Users log in, see numbers, log out. It could be 10x more useful with a little AI.",
      },
      {
        title: "You're stuck paying SaaS rent forever",
        body: "Three tools that barely talk to each other. You'd rather own the stack — if only it were affordable.",
      },
    ],
    ideas: [
      {
        tag: "chat-first",
        title: "A chat-first app for your niche",
        body: "Like ChatGPT, but it knows YOUR industry (legal, fitness, real estate) and is wrapped in a clean, branded mobile app. Subscription revenue from day one.",
      },
      {
        tag: "vision",
        title: "Point-your-camera apps",
        body: "Snap a plant → care guide. Snap a meal → calorie count. Snap a wine label → tasting notes + where to buy. Magical UX, 3-week build.",
      },
      {
        tag: "voice",
        title: "A voice journaling / coaching app",
        body: "User talks, AI listens, reflects back patterns, tracks mood, suggests next steps. Habit-forming and perfect for wellness brands.",
      },
      {
        tag: "agent",
        title: "An AI agent that does things for users",
        body: "Books restaurants, negotiates bills, hunts for cheaper insurance, drafts difficult emails. Real actions, not just chat.",
      },
      {
        tag: "recs",
        title: "A recommendation engine with taste",
        body: "Outfit picks, wine pairings, recipe suggestions, content curation — personalised from 10 questions and a photo.",
      },
      {
        tag: "b2b",
        title: "An internal tool that replaces 3 SaaS tools",
        body: "Your ops team's workflow, purpose-built, with AI everywhere it saves time. Pays for itself by month 3.",
      },
      {
        tag: "marketplace",
        title: "A niche marketplace with an AI matchmaker",
        body: "Two sides of a market (freelancers ↔ clients, tutors ↔ students, etc.) matched by AI instead of a search bar.",
      },
      {
        tag: "community",
        title: "A community app with an AI concierge",
        body: "Members ask the AI 'who should I meet?' or 'what events match me?' — it knows everyone in the community.",
      },
    ],
    deliverables: [
      { t: "Product scoping", b: "2-week sprint to pin down MVP, user journeys, monetisation." },
      { t: "Design in Figma", b: "Clickable prototype before we write code. Test with real users first." },
      { t: "iOS / Android / Web", b: "React Native for mobile, Next.js for web. One codebase where possible." },
      { t: "LLM + vector infra", b: "OpenAI / Anthropic / local models. Pinecone/Supabase for memory. We pick per use case." },
      { t: "Subscriptions & payments", b: "RevenueCat, Stripe, App Store / Play billing — configured and tested." },
      { t: "Launch support", b: "ASO, App Store review, analytics, first-30-day growth plan." },
    ],
    relatedProjects: ["kairo"],
    faq: [
      { q: "How much does an app cost?", a: "MVP mobile apps typically $20–60k. Web apps slightly less. We scope fixed-price after the discovery sprint." },
      { q: "Who owns the code?", a: "You do. 100%. Private GitHub repo handed over, no lock-in." },
    ],
  },

  "ad-management": {
    slug: "ad-management",
    code: "04",
    title: "Ad Management",
    heroColor: "mint",
    tagline: "Ads that pay for themselves — creative, buying, and CRO under one roof.",
    intro:
      "Most agencies either make ads OR buy media. We do both, so we can kill bad creative fast and double-down on winners without a three-way email chain. Meta, Google, TikTok, YouTube — we run the whole funnel and show you the numbers every week.",
    painPoints: [
      {
        title: "Your ads stopped working",
        body: "ROAS used to be 3x. Now it's 1.2x and Meta keeps asking for more budget.",
      },
      {
        title: "Your creative is the bottleneck",
        body: "You have the budget. You don't have 15 fresh videos a month. The algorithm is starving.",
      },
      {
        title: "You don't trust your agency",
        body: "Reports are vague, tests are slow, nobody explains why spend went up and sales went down.",
      },
    ],
    ideas: [
      {
        tag: "creative",
        title: "A fresh video ad every 48 hours",
        body: "We shoot a library of raw content once, then edit 3–4 new variants per week. The algorithm never gets bored.",
      },
      {
        tag: "ugc",
        title: "AI-generated UGC-style creatives",
        body: "A synthetic 'customer' holding your product, talking to camera. Yes, it's fake. Yes, it converts. Compliance-safe.",
      },
      {
        tag: "funnel",
        title: "A 3-step warm-up funnel",
        body: "Cold audience sees a story ad → retargeted with a demo → hit with an offer. 10x cheaper than cold → offer.",
      },
      {
        tag: "test",
        title: "Systematic creative testing",
        body: "Hook → visual → CTA, tested as separate variables. We find what actually moves the needle, not just what 'looks cool'.",
      },
      {
        tag: "search",
        title: "Intent capture on Google",
        body: "Your best prospects are typing something right now. Performance Max + smart negative keywords = cheap, hot leads.",
      },
      {
        tag: "report",
        title: "A weekly human report in plain English",
        body: "What we spent, what worked, what we're testing next. No dashboards you won't read.",
      },
    ],
    deliverables: [
      { t: "Creative production", b: "Video + image ads shot, edited, graded in-house. 12–20 fresh assets / month." },
      { t: "Campaign setup", b: "Audiences, placements, bid strategies, pixel + conversions API wired properly." },
      { t: "Daily optimisation", b: "Real-time budget shifts to winners. Losers killed within 48h." },
      { t: "Landing page CRO", b: "A/B tests on your ad LPs. Turning traffic into revenue, not just clicks." },
      { t: "Reporting", b: "Weekly written report + monthly strategy call." },
    ],
    relatedProjects: ["brava"],
    faq: [
      { q: "Minimum ad spend?", a: "We work best with $5k+/month in media spend. Below that we recommend organic first." },
      { q: "How's pricing?", a: "Flat monthly retainer for management + creative. No % of spend games." },
    ],
  },

  "social-media": {
    slug: "social-media",
    code: "05",
    title: "Social Media",
    heroColor: "lilac",
    tagline: "Content that actually sounds like you — not another template mill.",
    intro:
      "Most agencies will post generic 'Monday motivation' to your feed and call it strategy. We build a content engine around your actual voice, your actual customers, and your actual business goals. Reels, posts, community, UGC — the whole system.",
    painPoints: [
      {
        title: "Posting feels like a chore",
        body: "You know it matters. You don't have time. You're 4 weeks behind on your calendar.",
      },
      {
        title: "Your content sounds like everyone else",
        body: "Stock photos, generic quotes, zero point of view. Nothing anyone would screenshot.",
      },
      {
        title: "You don't see any business impact",
        body: "Followers don't pay bills. You're tired of posting into a void.",
      },
    ],
    ideas: [
      {
        tag: "reels",
        title: "A reels engine that doesn't burn you out",
        body: "One 2-hour shoot every 4 weeks = 8–12 reels. Scripted, edited, captioned, scheduled. You show up, we handle the rest.",
      },
      {
        tag: "thought",
        title: "Thought leadership for founders who hate writing",
        body: "We interview you for 30 mins weekly. That's 20 posts, 2 newsletters and 10 reel scripts. In your voice, from your brain.",
      },
      {
        tag: "ugc",
        title: "A creator network feeding your feed",
        body: "We source, brief and coordinate 5–15 micro-creators per month. Their reach, your brand, their authenticity.",
      },
      {
        tag: "community",
        title: "A community that waits for your posts",
        body: "DM replies, comment conversations, polls and behind-the-scenes. Not megaphone — dialogue.",
      },
      {
        tag: "launch",
        title: "A launch cascade for every drop",
        body: "Tease, reveal, drop, recap — synchronised across Instagram, TikTok, email and paid. Nothing falls flat.",
      },
      {
        tag: "b2b",
        title: "LinkedIn as a lead machine",
        body: "Personal brand posts for founders + company page + DM outreach. B2B inbound without being cringe.",
      },
    ],
    deliverables: [
      { t: "Content strategy", b: "Pillars, cadence, voice guide. The 'why' behind every post." },
      { t: "Monthly calendar", b: "30–60 posts planned, scripted, designed, scheduled." },
      { t: "Reels production", b: "8–12/month, shot at our studio or remotely with your phone kit." },
      { t: "Community management", b: "DMs, comments, replies — done with care, in your voice." },
      { t: "Growth report", b: "Monthly: what's working, what's next, what we're killing." },
    ],
    relatedProjects: ["mellow"],
    faq: [
      { q: "Will it sound like me?", a: "Yes — that's the whole point. We'll do a 90-min voice workshop before the first post goes live." },
      { q: "Is there a minimum contract?", a: "3 months minimum. Social needs time to find its rhythm." },
    ],
  },

  "creative-studio": {
    slug: "creative-studio",
    code: "06",
    title: "Creative Studio",
    heroColor: "orange",
    tagline: "Video, photo, motion — made for the feed, the ad, the hero section.",
    intro:
      "Need a launch film? Product photography? 15 ad variants by Friday? We run an in-house creative team that ships at advertising speed. Concept, script, shoot, edit, grade, cutdowns. Every format you need, from one team.",
    painPoints: [
      {
        title: "Your assets look stitched together",
        body: "Stock photos + cousin's iPhone + DIY Canva. The inconsistency is bleeding trust.",
      },
      {
        title: "You need variants yesterday",
        body: "The ad works at 9:16 but not at 1:1, and the edit house takes 2 weeks.",
      },
      {
        title: "You have no visual system",
        body: "Every piece of content is a coin-flip. Beautiful or ugly, who knows.",
      },
    ],
    ideas: [
      {
        tag: "launch",
        title: "A 60-second launch film",
        body: "The hero video for your product page, your biggest ad, your investor deck. One shoot, infinite cuts.",
      },
      {
        tag: "ad-variants",
        title: "15 ad creatives from one shoot",
        body: "Shoot once, edit forever. Hooks, CTAs, proof points — varied to feed the algorithm.",
      },
      {
        tag: "product",
        title: "Product photography that doesn't scream 'stock'",
        body: "Lifestyle, studio, flat-lay, moving product. Mixed into your feed so it flows naturally.",
      },
      {
        tag: "motion",
        title: "Explainer animation",
        body: "2D motion graphic explaining how your product works — perfect for landing pages and onboarding.",
      },
      {
        tag: "podcast",
        title: "Podcast clips, done for you",
        body: "You record. We extract 10 reels, a trailer, and a YouTube chapter mark-up from every episode.",
      },
      {
        tag: "system",
        title: "A reusable visual system",
        body: "LUTs, fonts, templates, sound design. Everyone on your team can make on-brand content in 5 minutes." },
    ],
    deliverables: [
      { t: "Concept & script", b: "Treatments, storyboards, shot lists. Nothing random on set." },
      { t: "Shoot / motion", b: "Video, photo, and motion graphics — in-house crew or on location." },
      { t: "Edit & grade", b: "Cuts for every format. Colour, sound, captions." },
      { t: "Platform cuts", b: "9:16, 1:1, 16:9, 4:5 — all delivered, properly cropped." },
      { t: "Brand kit", b: "Fonts, LUTs, lower-thirds, sound beds. Your team can self-serve after." },
    ],
    relatedProjects: ["brava", "mellow"],
    faq: [
      { q: "Can you travel to shoot?", a: "Yes — we cover travel + crew from the project budget, agreed upfront." },
      { q: "Turnaround?", a: "Typical shoot → first cut is 5 business days. Rush is possible." },
    ],
  },
};
