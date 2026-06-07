import PageShell from "./PageShell";
import AiReady from "../components/site/AiReady";
import Services from "../components/site/Services";
import { siteConfig, waLink } from "../lib/siteConfig";

export default function ServicesPage() {
  return (
    <PageShell testId="services-page">
      {/* Page header */}
      <section className="px-5 md:px-10 pb-2">
        <div className="max-w-[1400px] mx-auto">
          <span className="sticker bg-[var(--p-yellow)] mb-4">★ what we do</span>
          <h1 className="display-xxl text-[var(--ink)] mt-3">
            Bespoke <span className="squiggle">digital</span> ecosystems.
          </h1>
          <p className="mt-4 max-w-3xl font-body text-base md:text-lg text-[var(--ink-soft)]">
            We don't just build websites. We build unified platforms — sites,
            apps, customer portals, automations and custom AIs — designed as one
            tailored system around how your business actually runs.
          </p>
          <p className="mt-3 max-w-3xl font-body text-base text-[var(--ink-soft)]">
            Click any card for ideas you might not have thought of — the kind
            that make founders go <span className="font-hand text-2xl text-[var(--p-pink)]">"I need this."</span>
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={siteConfig.calendlyUrl} target="_blank" rel="noreferrer" className="btn-pill btn-pill-pink" data-testid="services-cta-calendly">Book a chat</a>
            <a href={waLink()} target="_blank" rel="noreferrer" className="btn-pill btn-pill-yellow" data-testid="services-cta-whatsapp">WhatsApp →</a>
          </div>
        </div>
      </section>

      <Services hideHeader />
      <AiReady />
    </PageShell>
  );
}
