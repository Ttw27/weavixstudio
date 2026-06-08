import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Calendar, ArrowRight } from "lucide-react";
import { siteConfig, waLink } from "../../lib/siteConfig";

// "Stop arguing with AI" — speaks to anyone who's wasted hours fighting prompts.
// Sells custom prompt apps with direct AI integration.

const beforeAfter = [
  {
    before: "Type a prompt, get a generic answer.",
    after: "One click. Output already in your voice, using your data.",
  },
  {
    before: "Re-explain your business every conversation.",
    after: "Your AI already knows your products, clients, tone, pricing.",
  },
  {
    before: "Try, fail, edit, copy-paste, try again.",
    after: "Press one button. Done. Move on with your day.",
  },
  {
    before: "Spend £200/mo on Midjourney for 5 usable images.",
    after: "On-brand images every time. First try.",
  },
];

export const AiFrustration = () => {
  return (
    <section
      id="ai-frustration"
      data-testid="ai-frustration-section"
      className="relative py-16 md:py-24 px-5 md:px-10 bg-[var(--ink)] text-[var(--bg)] overflow-hidden"
    >
      {/* Background squiggle */}
      <div className="absolute top-10 right-10 hidden md:block">
        <svg width="140" height="60" viewBox="0 0 140 60" fill="none">
          <path d="M0 30 Q 17.5 0 35 30 T 70 30 T 105 30 T 140 30" stroke="#FFDD4A" strokeWidth="3" fill="none" strokeLinecap="round" />
        </svg>
      </div>
      <div className="absolute bottom-10 left-6 w-12 h-12 rounded-full bg-[var(--p-pink)] border-2 border-[var(--bg)] shadow-[3px_3px_0_0_var(--bg)] tilt-l hidden md:block" />

      <div className="max-w-[1400px] mx-auto relative">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 md:gap-14">
          {/* Left col — pitch */}
          <div className="lg:col-span-3">
            <span
              className="sticker"
              style={{ background: "var(--p-yellow)", color: "var(--ink)", borderColor: "var(--ink)" }}
            >
              🤖 sound familiar?
            </span>

            <h2 className="display-xl text-[var(--bg)] mt-4 leading-[0.95]">
              Don't let AI prompting{" "}
              <span
                className="px-2 py-0.5 rounded-xl border-2 inline-block"
                style={{
                  background: "var(--p-pink)",
                  color: "var(--ink)",
                  borderColor: "var(--bg)",
                  boxShadow: "5px 5px 0 0 var(--bg)",
                }}
              >
                frustrate
              </span>{" "}
              you anymore.
            </h2>

            <p className="mt-6 font-body text-base md:text-lg text-[var(--bg)] opacity-85 leading-relaxed max-w-2xl">
              You've been there. Hours wasted{" "}
              <span className="font-hand text-2xl text-[var(--p-yellow)]">arguing</span>{" "}
              with ChatGPT, Claude or Midjourney. Editing prompts. Copy-pasting
              the same context. Getting outputs that sound nothing like you.
              Burning credits on bad attempts.
            </p>

            <p className="mt-4 font-body text-base md:text-lg text-[var(--bg)] opacity-85 leading-relaxed max-w-2xl">
              <span className="font-display text-[var(--p-yellow)]">It's not you. It's the prompt.</span>{" "}
              We build{" "}
              <span className="bg-[var(--p-yellow)] text-[var(--ink)] px-1.5 rounded font-display">
                custom prompt apps
              </span>{" "}
              for your business — one-click tools, plugged straight into AI
              systems (ChatGPT, Claude, Midjourney, Nano Banana, Sora) — that
              know your brand, your pricing, your tone, your customers. You
              click. It works. First try.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={siteConfig.calendlyUrl}
                target="_blank"
                rel="noreferrer"
                data-testid="ai-frustration-calendly"
                className="btn-pill btn-pill-yellow"
              >
                <Calendar className="w-4 h-4" /> Book a 25-min chat
              </a>
              <Link
                to="/services/custom-ai"
                data-testid="ai-frustration-learn"
                className="btn-pill bg-[var(--p-pink)]"
              >
                See Custom AI service <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href={waLink()}
                target="_blank"
                rel="noreferrer"
                data-testid="ai-frustration-whatsapp"
                className="btn-pill bg-[var(--surface)]"
              >
                WhatsApp
              </a>
            </div>
          </div>

          {/* Right col — before/after rows */}
          <div className="lg:col-span-2">
            <div className="font-hand text-3xl text-[var(--p-yellow)] mb-4">
              before vs. after
            </div>
            <div className="space-y-3">
              {beforeAfter.map((ba, i) => (
                <motion.div
                  key={ba.before}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                  data-testid={`ai-frustration-ba-${i}`}
                  className="card-blunt p-4 bg-[var(--surface)] text-[var(--ink)]"
                >
                  <div className="flex items-start gap-2 mb-1">
                    <span className="font-body text-xs uppercase tracking-[0.15em] font-bold text-[var(--ink-soft)]">
                      Before
                    </span>
                  </div>
                  <p className="font-body text-sm line-through opacity-60">
                    {ba.before}
                  </p>
                  <div className="flex items-start gap-2 mt-3 mb-1">
                    <span className="font-body text-xs uppercase tracking-[0.15em] font-bold text-[var(--p-pink)]">
                      With our app
                    </span>
                  </div>
                  <p className="font-display text-sm text-[var(--ink)] leading-snug">
                    {ba.after}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AiFrustration;
