import PageShell from "./PageShell";
import Contact from "../components/site/Contact";
import ReadinessForm from "../components/site/ReadinessForm";

export default function ContactPage() {
  return (
    <PageShell testId="contact-page">
      <Contact />

      {/* Readiness Plan questionnaire — embedded so visitors can fill it
          without leaving the Contact page */}
      <section
        id="readiness"
        data-testid="contact-readiness-section"
        className="relative px-5 md:px-10 pb-20 md:pb-28"
      >
        <div className="max-w-2xl mx-auto">
          <div className="card-blunt p-6 md:p-8 bg-[var(--bg)]">
            <ReadinessForm testIdPrefix="contact-" />
          </div>
        </div>
      </section>
    </PageShell>
  );
}
