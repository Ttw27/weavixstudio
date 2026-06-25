import PageShell from "./PageShell";
import LiveProjects from "../components/site/LiveProjects";
import { useSiteSettings, liveWaLink } from "../lib/SiteSettings";

export default function WorkPage() {
  const { settings } = useSiteSettings();
  return (
    <PageShell testId="work-page">
      <section className="px-5 md:px-10 pb-2">
        <div className="max-w-[1400px] mx-auto">
          <span className="sticker bg-[var(--p-pink)] text-white mb-4">♥ our work</span>
          <h1 className="display-xxl text-[var(--ink)] mt-3">
            Real projects. <br />
            <span className="squiggle">Real outcomes.</span>
          </h1>
          <p className="mt-4 max-w-2xl font-body text-base md:text-lg text-[var(--ink-soft)]">
            We don't just build pretty sites. Each project below is a digital
            ecosystem we built to save its owner time, win them customers, and
            future-proof the business. Tap any card for the full breakdown.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={settings.calendlyUrl} target="_blank" rel="noreferrer" className="btn-pill btn-pill-pink" data-testid="work-cta-calendly">Book a chat</a>
            <a href={liveWaLink(settings)} target="_blank" rel="noreferrer" className="btn-pill btn-pill-yellow" data-testid="work-cta-whatsapp">WhatsApp →</a>
          </div>
        </div>
      </section>

      <section className="px-5 md:px-10 mt-10 md:mt-14 mb-20 md:mb-28">
        <div className="max-w-[1400px] mx-auto">
          <LiveProjects />
        </div>
      </section>
    </PageShell>
  );
}
