import { motion } from "framer-motion";
import { siteConfig, colorMap } from "../../lib/siteConfig";

export const Testimonials = () => {
  return (
    <section
      data-testid="testimonials-section"
      className="relative py-14 md:py-20 px-5 md:px-10 bg-[var(--bg-2)]"
    >
      <div className="max-w-[1400px] mx-auto mb-10 md:mb-14">
        <span className="sticker bg-[var(--p-mint)] mb-5">💬 kind words</span>
        <h2 className="display-xl text-[var(--ink)] max-w-3xl mt-4">
          What founders say<br />
          <span className="squiggle">when we're not in the room.</span>
        </h2>
      </div>

      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {siteConfig.testimonials.map((t, i) => (
          <motion.figure
            key={t.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            data-testid={`testimonial-${i}`}
            className={`card-blunt p-7 md:p-8 flex flex-col justify-between min-h-[340px] ${
              i % 2 === 0 ? "tilt-l" : "tilt-r"
            }`}
            style={{ background: colorMap[t.color] }}
          >
            <div>
              <span className="font-hand text-5xl text-[var(--ink)] leading-none">"</span>
              <blockquote className="mt-2 font-display text-xl md:text-[1.5rem] leading-tight text-[var(--ink)]">
                {t.quote}
              </blockquote>
            </div>
            <figcaption className="mt-6 flex items-center gap-3">
              <img
                src={t.image}
                alt={t.name}
                className="w-12 h-12 rounded-full object-cover border-[2.5px] border-[var(--ink)]"
                loading="lazy"
              />
              <div>
                <div className="font-display text-base text-[var(--ink)]">{t.name}</div>
                <div className="font-body text-xs font-bold text-[var(--ink)] opacity-70">
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
