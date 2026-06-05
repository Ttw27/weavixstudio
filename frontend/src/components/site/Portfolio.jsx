import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { siteConfig } from "../../lib/siteConfig";
import ProjectPreview from "./ProjectPreview";

const tilts = ["tilt-l", "tilt-r", "tilt-l-3", "tilt-r-3", "tilt-r", "tilt-l"];

export const Portfolio = ({ hideHeader = false }) => {
  return (
    <section
      id="work"
      data-testid="portfolio-section"
      className="relative py-14 md:py-20 px-5 md:px-10 bg-[var(--bg-2)]"
    >
      {!hideHeader && (
        <div className="max-w-[1400px] mx-auto mb-10 md:mb-14 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <span className="sticker bg-[var(--p-pink)] text-white mb-5">♥ recent work</span>
            <h2 className="display-xl text-[var(--ink)] max-w-3xl mt-4">
              Real projects.<br />
              <span className="squiggle">Real outcomes.</span>
            </h2>
          </div>
          <p className="font-body text-base text-[var(--ink-soft)] max-w-md leading-relaxed">
            A slice of recent work across web, AI, apps, paid and organic.
            Click a card for the features, stack and results.
          </p>
        </div>
      )}

      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 md:gap-9">
        {siteConfig.projects.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: (i % 3) * 0.06 }}
            className={tilts[i % tilts.length]}
          >
            <Link
              to={`/work/${p.id}`}
              data-testid={`project-card-${p.id}`}
              className="block group"
            >
              {/* Preview tile */}
              <div className="relative aspect-[4/3] w-full border-[2.5px] border-[var(--ink)] overflow-hidden rounded-3xl shadow-[var(--shadow-blunt)] group-hover:shadow-[var(--shadow-blunt-lg)] group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 transition-all">
                <ProjectPreview project={p} />
              </div>

              {/* Meta */}
              <div className="mt-5 flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap mb-2">
                    <span className="sticker bg-white text-[var(--ink)]">{p.kind}</span>
                    <span className="font-body text-xs font-bold text-[var(--ink-soft)]">
                      {p.client} · {p.year}
                    </span>
                  </div>
                  <h3 className="font-display text-2xl text-[var(--ink)] leading-tight">
                    {p.title}
                  </h3>
                  <p className="font-body text-sm text-[var(--ink-soft)] mt-1 leading-snug">
                    {p.tagline}
                  </p>

                  {p.results?.length > 0 && (
                    <div className="mt-3 flex gap-2 flex-wrap">
                      {p.results.slice(0, 2).map((r) => (
                        <span
                          key={r.k}
                          className="text-[11px] font-bold text-[var(--ink)] bg-[var(--p-yellow)] border-[1.5px] border-[var(--ink)] px-2 py-0.5 rounded-full"
                        >
                          {r.v} {r.k.toLowerCase()}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="shrink-0 mt-1">
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[var(--p-pink)] border-[2px] border-[var(--ink)] shadow-[3px_3px_0_0_var(--ink)] group-hover:rotate-45 transition-transform">
                    <ArrowUpRight className="w-4 h-4 text-[var(--ink)]" />
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="max-w-[1400px] mx-auto mt-10 md:mt-14 flex justify-center">
        <Link
          to="/contact"
          data-testid="portfolio-cta"
          className="btn-pill btn-pill-ink"
        >
          Got a project? Let's talk →
        </Link>
      </div>
    </section>
  );
};

export default Portfolio;
