import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import Marquee from "react-fast-marquee";
import { siteConfig, waLink } from "../../lib/siteConfig";

export const Hero = () => {
  return (
    <section
      id="top"
      data-testid="hero-section"
      className="relative pt-20 md:pt-24 pb-8 md:pb-12 overflow-hidden"
    >
      <div className="bg-dots absolute inset-0 pointer-events-none" aria-hidden />

      {/* Floating shapes (smaller, fewer) */}
      <div className="absolute top-24 right-[6%] w-14 h-14 md:w-20 md:h-20 rounded-full bg-[var(--p-pink)] border-2 border-[var(--ink)] shadow-[var(--shadow-blunt-sm)] tilt-r hidden sm:block" />
      <div className="absolute bottom-36 left-[5%] w-10 h-10 md:w-14 md:h-14 bg-[var(--p-blue)] border-2 border-[var(--ink)] shadow-[var(--shadow-blunt-sm)] tilt-l-3 rounded-xl hidden sm:block" />

      {/* Meta row */}
      <div className="relative max-w-[1400px] mx-auto px-5 md:px-10 flex items-center justify-between font-body text-[11px] uppercase tracking-[0.18em] text-[var(--ink-soft)] font-bold">
        <div className="flex items-center gap-2">
          <span className="dot" />
          <span>Booking · Spring '25</span>
        </div>
        <div className="hidden sm:flex items-center gap-2">
          <span>{siteConfig.location}</span>
        </div>
      </div>

      {/* Headline */}
      <div className="relative max-w-[1400px] mx-auto px-5 md:px-10 mt-10 md:mt-12">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="display-xxl text-[var(--ink)] max-w-[18ch]"
        >
          We build whole <br />
          <span className="relative inline-block">
            <span className="bg-[var(--p-yellow)] px-3 md:px-5 py-1 border-2 border-[var(--ink)] inline-block rounded-2xl shadow-[var(--shadow-blunt)]">
              digital
            </span>
          </span>{" "}
          ecosystems<span className="text-[var(--p-pink)]">.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-5 max-w-2xl font-display text-base md:text-lg text-[var(--ink)] leading-snug"
        >
          A standalone website? That's so{" "}
          <span className="line-through opacity-60">2018</span>. Today it's
          about whole <span className="text-[var(--p-pink)]">digital ecosystems</span> —
          ones that <span className="bg-[var(--p-yellow)] px-1 rounded">lower costs</span>,
          put AI to work, and give you back your time.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-4 max-w-2xl font-body text-sm md:text-base text-[var(--ink-soft)] leading-relaxed"
        >
          Sites, apps, customer portals, automations and{" "}
          <span className="font-hand text-xl text-[var(--p-pink)]">custom AIs</span>{" "}
          — designed as one unified platform around how your business actually
          runs. No more stitching together 8 SaaS tools.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="mt-7 flex flex-wrap gap-2.5"
        >
          <Link
            to="/readiness-plan"
            data-testid="hero-readiness-btn"
            className="btn-pill btn-pill-pink"
          >
            Get my free readiness plan <ArrowRight className="w-4 h-4" />
          </Link>
          <a
            href={siteConfig.calendlyUrl}
            target="_blank"
            rel="noreferrer"
            data-testid="hero-calendly-btn"
            className="btn-pill btn-pill-yellow"
          >
            <Calendar className="w-4 h-4" /> Or book a chat
          </a>
          <Link
            to="/services"
            data-testid="hero-services-btn"
            className="btn-pill"
          >
            Explore services →
          </Link>
        </motion.div>
      </div>

      {/* Marquee */}
      <div className="relative mt-10 md:mt-14 border-y-2 border-[var(--ink)] py-3 md:py-4 bg-[var(--p-yellow)]">
        <Marquee gradient={false} speed={50} pauseOnHover={false}>
          <span className="marquee-text">
            digital ecosystems <span className="text-[var(--p-pink)]">★</span> custom AI{" "}
            <span className="text-[var(--p-pink)]">★</span> websites{" "}
            <span className="text-[var(--p-pink)]">★</span> apps{" "}
            <span className="text-[var(--p-pink)]">★</span> automations{" "}
            <span className="text-[var(--p-pink)]">★</span> ads{" "}
            <span className="text-[var(--p-pink)]">★</span> social{" "}
            <span className="text-[var(--p-pink)]">★</span>{" "}
          </span>
        </Marquee>
      </div>
    </section>
  );
};

export default Hero;
