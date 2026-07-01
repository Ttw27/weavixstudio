import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Wand2,
  FileText,
  Megaphone,
  Package,
  Users,
  Calendar,
  Image as ImageIcon,
  Cpu,
  ArrowRight,
} from "lucide-react";

const CAPS = [
  {
    icon: <FileText className="w-5 h-5" />,
    title: "Quote → PDF builders",
    body: "Instant branded quotes with line items, e-sign and one-click send. No more Word templates.",
  },
  {
    icon: <Megaphone className="w-5 h-5" />,
    title: "Content & ad generators",
    body: "Weekly ad creative, banner refreshes and captions — written and mocked in your brand voice.",
  },
  {
    icon: <Wand2 className="w-5 h-5" />,
    title: "Design AI (upscale · tidy · print-ready)",
    body: "Turn a customer's fuzzy JPG into a clean vector. Prep one design for A3, socials, print — in a pass.",
  },
  {
    icon: <ImageIcon className="w-5 h-5" />,
    title: "Product image transformers",
    body: "Drop in a phone photo, get studio-lit lifestyle shots back. No photoshoot needed.",
  },
  {
    icon: <Users className="w-5 h-5" />,
    title: "Lead inbox + auto-chaser",
    body: "Every DM, form and email in one thread. AI follows up quotes for you until they reply.",
  },
  {
    icon: <Calendar className="w-5 h-5" />,
    title: "Bookings + deposit engines",
    body: "Workshops, appointments, private hire — deposits taken, refunds handled, no-shows down.",
  },
  {
    icon: <Package className="w-5 h-5" />,
    title: "Inventory + delivery ops",
    body: "Auto-reorder points, delivery-round optimiser, wastage tracker — behind the shop front.",
  },
  {
    icon: <Cpu className="w-5 h-5" />,
    title: "One-screen dashboards",
    body: "Everything your business does — takings, ads, staff, reviews, stock — on a single calm screen.",
  },
];

export const OperatingSystemStrip = () => {
  return (
    <section
      data-testid="os-strip-section"
      className="relative py-14 md:py-20 px-5 md:px-10"
      style={{ background: "var(--bg-2)" }}
    >
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-10 md:mb-14 max-w-3xl">
          <span
            className="sticker mb-4 text-[var(--bg)]"
            style={{ background: "var(--ink)" }}
          >
            ✦ behind the doorway
          </span>
          <h2 className="display-xl text-[var(--ink)] mt-4">
            The website is the front door.<br />
            <span className="squiggle">The operating system is where the money is.</span>
          </h2>
          <p className="mt-5 font-body text-base md:text-lg text-[var(--ink-soft)] leading-relaxed">
            Most agencies build you a pretty homepage and vanish. We build the
            actual system your business{" "}
            <span className="font-hand text-2xl text-[var(--p-pink)]">runs on</span>
            {" "}every day — deposits, quotes, ads, deliveries, dashboards, lead
            chasers. All under one login. Here's a taste.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {CAPS.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: (i % 4) * 0.06 }}
              data-testid={`os-cap-${i}`}
              className="card-blunt p-5"
              style={{ background: "var(--surface)" }}
            >
              <span
                className="inline-flex items-center justify-center w-10 h-10 rounded-xl border-2 border-[var(--ink)] shadow-[3px_3px_0_0_var(--ink)] mb-3"
                style={{ background: i % 4 === 0 ? "var(--p-yellow)" : i % 4 === 1 ? "var(--p-mint)" : i % 4 === 2 ? "var(--p-pink)" : "var(--p-blue)" }}
              >
                {c.icon}
              </span>
              <h3 className="font-display text-base md:text-lg text-[var(--ink)] leading-tight">
                {c.title}
              </h3>
              <p className="mt-2 font-body text-xs md:text-sm text-[var(--ink-soft)] leading-relaxed">
                {c.body}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <Link
            to="/examples"
            data-testid="os-strip-cta"
            className="btn-pill btn-pill-pink"
          >
            See 27 real operating systems <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/readiness-plan"
            className="btn-pill btn-pill-yellow"
          >
            What could yours look like?
          </Link>
        </div>
      </div>
    </section>
  );
};

export default OperatingSystemStrip;
