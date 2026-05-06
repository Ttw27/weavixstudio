import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { siteConfig } from "../../lib/siteConfig";

export const Services = () => {
  return (
    <section id="services" data-testid="services-section" className="relative border-t border-[var(--line)]">
      {/* Header */}
      <div className="px-6 md:px-10 py-14 md:py-20 border-b border-[var(--line)] flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div>
          <div className="eyebrow mb-4">[ 01 ] Services</div>
          <h2 className="display-xl text-[var(--text)] max-w-4xl">
            One studio.<br />
            <span className="outline-text">Six capabilities.</span>
          </h2>
        </div>
        <p className="font-mono text-sm text-[var(--text-dim)] max-w-md">
          From first pixel to paid scale — we cover the full path from concept
          to conversion. Pick one, or hand us the whole stack.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {siteConfig.services.map((s, i) => (
          <motion.article
            key={s.code}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: (i % 3) * 0.08 }}
            data-testid={`service-card-${s.code}`}
            className="group relative p-8 md:p-10 border-b border-r border-[var(--line)] min-h-[340px] flex flex-col justify-between hover:bg-[var(--surface)] transition-colors"
          >
            <div className="flex items-start justify-between">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--text-dim)]">
                {s.code}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] border border-[var(--line)] px-2 py-1 text-[var(--text-dim)]">
                {s.tag}
              </span>
            </div>

            <div className="mt-10">
              <h3 className="display-lg text-[var(--text)]">{s.title}</h3>
              <p className="mt-5 font-mono text-sm text-[var(--text-dim)] leading-relaxed">
                {s.copy}
              </p>
            </div>

            <ul className="mt-8 space-y-1 font-mono text-xs text-[var(--text-dim)]">
              {s.deliverables.map((d) => (
                <li key={d} className="flex items-center gap-2">
                  <span className="text-[var(--accent)]">+</span>
                  <span>{d}</span>
                </li>
              ))}
            </ul>

            <ArrowUpRight
              className="absolute top-8 right-8 w-5 h-5 text-[var(--text-dim)] opacity-0 group-hover:opacity-100 group-hover:text-[var(--accent)] transition-opacity"
              aria-hidden
            />
          </motion.article>
        ))}
      </div>
    </section>
  );
};

export default Services;
