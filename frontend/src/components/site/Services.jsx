import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { siteConfig, colorMap } from "../../lib/siteConfig";

export const Services = ({ hideHeader = false }) => {
  return (
    <section id="services" data-testid="services-section" className="relative py-14 md:py-20 px-5 md:px-10">
      {!hideHeader && (
        <div className="max-w-[1400px] mx-auto mb-10 md:mb-14 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <span className="sticker bg-[var(--p-yellow)] mb-5">★ what we do</span>
            <h2 className="display-xl text-[var(--ink)] max-w-3xl mt-4">
              One studio. <br />
              <span className="squiggle">Eight superpowers.</span>
            </h2>
          </div>
          <p className="font-body text-base text-[var(--ink-soft)] max-w-md leading-relaxed">
            From first pixel to paid scale — pick one, or hand us the whole stack.
            Click any card for ideas you might not have thought of yet.
          </p>
        </div>
      )}

      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {siteConfig.services.map((s, i) => (
          <motion.div
            key={s.code}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: (i % 3) * 0.06 }}
          >
            <Link
              to={`/services/${s.slug}`}
              data-testid={`service-card-${s.code}`}
              className="card-blunt p-7 md:p-8 flex flex-col justify-between min-h-[360px] relative group no-underline"
              style={{ background: colorMap[s.color] }}
            >
              <div className="flex items-start justify-between">
                <span className="font-display text-xl text-[var(--ink)]">{s.code}.</span>
                <span className="sticker bg-white text-[var(--ink)]">{s.tag}</span>
              </div>

              <div className="mt-8">
                <h3 className="display-lg text-[var(--ink)]">{s.title}</h3>
                <p className="mt-4 font-body text-[15px] text-[var(--ink)] leading-relaxed opacity-90">
                  {s.copy}
                </p>
              </div>

              <ul className="mt-6 space-y-1.5 font-body text-sm text-[var(--ink)]">
                {s.deliverables.map((d) => (
                  <li key={d} className="flex items-center gap-2">
                    <span className="font-hand text-xl text-[var(--ink)]">+</span>
                    <span>{d}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex items-center justify-between">
                <span className="font-display text-sm text-[var(--ink)] underline decoration-[2px] underline-offset-4 decoration-[var(--ink)]/40 group-hover:decoration-[var(--ink)]">
                  See ideas & examples
                </span>
                <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-[var(--surface)] border-[2px] border-[var(--ink)] shadow-[3px_3px_0_0_var(--ink)] group-hover:rotate-45 transition-transform">
                  <ArrowUpRight className="w-4 h-4 text-[var(--ink)]" />
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Services;
