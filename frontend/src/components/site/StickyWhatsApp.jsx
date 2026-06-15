import { MessageCircle, Sparkles } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { waLink } from "../../lib/siteConfig";

export const StickyWhatsApp = () => {
  const location = useLocation();
  // Hide the "Get my plan" CTA on pages that already feature the form prominently
  const onReadinessPage =
    location.pathname.startsWith("/readiness-plan") ||
    location.pathname.startsWith("/contact");

  return (
    <div className="fixed bottom-4 right-4 md:bottom-7 md:right-7 z-40 flex items-center gap-2 md:gap-3">
      {!onReadinessPage && (
        <Link
          to="/readiness-plan"
          data-testid="sticky-readiness"
          aria-label="Get a free readiness plan"
          className="group inline-flex items-center gap-1.5 bg-[var(--p-yellow)] text-[var(--ink)] border-[2.5px] border-[var(--ink)] px-3 py-2.5 md:px-4 md:py-3 font-display font-semibold text-xs md:text-sm rounded-full shadow-[var(--shadow-blunt-sm)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_0_var(--ink)] transition-all"
        >
          <Sparkles className="w-3.5 h-3.5 md:w-4 md:h-4" />
          <span>Get my plan</span>
        </Link>
      )}

      <a
        href={waLink()}
        target="_blank"
        rel="noreferrer"
        data-testid="sticky-whatsapp"
        aria-label="Message on WhatsApp"
        className="group inline-flex items-center gap-1.5 bg-[var(--p-pink)] text-[var(--ink)] border-[2.5px] border-[var(--ink)] px-3 py-2.5 md:px-4 md:py-3 font-display font-semibold text-xs md:text-sm rounded-full shadow-[var(--shadow-blunt-sm)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_0_var(--ink)] transition-all"
      >
        <MessageCircle className="w-3.5 h-3.5 md:w-4 md:h-4" />
        <span className="hidden sm:inline">Chat on WhatsApp</span>
      </a>
    </div>
  );
};

export default StickyWhatsApp;
