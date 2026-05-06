import { motion } from "framer-motion";
import { ArrowDownRight, Calendar } from "lucide-react";
import Marquee from "react-fast-marquee";
import { siteConfig, waLink } from "../../lib/siteConfig";

export const Hero = () => {
  return (
    <section
      id="top"
      data-testid="hero-section"
      className="relative min-h-[100svh] pt-24 md:pt-28 flex flex-col justify-between noise-overlay overflow-hidden"
    >
      {/* Top meta row */}
      <div className="px-6 md:px-10 flex items-start justify-between font-mono text-xs uppercase tracking-[0.2em] text-[var(--text-dim)]">
        <div className="flex flex-col gap-1">
          <span>[ {siteConfig.location} ]</span>
          <span>EST. {siteConfig.establishedYear}</span>
        </div>
        <div className="hidden sm:flex flex-col items-end gap-1 text-right">
          <span>v.01 — Studio Index</span>
          <span className="text-[var(--accent)]">● Taking 2 new projects</span>
        </div>
      </div>

      {/* Main headline */}
      <div className="px-6 md:px-10 mt-10 md:mt-6">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="display-xxl text-[var(--text)]"
        >
          WE BUILD <br className="hidden sm:block" />
          <span className="outline-text">WEBSITES</span>, AI <br className="hidden sm:block" />
          <span className="text-[var(--accent)]">& GROWTH</span> SYSTEMS
          <span className="cursor-blink" />
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 max-w-2xl font-mono text-sm md:text-base text-[var(--text-dim)] leading-relaxed"
        >
          {siteConfig.tagline} One studio — design, engineering, AI, ads, content.
          No hand-offs. No fluff.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-10 flex flex-wrap gap-3"
        >
          <a
            href={siteConfig.calendlyUrl}
            target="_blank"
            rel="noreferrer"
            data-testid="hero-calendly-btn"
            className="btn-brutal btn-brutal-accent"
          >
            <Calendar className="w-4 h-4" /> Book an intro call
          </a>
          <a
            href={waLink()}
            target="_blank"
            rel="noreferrer"
            data-testid="hero-whatsapp-btn"
            className="btn-brutal"
          >
            Message on WhatsApp <ArrowDownRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>

      {/* Bottom marquee */}
      <div className="mt-14 md:mt-20 border-y border-[var(--line)] py-6 md:py-8">
        <Marquee gradient={false} speed={60} pauseOnHover={false}>
          <span className="marquee-text">
            Websites <span className="text-[var(--accent)]">●</span> AI Automation{" "}
            <span className="text-[var(--accent)]">●</span> App Development{" "}
            <span className="text-[var(--accent)]">●</span> Ad Management{" "}
            <span className="text-[var(--accent)]">●</span> Social Media{" "}
            <span className="text-[var(--accent)]">●</span> Creative Studio{" "}
            <span className="text-[var(--accent)]">●</span>{" "}
          </span>
        </Marquee>
      </div>
    </section>
  );
};

export default Hero;
