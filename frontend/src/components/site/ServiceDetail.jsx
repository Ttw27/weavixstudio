import { Link, useParams, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Check, Sparkles } from "lucide-react";
import { siteConfig, colorMap, waLink } from "../../lib/siteConfig";
import { servicesContent } from "../../lib/servicesContent";
import ProjectPreview from "./ProjectPreview";
import Navbar from "./Navbar";
import Footer from "./Footer";
import StickyWhatsApp from "./StickyWhatsApp";

const tilts = ["tilt-l", "tilt-r", "tilt-l-3", "tilt-r-3", "tilt-r", "tilt-l"];
const ideaPalette = ["yellow", "pink", "blue", "mint", "lilac", "orange"];

export default function ServiceDetail() {
  const { slug } = useParams();
  const content = servicesContent[slug];
  if (!content) return <Navigate to="/services" replace />;

  const serviceMeta = siteConfig.services.find((s) => s.slug === slug);
  const serviceIndex = siteConfig.services.findIndex((s) => s.slug === slug);
  const nextService = siteConfig.services[(serviceIndex + 1) % siteConfig.services.length];
  const relatedProjects = (content.relatedProjects || [])
    .map((id) => siteConfig.projects.find((p) => p.id === id))
    .filter(Boolean);

  return (
    <main data-testid={`service-detail-${slug}`} className="bg-[var(--bg)] min-h-screen">
      <Navbar />

      {/* HERO */}
      <section className="pt-28 md:pt-36 px-5 md:px-10 relative overflow-hidden">
        <div className="absolute top-24 right-[6%] w-24 h-24 rounded-full border-[3px] border-[var(--ink)] shadow-[var(--shadow-blunt)] tilt-r-3 hidden md:block"
             style={{ background: colorMap[content.heroColor] }} />
        <div className="absolute top-44 right-[18%] w-14 h-14 border-[3px] border-[var(--ink)] shadow-[var(--shadow-blunt-sm)] tilt-l rounded-2xl bg-[var(--p-pink)] hidden md:block" />

        <div className="max-w-[1400px] mx-auto relative">
          <Link
            to="/services"
            data-testid="back-to-services"
            className="inline-flex items-center gap-2 font-body text-sm font-bold text-[var(--ink-soft)] hover:text-[var(--ink)]"
          >
            <ArrowLeft className="w-4 h-4" /> All services
          </Link>

          <div className="mt-6 flex items-center gap-2 flex-wrap">
            <span className="sticker" style={{ background: colorMap[content.heroColor] }}>
              {serviceMeta?.tag || "Service"} · {content.code}
            </span>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="display-xxl text-[var(--ink)] mt-6"
          >
            {content.title}<span className="text-[var(--p-pink)]">.</span>
          </motion.h1>

          <p className="mt-6 font-display text-2xl md:text-3xl text-[var(--ink)] max-w-4xl leading-tight">
            <span className="squiggle">{content.tagline}</span>
          </p>

          <p className="mt-6 font-body text-base md:text-lg text-[var(--ink-soft)] max-w-3xl leading-relaxed">
            {content.intro}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={siteConfig.calendlyUrl}
              target="_blank"
              rel="noreferrer"
              data-testid="service-calendly-btn"
              className="btn-pill btn-pill-pink"
            >
              Book a chat
            </a>
            <a
              href={waLink()}
              target="_blank"
              rel="noreferrer"
              data-testid="service-whatsapp-btn"
              className="btn-pill btn-pill-yellow"
            >
              WhatsApp →
            </a>
            {slug === "digital-ecosystems" && (
              <Link
                to="/examples"
                data-testid="service-examples-link"
                className="btn-pill bg-[var(--p-mint)]"
              >
                See ecosystem examples →
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* PAIN POINTS */}
      <section className="px-5 md:px-10 mt-20 md:mt-28">
        <div className="max-w-[1400px] mx-auto">
          <span className="sticker bg-[var(--p-pink)] text-white mb-4">🙈 sound familiar?</span>
          <h2 className="display-xl !text-3xl md:!text-5xl text-[var(--ink)] mt-3 max-w-3xl">
            If any of this is you, keep reading.
          </h2>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
            {content.painPoints.map((pain, i) => (
              <motion.div
                key={pain.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                data-testid={`pain-${i}`}
                className={`card-blunt p-6 md:p-7 ${i % 2 === 0 ? "tilt-l" : "tilt-r"}`}
                style={{ background: "var(--surface)" }}
              >
                <div className="font-hand text-4xl text-[var(--p-pink)] mb-2">"{i + 1}"</div>
                <h3 className="font-display text-xl text-[var(--ink)] leading-tight">
                  {pain.title}
                </h3>
                <p className="mt-3 font-body text-sm text-[var(--ink-soft)] leading-relaxed">
                  {pain.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* IDEAS — THE BIG ONE */}
      <section className="px-5 md:px-10 mt-24 md:mt-32">
        <div className="max-w-[1400px] mx-auto">
          <span className="sticker bg-[var(--p-yellow)] mb-4">
            <Sparkles className="w-3.5 h-3.5" /> imagine if…
          </span>
          <h2 className="display-xl text-[var(--ink)] mt-3 max-w-4xl">
            Ideas you <span className="squiggle">might not have</span> thought of.
          </h2>
          <p className="mt-4 font-body text-base md:text-lg text-[var(--ink-soft)] max-w-2xl">
            A taste of what we actually build. Pick 1, pick 3, or bring your own —
            we'll tell you which ones would move the needle for your business.
          </p>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7">
            {content.ideas.map((idea, i) => (
              <motion.div
                key={idea.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.45, delay: (i % 3) * 0.06 }}
                data-testid={`idea-${i}`}
                className={`card-blunt p-6 md:p-7 ${tilts[i % tilts.length]} flex flex-col justify-between min-h-[240px]`}
                style={{ background: colorMap[ideaPalette[i % ideaPalette.length]] }}
              >
                <div>
                  <span className="sticker bg-[var(--surface)] text-[var(--ink)] !text-[10px]">
                    {idea.tag}
                  </span>
                  <h3 className="mt-4 font-display text-xl md:text-[1.4rem] leading-tight text-[var(--ink)]">
                    {idea.title}
                  </h3>
                </div>
                <p className="mt-5 font-body text-sm text-[var(--ink)] leading-relaxed opacity-90">
                  {idea.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* DELIVERABLES */}
      <section className="px-5 md:px-10 mt-24 md:mt-32">
        <div className="max-w-[1400px] mx-auto">
          <span className="sticker bg-[var(--p-blue)] mb-4">📦 what you get</span>
          <h2 className="display-xl !text-3xl md:!text-5xl text-[var(--ink)] mt-3">
            The deliverables.
          </h2>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {content.deliverables.map((d, i) => (
              <motion.div
                key={d.t}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: (i % 3) * 0.05 }}
                data-testid={`deliverable-${i}`}
                className="card-blunt p-6"
                style={{ background: "var(--surface)" }}
              >
                <div className="flex items-start gap-3">
                  <span
                    className="shrink-0 inline-flex items-center justify-center w-9 h-9 rounded-full border-[2px] border-[var(--ink)]"
                    style={{ background: colorMap[ideaPalette[i % ideaPalette.length]] }}
                  >
                    <Check className="w-4 h-4 text-[var(--ink)]" />
                  </span>
                  <div>
                    <div className="font-display text-lg text-[var(--ink)]">{d.t}</div>
                    <p className="mt-1 font-body text-sm text-[var(--ink-soft)] leading-relaxed">
                      {d.b}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* RELATED PROJECTS */}
      {relatedProjects.length > 0 && (
        <section className="px-5 md:px-10 mt-24 md:mt-32">
          <div className="max-w-[1400px] mx-auto">
            <span className="sticker bg-[var(--p-mint)] mb-4">👀 we've done this</span>
            <h2 className="display-xl !text-3xl md:!text-5xl text-[var(--ink)] mt-3">
              Recent projects.
            </h2>
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
              {relatedProjects.map((p, i) => (
                <Link
                  key={p.id}
                  to={`/work/${p.id}`}
                  data-testid={`related-${p.id}`}
                  className={`group block ${tilts[i % tilts.length]}`}
                >
                  <div className="relative aspect-[4/3] w-full border-[2.5px] border-[var(--ink)] overflow-hidden rounded-3xl shadow-[var(--shadow-blunt)] group-hover:shadow-[var(--shadow-blunt-lg)] group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 transition-all">
                    <ProjectPreview project={p} />
                  </div>
                  <div className="mt-4">
                    <h3 className="font-display text-xl text-[var(--ink)]">{p.title}</h3>
                    <p className="font-body text-sm text-[var(--ink-soft)] mt-1">{p.tagline}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      {content.faq?.length > 0 && (
        <section className="px-5 md:px-10 mt-24 md:mt-32">
          <div className="max-w-[1400px] mx-auto">
            <span className="sticker bg-white mb-4">❓ quick questions</span>
            <h2 className="display-xl !text-3xl md:!text-5xl text-[var(--ink)] mt-3">
              Asked a lot.
            </h2>
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-5">
              {content.faq.map((f, i) => (
                <div
                  key={f.q}
                  data-testid={`service-faq-${i}`}
                  className="card-blunt p-6 md:p-7"
                  style={{ background: "var(--surface)" }}
                >
                  <div className="font-hand text-3xl text-[var(--p-pink)]">Q.</div>
                  <h4 className="mt-1 font-display text-lg text-[var(--ink)] leading-tight">
                    {f.q}
                  </h4>
                  <p className="mt-3 font-body text-sm text-[var(--ink-soft)] leading-relaxed">
                    {f.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA + NEXT SERVICE */}
      <section className="px-5 md:px-10 mt-24 md:mt-32 mb-20 md:mb-28">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <div
            className="card-blunt p-8 md:p-10 flex flex-col justify-between min-h-[260px]"
            style={{ background: colorMap[content.heroColor] }}
          >
            <div className="font-hand text-3xl text-[var(--ink)]">ready to start?</div>
            <h3 className="display-xl !text-3xl md:!text-4xl text-[var(--ink)] mt-2">
              Let's scope your {content.title.toLowerCase()} project.
            </h3>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={siteConfig.calendlyUrl}
                target="_blank"
                rel="noreferrer"
                data-testid="service-cta-calendly"
                className="btn-pill btn-pill-ink"
              >
                Book a 25-min chat
              </a>
              <a
                href={waLink()}
                target="_blank"
                rel="noreferrer"
                data-testid="service-cta-whatsapp"
                className="btn-pill bg-[var(--surface)]"
              >
                Message on WhatsApp
              </a>
            </div>
          </div>

          <Link
            to={`/services/${nextService.slug}`}
            data-testid="next-service"
            className="card-blunt p-8 md:p-10 flex flex-col justify-between min-h-[260px] group"
            style={{ background: colorMap[nextService.color] }}
          >
            <div className="flex items-center justify-between">
              <span className="font-body text-xs uppercase tracking-[0.2em] font-bold opacity-80">
                Next service · {nextService.code}
              </span>
              <ArrowUpRight className="w-6 h-6 group-hover:rotate-45 transition-transform" />
            </div>
            <div>
              <h3 className="display-xl !text-3xl md:!text-5xl text-[var(--ink)]">
                {nextService.title}
              </h3>
              <p className="mt-3 font-body text-sm text-[var(--ink)] opacity-80">{nextService.copy}</p>
            </div>
          </Link>
        </div>
      </section>

      <Footer />
      <StickyWhatsApp />
    </main>
  );
}
