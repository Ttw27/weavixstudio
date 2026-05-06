import { Link, useParams, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Check, ExternalLink } from "lucide-react";
import { siteConfig, colorMap, waLink } from "../../lib/siteConfig";
import ProjectPreview from "./ProjectPreview";
import Navbar from "./Navbar";
import Footer from "./Footer";
import StickyWhatsApp from "./StickyWhatsApp";

export default function ProjectDetail() {
  const { id } = useParams();
  const idx = siteConfig.projects.findIndex((p) => p.id === id);
  if (idx === -1) return <Navigate to="/" replace />;
  const p = siteConfig.projects[idx];
  const next = siteConfig.projects[(idx + 1) % siteConfig.projects.length];

  return (
    <main data-testid={`project-detail-${p.id}`} className="bg-[var(--bg)] min-h-screen">
      <Navbar />

      <section className="pt-28 md:pt-36 px-5 md:px-10">
        <div className="max-w-[1400px] mx-auto">
          <Link
            to="/#work"
            data-testid="back-to-work"
            className="inline-flex items-center gap-2 font-body text-sm font-bold text-[var(--ink-soft)] hover:text-[var(--ink)]"
          >
            <ArrowLeft className="w-4 h-4" /> All work
          </Link>

          <div className="mt-6 flex items-center gap-2 flex-wrap">
            <span className="sticker bg-[var(--p-yellow)]">{p.kind}</span>
            <span className="sticker bg-[var(--p-blue)]">{p.client}</span>
            <span className="sticker bg-white">{p.year}</span>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="display-xxl text-[var(--ink)] mt-6"
          >
            {p.title}
          </motion.h1>

          <p className="mt-6 font-body text-lg md:text-xl text-[var(--ink-soft)] max-w-3xl leading-relaxed">
            {p.tagline}
          </p>

          {p.url && (
            <a
              href={p.url}
              target="_blank"
              rel="noreferrer"
              data-testid="project-visit"
              className="btn-pill btn-pill-yellow mt-8"
            >
              Visit live site <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </section>

      {/* Hero preview */}
      <section className="px-5 md:px-10 mt-12 md:mt-16">
        <div className="max-w-[1400px] mx-auto">
          <div
            className={`relative aspect-[16/9] w-full border-[3px] border-[var(--ink)] overflow-hidden rounded-3xl shadow-[var(--shadow-blunt-lg)] tilt-r-3`}
          >
            <ProjectPreview project={p} />
          </div>
        </div>
      </section>

      {/* Overview + results */}
      <section className="px-5 md:px-10 mt-20 md:mt-28">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <span className="sticker bg-[var(--p-pink)] text-white mb-4">★ overview</span>
            <h2 className="display-xl !text-3xl md:!text-4xl text-[var(--ink)] mt-3 max-w-2xl">
              {p.summary}
            </h2>
          </div>
          <div className="card-blunt p-6 md:p-7" style={{ background: "var(--p-mint)" }}>
            <div className="font-hand text-3xl text-[var(--ink)]">results</div>
            <ul className="mt-3 space-y-3">
              {p.results.map((r) => (
                <li key={r.k} className="flex items-baseline justify-between gap-3 border-b-2 border-dashed border-[var(--ink)]/40 pb-2">
                  <span className="font-body text-sm font-bold text-[var(--ink)]">{r.k}</span>
                  <span className="font-display text-2xl text-[var(--ink)]">{r.v}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-5 md:px-10 mt-20 md:mt-28">
        <div className="max-w-[1400px] mx-auto">
          <span className="sticker bg-[var(--p-yellow)] mb-4">✦ what's inside</span>
          <h2 className="display-xl !text-3xl md:!text-5xl text-[var(--ink)] mt-3">
            Features we built.
          </h2>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {p.features.map((f, i) => (
              <motion.div
                key={f}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: (i % 3) * 0.05 }}
                data-testid={`feature-${i}`}
                className="card-blunt p-5 flex items-start gap-3"
                style={{ background: "var(--surface)" }}
              >
                <span
                  className="shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-full border-[2px] border-[var(--ink)]"
                  style={{ background: colorMap[["yellow", "pink", "blue", "mint", "lilac", "orange"][i % 6]] }}
                >
                  <Check className="w-4 h-4 text-[var(--ink)]" />
                </span>
                <p className="font-body text-sm md:text-[15px] text-[var(--ink)] leading-snug font-semibold">
                  {f}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech stack */}
      <section className="px-5 md:px-10 mt-20 md:mt-28">
        <div className="max-w-[1400px] mx-auto">
          <span className="sticker bg-[var(--p-blue)] mb-4">⚙ stack</span>
          <h2 className="display-xl !text-3xl md:!text-5xl text-[var(--ink)] mt-3">
            Built with.
          </h2>
          <div className="mt-8 flex flex-wrap gap-3">
            {p.tech.map((t) => (
              <span
                key={t}
                data-testid={`tech-${t}`}
                className="font-display text-base px-4 py-2 bg-[var(--surface)] border-[2.5px] border-[var(--ink)] rounded-full shadow-[3px_3px_0_0_var(--ink)]"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA + next */}
      <section className="px-5 md:px-10 mt-24 md:mt-32 mb-20 md:mb-28">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <div
            className="card-blunt p-8 md:p-10 flex flex-col justify-between min-h-[260px]"
            style={{ background: "var(--p-pink)" }}
          >
            <div className="font-hand text-3xl text-[var(--ink)]">like what you see?</div>
            <h3 className="display-xl !text-3xl md:!text-4xl text-[var(--ink)] mt-2">
              Tell us about your project.
            </h3>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={siteConfig.calendlyUrl}
                target="_blank"
                rel="noreferrer"
                data-testid="detail-calendly"
                className="btn-pill btn-pill-yellow"
              >
                Book a chat
              </a>
              <a
                href={waLink()}
                target="_blank"
                rel="noreferrer"
                data-testid="detail-whatsapp"
                className="btn-pill btn-pill-ink"
              >
                WhatsApp →
              </a>
            </div>
          </div>

          <Link
            to={`/work/${next.id}`}
            data-testid="next-project"
            className="card-blunt p-8 md:p-10 flex flex-col justify-between min-h-[260px] group"
            style={{ background: next.preview.bg, color: next.preview.fg }}
          >
            <div className="flex items-center justify-between">
              <span className="font-body text-xs uppercase tracking-[0.2em] font-bold opacity-80">
                Next project
              </span>
              <ArrowUpRight className="w-6 h-6 group-hover:rotate-45 transition-transform" />
            </div>
            <div>
              <h3 className="display-xl !text-3xl md:!text-4xl">{next.title}</h3>
              <p className="mt-2 font-body text-sm opacity-80">{next.tagline}</p>
            </div>
          </Link>
        </div>
      </section>

      <Footer />
      <StickyWhatsApp />
    </main>
  );
}
