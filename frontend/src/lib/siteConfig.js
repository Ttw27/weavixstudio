// Central config for Your Studio — Playful Neo-Retro edition.
// Edit anything here to swap content site-wide.

export const siteConfig = {
  studioName: "Your Studio",
  tagline:
    "Bespoke digital ecosystems — websites, apps, customer portals, automations and custom AIs — designed as one unified platform around how your business actually runs.",
  location: "Remote · Worldwide",
  establishedYear: "2024",
  whatsappNumber: "15551234567",
  whatsappMessage: "Hi! I'd like to discuss a project.",
  calendlyUrl: "https://calendly.com/your-studio/intro",
  email: "hello@yourstudio.com",
  socials: {
    instagram: "https://instagram.com/yourstudio",
    linkedin: "https://linkedin.com/company/yourstudio",
    x: "https://x.com/yourstudio",
  },

  services: [
    {
      code: "01",
      slug: "digital-ecosystems",
      title: "Digital Ecosystems",
      tag: "Flagship",
      copy: "One unified platform — site, app, portal, integrations, automations, custom AIs — instead of 8 disconnected SaaS subscriptions.",
      deliverables: ["Unified platform", "Customer portal", "Integrations", "Custom AI layer"],
      color: "yellow",
    },
    {
      code: "02",
      slug: "websites",
      title: "Website Development",
      tag: "Web",
      copy: "Fast, conversion-focused sites and web apps. Shipped end-to-end — design, build, deploy.",
      deliverables: ["Design system", "React build", "CMS & analytics", "Speed audit"],
      color: "pink",
    },
    {
      code: "03",
      slug: "app-dev",
      title: "App Dev + AI",
      tag: "Apps",
      copy: "Mobile & web apps with AI built-in — chat, vision, voice, recommendations.",
      deliverables: ["Product scoping", "iOS / Android / Web", "LLM infra", "Launch support"],
      color: "blue",
    },
    {
      code: "04",
      slug: "ai-automation",
      title: "AI Automation",
      tag: "AI Ops",
      copy: "Automate the boring stuff: lead qualification, support triage, reporting, data entry.",
      deliverables: ["Workflow audit", "Agent build", "Integrations", "Monitoring"],
      color: "mint",
    },
    {
      code: "05",
      slug: "custom-ai",
      title: "Custom AI & Prompts",
      tag: "Your AI",
      copy: "Personal AIs and prompt libraries trained on YOUR business — so your team gets perfect outputs without endless prompt-fighting.",
      deliverables: ["Branded GPT", "Prompt library", "Personal AI assistant", "Design-tool AI"],
      color: "lilac",
    },
    {
      code: "06",
      slug: "ad-management",
      title: "Ad Management",
      tag: "Paid",
      copy: "Meta & Google ads with in-house creative. Whole funnel — creative, buying, CRO.",
      deliverables: ["Creative production", "Campaign setup", "Daily optimisation", "Reports"],
      color: "orange",
    },
    {
      code: "07",
      slug: "social-media",
      title: "Social Media",
      tag: "Organic",
      copy: "Content strategy, posting, community. We sound like your brand — not a template.",
      deliverables: ["Content calendar", "Reels / posts", "Community", "Growth analytics"],
      color: "yellow",
    },
    {
      code: "08",
      slug: "creative-studio",
      title: "Creative Studio",
      tag: "Assets",
      copy: "Standalone video & image creatives for ads, launches and organic — shot, edited, delivered.",
      deliverables: ["Concept & script", "Shoot / motion", "Edit & grade", "Platform cuts"],
      color: "blue",
    },
  ],

  // Each project is a website you've built. Add features, tech, results.
  // `preview` controls the look of the card on the portfolio grid.
  projects: [
    {
      id: "northline",
      brand: "Northline.",
      title: "Northline Ventures",
      tagline: "Marketing site + investor portal for a fintech.",
      client: "Fintech",
      year: "2025",
      kind: "Website",
      url: "https://example.com",
      preview: { type: "fintech", bg: "#1a1a1a", fg: "#FFDD4A" },
      summary:
        "A modern marketing site with a gated investor portal. Built for credibility, speed and trust.",
      features: [
        "Custom design system in Figma",
        "Marketing site (10 pages) with CMS",
        "Gated investor portal with magic-link auth",
        "Document vault with audit logs",
        "Newsletter + lead capture wired to HubSpot",
        "Analytics dashboard for the team",
      ],
      tech: ["Next.js", "Tailwind", "Sanity CMS", "Supabase", "Resend", "Vercel"],
      results: [
        { k: "Inbound leads", v: "+142%" },
        { k: "LCP", v: "0.8s" },
        { k: "Time to launch", v: "6 wks" },
      ],
    },
    {
      id: "kairo",
      brand: "Kairo",
      title: "Kairo Health Coach",
      tagline: "iOS app with a conversational AI coach.",
      client: "Health · Wellness",
      year: "2024",
      kind: "App + AI",
      url: "https://example.com",
      preview: { type: "wellness", bg: "#B6E388", fg: "#161616" },
      summary:
        "An AI coach for habit building. Chat-first UX with daily check-ins, goal tracking and streaks.",
      features: [
        "Onboarding quiz + personalised goals",
        "AI chat coach (LLM + memory)",
        "Habit tracker with streaks",
        "Daily push notifications",
        "Apple Health sync",
        "Subscription paywall (RevenueCat)",
      ],
      tech: ["React Native", "Expo", "OpenAI", "Supabase", "RevenueCat"],
      results: [
        { k: "Installs", v: "50k" },
        { k: "App Store rating", v: "4.8 ★" },
        { k: "D30 retention", v: "38%" },
      ],
    },
    {
      id: "brava",
      brand: "Brava",
      title: "Brava Swim",
      tagline: "DTC swimwear — site, ads and creative.",
      client: "DTC E-commerce",
      year: "2025",
      kind: "Website + Ads",
      url: "https://example.com",
      preview: { type: "ecom", bg: "#FF5C8A", fg: "#FFFBF0" },
      summary:
        "Headless Shopify storefront and a full-funnel ad operation. Launched with summer drop.",
      features: [
        "Headless Shopify storefront",
        "Custom product configurator",
        "Editorial lookbook pages",
        "Email & SMS flows (Klaviyo)",
        "Meta + TikTok ad campaigns",
        "10 video creatives produced in-house",
      ],
      tech: ["Next.js", "Shopify Hydrogen", "Klaviyo", "Meta Ads", "TikTok Ads"],
      results: [
        { k: "ROAS", v: "2.6x" },
        { k: "CPA", v: "−34%" },
        { k: "CVR", v: "3.9%" },
      ],
    },
    {
      id: "halden",
      brand: "Halden",
      title: "Halden Ops Agent",
      tagline: "AI agent that reconciles invoices automatically.",
      client: "Logistics",
      year: "2025",
      kind: "AI Automation",
      url: "https://example.com",
      preview: { type: "ai", bg: "#3ABEFF", fg: "#161616" },
      summary:
        "Replaced a manual back-office process with an autonomous agent — saved 87% of operator time.",
      features: [
        "OCR + structured data extraction",
        "Vendor matching with vector search",
        "Anomaly detection & flagging",
        "Slack-native review queue",
        "Weekly reporting to finance",
        "Audit log + rollback",
      ],
      tech: ["Python", "FastAPI", "OpenAI", "Pinecone", "PostgreSQL", "Slack API"],
      results: [
        { k: "Manual hours", v: "−87%" },
        { k: "Throughput", v: "4x" },
        { k: "Payback", v: "8 wks" },
      ],
    },
    {
      id: "orsino",
      brand: "Orsino",
      title: "Orsino Studio",
      tagline: "Portfolio site for a creative studio.",
      client: "Creative",
      year: "2024",
      kind: "Website",
      url: "https://example.com",
      preview: { type: "portfolio", bg: "#FFDD4A", fg: "#161616" },
      summary:
        "A portfolio with bespoke scroll-driven motion and case-study-as-narrative pages.",
      features: [
        "Scroll-driven hero animation",
        "Custom case study template",
        "Project filter & search",
        "Client-only password pages",
        "Blog & journal section",
        "Image-heavy, optimised < 1MB pages",
      ],
      tech: ["Next.js", "Framer Motion", "Sanity CMS", "Cloudinary"],
      results: [
        { k: "Awwwards", v: "Honourable" },
        { k: "Avg dwell", v: "3m 12s" },
        { k: "Pages / session", v: "5.2" },
      ],
    },
    {
      id: "mellow",
      brand: "Mellow",
      title: "Mellow — Social OS",
      tagline: "Content engine + community for a beauty brand.",
      client: "Beauty",
      year: "2025",
      kind: "Social Media",
      url: "https://example.com",
      preview: { type: "social", bg: "#C8A7F2", fg: "#161616" },
      summary:
        "Built a content system that runs the whole social presence — calendar, creative, community.",
      features: [
        "Quarterly content calendar",
        "Reels production (8 / month)",
        "Static posts & carousels (12 / month)",
        "Community management (DMs + comments)",
        "UGC pipeline & creator partnerships",
        "Monthly growth report",
      ],
      tech: ["Notion", "Later", "Figma", "Premiere Pro", "Meta Suite"],
      results: [
        { k: "Followers", v: "+38k" },
        { k: "Engagement", v: "9%" },
        { k: "UGC creators", v: "24" },
      ],
    },
  ],

  process: [
    { n: "01", title: "Discover", body: "We audit what you've got, your goals, and where the leverage is. Written brief in 72h.", color: "yellow" },
    { n: "02", title: "Design", body: "Fast, opinionated design. Less slide-decks, more clickable prototypes and real content.", color: "pink" },
    { n: "03", title: "Build", body: "Weekly demo loops. We ship in public to your team so nothing is a surprise at launch.", color: "blue" },
    { n: "04", title: "Scale", body: "We run, measure and iterate — ads, content, automations. Growth doesn't stop at launch.", color: "mint" },
  ],

  testimonials: [
    {
      quote:
        "They replaced our old site, built an AI agent to handle inbound, and now run our ads. One partner for the whole stack.",
      name: "Ana Mercado",
      role: "COO, Northline",
      image:
        "https://images.unsplash.com/photo-1762522926157-bcc04bf0b10a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1MTN8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdCUyMGhlYWRzaG90fGVufDB8fHx8MTc3ODA3ODY2MHww&ixlib=rb-4.1.0&q=85",
      color: "yellow",
    },
    {
      quote:
        "The AI workflow they built cut our ops time by 87%. Payback in under two months. Calm, senior team.",
      name: "Daniel Ohta",
      role: "Founder, Halden",
      image:
        "https://images.unsplash.com/photo-1769636929388-99eff95d3bf1?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1MTN8MHwxfHNlYXJjaHwyfHxwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdCUyMGhlYWRzaG90fGVufDB8fHx8MTc3ODA3ODY2MHww&ixlib=rb-4.1.0&q=85",
      color: "pink",
    },
    {
      quote:
        "Our launch video did what three agencies before couldn't. ROAS jumped 2.6x in the first month.",
      name: "Priya Nair",
      role: "CMO, Brava Swim",
      image:
        "https://images.pexels.com/photos/32721690/pexels-photo-32721690.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      color: "blue",
    },
  ],

  faqs: [
    { q: "How do you price projects?", a: "Fixed scope for websites and apps, retainer for ads, automation and social. We scope on the first call." },
    { q: "What do I need to get started?", a: "A goal and a rough timeline. We handle the rest — brief, design, copy, assets, build." },
    { q: "Do you work with small businesses?", a: "Yes. We work with founders and small teams who want one partner for web + AI + growth." },
  ],
};

export const waLink = (cfg = siteConfig) =>
  `https://wa.me/${cfg.whatsappNumber}?text=${encodeURIComponent(cfg.whatsappMessage)}`;

// Tailwind-friendly color resolver for `color` keys used above.
export const colorMap = {
  yellow: "var(--p-yellow)",
  pink: "var(--p-pink)",
  blue: "var(--p-blue)",
  mint: "var(--p-mint)",
  lilac: "var(--p-lilac)",
  orange: "var(--p-orange)",
};
