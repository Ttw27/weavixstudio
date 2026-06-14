// Rich content for each service detail page.
// Goal: give prospects "I need this" moments — ideas they hadn't thought of.

export const servicesContent = {
  "digital-ecosystems": {
    slug: "digital-ecosystems",
    code: "01",
    title: "Digital Ecosystems",
    heroColor: "yellow",
    tagline: "We build the platform — YOU own it. With an expert AI baked in.",
    intro:
      "Bigger than hiring an agency. We design a digital platform that you fully own and can run yourself: every login, dashboard, integration is yours. We then plug an expert AI into your whole stack — quietly analysing, recommending and improving the system as it learns your business. Prefer hands-off at first? We'll drive it for 3–6 months while you learn the controls. Then it's all yours.",
    painPoints: [
      {
        title: "Your tools don't talk to each other",
        body: "Customer info lives in 4 places. Updating an email means logging into 3 tools. Nothing syncs unless you copy-paste.",
      },
      {
        title: "You're paying for 8 SaaS subscriptions",
        body: "Each tool charges per seat. Total spend creeps past £500/month for software you don't fully use.",
      },
      {
        title: "Customers see a patchwork experience",
        body: "Your site feels modern. Then they hit a generic Calendly page, a Stripe email, a Squarespace form. Trust dips at every handoff.",
      },
    ],
    ideas: [
      {
        tag: "portal",
        title: "A branded customer portal that replaces 4 tools",
        body: "Login once: see projects, invoices, files, bookings, support, contracts. Everything on YOUR domain, in YOUR brand. No more 'check your inbox for the link from Acme Software Inc.'",
      },
      {
        tag: "ops",
        title: "A staff dashboard that runs your whole business",
        body: "One screen for your team — clients, leads, tasks, revenue, schedule, AI tools. Instead of 7 browser tabs, one branded HQ that everyone actually uses.",
      },
      {
        tag: "onboarding",
        title: "Automated client onboarding from form to first call",
        body: "Lead form → contract sent → signed → invoice raised → portal access granted → welcome video → calendar invite — all without you touching anything.",
      },
      {
        tag: "mobile",
        title: "A companion mobile app for your service",
        body: "Your customers get push notifications, scan-to-pay, document uploads, AI chat — all in a branded app. Instant credibility upgrade vs. competitors with just a website.",
      },
      {
        tag: "data",
        title: "Live business dashboard for you, the owner",
        body: "Revenue today, leads this week, ops health, ad spend — pulled live from every system and shown in one TV-ready board. Decide in seconds, not after monthly meetings.",
      },
      {
        tag: "ai",
        title: "AI layered across every customer touchpoint",
        body: "Smart search on your site, an AI receptionist on your portal, AI-drafted replies in your inbox, AI summaries on every call. The whole ecosystem gets smarter without your team having to learn another tool.",
      },
      {
        tag: "knowledge",
        title: "A self-service knowledge base your AI runs",
        body: "Customers and staff ask questions in plain English. The AI answers from your real docs, SOPs and history. Cuts inbound tickets by 60%+.",
      },
      {
        tag: "replace",
        title: "Internal tools that replace 3 SaaS subscriptions",
        body: "We rebuild the bits you actually use as one tailored app. Often pays for itself by month 6 in cancelled subscriptions alone.",
      },
    ],
    deliverables: [
      { t: "Discovery & blueprint", b: "We map every tool you use, every customer journey, every data flow. Output: a single architecture diagram of your new platform." },
      { t: "Bespoke site + portal", b: "Marketing front-end + logged-in customer area, designed as one continuous experience." },
      { t: "Staff dashboard", b: "Internal HQ for your team — clients, ops, finance, AI tools." },
      { t: "Integrations & migration", b: "We move data and wire connections to existing tools you're keeping (Stripe, Xero, etc.) and decommission what's redundant." },
      { t: "Custom AI layer", b: "AI agents, smart search and assistants embedded across the platform." },
      { t: "Ongoing care", b: "Monthly retainer for updates, new modules, monitoring." },
    ],
    relatedProjects: ["northline", "halden"],
    faq: [
      { q: "Is this only for big companies?", a: "No — our sweet spot is small businesses doing £200k–£5m where complexity is starting to bite. The smaller you are, the more leverage a unified system gives." },
      { q: "Will it be hard to maintain?", a: "We build on standard stack (Next.js + Postgres + Supabase). Any developer can pick it up later. You're never locked in." },
      { q: "How long?", a: "Phase 1 (site + portal MVP) ships in 8–10 weeks. We then add modules monthly based on impact." },
    ],
  },

  websites: {
    slug: "websites",
    code: "02",
    title: "Website Development",
    heroColor: "pink",
    tagline: "A site you own and can run yourself — with an AI co-pilot built in.",
    intro:
      "A website isn't something you 'pay an agency to keep alive'. It's an asset your team should fully control. We build yours on a stack you can run yourself, with an editor your team will actually use, plus an expert AI that watches traffic, suggests improvements and even drafts A/B test ideas. Want us to drive it for the first 3–6 months while you find your feet? We can. Want to take the keys from day one? Also fine.",
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
      { tag: "lead gen", title: "A quote calculator that qualifies before you speak", body: "Prospects pick 3 options, get an instant range, and only the serious ones land in your inbox — with context." },
      { tag: "trust", title: "A live 'who we're helping right now' section", body: "Pulled from your CRM. Social proof that updates itself and shows you're busy (in a good way)." },
      { tag: "booking", title: "A Calendly-free booking flow built into your site", body: "Prospects pick a slot, answer 3 questions, and arrive on the call already warmed up." },
      { tag: "content", title: "A blog you'll actually post on", body: "One-click publishing from Notion. No CMS training, no 'let me just email the dev'." },
      { tag: "speed", title: "A site that loads in under a second", body: "90+ Lighthouse scores, edge-deployed, image-optimised. Google (and your customers) will notice." },
      { tag: "portal", title: "A private client portal behind the marketing site", body: "Logins, documents, updates, invoices — all branded, all yours, no new SaaS subscription." },
      { tag: "smart", title: "A site that personalises copy by industry", body: "A visitor from a restaurant sees restaurant wording. From a clinic, clinic wording. Same site, 2x conversion." },
      { tag: "ops", title: "Forms that write to Slack + CRM + spreadsheet at once", body: "No more copy-pasting leads. No more missed enquiries. Everyone sees everything in real time." },
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

  "app-dev": {
    slug: "app-dev",
    code: "03",
    title: "App Development + AI",
    heroColor: "blue",
    tagline: "Mobile & web apps where AI isn't a feature — it's the product.",
    intro:
      "The best new apps don't bolt AI on at the end. They're built around it. We design and ship iOS, Android and web apps where the AI does the heavy lifting — chat, vision, voice, recommendations, even acting on your user's behalf. Idea → App Store in 10–14 weeks.",
    painPoints: [
      { title: "You have an idea but no dev team", body: "You've sketched it on napkins. You need someone senior enough to say 'yes, but simpler'." },
      { title: "Your existing app is 'just a dashboard'", body: "Users log in, see numbers, log out. It could be 10x more useful with a little AI." },
      { title: "You're stuck paying SaaS rent forever", body: "Three tools that barely talk to each other. You'd rather own the stack — if only it were affordable." },
    ],
    ideas: [
      { tag: "chat-first", title: "A chat-first app for your niche", body: "Like ChatGPT, but it knows YOUR industry (legal, fitness, real estate) and is wrapped in a clean, branded mobile app. Subscription revenue from day one." },
      { tag: "vision", title: "Point-your-camera apps", body: "Snap a plant → care guide. Snap a meal → calorie count. Snap a wine label → tasting notes + where to buy. Magical UX, 3-week build." },
      { tag: "voice", title: "A voice journaling / coaching app", body: "User talks, AI listens, reflects back patterns, tracks mood, suggests next steps. Habit-forming and perfect for wellness brands." },
      { tag: "agent", title: "An AI agent that does things for users", body: "Books restaurants, negotiates bills, hunts for cheaper insurance, drafts difficult emails. Real actions, not just chat." },
      { tag: "recs", title: "A recommendation engine with taste", body: "Outfit picks, wine pairings, recipe suggestions, content curation — personalised from 10 questions and a photo." },
      { tag: "b2b", title: "An internal tool that replaces 3 SaaS tools", body: "Your ops team's workflow, purpose-built, with AI everywhere it saves time. Pays for itself by month 3." },
      { tag: "marketplace", title: "A niche marketplace with an AI matchmaker", body: "Two sides of a market (freelancers ↔ clients, tutors ↔ students, etc.) matched by AI instead of a search bar." },
      { tag: "community", title: "A community app with an AI concierge", body: "Members ask the AI 'who should I meet?' or 'what events match me?' — it knows everyone in the community." },
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

  "ai-automation": {
    slug: "ai-automation",
    code: "04",
    title: "AI Automation",
    heroColor: "mint",
    tagline: "Automations on YOUR infrastructure — no black box.",
    intro:
      "Other people will sell you 'AI automation' that runs on their servers, in their accounts, using their prompts — and the moment you leave, it all leaves with them. We build YOUR automations on YOUR infrastructure. You see every workflow, every prompt, every cost. We add an oversight AI that audits the automations themselves — flagging drift, edge cases and new savings. We can monitor it for the first 3–6 months while you learn it. Then it's yours to keep.",
    painPoints: [
      { title: "You're drowning in inbound", body: "Half your day is replying to the same 10 questions. Good leads get lost in the noise." },
      { title: "Your team copy-pastes for a living", body: "Same info, 4 different tools, every day. You know it's daft. You don't have time to fix it." },
      { title: "You don't know what's actually happening", body: "Reports live in three heads. By the time you pull a number, it's already stale." },
    ],
    ideas: [
      { tag: "inbound", title: "An AI that qualifies every lead overnight", body: "Reads their email, checks their website, scores them 0-100, drafts a personal reply, and books warm ones to Calendly — while you sleep." },
      { tag: "support", title: "A support agent that handles 70% of tickets", body: "Trained on your docs, answers in your tone of voice, hands off gracefully when it's not sure. Available 24/7." },
      { tag: "back-office", title: "Invoice & receipt auto-reconciliation", body: "Forwarded receipts get parsed, matched to vendors, categorised, and posted to Xero/QuickBooks. Saves one finance hire." },
      { tag: "meetings", title: "Calls that summarise themselves", body: "Every Zoom/Meet call auto-transcribed, summarised, action-items posted to Slack, CRM updated." },
      { tag: "sales", title: "AI-drafted follow-ups with your voice", body: "After every call, a draft follow-up email appears in your outbox — referencing what was actually said. You hit send." },
      { tag: "content", title: "A content multiplier", body: "Feed it one podcast / video / long-form post. Out comes 5 reels scripts, 10 tweets, 3 emails, a blog post. All in your voice." },
      { tag: "monitoring", title: "Competitor & review watchdog", body: "Pings you the second a competitor changes pricing, drops a feature, or a review mentions your brand. Nothing missed." },
      { tag: "hiring", title: "Resume screener that actually screens", body: "500 applicants? An AI ranks them against your ideal profile, surfaces the top 20, and drafts intro emails." },
      { tag: "reporting", title: "A weekly AI report that writes itself", body: "Every Monday, a plain-English summary of your KPIs lands in your inbox. No dashboards needed." },
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
      { q: "What about data privacy?", a: "We default to private deployments. No training on your data, ever." },
      { q: "What does it cost to run?", a: "Typically $50–$500/month in API costs. Payback is usually < 8 weeks." },
    ],
  },

  "custom-ai": {
    slug: "custom-ai",
    code: "05",
    title: "Custom AI & Prompts",
    heroColor: "lilac",
    tagline: "Your AI tools. Your prompts. Your data. We even keep tuning them.",
    intro:
      "The prompts are yours. The data stays yours. We train custom GPTs on YOUR knowledge, give your team a one-click prompt library, and bake in an expert 'AI ops' agent that watches usage and re-tunes prompts as your business evolves. We can run AI operations for 3–6 months while everyone gets confident — or just deliver the kit and step back. Either way, you never lose access or ownership.",
    painPoints: [
      {
        title: "ChatGPT keeps giving generic answers",
        body: "You re-explain your business every conversation. Outputs sound nothing like you. Half the time you give up and write it yourself.",
      },
      {
        title: "Your team doesn't know what to ask AI",
        body: "Some people use it daily, some never. There's no shared playbook. The leverage is uneven.",
      },
      {
        title: "Design tools burn through credits",
        body: "Midjourney, DALL·E, Sora — you pay per attempt and most attempts are wrong. Hundreds of dollars on outputs you don't use.",
      },
    ],
    ideas: [
      {
        tag: "branded-gpt",
        title: "A branded custom GPT trained on your business",
        body: "Knows your products, your tone, your pricing, your processes. Your team (or your CUSTOMERS) chat with it like ChatGPT — but it always answers in your voice and references real facts about you.",
      },
      {
        tag: "prompt-library",
        title: "A one-click prompt library for your team",
        body: "A shared workspace with 50+ pre-engineered prompts: 'write a proposal', 'summarise this call', 'reply to a complaint', 'draft a social post'. Click, fill 2 blanks, perfect output. No prompt engineering needed.",
      },
      {
        tag: "personal-ai",
        title: "A personal AI assistant for the founder",
        body: "Knows your calendar, your inbox, your priorities, your writing style. Drafts emails, summarises Slack, prepares for meetings, remembers what matters to you. Like a chief of staff that never sleeps.",
      },
      {
        tag: "design-ai",
        title: "Design-tool AI that gets it right first time",
        body: "Custom prompt templates for Midjourney, Nano Banana, Sora — pre-loaded with your brand colours, style, aspect ratios. Type 'product shot of new earrings on marble' — get a usable image in one try, not twenty.",
      },
      {
        tag: "website-ai",
        title: "An AI assistant on your website",
        body: "Visitors ask questions in plain English: 'how much for X?', 'do you ship to Y?', 'book me for Tuesday'. It answers from your real info and books warm leads to your calendar.",
      },
      {
        tag: "ask-anything",
        title: "An 'ask anything' agent for your team",
        body: "Plug it into your Drive, Notion, Slack history, SharePoint. Anyone can ask 'what did we agree with that client last quarter?' or 'what's our return policy for EU customers?' and get an instant, sourced answer.",
      },
      {
        tag: "voice",
        title: "A voice clone of you for emails and content",
        body: "We train a private model on your past writing. Your team drafts in YOUR voice without you. Editorial consistency at scale.",
      },
      {
        tag: "sop-agent",
        title: "Your SOPs as living AI agents",
        body: "Instead of staff reading a 40-page handbook, they chat with it. The AI walks them through onboarding a client, handling a refund, or escalating a problem — in their workflow, not a PDF.",
      },
      {
        tag: "training",
        title: "A 90-minute team training on practical AI",
        body: "We sit with your team and teach them how to actually use the tools — with the prompts we built for your business. ROI lands the same week.",
      },
    ],
    deliverables: [
      { t: "AI discovery", b: "Half-day to find where AI saves real time: writing, design, support, sales, ops, content." },
      { t: "Custom GPT(s)", b: "Built on OpenAI or Claude — branded, private, trained on your knowledge." },
      { t: "Prompt library", b: "Notion or branded webapp with 30–80 pre-built, one-click prompts." },
      { t: "Personal AI / assistant", b: "Voice-cloned, calendar-aware, inbox-aware. For founders or key roles." },
      { t: "Design-tool playbooks", b: "Saved prompts for Midjourney / Nano Banana / Sora with your brand baked in." },
      { t: "Team training", b: "Live workshop + recorded SOPs + Slack support for 30 days." },
    ],
    relatedProjects: ["halden", "kairo"],
    faq: [
      { q: "Is my data safe?", a: "Yes. We use private deployments and ChatGPT Enterprise / Claude Pro / Azure OpenAI for sensitive data. Nothing trains the public models." },
      { q: "What if I already use ChatGPT?", a: "Perfect — we layer on top. Your team keeps the tool they know; we make it 10x more useful." },
      { q: "How much?", a: "Starter packages from £2k (prompt library + 1 custom GPT + training). Full ecosystem builds vary. We scope after a 30-min call." },
    ],
  },

  "ad-management": {
    slug: "ad-management",
    code: "06",
    title: "Ad Management",
    heroColor: "orange",
    tagline: "Ads on YOUR accounts — full transparency, plus an AI strategist watching 24/7.",
    intro:
      "Most agencies run your campaigns from THEIR ad accounts. You can't see what's happening, you don't own the data, and the day you leave — they keep everything. We don't do that. We plug straight into YOUR Meta, Google and TikTok accounts, build a dashboard so you see every penny, and bake in an expert AI that watches your campaigns 24/7 and tells you (or implements) what to change. We can run the whole thing for the first 3–6 months while you learn the ropes — but you own everything from day one.",
    painPoints: [
      { title: "Your ads stopped working", body: "ROAS used to be 3x. Now it's 1.2x and Meta keeps asking for more budget." },
      { title: "Your creative is the bottleneck", body: "You have the budget. You don't have 15 fresh videos a month. The algorithm is starving." },
      { title: "You don't trust your agency", body: "Reports are vague, tests are slow, nobody explains why spend went up and sales went down." },
    ],
    ideas: [
      { tag: "creative", title: "A fresh video ad every 48 hours", body: "We shoot a library of raw content once, then edit 3–4 new variants per week. The algorithm never gets bored." },
      { tag: "ugc", title: "AI-generated UGC-style creatives", body: "A synthetic 'customer' holding your product, talking to camera. Yes, it's fake. Yes, it converts. Compliance-safe." },
      { tag: "funnel", title: "A 3-step warm-up funnel", body: "Cold audience sees a story ad → retargeted with a demo → hit with an offer. 10x cheaper than cold → offer." },
      { tag: "test", title: "Systematic creative testing", body: "Hook → visual → CTA, tested as separate variables. We find what actually moves the needle." },
      { tag: "search", title: "Intent capture on Google", body: "Your best prospects are typing something right now. Performance Max + smart negative keywords = cheap, hot leads." },
      { tag: "report", title: "A weekly human report in plain English", body: "What we spent, what worked, what we're testing next. No dashboards you won't read." },
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
    code: "07",
    title: "Social Media",
    heroColor: "yellow",
    tagline: "A content system YOU run, with an expert AI watching what works.",
    intro:
      "Most agencies post to YOUR feed from THEIR scheduling tool — you can't see the calendar, the analytics, or what's planned next week. We give you a content system on YOUR side: planning, drafting, scheduling, analytics all in one branded dashboard. Plus an expert AI that watches performance and suggests (or drafts) the next moves automatically. We can manage it for 3–6 months while you find your rhythm, or just set it up and hand it over.",
    painPoints: [
      { title: "Posting feels like a chore", body: "You know it matters. You don't have time. You're 4 weeks behind on your calendar." },
      { title: "Your content sounds like everyone else", body: "Stock photos, generic quotes, zero point of view. Nothing anyone would screenshot." },
      { title: "You don't see any business impact", body: "Followers don't pay bills. You're tired of posting into a void." },
    ],
    ideas: [
      { tag: "reels", title: "A reels engine that doesn't burn you out", body: "One 2-hour shoot every 4 weeks = 8–12 reels. Scripted, edited, captioned, scheduled. You show up, we handle the rest." },
      { tag: "thought", title: "Thought leadership for founders who hate writing", body: "We interview you for 30 mins weekly. That's 20 posts, 2 newsletters and 10 reel scripts. In your voice, from your brain." },
      { tag: "ugc", title: "A creator network feeding your feed", body: "We source, brief and coordinate 5–15 micro-creators per month. Their reach, your brand, their authenticity." },
      { tag: "community", title: "A community that waits for your posts", body: "DM replies, comment conversations, polls and behind-the-scenes. Not megaphone — dialogue." },
      { tag: "launch", title: "A launch cascade for every drop", body: "Tease, reveal, drop, recap — synchronised across Instagram, TikTok, email and paid." },
      { tag: "b2b", title: "LinkedIn as a lead machine", body: "Personal brand posts for founders + company page + DM outreach. B2B inbound without being cringe." },
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
    code: "08",
    title: "Creative Studio",
    heroColor: "blue",
    tagline: "Your brand kit, your edit projects, your AI that drafts new variants on demand.",
    intro:
      "You'll never need to wait for 'your agency' to release the files. Everything we make lands in YOUR folders, YOUR brand kit, YOUR edit projects — straight away. We add an expert creative AI that learns your style and drafts new variants whenever you need them. Shoots, edits and motion on retainer for 3–6 months if you want — or just set up the system and your team takes over from there.",
    painPoints: [
      { title: "Your assets look stitched together", body: "Stock photos + cousin's iPhone + DIY Canva. The inconsistency is bleeding trust." },
      { title: "You need variants yesterday", body: "The ad works at 9:16 but not at 1:1, and the edit house takes 2 weeks." },
      { title: "You have no visual system", body: "Every piece of content is a coin-flip. Beautiful or ugly, who knows." },
    ],
    ideas: [
      { tag: "launch", title: "A 60-second launch film", body: "The hero video for your product page, your biggest ad, your investor deck. One shoot, infinite cuts." },
      { tag: "ad-variants", title: "15 ad creatives from one shoot", body: "Shoot once, edit forever. Hooks, CTAs, proof points — varied to feed the algorithm." },
      { tag: "product", title: "Product photography that doesn't scream 'stock'", body: "Lifestyle, studio, flat-lay, moving product." },
      { tag: "motion", title: "Explainer animation", body: "2D motion graphic explaining how your product works — perfect for landing pages and onboarding." },
      { tag: "podcast", title: "Podcast clips, done for you", body: "You record. We extract 10 reels, a trailer, and a YouTube chapter mark-up from every episode." },
      { tag: "system", title: "A reusable visual system", body: "LUTs, fonts, templates, sound design. Everyone on your team can make on-brand content in 5 minutes." },
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
