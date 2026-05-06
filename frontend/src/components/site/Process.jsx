import { motion } from "framer-motion";
import { siteConfig } from "../../lib/siteConfig";

export const Process = () => {
  return (
    <section id="process" data-testid="process-section" className="relative border-t border-[var(--line)]">
      <div className="px-6 md:px-10 py-14 md:py-20 border-b border-[var(--line)] flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div>
          <div className="eyebrow mb-4">[ 03 ] How we work</div>
          <h2 className="display-xl text-[var(--text)] max-w-4xl">
            Four phases.<br />
            <span className="outline-text">Zero theatrics.</span>
          </h2>
        </div>
        <p className="font-mono text-sm text-[var(--text-dim)] max-w-md">
          Senior operators, async by default, weekly demos. We'd rather ship
          than present.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2">
        {siteConfig.process.map((step, i) => (
          <motion.div
            key={step.n}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: (i % 2) * 0.1 }}
            data-testid={`process-step-${step.n}`}
            className="relative p-8 md:p-12 border-b border-r border-[var(--line)] overflow-hidden min-h-[260px]"
          >
            <span className="proc-number absolute -top-4 md:-top-6 right-4 md:right-8 text-[9rem] md:text-[14rem] pointer-events-none select-none">
              {step.n}
            </span>

            <div className="relative">
              <div className="eyebrow text-[var(--accent)]">PHASE {step.n}</div>
              <h3 className="mt-4 display-lg text-[var(--text)]">{step.title}</h3>
              <p className="mt-4 font-mono text-sm text-[var(--text-dim)] leading-relaxed max-w-md">
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
