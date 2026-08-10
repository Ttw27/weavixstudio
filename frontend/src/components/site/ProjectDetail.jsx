import { useEffect, useState } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Check, ExternalLink } from "lucide-react";
import axios from "axios";
import { siteConfig, colorMap, waLink } from "../../lib/siteConfig";
import Navbar from "./Navbar";
import Footer from "./Footer";
import StickyWhatsApp from "./StickyWhatsApp";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

// Map a DB project doc onto the shape this page renders. Falls back across the
// old siteConfig field names so legacy/hardcoded projects still display.
function normalise(p) {
  return {
    id: p.slug || p.id,
    title: p.title,
    summary: p.summary || p.tagline || "",
    tags: p.tags && p.tags.length ? p.tags : [p.kind, p.client, p.year].filter(Boolean),
    liveUrl: p.live_url || p.url || "",
    imageUrl: p.image_url || "",
    gallery: p.gallery || [],
    bg: p.bg_color || "#161616",
    fg: p.fg_color || "#FFFBF0",
    features: p.what_we_did && p.what_we_did.length ? p.what_we_did : p.features || [],
    outcomes: p.outcomes && p.outcomes.length ? p.outcomes : (p.results || []).map((r) => `${r.k}: ${r.v}`),
    // rich case-study copy (empty string if not present)
    signature: p.signature || "",
    ownership: p.ownership || "",
    replaced: p.replaced || "",
    closing: p.closing || "",
    tech: p.tech || [],
  };
}

export default function ProjectDetail() {
  const { id } = useParams();
  const [projects, setProjects] = useState(null); // null = loading
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    axios
      .get(`${API}/projects`)
      .then((r) => {
        if (Array.isArray(r.data) && r.data.length > 0) {
          setProjects(r.data.map(normalise));
        } else {
          // fall back to hardcoded config if the API returns nothing
          setProjects((siteConfig.projects || []).map(normalise));
        }
      })
      .catch(() => {
        setProjects((siteConfig.projects || []).map(normalise));
        setFailed(true);
      });
  }, []);

  if (projects === null) {
    return (
      <main className="bg-[var(--bg)] min-h-screen">
        <Navbar />
        <div className="pt-40 px-5 md:px-10 max-w-[1400px] mx-auto">
          <div className="font-hand text-3xl text-[var(--ink-soft)]">loading…</div>
        </div>
      </main>
    );
  }

  const idx = projects.findIndex((p) => p.id === id);
  if (idx === -1) return <Navigate to="/work" replace />;
  const p = projects[idx];
  const next = projects[(idx + 1) % projects.length];

  const accents = ["yellow", "pink", "blue", "mint", "lilac", "orange"];

  return (
    <main data-testid={`project-detail-${p.id}`} className="bg-[var(--bg)] min-h-screen">
      <Navbar />

      {/* Header */}
      <section className="pt-28 md:pt-36 px-5 md:px-10">
        <div className="max-w-[1400px] mx-auto">
          <Link
            to="/work"
            data-testid="back-to-work"
            className="inline-flex items-center gap-2 font-body text-sm font-bold text-[var(--ink-soft)] hover:text-[var(--ink)]"
          >
            <ArrowLeft className="w-4 h-4" /> All work
          </Link>

          {p.tags.length > 0 && (
            <div className="mt-6 flex items-center gap-2 flex-wrap">
              {p.tags.map((t, i) => (
                <span
                  key={t}
                  className="sticker"
                  style={{ background: colorMap[accents[i % accents.length]] }}
                >
                  {t}
                </span>
              ))}
            </div>
          )}

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="display-xxl text-[var(--ink)] mt-6"
          >
            {p.title}
          </motion.h1>

          <p className="mt-6 font-body text-lg md:text-xl text-[var(--ink-soft)] max-w-3xl leading-relaxed">
            {p.summary}
          </p>

          {p.liveUrl && (
            <a
              href={p.liveUrl}
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

      {/* Hero — real screenshot if present, else branded panel */}
      <section className="px-5 md:px-10 mt-12 md:mt-16">
        <div className="max-w-[1400px] mx-auto">
          <div className="relative aspect-[16/9] w-full border-[3px] border-[var(--ink)] overflow-hidden rounded-3xl shadow-[var(--shadow-blunt-lg)] tilt-r-3">
            {p.imageUrl ? (
              <img src={p.imageUrl} alt={p.title} className="absolute inset-0 w-full h-full object-cover" />
            ) : (
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{ background: p.bg, color: p.fg }}
              >
                <span className="font-display text-4xl md:text-6xl tracking-tight">{p.title}</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Overview + outcomes */}
      <section className="px-5 md:px-10 mt-20 md:mt-28">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <span className="sticker bg-[var(--p-pink)] text-white mb-4">★ overview</span>
            {p.signature ? (
              <h2 className="display-xl !text-3xl md:!text-4xl text-[var(--ink)] mt-3 max-w-2xl">
                {p.signature}
              </h2>
            ) : (
              <h2 className="display-xl !text-3xl md:!text-4xl text-[var(--ink)] mt-3 max-w-2xl">
                {p.summary}
              </h2>
            )}
          </div>
          {p.outcomes.length > 0 && (
            <div className="card-blunt p-6 md:p-7" style={{ background: "var(--p-mint)" }}>
              <div className="font-hand text-3xl text-[var(--ink)]">what changed</div>
              <ul className="mt-3 space-y-3">
                {p.outcomes.map((o) => (
                  <li
                    key={o}
                    className="flex items-start gap-2 border-b-2 border-dashed border-[var(--ink)]/40 pb-2"
                  >
                    <Check className="w-4 h-4 mt-1 shrink-0 text-[var(--ink)]" />
                    <span className="font-body text-sm font-bold text-[var(--ink)]">{o}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      {/* Features */}
      {p.features.length > 0 && (
        <section className="px-5 md:px-10 mt-20 md:mt-28">
          <div className="max-w-[1400px] mx-auto">
            <span className="sticker bg-[var(--p-yellow)] mb-4">✦ what's inside</span>
            <h2 className="display-xl !text-3xl md:!text-5xl text-[var(--ink)] mt-3">
              What we built.
            </h2>

            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
              {p.features.map((f, i) => (
                <motion.div
                  key={i}
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
                    style={{ background: colorMap[accents[i % 6]] }}
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
      )}

      {/* Ownership + replaced */}
      {(p.ownership || p.replaced) && (
        <section className="px-5 md:px-10 mt-20 md:mt-28">
          <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {p.ownership && (
              <div className="card-blunt p-7 md:p-9" style={{ background: "var(--p-blue)" }}>
                <div className="font-hand text-3xl text-[var(--ink)]">what they own</div>
                <p className="mt-3 font-body text-[15px] md:text-base text-[var(--ink)] leading-relaxed">
                  {p.ownership}
                </p>
              </div>
            )}
            {p.replaced && (
              <div className="card-blunt p-7 md:p-9" style={{ background: "var(--surface)" }}>
                <div className="font-hand text-3xl text-[var(--ink)]">what it replaced</div>
                <p className="mt-3 font-body text-[15px] md:text-base text-[var(--ink)] leading-relaxed">
                  {p.replaced}
                </p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Gallery */}
      {p.gallery.length > 0 && (
        <section className="px-5 md:px-10 mt-20 md:mt-28">
          <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-5">
            {p.gallery.map((src, i) => (
              <div
                key={i}
                className="border-[3px] border-[var(--ink)] rounded-2xl overflow-hidden shadow-[var(--shadow-blunt)]"
              >
                <img src={src} alt={`${p.title} ${i + 1}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Tech stack (only if provided) */}
      {p.tech.length > 0 && (
        <section className="px-5 md:px-10 mt-20 md:mt-28">
          <div className="max-w-[1400px] mx-auto">
            <span className="sticker bg-[var(--p-blue)] mb-4">⚙ stack</span>
            <h2 className="display-xl !text-3xl md:!text-5xl text-[var(--ink)] mt-3">Built with.</h2>
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
      )}

      {/* Closing stamp */}
      {p.closing && (
        <section className="px-5 md:px-10 mt-20 md:mt-28">
          <div className="max-w-[1400px] mx-auto">
            <div
              className="card-blunt p-8 md:p-12 text-center"
              style={{ background: "var(--p-mint)" }}
            >
              <p className="font-display text-2xl md:text-4xl text-[var(--ink)] leading-tight max-w-4xl mx-auto">
                {p.closing}
              </p>
            </div>
          </div>
        </section>
      )}

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
                WhatsApp us
              </a>
            </div>
          </div>

          {next && (
            <Link
              to={`/work/${next.id}`}
              data-testid="next-project"
              className="card-blunt p-8 md:p-10 flex flex-col justify-between min-h-[260px] group"
              style={{ background: next.bg, color: next.fg }}
            >
              <div className="font-hand text-3xl" style={{ color: next.fg }}>
                next up
              </div>
              <h3 className="display-xl !text-3xl md:!text-4xl mt-2" style={{ color: next.fg }}>
                {next.title}
              </h3>
              <span className="mt-6 inline-flex items-center gap-2 font-body text-sm font-bold" style={{ color: next.fg }}>
                View project <ExternalLink className="w-4 h-4" />
              </span>
            </Link>
          )}
        </div>
      </section>

      <StickyWhatsApp />
      <Footer />
    </main>
  );
}
