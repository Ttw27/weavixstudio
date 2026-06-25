import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Calendar, MessageCircle, Sparkles } from "lucide-react";
import axios from "axios";
import PageShell from "./PageShell";
import { useSiteSettings, liveWaLink } from "../lib/SiteSettings";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function ProjectDetailPage() {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const { settings } = useSiteSettings();

  useEffect(() => {
    axios.get(`${API}/projects`)
      .then((r) => {
        const list = r.data || [];
        const match = list.find((p) => p.slug === slug) || list.find((p) => p.id === slug);
        if (match) setProject(match);
        else setNotFound(true);
      })
      .catch(() => setNotFound(true));
  }, [slug]);

  if (notFound) {
    return (
      <PageShell testId="project-not-found">
        <section className="px-5 md:px-10 py-20 text-center max-w-2xl mx-auto">
          <h1 className="font-display text-3xl text-[var(--ink)]">Project not found</h1>
          <p className="mt-3 font-body text-sm text-[var(--ink-soft)]">
            It might have been retired or unpublished.
          </p>
          <Link to="/work" className="btn-pill btn-pill-pink mt-6 inline-flex">
            <ArrowLeft className="w-4 h-4" /> Back to work
          </Link>
        </section>
      </PageShell>
    );
  }

  if (!project) {
    return (
      <PageShell testId="project-loading">
        <div className="px-5 md:px-10 py-20 text-center font-body text-[var(--ink-soft)]">
          Loading…
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell testId="project-detail-page">
      <section className="px-5 md:px-10">
        <div className="max-w-[1100px] mx-auto">
          <Link to="/work" className="font-display text-sm text-[var(--p-pink)] hover:underline inline-flex items-center gap-1.5">
            <ArrowLeft className="w-3.5 h-3.5" /> All work
          </Link>

          {/* Header */}
          <div className="mt-6">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              {project.tags?.map((t) => (
                <span key={t} className="sticker bg-[var(--p-yellow)]">{t}</span>
              ))}
              {project.featured && <span className="sticker bg-[var(--p-pink)] text-white">★ featured</span>}
            </div>
            <h1 className="display-xl text-[var(--ink)] max-w-4xl">{project.title}</h1>
            <p className="mt-4 font-body text-base md:text-lg text-[var(--ink-soft)] max-w-3xl leading-relaxed">
              {project.summary}
            </p>
            {project.live_url && (
              <a
                href={project.live_url}
                target="_blank"
                rel="noreferrer"
                data-testid="project-live-cta"
                className="btn-pill btn-pill-ink mt-6"
              >
                Visit the live site <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>

          {/* Hero image */}
          {project.image_url && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-10 card-blunt overflow-hidden aspect-[16/10]"
            >
              <img
                src={project.image_url}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </motion.div>
          )}

          {/* What we did + outcomes */}
          <div className="mt-12 grid md:grid-cols-2 gap-6 md:gap-8">
            {project.what_we_did?.length > 0 && (
              <div className="card-blunt p-6 md:p-8 bg-[var(--surface)]">
                <div className="font-hand text-2xl text-[var(--p-pink)] mb-3">what we did</div>
                <ul className="space-y-2.5">
                  {project.what_we_did.map((w, i) => (
                    <li key={i} className="flex items-start gap-2 font-body text-sm md:text-base text-[var(--ink)]">
                      <span className="text-[var(--p-pink)] font-bold mt-0.5">+</span>
                      <span>{w}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {project.outcomes?.length > 0 && (
              <div className="card-blunt p-6 md:p-8 bg-[var(--p-yellow)]">
                <div className="font-hand text-2xl text-[var(--ink)] mb-3">
                  <Sparkles className="w-5 h-5 inline-block mr-1" /> what changed
                </div>
                <ul className="space-y-2.5">
                  {project.outcomes.map((o, i) => (
                    <li key={i} className="flex items-start gap-2 font-body text-sm md:text-base text-[var(--ink)] font-medium">
                      <span className="text-[var(--ink)] font-bold mt-0.5">→</span>
                      <span>{o}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Gallery */}
          {project.gallery?.length > 0 && (
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-5">
              {project.gallery.map((src, i) => (
                <div key={i} className="card-blunt overflow-hidden aspect-[16/10] bg-[var(--bg-2)]">
                  <img src={src} alt={`${project.title} screenshot ${i+1}`} className="w-full h-full object-cover" loading="lazy" />
                </div>
              ))}
            </div>
          )}

          {/* Quote */}
          {project.client_quote && (
            <div className="mt-12 card-blunt p-7 md:p-10 bg-[var(--ink)] text-[var(--bg)]">
              <blockquote className="font-display text-2xl md:text-3xl leading-tight">
                <span className="font-hand text-4xl text-[var(--p-pink)]">"</span>
                {project.client_quote}
                <span className="font-hand text-4xl text-[var(--p-pink)]">"</span>
              </blockquote>
              {project.client_quote_by && (
                <div className="mt-3 font-body text-sm opacity-80">— {project.client_quote_by}</div>
              )}
            </div>
          )}

          {/* CTA */}
          <div className="mt-14 mb-20 card-blunt p-7 md:p-10 bg-[var(--p-mint)] flex flex-col md:flex-row md:items-center md:justify-between gap-5">
            <div className="max-w-xl">
              <div className="font-hand text-2xl text-[var(--p-pink)]">want this for your business?</div>
              <h3 className="display-lg !text-2xl md:!text-3xl text-[var(--ink)] mt-1">
                Tell us about you. We'll sketch what would actually move the needle.
              </h3>
            </div>
            <div className="flex flex-wrap gap-2 shrink-0">
              <a href={settings.calendlyUrl} target="_blank" rel="noreferrer" className="btn-pill btn-pill-pink">
                <Calendar className="w-4 h-4" /> Book a chat
              </a>
              <a href={liveWaLink(settings)} target="_blank" rel="noreferrer" className="btn-pill bg-[var(--surface)]">
                <MessageCircle className="w-4 h-4" /> WhatsApp
              </a>
              <Link to="/readiness-plan" className="btn-pill btn-pill-yellow">
                Free readiness plan
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
