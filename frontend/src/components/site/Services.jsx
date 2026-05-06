import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { siteConfig, colorMap } from "../../lib/siteConfig";

export const Services = () => {
  return (
    <section id="services" data-testid="services-section" className="relative py-20 md:py-28 px-5 md:px-10">
      {/* Header */}
      <div className="max-w-[1400px] mx-auto mb-14 md:mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
        <div>
          <span className="sticker bg-[var(--p-yellow)] mb-5">★ what we do</span>
          <h2 className="display-xl text-[var(--ink)] max-w-3xl mt-4">
            One studio. <br />
            <span className="squiggle">Six superpowers.</span>
          </h2>
        </div>
        <p className="font-body text-base text-[var(--ink-soft)] max-w-md leading-relaxed">
          From first pixel to paid scale — we cover the full path from concept
          to conversion. Pick one, or hand us the whole stack.
        </p>
      </div>

      {/* Grid */}
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {siteConfig.services.map((s, i) => (
          <motion.article
            key={s.code}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: (i % 3) * 0.06 }}
            data-testid={`service-card-${s.code}`}
            className="card-blunt p-7 md:p-8 flex flex-col justify-between min-h-[340px] relative"
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

            <ArrowUpRight className="absolute top-7 right-16 w-5 h-5 text-[var(--ink)] opacity-30" aria-hidden />
          </motion.article>
        ))}
      </div>
    </section>
  );
};

export default Services;
