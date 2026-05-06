import { motion } from "framer-motion";
import { siteConfig } from "../../lib/siteConfig";

export const Testimonials = () => {
  return (
    <section
      data-testid="testimonials-section"
      className="relative border-t border-[var(--line)]"
    >
      <div className="px-6 md:px-10 py-14 md:py-20 border-b border-[var(--line)]">
        <div className="eyebrow mb-4">[ 04 ] Signal</div>
        <h2 className="display-xl text-[var(--text)] max-w-4xl">
          What founders say<br />
          <span className="text-[var(--accent)]">when we're not in the room.</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3">
        {siteConfig.testimonials.map((t, i) => (
          <motion.figure
            key={t.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            data-testid={`testimonial-${i}`}
            className="p-8 md:p-10 border-b border-r border-[var(--line)] flex flex-col justify-between min-h-[360px]"
          >
            <blockquote className="font-display text-2xl md:text-[1.75rem] leading-[1.1] tracking-tight text-[var(--text)]">
              <span className="text-[var(--accent)]">“</span>
              {t.quote}
              <span className="text-[var(--accent)]">”</span>
            </blockquote>

            <figcaption className="mt-8 flex items-center gap-4">
              <img
                src={t.image}
                alt={t.name}
                className="w-14 h-14 object-cover img-grayscale"
                style={{ borderRadius: 0 }}
                loading="lazy"
              />
              <div>
                <div className="font-mono text-sm text-[var(--text)]">{t.name}</div>
                <div className="font-mono text-xs text-[var(--text-dim)] uppercase tracking-[0.18em]">
                  {t.role}
                </div>
              </div>
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
