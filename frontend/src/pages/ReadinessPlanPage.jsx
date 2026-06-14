import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Calendar,
  Sparkles,
  Clock,
  Send,
} from "lucide-react";
import PageShell from "./PageShell";
import { siteConfig, waLink } from "../lib/siteConfig";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const INDUSTRIES = [
  { v: "hospitality", l: "Hospitality (café, restaurant, hotel)" },
  { v: "trades", l: "Trades & home services" },
  { v: "health", l: "Health & wellness" },
  { v: "pro-services", l: "Professional services (law, accountant)" },
  { v: "retail-ecom", l: "Retail / e-commerce" },
  { v: "creator", l: "Creator / digital business" },
  { v: "education", l: "Education / coaching" },
  { v: "property", l: "Property / estate" },
  { v: "other", l: "Something else" },
];

const SIZES = [
  "Just me",
  "2–5 people",
  "6–20 people",
  "21–50 people",
  "50+ people",
];

const PAINS = [
  "Drowning in emails / inbound",
  "Tools that don't talk to each other",
  "Too much manual admin",
  "AI is frustrating to use",
  "We rely on a website that feels dated",
  "No clear view of revenue / ops",
  "Customer experience feels patchwork",
  "Quotes / bookings / invoicing are slow",
];

const INTERESTS = [
  "A modern website that converts",
  "AI that actually saves us time",
  "Custom prompt apps for our team",
  "A customer portal / booking system",
  "Connecting our existing tools together",
  "Mobile app for our customers",
  "Better ads / paid acquisition",
  "Help with social media & content",
];

const TOOLS = [
  "Squarespace / Wix",
  "Shopify / WooCommerce",
  "Notion",
  "Google Drive / Sheets",
  "Calendly",
  "Mailchimp / Klaviyo",
  "QuickBooks / Xero",
  "Stripe / PayPal",
  "ChatGPT / Claude",
  "WhatsApp Business",
  "Slack / Teams",
  "HubSpot / Pipedrive",
];

const SPEND = [
  "Under £100/mo",
  "£100–£300/mo",
  "£300–£700/mo",
  "£700–£1,500/mo",
  "Over £1,500/mo",
  "Not sure",
];

const TOTAL_STEPS = 7;

const Progress = ({ step }) => (
  <div className="flex items-center gap-1.5">
    {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
      <span
        key={i}
        className={`h-2 flex-1 rounded-full border border-[var(--ink)] transition-colors ${
          i < step ? "bg-[var(--p-pink)]" : "bg-[var(--bg-2)]"
        }`}
      />
    ))}
  </div>
);

const Chip = ({ children, active, onClick, testId }) => (
  <button
    type="button"
    onClick={onClick}
    data-testid={testId}
    className={`px-3.5 py-2 rounded-full border-2 border-[var(--ink)] font-display text-sm transition-all ${
      active
        ? "bg-[var(--p-yellow)] shadow-[3px_3px_0_0_var(--ink)]"
        : "bg-[var(--surface)] hover:bg-[var(--bg-2)]"
    }`}
  >
    {children}
  </button>
);

const Question = ({ title, hint, children }) => (
  <div>
    <h2 className="font-display text-2xl md:text-3xl text-[var(--ink)] leading-tight">
      {title}
    </h2>
    {hint && (
      <p className="mt-1.5 font-body text-sm text-[var(--ink-soft)]">{hint}</p>
    )}
    <div className="mt-5">{children}</div>
  </div>
);

export default function ReadinessPlanPage() {
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState({
    business_name: "",
    industry: "",
    business_size: "",
    biggest_time_drain: "",
    current_tools: [],
    interested_in: [],
    monthly_software_spend: "",
    name: "",
    email: "",
    phone: "",
    extra_notes: "",
  });

  const toggle = (key, val) => {
    setData((d) => ({
      ...d,
      [key]: d[key].includes(val)
        ? d[key].filter((v) => v !== val)
        : [...d[key], val],
    }));
  };

  const canAdvance = () => {
    if (step === 1) return data.business_name.trim().length > 1;
    if (step === 2) return data.industry !== "";
    if (step === 3) return data.business_size !== "";
    if (step === 4) return data.biggest_time_drain !== "";
    if (step === 5) return data.interested_in.length > 0;
    if (step === 6) return true; // tools + spend optional
    if (step === 7)
      return (
        data.name.trim().length > 1 &&
        /\S+@\S+\.\S+/.test(data.email)
      );
    return false;
  };

  const submit = async () => {
    setSubmitting(true);
    setError("");
    try {
      await axios.post(`${API}/leads`, data);
      setDone(true);
    } catch (e) {
      setError("Something went wrong — please try again or message us on WhatsApp.");
    } finally {
      setSubmitting(false);
    }
  };

  if (done) {
    return (
      <PageShell testId="readiness-done">
        <section className="px-5 md:px-10">
          <div className="max-w-2xl mx-auto py-10 md:py-20 text-center">
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", damping: 14 }}
              className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[var(--p-mint)] border-2 border-[var(--ink)] shadow-[var(--shadow-blunt)] mb-6"
            >
              <CheckCircle2 className="w-10 h-10 text-[var(--ink)]" />
            </motion.div>
            <h1 className="display-xxl text-[var(--ink)]">
              Got it<span className="text-[var(--p-pink)]">.</span>
            </h1>
            <p className="mt-5 font-body text-base md:text-lg text-[var(--ink-soft)] leading-relaxed">
              We'll review your answers and email you a tailored{" "}
              <span className="font-display text-[var(--ink)]">readiness plan</span>{" "}
              within 24 hours — what we'd build for you, what it would save, and
              roughly what it would cost. No call required. No sales pitch.
            </p>
            <p className="mt-3 font-hand text-2xl text-[var(--p-pink)]">
              talk soon ✨
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <Link to="/" className="btn-pill btn-pill-yellow" data-testid="done-home">
                Back to home
              </Link>
              <Link to="/examples" className="btn-pill btn-pill-ink" data-testid="done-examples">
                See more examples →
              </Link>
            </div>
          </div>
        </section>
      </PageShell>
    );
  }

  return (
    <PageShell testId="readiness-plan-page">
      <section className="px-5 md:px-10">
        <div className="max-w-2xl mx-auto">
          {/* Hero */}
          <div className="mb-8">
            <span className="sticker bg-[var(--p-pink)] text-white mb-3">
              <Sparkles className="w-3.5 h-3.5" /> free readiness plan
            </span>
            <h1 className="display-xl text-[var(--ink)] mt-3">
              Find out how much we can save you in{" "}
              <span className="squiggle">time and money</span>.
            </h1>
            <p className="mt-4 font-body text-base text-[var(--ink-soft)] leading-relaxed">
              Answer 7 quick questions about your business (takes 90 seconds).
              We'll send back a free tailored plan with the AI & automation
              moves that would have the biggest impact for you — including
              estimated time and money saved. No call needed.
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-2 font-body text-xs text-[var(--ink-soft)]">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> 90 seconds
              </span>
              <span>·</span>
              <span>No call required</span>
              <span>·</span>
              <span>Reply within 24h</span>
            </div>
          </div>

          {/* Progress */}
          <div className="mb-2 flex items-center justify-between font-body text-xs text-[var(--ink-soft)] font-bold uppercase tracking-[0.15em]">
            <span>Step {step} / {TOTAL_STEPS}</span>
            <Link
              to="/"
              className="font-display text-[var(--p-pink)] hover:underline normal-case tracking-normal text-sm"
              data-testid="readiness-exit"
            >
              ✕ Save & exit
            </Link>
          </div>
          <Progress step={step} />

          {/* Step card */}
          <div className="mt-6 card-blunt p-6 md:p-8 bg-[var(--surface)] min-h-[360px] flex flex-col">
            <div className="flex-1">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -12 }}
                  transition={{ duration: 0.2 }}
                >
                  {step === 1 && (
                    <Question
                      title="First — what's your business called?"
                      hint="So we can address the plan to the right people."
                    >
                      <input
                        type="text"
                        value={data.business_name}
                        onChange={(e) => setData({ ...data, business_name: e.target.value })}
                        placeholder="e.g. Sunday Brunch Co."
                        data-testid="input-business-name"
                        className="w-full px-4 py-3 border-2 border-[var(--ink)] rounded-xl font-body text-base bg-[var(--bg)] focus:outline-none focus:bg-[var(--p-yellow)]/30"
                        autoFocus
                      />
                    </Question>
                  )}

                  {step === 2 && (
                    <Question title="What kind of business is it?">
                      <div className="flex flex-wrap gap-2">
                        {INDUSTRIES.map((i) => (
                          <Chip
                            key={i.v}
                            active={data.industry === i.v}
                            onClick={() => setData({ ...data, industry: i.v })}
                            testId={`industry-${i.v}`}
                          >
                            {i.l}
                          </Chip>
                        ))}
                      </div>
                    </Question>
                  )}

                  {step === 3 && (
                    <Question title="How many people are in your team?">
                      <div className="flex flex-wrap gap-2">
                        {SIZES.map((s) => (
                          <Chip
                            key={s}
                            active={data.business_size === s}
                            onClick={() => setData({ ...data, business_size: s })}
                            testId={`size-${s.replace(/[^a-z0-9]/gi, "-").toLowerCase()}`}
                          >
                            {s}
                          </Chip>
                        ))}
                      </div>
                    </Question>
                  )}

                  {step === 4 && (
                    <Question
                      title="What's eating your time the most right now?"
                      hint="Pick the one that bugs you most."
                    >
                      <div className="flex flex-wrap gap-2">
                        {PAINS.map((p) => (
                          <Chip
                            key={p}
                            active={data.biggest_time_drain === p}
                            onClick={() => setData({ ...data, biggest_time_drain: p })}
                            testId={`pain-${PAINS.indexOf(p)}`}
                          >
                            {p}
                          </Chip>
                        ))}
                      </div>
                    </Question>
                  )}

                  {step === 5 && (
                    <Question
                      title="Which of these would actually move the needle?"
                      hint="Pick anything that catches your eye — multiple is fine."
                    >
                      <div className="flex flex-wrap gap-2">
                        {INTERESTS.map((i) => (
                          <Chip
                            key={i}
                            active={data.interested_in.includes(i)}
                            onClick={() => toggle("interested_in", i)}
                            testId={`interest-${INTERESTS.indexOf(i)}`}
                          >
                            {i}
                          </Chip>
                        ))}
                      </div>
                    </Question>
                  )}

                  {step === 6 && (
                    <Question
                      title="What do you currently use? (optional)"
                      hint="Helps us spot duplicates and savings."
                    >
                      <div className="flex flex-wrap gap-2 mb-6">
                        {TOOLS.map((t) => (
                          <Chip
                            key={t}
                            active={data.current_tools.includes(t)}
                            onClick={() => toggle("current_tools", t)}
                            testId={`tool-${TOOLS.indexOf(t)}`}
                          >
                            {t}
                          </Chip>
                        ))}
                      </div>
                      <div className="font-display text-sm text-[var(--ink)] mb-2">
                        Roughly how much do you spend on software/SaaS per month?
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {SPEND.map((s) => (
                          <Chip
                            key={s}
                            active={data.monthly_software_spend === s}
                            onClick={() => setData({ ...data, monthly_software_spend: s })}
                            testId={`spend-${SPEND.indexOf(s)}`}
                          >
                            {s}
                          </Chip>
                        ))}
                      </div>
                    </Question>
                  )}

                  {step === 7 && (
                    <Question
                      title="Where shall we send your plan?"
                      hint="Email is enough. Phone optional — we won't cold-call you."
                    >
                      <div className="space-y-3">
                        <input
                          type="text"
                          value={data.name}
                          onChange={(e) => setData({ ...data, name: e.target.value })}
                          placeholder="Your name"
                          data-testid="input-name"
                          className="w-full px-4 py-3 border-2 border-[var(--ink)] rounded-xl font-body text-base bg-[var(--bg)] focus:outline-none focus:bg-[var(--p-yellow)]/30"
                        />
                        <input
                          type="email"
                          value={data.email}
                          onChange={(e) => setData({ ...data, email: e.target.value })}
                          placeholder="your@email.com"
                          data-testid="input-email"
                          className="w-full px-4 py-3 border-2 border-[var(--ink)] rounded-xl font-body text-base bg-[var(--bg)] focus:outline-none focus:bg-[var(--p-yellow)]/30"
                        />
                        <input
                          type="tel"
                          value={data.phone}
                          onChange={(e) => setData({ ...data, phone: e.target.value })}
                          placeholder="Phone (optional)"
                          data-testid="input-phone"
                          className="w-full px-4 py-3 border-2 border-[var(--ink)] rounded-xl font-body text-base bg-[var(--bg)] focus:outline-none focus:bg-[var(--p-yellow)]/30"
                        />
                        <textarea
                          rows={3}
                          value={data.extra_notes}
                          onChange={(e) => setData({ ...data, extra_notes: e.target.value })}
                          placeholder="Anything else you'd like us to know? (optional)"
                          data-testid="input-notes"
                          className="w-full px-4 py-3 border-2 border-[var(--ink)] rounded-xl font-body text-sm bg-[var(--bg)] focus:outline-none focus:bg-[var(--p-yellow)]/30"
                        />
                        {error && (
                          <div className="font-body text-sm text-red-600">{error}</div>
                        )}
                      </div>
                    </Question>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Nav */}
            <div className="mt-6 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep((s) => Math.max(1, s - 1))}
                disabled={step === 1}
                data-testid="step-back"
                className="btn-pill !py-1.5 !px-3.5 text-xs disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back
              </button>

              {step < TOTAL_STEPS ? (
                <button
                  type="button"
                  onClick={() => setStep((s) => s + 1)}
                  disabled={!canAdvance()}
                  data-testid="step-next"
                  className="btn-pill btn-pill-pink !py-1.5 !px-3.5 text-xs disabled:opacity-50"
                >
                  Next <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={submit}
                  disabled={!canAdvance() || submitting}
                  data-testid="step-submit"
                  className="btn-pill btn-pill-pink !py-2 !px-5 text-sm disabled:opacity-60"
                >
                  {submitting ? "Sending…" : (<>Get my plan <Send className="w-4 h-4" /></>)}
                </button>
              )}
            </div>
          </div>

          {/* Secondary CTA */}
          <div className="mt-8 card-blunt p-5 bg-[var(--bg-2)] flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div>
              <div className="font-display text-base text-[var(--ink)]">Prefer a real conversation?</div>
              <p className="font-body text-xs text-[var(--ink-soft)] mt-1">
                Book a 25-min chat instead — same outcome, just live.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <a
                href={siteConfig.calendlyUrl}
                target="_blank"
                rel="noreferrer"
                data-testid="readiness-calendly"
                className="btn-pill btn-pill-yellow !py-1.5 !px-3.5 text-xs"
              >
                <Calendar className="w-3.5 h-3.5" /> Book a chat
              </a>
              <a
                href={waLink()}
                target="_blank"
                rel="noreferrer"
                data-testid="readiness-whatsapp"
                className="btn-pill !py-1.5 !px-3.5 text-xs"
              >
                WhatsApp
              </a>
            </div>
          </div>

          <div className="h-16" />
        </div>
      </section>
    </PageShell>
  );
}
