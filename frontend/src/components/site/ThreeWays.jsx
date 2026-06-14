import { motion } from "framer-motion";
import { KeyRound, BrainCircuit, HandPlatter } from "lucide-react";

// Three engagement options — same principle across every service.
// Used inside ServiceDetail. Reads `service` to contextualise wording.

const modes = [
  {
    id: "own",
    icon: <KeyRound className="w-6 h-6" />,
    badge: "01",
    title: "Set up. Hand over.",
    body:
      "We build the whole system on YOUR accounts, YOUR data, YOUR brand. We train your team, hand over the keys, and step back. You own everything from day one — no lock-in, no black box.",
    color: "var(--p-yellow)",
  },
  {
    id: "ai",
    icon: <BrainCircuit className="w-6 h-6" />,
    badge: "02",
    title: "Set up + expert AI inside.",
    body:
      "Everything above, plus we plug an expert AI specialist into your business — it watches the numbers, spots issues, suggests next moves and can even make changes for you. Like having a senior consultant on call 24/7, for a fraction of the cost.",
    color: "var(--p-pink)",
    featured: true,
  },
  {
    id: "managed",
    icon: <HandPlatter className="w-6 h-6" />,
    badge: "03",
    title: "We drive for 3–6 months.",
    body:
      "Want us at the wheel while you learn? We run it fully for the first 3–6 months — strategy, optimisation, the lot — with weekly walk-throughs so you see exactly how it's done. Then we hand over a system your team understands inside-out.",
    color: "var(--p-blue)",
  },
];

export const ThreeWays = ({ serviceTitle = "this service" }) => {
  return (
    <section
      data-testid="three-ways-section"
      className="px-5 md:px-10 mt-20 md:mt-28"
    >
      <div className="max-w-[1400px] mx-auto">
        <span className="sticker bg-[var(--p-mint)] mb-4">🤝 three ways to work with us</span>
        <h2 className="display-xl !text-3xl md:!text-5xl text-[var(--ink)] mt-3 max-w-3xl">
          You own it. <span className="squiggle">We help you run it.</span>
        </h2>
        <p className="mt-4 font-body text-base md:text-lg text-[var(--ink-soft)] max-w-3xl leading-relaxed">
          Other studios lock you into their tools and accounts so you can never
          leave. We do the opposite. Whichever mode you pick for{" "}
          <span className="font-display">{serviceTitle}</span>, the system,
          data and accounts are always yours.
        </p>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {modes.map((m, i) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              data-testid={`mode-${m.id}`}
              className={`card-blunt p-6 md:p-7 relative ${m.featured ? "md:scale-[1.03] md:z-10" : ""}`}
              style={{ background: m.color }}
            >
              {m.featured && (
                <span className="absolute -top-3 left-5 sticker bg-[var(--ink)] text-[var(--p-yellow)] !text-[10px]">
                  ★ most popular
                </span>
              )}
              <div className="flex items-start justify-between mb-4">
                <span className="inline-flex items-center justify-center w-11 h-11 rounded-2xl bg-[var(--surface)] border-2 border-[var(--ink)] shadow-[3px_3px_0_0_var(--ink)] text-[var(--ink)]">
                  {m.icon}
                </span>
                <span className="font-display text-2xl text-[var(--ink)] opacity-70">
                  {m.badge}
                </span>
              </div>
              <h3 className="font-display text-xl md:text-2xl text-[var(--ink)] leading-tight">
                {m.title}
              </h3>
              <p className="mt-3 font-body text-sm md:text-[15px] text-[var(--ink)] leading-relaxed opacity-90">
                {m.body}
              </p>
            </motion.div>
          ))}
        </div>

        <p className="mt-8 font-hand text-2xl text-[var(--p-pink)] text-center md:text-left">
          mix & match — they're not mutually exclusive ✨
        </p>
      </div>
    </section>
  );
};

export default ThreeWays;
