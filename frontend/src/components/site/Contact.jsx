import { motion } from "framer-motion";
import { Calendar, MessageCircle, ArrowUpRight } from "lucide-react";
import { siteConfig, waLink } from "../../lib/siteConfig";

export const Contact = () => {
  return (
    <section
      id="contact"
      data-testid="contact-section"
      className="relative py-14 md:py-20 px-5 md:px-10 overflow-hidden"
    >
      {/* Floating fun shapes */}
      <div className="absolute top-20 right-[5%] w-24 h-24 rounded-full bg-[var(--p-yellow)] border-[3px] border-[var(--ink)] shadow-[var(--shadow-blunt)] tilt-r-3" />
      <div className="absolute bottom-32 left-[5%] w-20 h-20 bg-[var(--p-blue)] border-[3px] border-[var(--ink)] shadow-[var(--shadow-blunt)] tilt-l-3 rounded-2xl hidden md:block" />

      <div className="max-w-[1400px] mx-auto relative">
        <span className="sticker bg-[var(--p-pink)] text-white mb-5">✉ let's talk</span>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="display-xxl text-[var(--ink)] mt-4"
        >
          let's <span className="font-hand text-[var(--p-pink)]">make</span><br />
          <span className="bg-[var(--p-yellow)] px-3 md:px-6 py-1 md:py-2 border-[3px] border-[var(--ink)] inline-block rounded-2xl shadow-[var(--shadow-blunt-lg)]">
            something
          </span>{" "}
          fun.
        </motion.h2>

        <p className="mt-8 max-w-2xl font-body text-base md:text-lg text-[var(--ink-soft)] leading-relaxed">
          Tell us what you're working on. We'll tell you — honestly — whether
          we can help. Intro calls are free and last 25 minutes.
        </p>

        {/* CTA cards */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <a
            href={siteConfig.calendlyUrl}
            target="_blank"
            rel="noreferrer"
            data-testid="contact-calendly-btn"
            className="card-blunt group p-8 md:p-10 flex flex-col justify-between min-h-[260px]"
            style={{ background: "var(--p-pink)" }}
          >
            <div className="flex items-center justify-between">
              <span className="sticker bg-white">Calendly</span>
              <Calendar className="w-6 h-6 text-[var(--ink)]" />
            </div>
            <div>
              <h3 className="display-xl text-[var(--ink)] !text-4xl md:!text-5xl">
                Book a chat
              </h3>
              <p className="mt-3 font-body text-sm text-[var(--ink)] opacity-80">
                25 min · Google Meet · no prep required
              </p>
            </div>
            <ArrowUpRight className="absolute top-8 right-8 w-7 h-7 text-[var(--ink)] opacity-0 group-hover:opacity-100 transition" />
          </a>

          <a
            href={waLink()}
            target="_blank"
            rel="noreferrer"
            data-testid="contact-whatsapp-btn"
            className="card-blunt group p-8 md:p-10 flex flex-col justify-between min-h-[260px]"
            style={{ background: "var(--p-yellow)" }}
          >
            <div className="flex items-center justify-between">
              <span className="sticker bg-white">WhatsApp</span>
              <MessageCircle className="w-6 h-6 text-[var(--ink)]" />
            </div>
            <div>
              <h3 className="display-xl text-[var(--ink)] !text-4xl md:!text-5xl">
                Message us
              </h3>
              <p className="mt-3 font-body text-sm text-[var(--ink)] opacity-80">
                Fastest reply · usually under 2h (business hours)
              </p>
            </div>
            <ArrowUpRight className="absolute top-8 right-8 w-7 h-7 text-[var(--ink)] opacity-0 group-hover:opacity-100 transition" />
          </a>
        </div>

        {/* FAQ */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-5">
          {siteConfig.faqs.map((f, i) => (
            <div
              key={f.q}
              data-testid={`faq-${i}`}
              className="card-blunt p-6 md:p-7"
              style={{ background: "var(--surface)" }}
            >
              <div className="font-hand text-3xl text-[var(--p-pink)]">
                Q{i + 1}.
              </div>
              <h4 className="mt-1 font-display text-xl text-[var(--ink)] leading-tight">
                {f.q}
              </h4>
              <p className="mt-3 font-body text-sm text-[var(--ink-soft)] leading-relaxed">
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
