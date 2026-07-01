import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Calendar, X } from "lucide-react";
import axios from "axios";
import PageShell from "./PageShell";
import { siteConfig, waLink, colorMap } from "../lib/siteConfig";
import { examples as staticExamples, categories } from "../lib/examplesContent";
import AudienceTierPicker, { TIER_OPTIONS } from "../components/site/AudienceTierPicker";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const FEATURED_COUNT = 4;
const tilts = ["tilt-l", "tilt-r", "tilt-l-3", "tilt-r-3"];

// Resolve background colour
const bgFor = (c) => (c === "ink" ? "var(--ink)" : colorMap[c] || "var(--surface)");
const fgFor = (c) => (c === "ink" ? "var(--bg)" : "var(--ink)");

// FEATURED — large 2-col card (fully expanded breakdown)
const FeaturedCard = ({ ex, index }) => (
  <motion.article
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.5, delay: (index % 2) * 0.05 }}
    data-testid={`featured-${ex.id}`}
    className="card-blunt overflow-hidden"
    style={{ background: bgFor(ex.color) }}
  >
    {/* Header */}
    <div className="p-6 md:p-7 border-b-2 border-[var(--ink)]/15" style={{ color: fgFor(ex.color) }}>
      <div className="flex items-start gap-3">
        <span
          className="inline-flex items-center justify-center w-12 h-12 rounded-2xl text-2xl border-2 border-[var(--ink)] shadow-[3px_3px_0_0_var(--ink)]"
          style={{ background: "var(--surface)", color: "var(--ink)" }}
        >
          {ex.icon}
        </span>
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.18em] opacity-70">
            Featured · {String(index + 1).padStart(2, "0")}
          </div>
          <h3 className="font-display text-xl md:text-2xl leading-tight">{ex.industry}</h3>
          <div className="font-body text-xs opacity-70 mt-0.5">{ex.size}</div>
        </div>
      </div>
      <p className="mt-4 font-body text-sm md:text-[15px] leading-relaxed">{ex.tagline}</p>
    </div>

    {/* Body */}
    <div className="p-6 md:p-7 bg-[var(--surface)] space-y-5">
      <div>
        <div className="font-hand text-2xl text-[var(--p-pink)] mb-1">before we started</div>
        <ul className="flex flex-wrap gap-1.5">
          {ex.before.map((b) => (
            <li key={b} className="font-body text-[11px] text-[var(--ink)] bg-[var(--bg-2)] border border-[var(--ink)]/30 px-2 py-1 rounded-full line-through opacity-70">
              {b}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <div className="font-hand text-2xl text-[var(--ink)] mb-1">the operating system we built</div>
        <ul className="space-y-1.5">
          {ex.integrated.map((it) => (
            <li key={it} className="flex items-start gap-2 font-body text-sm text-[var(--ink)]">
              <span className="text-[var(--p-pink)] font-bold">+</span>
              <span>{it}</span>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <div className="font-hand text-2xl text-[var(--p-pink)] mb-1">
          <Sparkles className="w-4 h-4 inline-block mr-1" /> custom AI running quietly
        </div>
        <ul className="space-y-1.5">
          {ex.ai.map((a) => (
            <li key={a} className="flex items-start gap-2 font-body text-sm text-[var(--ink)]">
              <span className="text-[var(--p-pink)]">✦</span>
              <span>{a}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>

    {/* Quote + results */}
    <div className="p-6 md:p-7 border-t-2 border-[var(--ink)]" style={{ background: bgFor(ex.color), color: fgFor(ex.color) }}>
      <blockquote className="font-display text-lg md:text-xl leading-tight">
        <span className="font-hand text-3xl text-[var(--p-pink)]">"</span>
        {ex.quote}
        <span className="font-hand text-3xl text-[var(--p-pink)]">"</span>
      </blockquote>
      <div className="mt-2 font-body text-xs opacity-80">— {ex.quoteBy}</div>
      <div className="mt-5 flex flex-wrap gap-2">
        {ex.results.map((r) => (
          <span key={r.k} className="font-body text-[11px] font-bold text-[var(--ink)] bg-[var(--surface)] border-2 border-[var(--ink)] px-2.5 py-1 rounded-full">
            {r.v} <span className="opacity-60 font-normal">· {r.k}</span>
          </span>
        ))}
      </div>
    </div>
  </motion.article>
);

// COMPACT — small teaser
const TeaserCard = ({ ex, onClick, index }) => (
  <motion.button
    type="button"
    onClick={onClick}
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-40px" }}
    transition={{ duration: 0.35, delay: (index % 4) * 0.04 }}
    data-testid={`example-${ex.id}`}
    className="card-blunt p-5 text-left flex flex-col min-h-[200px] group"
    style={{ background: bgFor(ex.color), color: fgFor(ex.color) }}
  >
    <div className="flex items-start justify-between mb-3">
      <span
        className="inline-flex items-center justify-center w-11 h-11 rounded-2xl text-xl border-2 border-[var(--ink)] shadow-[3px_3px_0_0_var(--ink)]"
        style={{ background: "var(--surface)", color: "var(--ink)" }}
      >
        {ex.icon}
      </span>
      <span className="font-body text-[10px] uppercase tracking-[0.18em] font-bold opacity-70 mt-1">
        #{String(index + 1).padStart(2, "0")}
      </span>
    </div>
    <h3 className="font-display text-lg leading-tight">{ex.industry}</h3>
    <div className="font-body text-[11px] mt-1 opacity-75">{ex.size}</div>
    <p className="mt-3 font-body text-[13px] leading-snug opacity-90 flex-1">{ex.tagline}</p>
    <div className="mt-4 flex items-center gap-1.5 font-display text-sm">
      <span className="underline decoration-2 underline-offset-2">See breakdown</span>
      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
    </div>
  </motion.button>
);

// Drawer (full breakdown on demand for compact cards)
const Drawer = ({ ex, onClose }) => {
  if (!ex) return null;
  return (
    <AnimatePresence>
      <motion.div
        key="overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
        data-testid="example-drawer-overlay"
      />
      <motion.aside
        key="drawer"
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 30, stiffness: 250 }}
        className="fixed top-0 right-0 z-50 h-full w-full md:w-[640px] bg-[var(--bg)] overflow-y-auto border-l-2 border-[var(--ink)]"
        data-testid={`example-drawer-${ex.id}`}
      >
        <div className="p-6 md:p-8 border-b-2 border-[var(--ink)]" style={{ background: bgFor(ex.color), color: fgFor(ex.color) }}>
          <div className="flex items-start justify-between mb-3">
            <span className="inline-flex items-center justify-center w-14 h-14 rounded-2xl text-2xl border-2 border-[var(--ink)] shadow-[3px_3px_0_0_var(--ink)] bg-[var(--surface)]">
              {ex.icon}
            </span>
            <button
              onClick={onClose}
              data-testid="drawer-close"
              className="w-10 h-10 rounded-full bg-[var(--surface)] border-2 border-[var(--ink)] flex items-center justify-center hover:rotate-90 transition-transform"
              aria-label="Close"
            >
              <X className="w-4 h-4 text-[var(--ink)]" />
            </button>
          </div>
          <h2 className="font-display text-2xl md:text-3xl leading-tight">{ex.industry}</h2>
          <div className="font-body text-xs opacity-80 mt-1">{ex.size}</div>
          <p className="mt-4 font-body text-sm md:text-base leading-relaxed">{ex.tagline}</p>
        </div>

        <div className="p-6 md:p-8 space-y-7">
          <section>
            <div className="font-hand text-2xl text-[var(--p-pink)] mb-2">before we started</div>
            <ul className="flex flex-wrap gap-1.5">
              {ex.before.map((b) => (
                <li key={b} className="font-body text-xs text-[var(--ink)] bg-[var(--bg-2)] border border-[var(--ink)]/30 px-2 py-1 rounded-full line-through opacity-70">
                  {b}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <div className="font-hand text-2xl text-[var(--ink)] mb-2">the operating system we built</div>
            <ul className="space-y-1.5">
              {ex.integrated.map((it) => (
                <li key={it} className="flex items-start gap-2 font-body text-sm text-[var(--ink)]">
                  <span className="text-[var(--p-pink)] font-bold">+</span>
                  <span>{it}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <div className="font-hand text-2xl text-[var(--p-pink)] mb-2">
              <Sparkles className="w-4 h-4 inline-block mr-1" /> custom AI running quietly
            </div>
            <ul className="space-y-1.5">
              {ex.ai.map((a) => (
                <li key={a} className="flex items-start gap-2 font-body text-sm text-[var(--ink)]">
                  <span className="text-[var(--p-pink)]">✦</span>
                  <span>{a}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="card-blunt p-5" style={{ background: bgFor(ex.color), color: fgFor(ex.color) }}>
            <blockquote className="font-display text-lg md:text-xl leading-tight">
              <span className="font-hand text-3xl text-[var(--p-pink)]">"</span>
              {ex.quote}
              <span className="font-hand text-3xl text-[var(--p-pink)]">"</span>
            </blockquote>
            <div className="mt-2 font-body text-xs opacity-80">— {ex.quoteBy}</div>
            <div className="mt-4 flex flex-wrap gap-2">
              {ex.results.map((r) => (
                <span key={r.k} className="font-body text-[11px] font-bold text-[var(--ink)] bg-[var(--surface)] border-2 border-[var(--ink)] px-2.5 py-1 rounded-full">
                  {r.v} <span className="opacity-60 font-normal">· {r.k}</span>
                </span>
              ))}
            </div>
          </section>

          <section className="card-blunt p-5 bg-[var(--ink)] text-[var(--bg)]">
            <div className="font-hand text-2xl text-[var(--p-yellow)]">want this for your business?</div>
            <p className="mt-2 font-body text-sm opacity-80">25-min chat. We'll tell you honestly what would work for you.</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <a href={siteConfig.calendlyUrl} target="_blank" rel="noreferrer" data-testid="drawer-calendly" className="btn-pill btn-pill-yellow">
                <Calendar className="w-4 h-4" /> Book a chat
              </a>
              <a href={waLink()} target="_blank" rel="noreferrer" data-testid="drawer-whatsapp" className="btn-pill bg-[var(--surface)]">
                WhatsApp
              </a>
            </div>
          </section>
        </div>
      </motion.aside>
    </AnimatePresence>
  );
};

export default function ExamplesPage() {
  const [active, setActive] = useState("all");
  const [tier, setTier] = useState(null);
  const [openId, setOpenId] = useState(null);
  const [examples, setExamples] = useState(staticExamples);

  // Fetch from CMS — fall back to static if empty or error
  useEffect(() => {
    axios.get(`${API}/examples`)
      .then((r) => {
        if (Array.isArray(r.data) && r.data.length > 0) {
          // Map DB shape → page shape (use slug as the display id)
          const mapped = r.data.map((e) => ({
            id: e.slug || e.id,
            icon: e.icon,
            industry: e.industry,
            size: e.size,
            color: e.color,
            tagline: e.tagline,
            before: e.before || [],
            integrated: e.integrated || [],
            ai: e.ai || [],
            quote: e.quote,
            quoteBy: e.quoteBy,
            results: e.results || [],
            _tier: e.tier,
            _category: e.category,
          }));
          setExamples(mapped);
        }
      })
      .catch(() => { /* silently keep static */ });
  }, []);

  useEffect(() => {
    document.body.style.overflow = openId ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [openId]);

  // Filter by tier first (if picked) then by category.
  const tierMatches = tier ? TIER_OPTIONS.find((t) => t.id === tier)?.matches || [] : null;
  const tierFiltered = tierMatches
    ? examples.filter((e) => tierMatches.includes(e.id) || e._tier === tier)
    : examples;

  const isAll = active === "all";
  const featured = isAll && !tier ? tierFiltered.slice(0, FEATURED_COUNT) : [];
  const moreList = isAll
    ? (tier ? tierFiltered : tierFiltered.slice(FEATURED_COUNT))
    : tierFiltered.filter((e) => {
        // Prefer DB-driven category on each example, fall back to static categories mapping
        if (e._category && e._category === active) return true;
        return categories.find((c) => c.id === active)?.ids?.includes(e.id);
      });

  const openExample = examples.find((e) => e.id === openId);

  return (
    <PageShell testId="examples-page">
      {/* Hero */}
      <section className="px-5 md:px-10 pb-2 relative overflow-hidden">
        <div className="bg-dots absolute inset-0 pointer-events-none opacity-50" aria-hidden />
        <div className="max-w-[1400px] mx-auto relative">
          <span className="sticker bg-[var(--p-mint)] mb-4">
            <Sparkles className="w-3.5 h-3.5" /> business operating systems
          </span>
          <h1 className="display-xxl text-[var(--ink)] mt-3 max-w-[22ch]">
            What does a <br />
            <span className="bg-[var(--p-yellow)] px-3 md:px-5 py-1 border-2 border-[var(--ink)] inline-block rounded-2xl shadow-[var(--shadow-blunt)]">
              business OS
            </span>{" "}
            actually look like?
          </h1>
          <p className="mt-5 max-w-3xl font-body text-base md:text-lg text-[var(--ink-soft)] leading-relaxed">
            Most agencies build brochureware with a chatbot bolted on. We build
            the <span className="font-hand text-2xl text-[var(--p-pink)]">operating system</span>{" "}
            your business runs on. The website is just the doorway visitors
            walk through. Everything else — quotes, ads, deposits, workshop
            tickets, deliveries, lead chasers, dashboards — sits behind it.
          </p>
          <p className="mt-3 max-w-3xl font-body text-sm md:text-base text-[var(--ink-soft)] leading-relaxed">
            Below are <strong>27 examples</strong> across every kind of
            business. Pick the one closest to yours — the drawer shows the full
            OS spec (website + backend + AI).
          </p>

          <div className="mt-7 flex flex-wrap gap-2.5">
            <a
              href={siteConfig.calendlyUrl}
              target="_blank"
              rel="noreferrer"
              data-testid="examples-calendly"
              className="btn-pill btn-pill-pink"
            >
              <Calendar className="w-4 h-4" /> Book a chat about your business
            </a>
            <Link
              to="/services/digital-ecosystems"
              data-testid="examples-back"
              className="btn-pill btn-pill-yellow"
            >
              Service overview <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Where are you now? — dual-audience picker */}
      <AudienceTierPicker active={tier} onChange={setTier} />

      {/* Featured grid (2-col big cards) */}
      {featured.length > 0 && (
        <section className="px-5 md:px-10 mt-12 md:mt-16">
          <div className="max-w-[1400px] mx-auto">
            <div className="flex items-end justify-between mb-6 md:mb-8">
              <span className="sticker bg-[var(--p-yellow)]">★ featured</span>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
              {featured.map((ex, i) => (
                <div key={ex.id} className={`tilt-md-only ${tilts[i % tilts.length]}`}>
                  <FeaturedCard ex={ex} index={i} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Filter tabs */}
      <section className="px-5 md:px-10 mt-14 md:mt-20 sticky top-14 md:top-16 z-30 bg-[var(--bg)]/90 backdrop-blur-md py-3 border-y border-[var(--ink)]/15">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-hand text-xl text-[var(--p-pink)] mr-1 hidden md:inline">browse:</span>
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setActive(c.id)}
                data-testid={`filter-${c.id}`}
                className={`btn-pill !py-1.5 !px-3.5 text-xs ${
                  active === c.id ? "btn-pill-ink" : ""
                }`}
              >
                {c.label}
                <span className="opacity-60 ml-1 font-normal">
                  {c.id === "all"
                    ? examples.length
                    : examples.filter((e) => c.ids?.includes(e.id)).length}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Compact grid */}
      <section className="px-5 md:px-10 mt-6 mb-16">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-5 md:mb-7 flex items-end justify-between">
            <h2 className="font-display text-xl md:text-2xl text-[var(--ink)]">
              {isAll ? "More examples" : `${moreList.length} matching example${moreList.length === 1 ? "" : "s"}`}
            </h2>
            {isAll && (
              <p className="font-body text-xs text-[var(--ink-soft)] hidden md:block">
                Tap any tile for the full breakdown ↗
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
            <AnimatePresence mode="popLayout">
              {moreList.map((ex, i) => (
                <TeaserCard
                  key={ex.id}
                  ex={ex}
                  index={i}
                  onClick={() => setOpenId(ex.id)}
                />
              ))}
            </AnimatePresence>
          </div>

          {moreList.length === 0 && (
            <p className="mt-10 text-center font-body text-[var(--ink-soft)]">
              No examples in this category yet.
            </p>
          )}
        </div>
      </section>

      {/* "Don't see yours?" CTA */}
      <section className="px-5 md:px-10 mb-16 md:mb-20">
        <div className="max-w-[1400px] mx-auto card-blunt p-7 md:p-10 bg-[var(--ink)] text-[var(--bg)] flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="max-w-2xl">
            <div className="font-hand text-2xl text-[var(--p-yellow)]">
              don't see your kind of business?
            </div>
            <h3 className="display-lg !text-2xl md:!text-3xl text-[var(--bg)] mt-1">
              Tell us about you. We'll sketch what your ecosystem could look like.
            </h3>
            <p className="mt-3 font-body text-sm text-[var(--bg)] opacity-80">
              25 minutes on a call. Free, no pitch.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <a href={siteConfig.calendlyUrl} target="_blank" rel="noreferrer" data-testid="examples-cta-calendly" className="btn-pill btn-pill-yellow">
              Book a chat
            </a>
            <a href={waLink()} target="_blank" rel="noreferrer" data-testid="examples-cta-whatsapp" className="btn-pill bg-[var(--surface)]">
              WhatsApp
            </a>
          </div>
        </div>
      </section>

      {openExample && <Drawer ex={openExample} onClose={() => setOpenId(null)} />}
    </PageShell>
  );
}
