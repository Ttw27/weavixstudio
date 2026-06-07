import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Calendar } from "lucide-react";
import PageShell from "./PageShell";
import { siteConfig, waLink, colorMap } from "../lib/siteConfig";
import { examples, categories } from "../lib/examplesContent";

const tilts = ["tilt-l", "tilt-r", "tilt-l-3", "tilt-r-3", "tilt-r", "tilt-l"];

const ExampleCard = ({ ex, index }) => (
  <motion.article
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.5, delay: (index % 3) * 0.05 }}
    data-testid={`example-${ex.id}`}
    className="card-blunt overflow-hidden"
    style={{ background: colorMap[ex.color] }}
  >
    {/* Header */}
    <div className="p-6 md:p-7 border-b-2 border-[var(--ink)]/15">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[var(--surface)] border-2 border-[var(--ink)] shadow-[3px_3px_0_0_var(--ink)] text-2xl">
            {ex.icon}
          </span>
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--ink)] opacity-70">
              Example {String(index + 1).padStart(2, "0")}
            </div>
            <h3 className="font-display text-xl md:text-2xl text-[var(--ink)] leading-tight">
              {ex.industry}
            </h3>
            <div className="font-body text-xs text-[var(--ink)] opacity-70 mt-0.5">
              {ex.size}
            </div>
          </div>
        </div>
      </div>
      <p className="mt-4 font-body text-sm md:text-[15px] text-[var(--ink)] leading-relaxed">
        {ex.tagline}
      </p>
    </div>

    {/* Body */}
    <div className="p-6 md:p-7 bg-[var(--surface)] space-y-5">
      <div>
        <div className="font-hand text-2xl text-[var(--p-pink)] mb-1">before</div>
        <ul className="flex flex-wrap gap-1.5">
          {ex.before.map((b) => (
            <li
              key={b}
              className="font-body text-[11px] text-[var(--ink)] bg-[var(--bg-2)] border border-[var(--ink)]/30 px-2 py-1 rounded-full line-through opacity-70"
            >
              {b}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <div className="font-hand text-2xl text-[var(--ink)] mb-1">what we integrated</div>
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
      </div>

      <div>
        <div className="font-hand text-2xl text-[var(--p-pink)] mb-1">
          <Sparkles className="w-4 h-4 inline-block mr-1" /> custom AI we added
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
      </div>
    </div>

    {/* Quote + results */}
    <div
      className="p-6 md:p-7 border-t-2 border-[var(--ink)]"
      style={{ background: colorMap[ex.color] }}
    >
      <blockquote className="font-display text-lg md:text-xl text-[var(--ink)] leading-tight">
        <span className="font-hand text-3xl text-[var(--p-pink)]">"</span>
        {ex.quote}
        <span className="font-hand text-3xl text-[var(--p-pink)]">"</span>
      </blockquote>
      <div className="mt-2 font-body text-xs text-[var(--ink)] opacity-80">
        — {ex.quoteBy}
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {ex.results.map((r) => (
          <span
            key={r.k}
            className="font-body text-[11px] font-bold text-[var(--ink)] bg-[var(--surface)] border-2 border-[var(--ink)] px-2.5 py-1 rounded-full"
          >
            {r.v} <span className="opacity-60 font-normal">· {r.k}</span>
          </span>
        ))}
      </div>
    </div>
  </motion.article>
);

export default function ExamplesPage() {
  const [active, setActive] = useState("all");

  const visible =
    active === "all"
      ? examples
      : examples.filter((e) =>
          categories.find((c) => c.id === active)?.ids?.includes(e.id)
        );

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
            Not sure if you need one — or what it would even look like for{" "}
            <span className="font-hand text-2xl text-[var(--p-pink)]">your</span>{" "}
            kind of business? Below are six illustrative builds for different
            kinds of business — what their messy stack looked like before, what
            we built, the custom AI we added, and what the owners said after.
            Pick the one closest to you and imagine the impact.
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
      <section className="px-5 md:px-10 mt-12 md:mt-16">
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
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Examples grid */}
      <section className="px-5 md:px-10 mt-8 md:mt-10">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-7 md:gap-8">
          {visible.map((ex, i) => (
            <div key={ex.id} className={tilts[i % tilts.length]}>
              <ExampleCard ex={ex} index={i} />
            </div>
          ))}
        </div>
      </section>

      {/* "Don't see yours?" CTA */}
      <section className="px-5 md:px-10 mt-16 md:mt-24 mb-16 md:mb-20">
        <div className="max-w-[1400px] mx-auto card-blunt p-7 md:p-10 bg-[var(--ink)] text-[var(--bg)] flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="max-w-2xl">
            <div className="font-hand text-2xl text-[var(--p-yellow)]">
              don't see your kind of business?
            </div>
            <h3 className="display-lg !text-2xl md:!text-3xl text-[var(--bg)] mt-1">
              Tell us about you. We'll sketch what your ecosystem could look like.
            </h3>
            <p className="mt-3 font-body text-sm text-[var(--bg)] opacity-80">
              25 minutes on a call. We'll spot the bottlenecks, the duplicate
              tools, and the 2–3 highest-leverage AI moves for your business —
              free, no pitch.
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
    </PageShell>
  );
}
