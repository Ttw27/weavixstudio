import { Link } from "react-router-dom";
import { Calendar } from "lucide-react";
import PageShell from "./PageShell";
import ReadinessForm from "../components/site/ReadinessForm";
import { siteConfig, waLink } from "../lib/siteConfig";

export default function ReadinessPlanPage() {
  return (
    <PageShell testId="readiness-plan-page">
      <section className="px-5 md:px-10">
        <div className="max-w-2xl mx-auto">
          <div className="mb-2 flex items-center justify-end">
            <Link
              to="/"
              className="font-display text-sm text-[var(--p-pink)] hover:underline"
              data-testid="readiness-exit"
            >
              ✕ Save & exit
            </Link>
          </div>

          <ReadinessForm />

          {/* Secondary CTA */}
          <div className="mt-8 card-blunt p-5 bg-[var(--bg-2)] flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div>
              <div className="font-display text-base text-[var(--ink)]">
                Prefer a real conversation?
              </div>
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
