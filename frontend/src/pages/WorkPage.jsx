import PageShell from "./PageShell";
import Portfolio from "../components/site/Portfolio";
import { siteConfig, waLink } from "../lib/siteConfig";

export default function WorkPage() {
  return (
    <PageShell testId="work-page">
      {/* Page header */}
      <section className="px-5 md:px-10 pb-2">
        <div className="max-w-[1400px] mx-auto">
          <span className="sticker bg-[var(--p-pink)] text-white mb-4">♥ our work</span>
          <h1 className="display-xxl text-[var(--ink)] mt-3">
            Selected <span className="squiggle">projects.</span>
          </h1>
          <p className="mt-4 max-w-2xl font-body text-base md:text-lg text-[var(--ink-soft)]">
            A slice of recent work across web, AI, apps, paid and organic.
            Click a card to see what we built, what we used, and what it moved.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={siteConfig.calendlyUrl} target="_blank" rel="noreferrer" className="btn-pill btn-pill-pink" data-testid="work-cta-calendly">Book a chat</a>
            <a href={waLink()} target="_blank" rel="noreferrer" className="btn-pill btn-pill-yellow" data-testid="work-cta-whatsapp">WhatsApp →</a>
          </div>
        </div>
      </section>

      <Portfolio hideHeader />
    </PageShell>
  );
}
