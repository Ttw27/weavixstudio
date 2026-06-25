import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Clock, TrendingUp, Shield, ArrowRight } from "lucide-react";

const HOOKS = [
  {
    icon: <Clock className="w-6 h-6" />,
    color: "var(--p-yellow)",
    sticker: "the boring honest truth",
    headline: "We don't sell AI.",
    body: (
      <>
        We sell <strong>time saved</strong>, <strong>money saved</strong>, and{" "}
        <strong>customers won</strong>. AI is just the cheapest, fastest way to
        get there <strong>right now</strong>. If a spreadsheet did the job,
        we'd build you a spreadsheet.
      </>
    ),
  },
  {
    icon: <Shield className="w-6 h-6" />,
    color: "var(--p-mint)",
    sticker: "5-year proof",
    headline: "Built so you survive what's coming.",
    body: (
      <>
        The businesses dominating in 5 years are the ones quietly automating{" "}
        <strong>now</strong>. We make sure yours is one of them — without you
        having to learn a single prompt.
      </>
    ),
  },
  {
    icon: <TrendingUp className="w-6 h-6" />,
    color: "var(--p-pink)",
    fg: "white",
    sticker: "everything, one roof",
    headline: "From a website that converts → AI that runs the back office.",
    body: (
      <>
        Most agencies do <em>one</em> thing. We do the whole ecosystem: site,
        app, automations, ads, social, custom AI. <strong>One studio, one
        invoice, zero finger-pointing.</strong>
      </>
    ),
  },
];

export const SalesHooks = () => {
  return (
    <section
      data-testid="sales-hooks-section"
      className="relative py-14 md:py-20 px-5 md:px-10 bg-[var(--bg)]"
    >
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-10 md:mb-14 max-w-3xl">
          <span
            className="sticker mb-4 text-[var(--bg)]"
            style={{ background: "var(--ink)" }}
          >
            ✦ why we exist
          </span>
          <h2 className="display-xl text-[var(--ink)] mt-4">
            Your business deserves more than a{" "}
            <span className="squiggle">website refresh.</span>
          </h2>
          <p className="mt-5 font-body text-base md:text-lg text-[var(--ink-soft)] leading-relaxed">
            We're not here to ship you a pretty homepage and disappear. We're
            here to give your business an{" "}
            <span className="font-hand text-2xl text-[var(--p-pink)]">unfair edge</span>{" "}
            — so the next five years are the best years it's ever had.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {HOOKS.map((h, i) => (
            <motion.div
              key={h.headline}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              data-testid={`sales-hook-${i}`}
              className="card-blunt p-6 md:p-7 flex flex-col"
              style={{ background: h.color, color: h.fg || "var(--ink)" }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span
                  className="inline-flex items-center justify-center w-11 h-11 rounded-2xl border-2 border-[var(--ink)] shadow-[3px_3px_0_0_var(--ink)]"
                  style={{ background: "var(--surface)", color: "var(--ink)" }}
                >
                  {h.icon}
                </span>
                <span
                  className="font-body text-[10px] font-bold uppercase tracking-[0.15em] opacity-80"
                >
                  {h.sticker}
                </span>
              </div>
              <h3
                className="font-display text-xl md:text-2xl leading-tight"
                style={{ color: h.fg || "var(--ink)" }}
              >
                {h.headline}
              </h3>
              <p
                className="mt-3 font-body text-sm md:text-[15px] leading-relaxed flex-1"
                style={{ color: h.fg || "var(--ink)" }}
              >
                {h.body}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Reassurance band — speaks to both extremes of the audience */}
        <div
          className="mt-10 md:mt-14 card-blunt p-6 md:p-8 text-[var(--bg)] flex flex-col md:flex-row md:items-center md:justify-between gap-5"
          style={{ background: "var(--ink)" }}
        >
          <div className="max-w-2xl">
            <div className="font-hand text-2xl text-[var(--p-yellow)]">are we a fit?</div>
            <h3 className="font-display text-xl md:text-2xl mt-1 leading-tight text-[var(--bg)]">
              You might be a sole trader who's never used AI. You might be a
              50-person team with a Notion plan for it.
              <span className="text-[var(--p-yellow)]"> Either way — we meet you where you are.</span>
            </h3>
            <p className="mt-3 font-body text-sm text-[var(--bg)] opacity-80 max-w-xl">
              Plain English explanations. Honest pricing. Start small if you
              want. Go big when you're ready.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 shrink-0">
            <Link
              to="/readiness-plan"
              data-testid="hooks-cta-readiness"
              className="btn-pill btn-pill-pink"
            >
              Get my free plan <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/examples"
              data-testid="hooks-cta-examples"
              className="btn-pill btn-pill-yellow"
            >
              See what fits your business →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SalesHooks;
