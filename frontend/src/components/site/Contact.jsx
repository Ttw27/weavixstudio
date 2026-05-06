import { motion } from "framer-motion";
import { ArrowUpRight, Calendar, MessageCircle } from "lucide-react";
import { siteConfig, waLink } from "../../lib/siteConfig";

export const Contact = () => {
  return (
    <section
      id="contact"
      data-testid="contact-section"
      className="relative border-t border-[var(--line)] overflow-hidden noise-overlay"
    >
      <div className="px-6 md:px-10 py-20 md:py-32">
        <div className="eyebrow mb-6">[ 05 ] Let's talk</div>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="display-xxl text-[var(--text)]"
        >
          LET'S<br />
          <span className="text-[var(--accent)]">BUILD.</span>
        </motion.h2>

        <p className="mt-10 max-w-2xl font-mono text-base text-[var(--text-dim)]">
          Tell us what you're working on. We'll tell you — honestly — whether we
          can help. Intro calls are free and last 25 minutes.
        </p>

        {/* CTA Row */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-0 border-t border-l border-[var(--line)]">
          <a
            href={siteConfig.calendlyUrl}
            target="_blank"
            rel="noreferrer"
            data-testid="contact-calendly-btn"
            className="group relative p-8 md:p-12 border-r border-b border-[var(--line)] bg-[var(--accent)] text-[#0a0a0a] hover:bg-[var(--accent-hover)] transition-colors flex flex-col justify-between min-h-[260px]"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs uppercase tracking-[0.24em]">
                Calendly
              </span>
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display text-4xl md:text-6xl leading-none uppercase tracking-tighter">
                Book a call
              </h3>
              <p className="mt-4 font-mono text-sm opacity-80">
                25 min · Google Meet · no prep required
              </p>
            </div>
            <ArrowUpRight className="absolute top-8 right-8 w-6 h-6 opacity-0 group-hover:opacity-100 transition" />
          </a>

          <a
            href={waLink()}
            target="_blank"
            rel="noreferrer"
            data-testid="contact-whatsapp-btn"
            className="group relative p-8 md:p-12 border-r border-b border-[var(--line)] hover:bg-[var(--surface)] transition-colors flex flex-col justify-between min-h-[260px]"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs uppercase tracking-[0.24em] text-[var(--text-dim)]">
                WhatsApp
              </span>
              <MessageCircle className="w-5 h-5 text-[var(--text)]" />
            </div>
            <div>
              <h3 className="font-display text-4xl md:text-6xl leading-none uppercase tracking-tighter text-[var(--text)]">
                Message us
              </h3>
              <p className="mt-4 font-mono text-sm text-[var(--text-dim)]">
                Fastest reply · usually under 2h (business hours)
              </p>
            </div>
            <ArrowUpRight className="absolute top-8 right-8 w-6 h-6 text-[var(--text-dim)] opacity-0 group-hover:opacity-100 transition" />
          </a>
        </div>

        {/* FAQ */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-0 border-l border-t border-[var(--line)]">
          {siteConfig.faqs.map((f, i) => (
            <div
              key={f.q}
              data-testid={`faq-${i}`}
              className="p-6 md:p-8 border-r border-b border-[var(--line)]"
            >
              <div className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--accent)]">
                FAQ · {String(i + 1).padStart(2, "0")}
              </div>
              <h4 className="mt-3 font-display uppercase text-xl leading-tight tracking-tight text-[var(--text)]">
                {f.q}
              </h4>
              <p className="mt-3 font-mono text-sm text-[var(--text-dim)] leading-relaxed">
                {f.a}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Contact;
