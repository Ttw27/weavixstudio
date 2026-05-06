import { motion } from "framer-motion";
import { siteConfig } from "../../lib/siteConfig";

// Tetris-inspired layout. Uses col-span / row-span for asymmetry.
const layout = [
  "md:col-span-7 md:row-span-3", // big
  "md:col-span-5 md:row-span-2",
  "md:col-span-5 md:row-span-3",
  "md:col-span-7 md:row-span-2",
  "md:col-span-4 md:row-span-3",
  "md:col-span-8 md:row-span-3",
];

export const Portfolio = () => {
  return (
    <section id="work" data-testid="portfolio-section" className="relative border-t border-[var(--line)]">
      <div className="px-6 md:px-10 py-14 md:py-20 border-b border-[var(--line)] flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div>
          <div className="eyebrow mb-4">[ 02 ] Selected Work</div>
          <h2 className="display-xl text-[var(--text)] max-w-4xl">
            Real projects.<br />
            <span className="text-[var(--accent)]">Real outcomes.</span>
          </h2>
        </div>
        <p className="font-mono text-sm text-[var(--text-dim)] max-w-md">
          A slice of recent work across web, AI, apps, paid and organic.
          Full case studies on request.
        </p>
      </div>

      <div
        className="grid grid-cols-1 md:grid-cols-12 auto-rows-[180px] md:auto-rows-[140px]"
        style={{ gridAutoFlow: "dense" }}
      >
        {siteConfig.projects.map((p, i) => (
          <motion.a
            key={p.id}
            href="#contact"
            data-testid={`project-card-${p.id}`}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: (i % 3) * 0.08 }}
            className={`group relative overflow-hidden border-b border-r border-[var(--line)] ${layout[i % layout.length]}`}
          >
            <img
              src={p.image}
              alt={p.title}
              className="absolute inset-0 w-full h-full object-cover img-grayscale"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10 group-hover:from-black/95 transition-all" />

            <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-between">
              <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--text-dim)]">
                <span>{p.id}</span>
                <span className="border border-[var(--line)] bg-black/60 backdrop-blur-sm px-2 py-1">
                  {p.kind}
                </span>
              </div>

              <div>
                <h3 className="font-display uppercase tracking-tight leading-none text-2xl md:text-4xl text-[var(--text)]">
                  {p.title}
                </h3>
                <div className="mt-3 flex items-end justify-between gap-4">
                  <div>
                    <p className="font-mono text-xs text-[var(--text-dim)]">
                      {p.client}
                    </p>
                    <p className="font-mono text-sm text-[var(--text)] mt-1">
                      {p.summary}
                    </p>
                  </div>
                  <div className="hidden sm:flex flex-col items-end gap-1">
                    {p.metrics.map((m) => (
                      <span
                        key={m}
                        className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--accent)]"
                      >
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
};

export default Portfolio;
