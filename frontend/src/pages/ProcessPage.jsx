import PageShell from "./PageShell";
import Process from "../components/site/Process";
import Testimonials from "../components/site/Testimonials";

export default function ProcessPage() {
  return (
    <PageShell testId="process-page">
      <section className="px-5 md:px-10 pb-2">
        <div className="max-w-[1400px] mx-auto">
          <span className="sticker bg-[var(--p-blue)] mb-4">⚡ how we work</span>
          <h1 className="display-xxl text-[var(--ink)] mt-3">
            Four phases.<br />
            <span className="squiggle">Zero theatrics.</span>
          </h1>
          <p className="mt-4 max-w-2xl font-body text-base md:text-lg text-[var(--ink-soft)]">
            Senior operators, async by default, weekly demos. We'd rather ship
            than present. Here's how a typical project unfolds — from first call
            to live launch and beyond.
          </p>
        </div>
      </section>

      <Process hideHeader />
      <Testimonials />
    </PageShell>
  );
}
