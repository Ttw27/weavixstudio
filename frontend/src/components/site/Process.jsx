import { motion } from "framer-motion";
import { siteConfig, colorMap } from "../../lib/siteConfig";

export const Process = () => {
  return (
    <section
      id="process"
      data-testid="process-section"
      className="relative py-20 md:py-28 px-5 md:px-10"
    >
      <div className="max-w-[1400px] mx-auto mb-14 md:mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
        <div>
          <span className="sticker bg-[var(--p-blue)] mb-5">⚡ how we work</span>
          <h2 className="display-xl text-[var(--ink)] max-w-3xl mt-4">
            Four phases.<br />
            <span className="squiggle">Zero theatrics.</span>
          </h2>
        </div>
        <p className="font-body text-base text-[var(--ink-soft)] max-w-md leading-relaxed">
          Senior operators, async by default, weekly demos. We'd rather ship
          than present.
        </p>
      </div>

      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-7">
        {siteConfig.process.map((step, i) => (
          <motion.div
            key={step.n}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            data-testid={`process-step-${step.n}`}
            className="card-blunt p-7 md:p-8 min-h-[260px] flex flex-col justify-between"
            style={{ background: colorMap[step.color] }}
          >
            <div className="flex items-start justify-between">
              <span className="font-display text-6xl md:text-7xl text-[var(--ink)] leading-none">
                {step.n}
              </span>
              <span className="font-hand text-2xl text-[var(--ink)]">step</span>
            </div>
            <div>
              <h3 className="display-lg text-[var(--ink)]">{step.title}</h3>
              <p className="mt-3 font-body text-sm text-[var(--ink)] leading-relaxed opacity-90">
                {step.body}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Process;
