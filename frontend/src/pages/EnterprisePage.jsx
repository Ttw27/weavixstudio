import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Plug, LayoutDashboard, LineChart, Bot, ShieldCheck, Layers, Boxes } from "lucide-react";
import Navbar from "../components/site/Navbar";
import Footer from "../components/site/Footer";
import StickyWhatsApp from "../components/site/StickyWhatsApp";
import { useSiteSettings, liveWaLink } from "../lib/SiteSettings";

const DARK = "#161616";
const CREAM = "#FFFBF0";
const YELLOW = "#FFDD4A";

const problems = [
  { t: "Systems that don't talk", d: "CRM, accounts, operations, HR — each a separate island, bridged by someone re-keying data between them." },
  { t: "Spreadsheets holding it together", d: "The real business runs on fragile spreadsheets only one person fully understands — and they're on holiday next week." },
  { t: "Software that fights your process", d: "Off-the-shelf platforms force the team to work the software's way, papered over with workarounds." },
  { t: "Per-seat costs that scale badly", d: "Every new hire, every extra module, adds licence cost — forever, whether you use it or not." },
];

const builds = [
  { icon: Plug, c: "#3ABEFF", t: "The integration layer", d: "One system that connects the tools you already own — Xero, Salesforce, HubSpot, your ERP — so data flows instead of being re-typed." },
  { icon: LayoutDashboard, c: "#B6E388", t: "The operations platform", d: "The bespoke internal system built around your exact workflow, replacing the spreadsheet-and-email scaffolding you've outgrown." },
  { icon: LineChart, c: "#FFDD4A", t: "The single source of truth", d: "Leadership dashboards pulling live from every department — not month-old exported reports stitched together by hand." },
  { icon: Bot, c: "#C8A7F2", t: "AI on your own data", d: "Assistants and automations grounded in your processes and documents, running inside your infrastructure — not a public tool." },
];

const cares = [
  { icon: ShieldCheck, t: "Security & compliance", d: "Your data on your own infrastructure, GDPR-clean, with no third party holding it hostage at renewal." },
  { icon: Layers, t: "It integrates, not replaces", d: "We work with the stack you've already invested in. We add the connective tissue — we don't rip it out." },
  { icon: Boxes, t: "You own the asset", d: "A bespoke system on your books adds company value. A subscription just adds cost. This is an asset, not a rental." },
];

const examples = [
  {
    icon: "🏢",
    sector: "Multi-site services firm",
    size: "~40 staff · several depots",
    mess: "Jobs in one system, accounts in Xero, engineers on a scheduling app, HR on spreadsheets — and a coordinator whose whole day is copying data between all four.",
    build: "One platform over the top: it pulls jobs, pushes invoices to Xero automatically, drives the live schedule, and gives leadership one dashboard instead of four exports. The tools stay; the re-keying stops.",
    tags: ["Xero + scheduler integrated", "One leadership view", "Coordinator freed up", "Owned, not per-seat"],
  },
  {
    icon: "💼",
    sector: "Professional services firm",
    size: "~25 staff · project-based",
    mess: "Projects tracked in one tool, time in another, billing in a third, and client history scattered across inboxes. Nobody can see true project profitability without a day of spreadsheet work.",
    build: "A bespoke practice hub: projects, time, billing and client history in one place, with live margin per project and per client. Leadership sees what's actually earning while it's still happening, not at month-end.",
    tags: ["Live project margin", "Time → billing automated", "One client history", "Capacity visible"],
  },
  {
    icon: "📦",
    sector: "Wholesale & distribution",
    size: "~60 staff · warehouse + sales",
    mess: "Stock in the warehouse system, orders in the accounts package, the sales team quoting from a price list that's always slightly out of date, and reorder decisions made on gut feel.",
    build: "A connected operations layer: stock, orders and pricing in sync, quotes built from live availability, and reorder prompts driven by real sell-through. One version of the truth from the warehouse floor to the sales call.",
    tags: ["Stock + orders in sync", "Quotes from live stock", "Reorder intelligence", "No stale price lists"],
  },
  {
    icon: "🍽️",
    sector: "Multi-site hospitality / retail group",
    size: "~80 staff · multiple sites",
    mess: "Each site runs its own tills, rotas and stock, and head office waits days for numbers already out of date. Comparing site against site means chasing managers for spreadsheets.",
    build: "A group platform above each site: takings, labour, stock and performance rolled up live, site-by-site, in one place. Head office sees the whole estate at a glance, and each site keeps running its own day.",
    tags: ["Whole estate, live", "Site-vs-site at a glance", "Labour + stock rolled up", "No spreadsheet chasing"],
  },
];

export default function EnterprisePage() {
  const { settings } = useSiteSettings();
  const calendly = settings.calendlyUrl;
  const wa = liveWaLink(settings);

  return (
    <main data-testid="enterprise-page" className="bg-[var(--bg)] text-[var(--ink)] min-h-screen">
      <Navbar />

      <div className="pt-24 md:pt-28">
        {/* HERO — dark band on the cream page (nav/logo stay on cream above) */}
        <section className="px-5 md:px-10">
          <div className="max-w-[1400px] mx-auto relative rounded-[28px] overflow-hidden shadow-[var(--shadow-blunt-lg)]" style={{ background: DARK, border: `3px solid ${DARK}` }}>
            <div className="absolute top-7 right-8 flex gap-2">
              <span className="w-3 h-3 rounded-full" style={{ background: YELLOW }} />
              <span className="w-3 h-3 rounded-full" style={{ background: "#FF5C8A" }} />
              <span className="w-3 h-3 rounded-full" style={{ background: "#3ABEFF" }} />
            </div>
            <div className="px-6 md:px-14 py-14 md:py-20">
              <span className="inline-block rounded-full px-4 py-1 text-xs font-body font-semibold tracking-widest uppercase" style={{ color: YELLOW, border: "1px solid rgba(255,255,255,0.3)" }}>
                Enterprise
              </span>
              <motion.h1
                initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
                className="font-display font-semibold mt-6 leading-[1.06]"
                style={{ color: CREAM, fontSize: "clamp(38px, 6vw, 64px)" }}
              >
                Your software should fit<br />how <span style={{ color: YELLOW }}>you</span> work.
              </motion.h1>
              <p className="font-body mt-6 max-w-2xl text-base md:text-lg leading-relaxed" style={{ color: "rgba(255,251,240,0.72)" }}>
                Off-the-shelf platforms make your team bend to the software. We build the system around your process — integrated with your existing stack, secure on your own infrastructure, owned outright as a company asset.
              </p>
              <div className="mt-9 flex flex-wrap gap-4 items-center">
                <a href={calendly} target="_blank" rel="noreferrer" data-testid="ent-calendly"
                   className="rounded-full font-display font-semibold text-[15px] px-7 py-3 inline-flex items-center gap-2"
                   style={{ background: YELLOW, color: DARK }}>
                  Book a discovery call <ArrowRight className="w-4 h-4" />
                </a>
                <a href="#examples" className="font-body text-sm" style={{ color: "rgba(255,251,240,0.6)" }}>
                  or see what we'd build ↓
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* PROBLEMS */}
        <section className="px-5 md:px-10 mt-20 md:mt-28">
          <div className="max-w-[1400px] mx-auto">
            <span className="sticker bg-[var(--p-pink)] text-white mb-4">the real problem</span>
            <h2 className="display-xl !text-3xl md:!text-5xl text-[var(--ink)] mt-3">
              What breaks at 15–20+ people.
            </h2>
            <p className="font-body mt-4 max-w-2xl text-[var(--ink-soft)]">
              The problem stops being the cost of tools. It becomes the fact that none of them talk to each other — and the workarounds bridging them are now load-bearing.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-9">
              {problems.map((p, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.4, delay: (i % 2) * 0.05 }}
                  className="card-blunt p-6" style={{ background: "var(--surface)" }}>
                  <p className="font-display font-medium text-lg text-[var(--ink)]">{p.t}</p>
                  <p className="font-body text-sm mt-2 leading-relaxed text-[var(--ink-soft)]">{p.d}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* WHAT WE BUILD */}
        <section className="px-5 md:px-10 mt-20 md:mt-28">
          <div className="max-w-[1400px] mx-auto">
            <span className="sticker bg-[var(--p-blue)] mb-4">what we build</span>
            <h2 className="display-xl !text-3xl md:!text-5xl text-[var(--ink)] mt-3">
              Four layers, one owned system.
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-9">
              {builds.map((b, i) => {
                const Icon = b.icon;
                return (
                  <motion.div key={i}
                    initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.4, delay: (i % 2) * 0.05 }}
                    className="card-blunt p-6 flex gap-4" style={{ background: "var(--surface)" }}>
                    <span className="shrink-0 w-11 h-11 rounded-xl inline-flex items-center justify-center border-2 border-[var(--ink)]" style={{ background: b.c }}>
                      <Icon className="w-5 h-5" style={{ color: DARK }} />
                    </span>
                    <div>
                      <p className="font-display font-medium text-lg text-[var(--ink)]">{b.t}</p>
                      <p className="font-body text-sm mt-1.5 leading-relaxed text-[var(--ink-soft)]">{b.d}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* WORKED EXAMPLES — the selling section */}
        <section id="examples" className="px-5 md:px-10 mt-20 md:mt-28 scroll-mt-28">
          <div className="max-w-[1400px] mx-auto">
            <span className="sticker bg-[var(--p-mint)] mb-4">what it looks like</span>
            <h2 className="display-xl !text-3xl md:!text-5xl text-[var(--ink)] mt-3">
              The kind of thing we build.
            </h2>
            <p className="font-body mt-4 max-w-2xl text-[var(--ink-soft)]">
              Illustrative scenarios — the shape of the systems we build for bigger teams, not named clients. Find the one closest to yours.
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-9">
              {examples.map((ex, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.45, delay: (i % 2) * 0.06 }}
                  className="card-blunt p-6 md:p-7" style={{ background: "var(--surface)" }}>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{ex.icon}</span>
                    <div>
                      <p className="font-display font-medium text-lg text-[var(--ink)] leading-tight">{ex.sector}</p>
                      <p className="font-body text-xs text-[var(--ink-soft)]">{ex.size}</p>
                    </div>
                  </div>
                  <p className="font-body text-sm mt-4 leading-relaxed text-[var(--ink)]">
                    <span className="font-bold">The mess: </span><span className="text-[var(--ink-soft)]">{ex.mess}</span>
                  </p>
                  <p className="font-body text-sm mt-3 leading-relaxed" style={{ color: "#0F6E56" }}>
                    <span className="font-bold">What we build: </span>{ex.build}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {ex.tags.map((t) => (
                      <span key={t} className="font-body text-[11px] font-semibold px-2.5 py-1 rounded-full" style={{ background: "#E1F5EE", color: "#0F6E56" }}>{t}</span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
            <p className="font-body text-xs text-[var(--ink-soft)] mt-5 max-w-2xl italic">
              Illustrative scenarios showing the kind of system we build — not real named clients.
            </p>
          </div>
        </section>

        {/* WHAT GETS IT SIGNED OFF */}
        <section className="px-5 md:px-10 mt-20 md:mt-28">
          <div className="max-w-[1400px] mx-auto card-blunt p-8 md:p-12" style={{ background: "var(--bg-2)" }}>
            <h2 className="display-xl !text-2xl md:!text-4xl text-[var(--ink)] leading-tight">
              The bit that actually gets it signed off.
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              {cares.map((c, i) => {
                const Icon = c.icon;
                return (
                  <div key={i}>
                    <span className="inline-flex w-10 h-10 rounded-xl items-center justify-center border-2 border-[var(--ink)]" style={{ background: YELLOW }}>
                      <Icon className="w-5 h-5" style={{ color: DARK }} />
                    </span>
                    <p className="font-display font-medium text-base mt-3 text-[var(--ink)]">{c.t}</p>
                    <p className="font-body text-sm mt-1.5 leading-relaxed text-[var(--ink-soft)]">{c.d}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-5 md:px-10 mt-20 md:mt-28 mb-24 md:mb-32">
          <div className="max-w-[1400px] mx-auto rounded-[28px] p-10 md:p-16 text-center shadow-[var(--shadow-blunt-lg)]" style={{ background: DARK, border: `3px solid ${DARK}` }}>
            <h2 className="font-display font-semibold leading-tight" style={{ color: CREAM, fontSize: "clamp(28px, 4.4vw, 48px)" }}>
              Let's map what you've got<br />— and what it could be.
            </h2>
            <p className="font-body mt-4 max-w-xl mx-auto text-base" style={{ color: "rgba(255,251,240,0.72)" }}>
              A no-pitch discovery call: we look at your current stack, where the friction is, and whether a bespoke system is the right call. If it isn't, we'll tell you.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 justify-center">
              <a href={calendly} target="_blank" rel="noreferrer" data-testid="ent-cta-calendly"
                 className="rounded-full font-display font-semibold text-[15px] px-8 py-3.5 inline-flex items-center gap-2"
                 style={{ background: YELLOW, color: DARK }}>
                Book a discovery call <ArrowRight className="w-4 h-4" />
              </a>
              <a href={wa} target="_blank" rel="noreferrer" data-testid="ent-cta-wa"
                 className="rounded-full font-display font-semibold text-[15px] px-8 py-3.5"
                 style={{ background: "transparent", color: CREAM, border: `2px solid ${CREAM}` }}>
                WhatsApp us
              </a>
            </div>
          </div>
        </section>
      </div>

      <Footer />
      <StickyWhatsApp />
    </main>
  );
}
