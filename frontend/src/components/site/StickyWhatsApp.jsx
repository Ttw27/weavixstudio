import { MessageCircle } from "lucide-react";
import { waLink } from "../../lib/siteConfig";

export const StickyWhatsApp = () => {
  return (
    <a
      href={waLink()}
      target="_blank"
      rel="noreferrer"
      data-testid="sticky-whatsapp"
      aria-label="Message on WhatsApp"
      className="fixed bottom-5 right-5 md:bottom-7 md:right-7 z-40 group"
    >
      <span className="flex items-center gap-2 bg-[var(--p-pink)] text-[var(--ink)] border-[2.5px] border-[var(--ink)] px-4 py-3 font-display font-semibold text-sm rounded-full shadow-[var(--shadow-blunt-sm)] group-hover:translate-x-0.5 group-hover:translate-y-0.5 group-hover:shadow-[2px_2px_0_0_var(--ink)] transition-all">
        <MessageCircle className="w-4 h-4" />
        <span className="hidden sm:inline">Chat on WhatsApp</span>
      </span>
    </a>
  );
};

export default StickyWhatsApp;
