import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Calendar, X } from "lucide-react";
import PageShell from "./PageShell";
import { siteConfig, waLink, colorMap } from "../lib/siteConfig";
import { examples, categories } from "../lib/examplesContent";

// Resolve background colour for the special "ink" color
const bgFor = (c) => (c === "ink" ? "var(--ink)" : colorMap[c] || "var(--surface)");
const fgFor = (c) => (c === "ink" ? "var(--bg)" : "var(--ink)");

// Compact teaser card — shown in the grid
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
        className="inline-flex items-center justify-center w-11 h-11 rounded-2xl text-xl border-2 border-current/30 shadow-[3px_3px_0_0_currentColor]"
        style={{ background: ex.color === "ink" ? "var(--p-yellow)" : "var(--surface)", color: "var(--ink)" }}
      >
        {ex.icon}
      </span>
      <span
        className="font-body text-[10px] uppercase tracking-[0.18em] font-bold opacity-70 mt-1"
      >
        #{String(index + 1).padStart(2, "0")}
      </span>
    </div>

    <h3 className="font-display text-lg leading-tight">{ex.industry}</h3>
    <div className="font-body text-[11px] mt-1 opacity-75">{ex.size}</div>

    <p className="mt-3 font-body text-[13px] leading-snug opacity-90 flex-1">
      {ex.tagline}
    </p>

    <div className="mt-4 flex items-center gap-1.5 font-display text-sm">
      <span className="underline decoration-2 underline-offset-2">See breakdown</span>
      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
    </div>
  </motion.button>
);

// Full breakdown — shown in the side drawer
const Drawer = ({ ex, onClose }) => {
  if (!ex) return null;
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
        data-testid="example-drawer-overlay"
      />
      <motion.aside
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 30, stiffness: 250 }}
        className="fixed top-0 right-0 z-50 h-full w-full md:w-[640px] bg-[var(--bg)] overflow-y-auto border-l-2 border-[var(--ink)]"
        data-testid={`example-drawer-${ex.id}`}
      >
        {/* Drawer header */}
        <div
          className="p-6 md:p-8 border-b-2 border-[var(--ink)]"
          style={{ background: bgFor(ex.color), color: fgFor(ex.color) }}
        >
          <div className="flex items-start justify-between mb-3">
            <span
              className="inline-flex items-center justify-center w-14 h-14 rounded-2xl text-2xl border-2 border-[var(--ink)] shadow-[3px_3px_0_0_var(--ink)] bg-[var(--surface)]"
            >
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

        {/* Drawer body */}
        <div className="p-6 md:p-8 space-y-7">
          <section>
            <div className="font-hand text-2xl text-[var(--p-pink)] mb-2">before</div>
            <ul className="flex flex-wrap gap-1.5">
              {ex.before.map((b) => (
                <li
                  key={b}
                  className="font-body text-xs text-[var(--ink)] bg-[var(--bg-2)] border border-[var(--ink)]/30 px-2 py-1 rounded-full line-through opacity-70"
                >
                  {b}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <div className="font-hand text-2xl text-[var(--ink)] mb-2">what we integrated</div>
            <ul className="space-y-1.5">
              {ex.integrated.map((it) => (
                <li
                  key={it}
                  className="flex items-start gap-2 font-body text-sm text-[var(--ink)]"
                >
                  <span className="text-[var(--p-pink)] font-bold">+</span>
                  <span>{it}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <div className="font-hand text-2xl text-[var(--p-pink)] mb-2">
              <Sparkles className="w-4 h-4 inline-block mr-1" />
              custom AI we added
            </div>
            <ul className="space-y-1.5">
              {ex.ai.map((a) => (
                <li
                  key={a}
                  className="flex items-start gap-2 font-body text-sm text-[var(--ink)]"
                >
                  <span className="text-[var(--p-pink)]">✦</span>
                  <span>{a}</span>
                </li>
              ))}
            </ul>
          </section>

          <section
            className="card-blunt p-5"
            style={{ background: bgFor(ex.color), color: fgFor(ex.color) }}
          >
            <blockquote className="font-display text-lg md:text-xl leading-tight">
              <span className="font-hand text-3xl text-[var(--p-pink)]">"</span>
              {ex.quote}
              <span className="font-hand text-3xl text-[var(--p-pink)]">"</span>
            </blockquote>
            <div className="mt-2 font-body text-xs opacity-80">— {ex.quoteBy}</div>

            <div className="mt-4 flex flex-wrap gap-2">
              {ex.results.map((r) => (
                <span
                  key={r.k}
                  className="font-body text-[11px] font-bold text-[var(--ink)] bg-[var(--surface)] border-2 border-[var(--ink)] px-2.5 py-1 rounded-full"
                >
                  {r.v} <span className="opacity-60 font-normal">· {r.k}</span>
                </span>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="card-blunt p-5 bg-[var(--ink)] text-[var(--bg)]">
            <div className="font-hand text-2xl text-[var(--p-yellow)]">
              want this for your business?
            </div>
            <p className="mt-2 font-body text-sm opacity-80">
              25-min chat. We'll tell you honestly what would work for you.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <a
                href={siteConfig.calendlyUrl}
                target="_blank"
                rel="noreferrer"
                data-testid="drawer-calendly"
                className="btn-pill btn-pill-yellow"
              >
                <Calendar className="w-4 h-4" /> Book a chat
              </a>
              <a
                href={waLink()}
                target="_blank"
                rel="noreferrer"
                data-testid="drawer-whatsapp"
                className="btn-pill bg-[var(--surface)]"
              >
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
  const [openId, setOpenId] = useState(null);

  // Lock body scroll while the drawer is open
  useEffect(() => {
    document.body.style.overflow = openId ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [openId]);

  const visible =
    active === "all"
      ? examples
      : examples.filter((e) =>
          categories.find((c) => c.id === active)?.ids?.includes(e.id)
        );

  const openExample = examples.find((e) => e.id === openId);

  return (
    <PageShell testId="examples-page">
      {/* Hero */}
      <section className="px-5 md:px-10 pb-2 relative overflow-hidden">
        <div className="bg-dots absolute inset-0 pointer-events-none opacity-50" aria-hidden />
        <div className="max-w-[1400px] mx-auto relative">
          <span className="sticker bg-[var(--p-mint)] mb-4">
            <Sparkles className="w-3.5 h-3.5" /> ecosystem examples
          </span>
          <h1 className="display-xxl text-[var(--ink)] mt-3 max-w-[20ch]">
            What does a <br />
            <span className="bg-[var(--p-yellow)] px-3 md:px-5 py-1 border-2 border-[var(--ink)] inline-block rounded-2xl shadow-[var(--shadow-blunt)]">
              digital ecosystem
            </span>{" "}
            look like?
          </h1>
          <p className="mt-5 max-w-3xl font-body text-base md:text-lg text-[var(--ink-soft)] leading-relaxed">
            Pick a business closest to{" "}
            <span className="font-hand text-2xl text-[var(--p-pink)]">yours</span>{" "}
            and tap it. We'll show you what their messy stack looked like
            before, what we built, the custom AI we added, and what the owner
            said after.
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

      {/* Filter tabs */}
      <section className="px-5 md:px-10 mt-10 md:mt-14 sticky top-14 md:top-16 z-30 bg-[var(--bg)]/85 backdrop-blur-md py-3 border-y border-[var(--ink)]/15">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex items-center gap-2 flex-wrap">
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
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
          <AnimatePresence mode="popLayout">
            {visible.map((ex, i) => (
              <TeaserCard
                key={ex.id}
                ex={ex}
                index={i}
                onClick={() => setOpenId(ex.id)}
              />
            ))}
          </AnimatePresence>
        </div>
        {visible.length === 0 && (
          <p className="max-w-[1400px] mx-auto mt-10 text-center font-body text-[var(--ink-soft)]">
            No examples in this category yet.
          </p>
        )}
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
            <a
              href={siteConfig.calendlyUrl}
              target="_blank"
              rel="noreferrer"
              data-testid="examples-cta-calendly"
              className="btn-pill btn-pill-yellow"
            >
              Book a chat
            </a>
            <a
              href={waLink()}
              target="_blank"
              rel="noreferrer"
              data-testid="examples-cta-whatsapp"
              className="btn-pill bg-[var(--surface)]"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Detail drawer */}
      {openExample && (
        <Drawer ex={openExample} onClose={() => setOpenId(null)} />
      )}
    </PageShell>
  );
}
