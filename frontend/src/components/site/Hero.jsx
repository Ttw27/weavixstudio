import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";
import Marquee from "react-fast-marquee";
import { siteConfig, waLink } from "../../lib/siteConfig";

export const Hero = () => {
  return (
    <section
      id="top"
      data-testid="hero-section"
      className="relative min-h-[100svh] pt-24 md:pt-28 pb-10 flex flex-col justify-between overflow-hidden"
    >
      {/* Background dots */}
      <div className="bg-dots absolute inset-0 pointer-events-none" aria-hidden />

      {/* Floating shapes */}
      <div className="absolute top-32 right-[8%] w-20 h-20 md:w-28 md:h-28 rounded-full bg-[var(--p-pink)] border-[3px] border-[var(--ink)] shadow-[var(--shadow-blunt)] tilt-r" />
      <div className="absolute bottom-32 left-[5%] w-16 h-16 md:w-24 md:h-24 bg-[var(--p-blue)] border-[3px] border-[var(--ink)] shadow-[var(--shadow-blunt)] tilt-l-3 rounded-2xl" />
      <div className="absolute top-1/2 right-[2%] hidden md:block">
        <span className="font-hand text-[var(--p-pink)] text-4xl tilt-r-3 inline-block">say hi!</span>
      </div>

      {/* Top meta row */}
      <div className="relative px-5 md:px-10 flex items-start justify-between font-body text-xs uppercase tracking-[0.2em] text-[var(--ink-soft)] font-bold">
        <div className="flex items-center gap-2">
          <span className="dot" />
          <span>Booking 2 projects · Spring '25</span>
        </div>
        <div className="hidden sm:flex items-center gap-2">
          <span>{siteConfig.location}</span>
        </div>
      </div>

      {/* Headline */}
      <div className="relative px-5 md:px-10 mt-8 md:mt-2">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="display-xxl text-[var(--ink)]"
        >
          Make stuff <br />
          that makes <br />
          <span className="relative inline-block">
            <span className="bg-[var(--p-yellow)] px-3 md:px-6 py-1 md:py-2 border-[3px] border-[var(--ink)] inline-block rounded-2xl shadow-[var(--shadow-blunt-lg)]">
              people <span className="font-hand text-[var(--p-pink)] text-7xl md:text-9xl align-middle">smile</span>
            </span>
          </span>{" "}
          <span className="text-[var(--p-pink)]">.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-8 max-w-2xl font-body text-base md:text-lg text-[var(--ink-soft)] leading-relaxed"
        >
          {siteConfig.tagline} One studio — design, engineering, AI, ads, content.
          No hand-offs, no fluff, no boring decks.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-8 flex flex-wrap gap-3"
        >
          <a
            href={siteConfig.calendlyUrl}
            target="_blank"
            rel="noreferrer"
            data-testid="hero-calendly-btn"
            className="btn-pill btn-pill-pink"
          >
            <Calendar className="w-4 h-4" /> Book a chat
          </a>
          <a
            href={waLink()}
            target="_blank"
            rel="noreferrer"
            data-testid="hero-whatsapp-btn"
            className="btn-pill btn-pill-yellow"
          >
            Message on WhatsApp <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>

      {/* Bottom marquee strip */}
      <div className="relative mt-12 md:mt-14 border-y-[3px] border-[var(--ink)] py-4 md:py-6 bg-[var(--p-yellow)]">
        <Marquee gradient={false} speed={55} pauseOnHover={false}>
          <span className="marquee-text">
            websites <span className="text-[var(--p-pink)]">★</span> ai automation{" "}
            <span className="text-[var(--p-pink)]">★</span> apps{" "}
            <span className="text-[var(--p-pink)]">★</span> ad management{" "}
            <span className="text-[var(--p-pink)]">★</span> social media{" "}
            <span className="text-[var(--p-pink)]">★</span> creative studio{" "}
            <span className="text-[var(--p-pink)]">★</span>{" "}
          </span>
        </Marquee>
      </div>
    </section>
  );
};

export default Hero;
