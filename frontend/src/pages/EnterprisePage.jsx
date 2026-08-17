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

export default function EnterprisePage() {
  const { settings } = useSiteSettings();
  const calendly = settings.calendlyUrl;
  const wa = liveWaLink(settings);

  return (
    <main data-testid="enterprise-page" style={{ background: DARK }} className="min-h-screen">
      <Navbar />

      <div className="pt-24 md:pt-28">
        {/* HERO */}
        <section className="px-5 md:px-10">
          <div className="max-w-[1200px] mx-auto relative rounded-[28px] overflow-hidden" style={{ background: DARK, border: "1px solid rgba(255,255,255,0.12)" }}>
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
                <a href="#how" className="font-body text-sm" style={{ color: "rgba(255,251,240,0.6)" }}>
                  or see how we work ↓
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* PROBLEMS */}
        <section className="px-5 md:px-10 mt-20 md:mt-28">
          <div className="max-w-[1200px] mx-auto">
            <p className="font-body text-xs uppercase tracking-widest" style={{ color: YELLOW }}>The real problem</p>
            <h2 className="font-display font-semibold mt-3 leading-tight" style={{ color: CREAM, fontSize: "clamp(28px, 4vw, 42px)" }}>
              What breaks at 15–20+ people.
            </h2>
            <p className="font-body mt-4 max-w-2xl" style={{ color: "rgba(255,251,240,0.66)" }}>
              The problem stops being the cost of tools. It becomes the fact that none of them talk to each other — and the workarounds bridging them are now load-bearing.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-9">
              {problems.map((p, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.4, delay: (i % 2) * 0.05 }}
                  className="rounded-2xl p-6" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}>
                  <p className="font-display font-medium text-lg" style={{ color: CREAM }}>{p.t}</p>
                  <p className="font-body text-sm mt-2 leading-relaxed" style={{ color: "rgba(255,251,240,0.62)" }}>{p.d}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* WHAT WE BUILD */}
        <section id="how" className="px-5 md:px-10 mt-20 md:mt-28 scroll-mt-28">
          <div className="max-w-[1200px] mx-auto">
            <p className="font-body text-xs uppercase tracking-widest" style={{ color: YELLOW }}>What we build</p>
            <h2 className="font-display font-semibold mt-3 leading-tight" style={{ color: CREAM, fontSize: "clamp(28px, 4vw, 42px)" }}>
              Four layers, one owned system.
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-9">
              {builds.map((b, i) => {
                const Icon = b.icon;
                return (
                  <motion.div key={i}
                    initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.4, delay: (i % 2) * 0.05 }}
                    className="rounded-2xl p-6 flex gap-4" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}>
                    <span className="shrink-0 w-11 h-11 rounded-xl inline-flex items-center justify-center" style={{ background: b.c }}>
                      <Icon className="w-5 h-5" style={{ color: DARK }} />
                    </span>
                    <div>
                      <p className="font-display font-medium text-lg" style={{ color: CREAM }}>{b.t}</p>
                      <p className="font-body text-sm mt-1.5 leading-relaxed" style={{ color: "rgba(255,251,240,0.62)" }}>{b.d}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* WHAT THEY CARE ABOUT */}
        <section className="px-5 md:px-10 mt-20 md:mt-28">
          <div className="max-w-[1200px] mx-auto rounded-[28px] p-8 md:p-12" style={{ background: "rgba(58,190,255,0.08)", border: "1px solid rgba(58,190,255,0.25)" }}>
            <h2 className="font-display font-semibold leading-tight" style={{ color: CREAM, fontSize: "clamp(24px, 3.4vw, 36px)" }}>
              The bit that actually gets it signed off.
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              {cares.map((c, i) => {
                const Icon = c.icon;
                return (
                  <div key={i}>
                    <Icon className="w-6 h-6" style={{ color: YELLOW }} />
                    <p className="font-display font-medium text-base mt-3" style={{ color: CREAM }}>{c.t}</p>
                    <p className="font-body text-sm mt-1.5 leading-relaxed" style={{ color: "rgba(255,251,240,0.66)" }}>{c.d}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-5 md:px-10 mt-20 md:mt-28 mb-24 md:mb-32">
          <div className="max-w-[1200px] mx-auto rounded-[28px] p-10 md:p-16 text-center" style={{ background: YELLOW }}>
            <h2 className="font-display font-semibold leading-tight" style={{ color: DARK, fontSize: "clamp(28px, 4.4vw, 48px)" }}>
              Let's map what you've got<br />— and what it could be.
            </h2>
            <p className="font-body mt-4 max-w-xl mx-auto text-base" style={{ color: DARK, opacity: 0.8 }}>
              A no-pitch discovery call: we look at your current stack, where the friction is, and whether a bespoke system is the right call. If it isn't, we'll tell you.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 justify-center">
              <a href={calendly} target="_blank" rel="noreferrer" data-testid="ent-cta-calendly"
                 className="rounded-full font-display font-semibold text-[15px] px-8 py-3.5 inline-flex items-center gap-2"
                 style={{ background: DARK, color: CREAM }}>
                Book a discovery call <ArrowRight className="w-4 h-4" />
              </a>
              <a href={wa} target="_blank" rel="noreferrer" data-testid="ent-cta-wa"
                 className="rounded-full font-display font-semibold text-[15px] px-8 py-3.5"
                 style={{ background: "transparent", color: DARK, border: `2px solid ${DARK}` }}>
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
