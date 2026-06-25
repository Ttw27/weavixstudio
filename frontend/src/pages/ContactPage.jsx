import PageShell from "./PageShell";
import { ContactHero, ContactCTAs, ContactFAQ } from "../components/site/Contact";
import ReadinessForm from "../components/site/ReadinessForm";

export default function ContactPage() {
  return (
    <PageShell testId="contact-page">
      {/* Hero — small intro */}
      <section className="relative px-5 md:px-10 pt-2 pb-12 md:pb-16 overflow-hidden">
        {/* Floating fun shapes */}
        <div className="absolute top-20 right-[5%] w-24 h-24 rounded-full bg-[var(--p-yellow)] border-[3px] border-[var(--ink)] shadow-[var(--shadow-blunt)] tilt-r-3 hidden md:block" />
        <div className="absolute bottom-10 left-[5%] w-20 h-20 bg-[var(--p-blue)] border-[3px] border-[var(--ink)] shadow-[var(--shadow-blunt)] tilt-l-3 rounded-2xl hidden md:block" />
        <ContactHero />
      </section>

      {/* Readiness Plan questionnaire — FIRST: give us a brief, get a free plan */}
      <section
        id="readiness"
        data-testid="contact-readiness-section"
        className="relative px-5 md:px-10 pb-12 md:pb-16"
      >
        <div className="max-w-2xl mx-auto">
          <ReadinessForm testIdPrefix="contact-" />
        </div>
      </section>

      {/* CTA cards — SECOND: book a chat or WhatsApp us instead */}
      <section
        data-testid="contact-cta-section"
        className="relative px-5 md:px-10 pb-12 md:pb-16"
      >
        <ContactCTAs heading="…or jump straight to a real conversation." />
      </section>

      {/* FAQ — THIRD: common questions */}
      <section
        data-testid="contact-faq-section"
        className="relative px-5 md:px-10 pb-20 md:pb-28"
      >
        <ContactFAQ />
      </section>
    </PageShell>
  );
}
