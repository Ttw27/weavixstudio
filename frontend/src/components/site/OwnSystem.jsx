import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { colorMap } from "../../lib/siteConfig";

const paths = [
  {
    color: "yellow",
    sticker: "path 01",
    title: "AI added to what you already use",
    body: "Keep your current tools. We plug AI into the jobs that eat your week - replying to enquiries, writing quotes, chasing follow-ups, sorting the inbox.",
  },
  {
    color: "blue",
    sticker: "path 02",
    title: "Your own system, built around you",
    body: "One back office that runs the whole business - leads, quotes, bookings, jobs, stock and numbers on one screen. Built for how you work, owned outright.",
  },
  {
    color: "pink",
    fg: "white",
    sticker: "path 03",
    title: "Both, one step at a time",
    body: "Start with the system, then switch AI on wherever it earns its place. AI is an optional extra, never a requirement.",
  },
];

const running = [
  "Every enquiry answered and followed up",
  "Quotes out the same day",
  "Jobs, bookings and stock in one place",
  "Today's numbers on one screen",
  "Nothing lost between five different apps",
];

export const OwnSystem = () => {
  return (
    <section
      id="own-system"
      data-testid="own-system-section"
      className="relative py-14 md:py-20 px-5 md:px-10 bg-[var(--bg-2)]"
    >
      <div className="max-w-[1400px] mx-auto">
        <div className="max-w-3xl">
          <span className="sticker bg-[var(--p-lilac)] mb-4">✦ where do you start?</span>
          <h2 className="display-xl text-[var(--ink)] mt-3">
            How could AI help{" "}
            <span className="bg-[var(--p-yellow)] px-2 py-0.5 border-2 border-[var(--ink)] inline-block rounded-xl shadow-[var(--shadow-blunt-sm)]">
              your business
            </span>
            ?
          </h2>
          <p className="mt-5 font-body text-base md:text-lg text-[var(--ink-soft)] leading-relaxed">
            Everyone's talking about AI. Few people explain what it would
            actually do for a business like yours. There are three ways in -
            pick the one that fits.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {paths.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              data-testid={`own-system-path-${i}`}
              className="card-blunt p-6 md:p-7"
              style={{ background: colorMap[p.color], color: p.fg === "white" ? "white" : "var(--ink)" }}
            >
              <span className="sticker bg-[var(--surface)] !text-[10px] text-[var(--ink)]">{p.sticker}</span>
              <h3 className="mt-5 font-display text-xl md:text-2xl leading-tight">{p.title}</h3>
              <p className="mt-3 font-body text-sm md:text-base leading-relaxed opacity-90">{p.body}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 md:mt-12 card-blunt p-6 md:p-8 bg-[var(--surface)] grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-6 items-center">
          <div>
            <div className="font-hand text-2xl text-[var(--p-pink)]">what a good system keeps running</div>
            <ul className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
              {running.map((r) => (
                <li key={r} className="flex items-center gap-2 font-body text-sm md:text-base font-bold text-[var(--ink)]">
                  <span className="dot" /> {r}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-2 lg:items-end">
            <Link to="/readiness-plan" data-testid="own-system-cta" className="btn-pill btn-pill-pink">
              Get my free AI plan <ArrowRight className="w-4 h-4" />
            </Link>
            <span className="font-body text-xs text-[var(--ink-soft)]">7 questions. Emailed back. No call needed.</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OwnSystem;
