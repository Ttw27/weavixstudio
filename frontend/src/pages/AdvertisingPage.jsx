import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar, Check } from "lucide-react";
import PageShell from "./PageShell";
import SEO from "../components/SEO";
import { useSiteSettings } from "../lib/SiteSettings";
import { colorMap } from "../lib/siteConfig";

const problems = [
  {
    color: "pink",
    title: "Boost and hope",
    body: "A post does well, you hit Boost, the money goes, the phone doesn't ring. Nobody can tell you why.",
  },
  {
    color: "yellow",
    title: "Someone else's ad account",
    body: "Your agency runs the ads from their account. Leave, and the history, audiences and pixel data leave with them.",
  },
  {
    color: "blue",
    title: "Content runs dry by week three",
    body: "Ads need fresh creative and socials need daily posts. Most small teams run out of ideas long before they run out of budget.",
  },
];

const planParts = [
  {
    color: "yellow",
    tag: "01",
    title: "The offer and the message",
    body: "Who you're for, what you solve and the one reason to act now. Every ad and post hangs off this, so we write it first.",
  },
  {
    color: "mint",
    tag: "02",
    title: "Ad accounts in your name",
    body: "Meta, Google and TikTok set up under your business, with the pixel and conversion tracking wired in properly. You own the data from day one.",
  },
  {
    color: "pink",
    tag: "03",
    title: "A creative system, not one-offs",
    body: "Branded post templates, short videos and reels made in monthly batches, so there's always something new to test and post.",
  },
  {
    color: "lilac",
    tag: "04",
    title: "A daily social calendar",
    body: "A theme for every day of the week - problem, explainer, behind the scenes, a free tip - planned months ahead and scheduled in one go.",
  },
  {
    color: "blue",
    tag: "05",
    title: "A landing page that captures",
    body: "Ad traffic goes to a page built for one job, with every enquiry landing in your own dashboard instead of a forgotten inbox.",
  },
  {
    color: "orange",
    tag: "06",
    title: "Reports you can actually read",
    body: "What was spent, what came in, what we're testing next. A short weekly note in plain English, plus a live dashboard you own.",
  },
];

const timeline = [
  {
    weeks: "Weeks 1-2",
    title: "Foundations",
    body: "Offer and message agreed. Ad accounts, pixel and tracking set up in your name. First batch of creative made. Social calendar loaded.",
  },
  {
    weeks: "Weeks 3-6",
    title: "Test small",
    body: "A modest daily budget, a handful of different ads, one broad audience. The aim is to learn which message lands, not to spend big.",
  },
  {
    weeks: "Weeks 7-10",
    title: "Back the winners",
    body: "Ads that bring enquiries get more budget. Ads that don't get switched off. New creative built around what worked.",
  },
  {
    weeks: "Weeks 11-13",
    title: "Scale and retarget",
    body: "Reach people who've already engaged with your posts and site. Decide the next quarter's budget from real numbers, not guesses.",
  },
];

const budget = [
  {
    color: "mint",
    title: "Testing",
    body: "A few pounds a day. Enough to find out what people respond to before committing more.",
  },
  {
    color: "yellow",
    title: "Growing",
    body: "Budget moves to the ads that bring enquiries. Spend only goes up when the results justify it.",
  },
  {
    color: "pink",
    title: "Scaling",
    body: "More platforms, more creative, retargeting. Built on what the first two stages proved.",
  },
];

const ownership = [
  "The ad accounts are registered to your business",
  "The pixel and all the audience data sit in your account",
  "Every creative file is yours to keep and reuse",
  "Ad spend is paid by you, straight to the platform - never marked up",
  "If we ever part ways, you keep everything and carry on",
];

const faqs = [
  {
    q: "Is there a minimum ad spend?",
    a: "No. Many businesses start with a few pounds a day while we find the message that works. We'll recommend a test budget that fits where you are.",
  },
  {
    q: "Which platforms do you cover?",
    a: "Facebook, Instagram, TikTok and Google. We'll tell you honestly which ones suit your customers - most businesses don't need all four.",
  },
  {
    q: "Do I need to make videos?",
    a: "No. We make the branded posts, short videos and reels. If you're happy to film the odd 30-second clip on your phone, it helps - people trust a real face.",
  },
  {
    q: "Am I tied in?",
    a: "No long contracts. Because everything runs on your accounts, you can stop, pause or take it in-house at any point.",
  },
  {
    q: "Can it connect to the rest of my business?",
    a: "Yes. Enquiries can feed straight into your own dashboard or business system, so every lead is followed up and you can see which ads actually brought in work.",
  },
];

const fade = (i = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.4, delay: (i % 3) * 0.06 },
});

export default function AdvertisingPage() {
  const { settings } = useSiteSettings();

  return (
    <PageShell testId="advertising-page">
      <SEO page="advertising" />

      {/* Header */}
      <section className="px-5 md:px-10 pb-2">
        <div className="max-w-[1400px] mx-auto">
          <span className="sticker bg-[var(--p-orange)] mb-4">★ ads &amp; social for small businesses</span>
          <h1 className="display-xxl text-[var(--ink)] mt-3 max-w-[16ch]">
            Ads and social that <span className="squiggle">you own.</span>
          </h1>
          <p className="mt-4 max-w-3xl font-body text-base md:text-lg text-[var(--ink-soft)]">
            A full media plan for your business - the offer, the ads, a daily
            social calendar, the creative to fill it and the tracking to prove
            what works. All run on your own accounts, so nothing is ever held
            hostage.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/readiness-plan" className="btn-pill btn-pill-pink" data-testid="advertising-cta-plan">
              Get my free plan <ArrowRight className="w-4 h-4" />
            </Link>
            <a href={settings.calendlyUrl} target="_blank" rel="noreferrer" className="btn-pill btn-pill-yellow" data-testid="advertising-cta-calendly">
              <Calendar className="w-4 h-4" /> Book a chat
            </a>
          </div>
        </div>
      </section>

      {/* Problems */}
      <section className="py-14 md:py-20 px-5 md:px-10">
        <div className="max-w-[1400px] mx-auto">
          <h2 className="display-xl text-[var(--ink)] max-w-3xl">
            Sound familiar?
          </h2>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
            {problems.map((p, i) => (
              <motion.div key={p.title} {...fade(i)} className="card-blunt p-6" style={{ background: colorMap[p.color] }}>
                <h3 className="font-display text-xl text-[var(--ink)] leading-tight">{p.title}</h3>
                <p className="mt-3 font-body text-sm text-[var(--ink)] leading-relaxed opacity-90">{p.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What the plan covers */}
      <section className="py-14 md:py-20 px-5 md:px-10 bg-[var(--bg-2)]">
        <div className="max-w-[1400px] mx-auto">
          <span className="sticker bg-[var(--p-mint)] mb-4">✦ the full plan</span>
          <h2 className="display-xl text-[var(--ink)] max-w-3xl mt-3">
            Everything a campaign needs, <span className="squiggle">in one place.</span>
          </h2>
          <p className="mt-5 max-w-2xl font-body text-base md:text-lg text-[var(--ink-soft)] leading-relaxed">
            Ads on their own rarely work. They work when the message, the
            creative, the page they land on and the follow-up all pull in the
            same direction.
          </p>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {planParts.map((p, i) => (
              <motion.div key={p.title} {...fade(i)} className="card-blunt p-6" style={{ background: colorMap[p.color] }}>
                <span className="sticker bg-[var(--surface)] !text-[10px]">part {p.tag}</span>
                <h3 className="mt-5 font-display text-lg md:text-xl text-[var(--ink)] leading-tight">{p.title}</h3>
                <p className="mt-3 font-body text-sm text-[var(--ink)] leading-relaxed opacity-90">{p.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 90-day timeline */}
      <section className="py-14 md:py-20 px-5 md:px-10">
        <div className="max-w-[1400px] mx-auto">
          <span className="sticker bg-[var(--p-yellow)] mb-4">⏱ the first 90 days</span>
          <h2 className="display-xl text-[var(--ink)] max-w-3xl mt-3">
            Start small. Prove it. <span className="squiggle">Then scale.</span>
          </h2>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
            {timeline.map((t, i) => (
              <motion.div key={t.weeks} {...fade(i)} className="card-blunt p-6 bg-[var(--surface)]">
                <div className="font-hand text-2xl text-[var(--p-pink)]">{t.weeks}</div>
                <h3 className="mt-1 font-display text-xl text-[var(--ink)] leading-tight">{t.title}</h3>
                <p className="mt-3 font-body text-sm text-[var(--ink-soft)] leading-relaxed">{t.body}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
            {budget.map((b, i) => (
              <motion.div key={b.title} {...fade(i)} className="card-blunt p-5" style={{ background: colorMap[b.color] }}>
                <div className="flex items-center gap-2">
                  <span className="dot" />
                  <div className="font-display text-lg text-[var(--ink)]">{b.title}</div>
                </div>
                <p className="mt-2 font-body text-sm text-[var(--ink)] leading-relaxed opacity-90">{b.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Ownership */}
      <section className="py-14 md:py-20 px-5 md:px-10 bg-[var(--bg-2)]">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <span className="sticker bg-[var(--p-pink)] text-white mb-4">♥ the weavix difference</span>
            <h2 className="display-xl text-[var(--ink)] mt-3">
              Your ads. Your data. <span className="squiggle">Your call.</span>
            </h2>
            <p className="mt-5 font-body text-base md:text-lg text-[var(--ink-soft)] leading-relaxed">
              Months of ad history and audience data are worth real money. They
              should belong to the business that paid for them.
            </p>
          </div>
          <div className="card-blunt p-6 md:p-8 bg-[var(--surface)]">
            <ul className="space-y-4">
              {ownership.map((o) => (
                <li key={o} className="flex items-start gap-3 font-body text-base text-[var(--ink)] font-bold">
                  <Check className="w-5 h-5 shrink-0 mt-0.5 text-[var(--p-pink)]" /> {o}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-14 md:py-20 px-5 md:px-10">
        <div className="max-w-[900px] mx-auto">
          <h2 className="display-xl text-[var(--ink)]">Questions</h2>
          <div className="mt-8 space-y-4">
            {faqs.map((f) => (
              <details key={f.q} className="card-blunt p-5 bg-[var(--surface)] group">
                <summary className="font-display text-lg text-[var(--ink)] cursor-pointer list-none flex justify-between items-center gap-4">
                  {f.q}
                  <span className="text-[var(--p-pink)] text-2xl leading-none group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="mt-3 font-body text-sm md:text-base text-[var(--ink-soft)] leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-16 md:pb-24 px-5 md:px-10">
        <div className="max-w-[1400px] mx-auto card-blunt p-7 md:p-10 bg-[var(--ink)] text-[var(--bg)] flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="max-w-2xl">
            <div className="font-hand text-2xl text-[var(--p-yellow)]">free, no call needed</div>
            <h3 className="display-lg !text-2xl md:!text-3xl text-[var(--bg)] mt-1">
              Get a plan for your business first.
            </h3>
            <p className="mt-3 font-body text-sm text-[var(--bg)] opacity-80">
              Answer 7 quick questions. We'll email back the ads, content and
              systems we'd put in place for you - and where we'd start.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <Link to="/readiness-plan" className="btn-pill btn-pill-yellow" data-testid="advertising-cta-bottom">
              Get my plan <ArrowRight className="w-4 h-4" />
            </Link>
            <a href={settings.calendlyUrl} target="_blank" rel="noreferrer" className="btn-pill bg-[var(--surface)]">
              Or book a chat
            </a>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
