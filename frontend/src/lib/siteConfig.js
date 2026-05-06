// Central config for easy editing. Swap placeholders with real values later.
export const siteConfig = {
  studioName: "YOUR STUDIO",
  tagline: "We build websites, AI automations & apps — and run the ads and socials that scale them.",
  location: "Remote · Worldwide",
  establishedYear: "2024",
  whatsappNumber: "15551234567", // international format, no +
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
      code: "S/01",
      title: "Website Development",
      tag: "Web",
      copy: "Fast, conversion-focused marketing sites and web apps. Shipped end-to-end — design, build, deploy.",
      deliverables: ["Design system", "Next.js / React build", "CMS & analytics", "Performance audit"],
    },
    {
      code: "S/02",
      title: "AI Automation",
      tag: "AI Ops",
      copy: "Automate repetitive work: lead qualification, data entry, support triage, reporting — tailored to your stack.",
      deliverables: ["Workflow audit", "Agent / pipeline build", "Integrations (CRM, email, Sheets)", "Monitoring"],
    },
    {
      code: "S/03",
      title: "App Development + AI",
      tag: "Apps",
      copy: "Full-stack mobile & web apps with AI built-in — chat, vision, voice, recommendations, forecasting.",
      deliverables: ["Product scoping", "iOS / Android / Web", "LLM & vector infra", "Launch support"],
    },
    {
      code: "S/04",
      title: "Ad Management",
      tag: "Paid",
      copy: "Meta & Google ads with in-house video + image creative. We run the whole funnel: creative, media buying, CRO.",
      deliverables: ["Creative production", "Campaign setup", "Daily optimization", "Weekly reports"],
    },
    {
      code: "S/05",
      title: "Social Media",
      tag: "Organic",
      copy: "Content strategy, posting, community. We sound like your brand — not another agency churning templates.",
      deliverables: ["Content calendar", "Reels / posts", "Community mgmt", "Growth analytics"],
    },
    {
      code: "S/06",
      title: "Creative Studio",
      tag: "Assets",
      copy: "Standalone video and image creatives for ads, launches, and organic — shot, edited, delivered.",
      deliverables: ["Concept & script", "Shoot / motion", "Edit & grade", "Platform cuts"],
    },
  ],
  projects: [
    {
      id: "P-001",
      title: "Northline Ventures",
      client: "Fintech · 2025",
      kind: "Website",
      summary: "Marketing site + investor portal.",
      image:
        "https://images.unsplash.com/photo-1648134859211-4a1b57575f4e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjY2NzN8MHwxfHNlYXJjaHw0fHxtb2Rlcm4lMjB3ZWJzaXRlJTIwbW9ja3VwfGVufDB8fHx8MTc3ODA3ODY2MHww&ixlib=rb-4.1.0&q=85",
      metrics: ["+142% leads", "0.8s LCP"],
    },
    {
      id: "P-002",
      title: "Halden Ops Agent",
      client: "Logistics · 2025",
      kind: "AI Automation",
      summary: "Autonomous agent for invoice reconciliation.",
      image:
        "https://images.unsplash.com/photo-1634084462412-b54873c0a56d?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjY2NzN8MHwxfHNlYXJjaHwyfHxtb2Rlcm4lMjB3ZWJzaXRlJTIwbW9ja3VwfGVufDB8fHx8MTc3ODA3ODY2MHww&ixlib=rb-4.1.0&q=85",
      metrics: ["−87% manual hrs", "4x throughput"],
    },
    {
      id: "P-003",
      title: "Kairo Coach",
      client: "Health app · 2024",
      kind: "App + AI",
      summary: "iOS app with conversational AI coach.",
      image:
        "https://images.pexels.com/photos/8408538/pexels-photo-8408538.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      metrics: ["50k installs", "4.8 ★ rating"],
    },
    {
      id: "P-004",
      title: "Brava Swim — Summer Drop",
      client: "DTC · 2025",
      kind: "Ad Campaign",
      summary: "Full funnel: creatives + Meta & TikTok buys.",
      image:
        "https://images.unsplash.com/photo-1634084462412-b54873c0a56d?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjY2NzN8MHwxfHNlYXJjaHwyfHxtb2Rlcm4lMjB3ZWJzaXRlJTIwbW9ja3VwfGVufDB8fHx8MTc3ODA3ODY2MHww&ixlib=rb-4.1.0&q=85",
      metrics: ["2.6x ROAS", "−34% CPA"],
    },
    {
      id: "P-005",
      title: "Orsino Studio",
      client: "Creative · 2024",
      kind: "Website",
      summary: "Portfolio site with bespoke motion.",
      image:
        "https://images.unsplash.com/photo-1648134859211-4a1b57575f4e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjY2NzN8MHwxfHNlYXJjaHw0fHxtb2Rlcm4lMjB3ZWJzaXRlJTIwbW9ja3VwfGVufDB8fHx8MTc3ODA3ODY2MHww&ixlib=rb-4.1.0&q=85",
      metrics: ["Awwwards HM", "3s avg dwell"],
    },
    {
      id: "P-006",
      title: "Mellow — Social OS",
      client: "Beauty · 2025",
      kind: "Social Media",
      summary: "Content system + community ops.",
      image:
        "https://images.pexels.com/photos/8408538/pexels-photo-8408538.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      metrics: ["+38k followers", "9% engagement"],
    },
  ],
  process: [
    { n: "01", title: "Discover", body: "We audit what you've got, your goals, and where the leverage is. Written brief in 72h." },
    { n: "02", title: "Design", body: "Fast, opinionated design. Less slide-decks, more clickable prototypes and real content." },
    { n: "03", title: "Build", body: "Weekly demo loops. We ship in public to your team so nothing is a surprise at launch." },
    { n: "04", title: "Scale", body: "We run, measure, and iterate — ads, content, automations. Growth doesn't stop at launch." },
  ],
  testimonials: [
    {
      quote:
        "They replaced our old site, built an AI agent to handle inbound, and now run our ads. One partner for the whole stack.",
      name: "Ana Mercado",
      role: "COO, Northline Ventures",
      image:
        "https://images.unsplash.com/photo-1762522926157-bcc04bf0b10a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1MTN8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdCUyMGhlYWRzaG90fGVufDB8fHx8MTc3ODA3ODY2MHww&ixlib=rb-4.1.0&q=85",
    },
    {
      quote:
        "The AI workflow they built cut our ops time by 87%. Payback in under two months. Calm, senior team.",
      name: "Daniel Ohta",
      role: "Founder, Halden",
      image:
        "https://images.unsplash.com/photo-1769636929388-99eff95d3bf1?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1MTN8MHwxfHNlYXJjaHwyfHxwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdCUyMGhlYWRzaG90fGVufDB8fHx8MTc3ODA3ODY2MHww&ixlib=rb-4.1.0&q=85",
    },
    {
      quote:
        "Our launch video did what three agencies before couldn't. ROAS jumped 2.6x in the first month.",
      name: "Priya Nair",
      role: "CMO, Brava Swim",
      image:
        "https://images.pexels.com/photos/32721690/pexels-photo-32721690.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    },
  ],
  faqs: [
    { q: "How do you price projects?", a: "Fixed-scope for websites and apps, retainer for ads, automation and social. We scope in the first call." },
    { q: "What do I need to get started?", a: "A goal and a rough timeline. We handle the rest — brief, design, copy, assets, and build." },
    { q: "Do you work with small businesses?", a: "Yes. We work with founders and small teams who want one partner for web + AI + growth." },
  ],
};

export const waLink = (cfg = siteConfig) =>
  `https://wa.me/${cfg.whatsappNumber}?text=${encodeURIComponent(cfg.whatsappMessage)}`;
