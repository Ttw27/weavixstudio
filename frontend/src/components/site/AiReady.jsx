import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Sparkles, ArrowRight } from "lucide-react";
import { siteConfig, waLink, colorMap } from "../../lib/siteConfig";

const quickWins = [
  {
    color: "yellow",
    icon: "📥",
    title: "5+ hours / week back on email",
    body: "An AI reads your inbox, sorts the urgent from the noise, drafts replies in your voice, and books the warm ones to your calendar.",
  },
  {
    color: "pink",
    icon: "🎙️",
    title: "Every meeting summarises itself",
    body: "Action items appear in Slack before everyone's even left the call. No more 'who was meant to send that?'",
  },
  {
    color: "blue",
    icon: "✍️",
    title: "Proposals & quotes in minutes",
    body: "A one-click button drafts a full proposal in your tone, using your pricing and past deals. You just check and send.",
  },
  {
    color: "mint",
    icon: "💬",
    title: "An AI receptionist for your site",
    body: "Answers customer questions 24/7 using your real info. Books appointments. Hands hot leads to you. Never sleeps.",
  },
  {
    color: "lilac",
    icon: "🔁",
    title: "Turn 1 idea into 20 pieces of content",
    body: "Feed in a podcast, voice note or blog. Out comes reels, emails, social posts, a newsletter — all in your voice.",
  },
  {
    color: "orange",
    icon: "🧠",
    title: "A personal AI that knows your business",
    body: "Plug it into your Drive, Notion, emails. Ask it anything: pricing, past clients, policies, what happened last quarter.",
  },
];

const reassurance = [
  { title: "Start tiny", body: "One win first. Scale from there. No giant project required." },
  { title: "Friendly pricing", body: "Most starter projects from £2k. You'll know the cost before we start." },
  { title: "Pays for itself fast", body: "Typical payback in weeks, not months. Often a single hire saved." },
  { title: "Your data stays yours", body: "Private deployments. Nothing trains the public models. Ever." },
];

export const AiReady = () => {
  return (
    <section
      id="ai-ready"
      data-testid="ai-ready-section"
      className="relative py-14 md:py-20 px-5 md:px-10 overflow-hidden"
    >
      {/* Background flourishes */}
      <div className="absolute top-10 right-[4%] hidden md:block">
        <span className="font-hand text-3xl text-[var(--p-pink)] tilt-r-3 inline-block">
          it's easier than you think →
        </span>
      </div>
      <div className="absolute bottom-16 left-[3%] w-12 h-12 rounded-full bg-[var(--p-mint)] border-2 border-[var(--ink)] shadow-[var(--shadow-blunt-sm)] tilt-l hidden md:block" />

      <div className="max-w-[1400px] mx-auto relative">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 md:mb-14">
          <div className="max-w-3xl">
            <span className="sticker bg-[var(--p-lilac)] mb-4">
              <Sparkles className="w-3.5 h-3.5" /> AI for every business
            </span>
            <h2 className="display-xl text-[var(--ink)] mt-3">
              Big or small — let's get your business{" "}
              <span className="bg-[var(--p-yellow)] px-2 py-0.5 border-2 border-[var(--ink)] inline-block rounded-xl shadow-[var(--shadow-blunt-sm)]">
                AI-ready
              </span>
              .
            </h2>
            <p className="mt-5 font-body text-base md:text-lg text-[var(--ink-soft)] leading-relaxed">
              We're not here to sell you robots or convince you the future is
              scary. We just plug AI into the bits of your business that drain
              your time and bleed your money — quietly, in the background.
              You'd be{" "}
              <span className="font-hand text-2xl text-[var(--p-pink)]">shocked</span>{" "}
              what it can do — and within a month you'll wonder how you ever
              ran things without it.
            </p>
          </div>

          <div className="card-blunt p-5 bg-[var(--p-yellow)] max-w-xs hidden md:block tilt-r">
            <div className="font-hand text-2xl text-[var(--ink)]">free</div>
            <div className="font-display text-lg text-[var(--ink)] leading-tight mt-1">
              25-minute AI readiness chat
            </div>
            <p className="font-body text-xs text-[var(--ink)] opacity-80 mt-2">
              We'll spot 2–3 quick wins for your business. No deck, no pitch,
              no commitment.
            </p>
          </div>
        </div>

        {/* Quick wins grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {quickWins.map((w, i) => (
            <motion.div
              key={w.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.4, delay: (i % 3) * 0.06 }}
              data-testid={`ai-win-${i}`}
              className="card-blunt p-6"
              style={{ background: colorMap[w.color] }}
            >
              <div className="flex items-start justify-between">
                <span className="text-3xl leading-none" aria-hidden>{w.icon}</span>
                <span className="sticker bg-[var(--surface)] !text-[10px]">
                  quick win {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="mt-5 font-display text-lg md:text-xl text-[var(--ink)] leading-tight">
                {w.title}
              </h3>
              <p className="mt-3 font-body text-sm text-[var(--ink)] leading-relaxed opacity-90">
                {w.body}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Reassurance row */}
        <div className="mt-10 md:mt-14 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
          {reassurance.map((r, i) => (
            <div
              key={r.title}
              data-testid={`ai-reassure-${i}`}
              className="card-blunt p-4 md:p-5 bg-[var(--surface)]"
            >
              <div className="flex items-center gap-2">
                <span className="dot" />
                <div className="font-display text-base text-[var(--ink)]">
                  {r.title}
                </div>
              </div>
              <p className="mt-2 font-body text-xs md:text-sm text-[var(--ink-soft)] leading-relaxed">
                {r.body}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Strip */}
        <div className="mt-12 md:mt-16 card-blunt p-7 md:p-10 bg-[var(--ink)] text-[var(--bg)] flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="max-w-2xl">
            <div className="font-hand text-2xl text-[var(--p-yellow)]">
              ready when you are
            </div>
            <h3 className="display-lg !text-2xl md:!text-3xl text-[var(--bg)] mt-1">
              Book a free 25-min AI readiness chat.
            </h3>
            <p className="mt-3 font-body text-sm text-[var(--bg)] opacity-80">
              No prep needed. We'll tell you — honestly — where AI would make
              the biggest difference in your business, and where it wouldn't.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <a
              href={siteConfig.calendlyUrl}
              target="_blank"
              rel="noreferrer"
              data-testid="ai-ready-calendly"
              className="btn-pill btn-pill-yellow"
            >
              Book the chat <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href={waLink()}
              target="_blank"
              rel="noreferrer"
              data-testid="ai-ready-whatsapp"
              className="btn-pill bg-[var(--surface)]"
            >
              WhatsApp instead
            </a>
            <Link
              to="/services/custom-ai"
              data-testid="ai-ready-learn-more"
              className="btn-pill bg-[var(--p-pink)]"
            >
              See AI services →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AiReady;
