import { motion } from "framer-motion";
import { Sprout, Leaf, TreePine } from "lucide-react";

export const TIER_OPTIONS = [
  {
    id: "starter",
    icon: <Sprout className="w-7 h-7" />,
    color: "var(--p-mint)",
    sticker: "🌱 just starting",
    title: "I don't know what AI is. I just want my business to run smoother.",
    subtitle:
      "Sole trader · café · salon · trades · clinic · gym · small shop. We'll handle the tech entirely — you'll feel the time and money saved within weeks.",
    matches: ["cafe", "nail-salon", "barber", "plumber", "dental", "florist", "cleaning", "yoga", "physio", "lash", "bookshop", "butcher", "footballer-coach"],
  },
  {
    id: "growing",
    icon: <Leaf className="w-7 h-7" />,
    color: "var(--p-yellow)",
    sticker: "🌿 growing",
    title: "We've got tools, they don't talk to each other, things are getting messy.",
    subtitle:
      "Multi-location · team of 5–20 · several SaaS subscriptions. We unify what you have, kill the duplication, layer AI where it pays back fast.",
    matches: ["restaurant-group", "estate-agent", "private-clinic", "law-firm", "accountancy", "etsy", "ecommerce", "wedding", "construction", "tutoring", "personal-trainer", "interior", "podcast"],
  },
  {
    id: "established",
    icon: <TreePine className="w-7 h-7" />,
    color: "var(--p-pink)",
    fg: "white",
    sticker: "🌳 established",
    title: "We know what we want. Custom AI, real integrations, the works.",
    subtitle:
      "Scale-up · multi-brand · already shipping. We build bespoke prompt apps, agentic workflows, and the dashboard your CTO has been sketching on a whiteboard.",
    matches: ["saas-founder", "creator", "consultancy", "creative-agency", "membership", "investment", "media-co"],
  },
];

export const AudienceTierPicker = ({ active, onChange }) => {
  return (
    <section
      data-testid="audience-tier-picker"
      className="px-5 md:px-10 mt-10 md:mt-14"
    >
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-5 flex items-end justify-between flex-wrap gap-3">
          <div>
            <span className="sticker text-[var(--bg)]" style={{ background: "var(--ink)" }}>
              ✦ where are you now?
            </span>
            <h2 className="font-display text-2xl md:text-3xl text-[var(--ink)] mt-3 max-w-2xl leading-tight">
              Pick the one that sounds like you. We'll show you what fits.
            </h2>
          </div>
          {active && (
            <button
              type="button"
              onClick={() => onChange(null)}
              data-testid="tier-clear"
              className="btn-pill !py-1.5 !px-3.5 text-xs"
            >
              ✕ Clear filter
            </button>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {TIER_OPTIONS.map((t, i) => {
            const isActive = active === t.id;
            return (
              <motion.button
                type="button"
                key={t.id}
                onClick={() => onChange(isActive ? null : t.id)}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                data-testid={`tier-${t.id}`}
                className={`card-blunt p-5 md:p-6 text-left transition-all ${
                  isActive ? "ring-4 ring-[var(--ink)] -translate-x-1 -translate-y-1 shadow-[var(--shadow-blunt-lg)]" : "hover:-translate-x-0.5 hover:-translate-y-0.5"
                }`}
                style={{ background: t.color, color: t.fg || "var(--ink)" }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span
                    className="inline-flex items-center justify-center w-12 h-12 rounded-2xl border-2 border-[var(--ink)] shadow-[3px_3px_0_0_var(--ink)]"
                    style={{ background: "var(--surface)", color: "var(--ink)" }}
                  >
                    {t.icon}
                  </span>
                  <span className="font-body text-[10px] font-bold uppercase tracking-[0.15em] opacity-90">
                    {t.sticker}
                  </span>
                </div>
                <h3 className="font-display text-lg md:text-xl leading-tight" style={{ color: t.fg || "var(--ink)" }}>
                  {t.title}
                </h3>
                <p className="mt-2 font-body text-xs md:text-sm leading-relaxed opacity-90" style={{ color: t.fg || "var(--ink)" }}>
                  {t.subtitle}
                </p>
                <div className="mt-3 font-display text-xs underline decoration-2 underline-offset-2" style={{ color: t.fg || "var(--ink)" }}>
                  {isActive ? "Showing only these →" : "That's me →"}
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AudienceTierPicker;
