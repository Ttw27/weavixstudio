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
      className="fixed bottom-5 right-5 md:bottom-8 md:right-8 z-40 group"
    >
      <span className="flex items-center gap-3 bg-[var(--accent)] text-[#0a0a0a] border-2 border-[var(--accent)] px-4 py-3 font-mono text-xs uppercase tracking-[0.2em] font-semibold shadow-[4px_4px_0_0_#000] group-hover:shadow-[2px_2px_0_0_#000] group-hover:translate-x-[2px] group-hover:translate-y-[2px] transition-all">
        <MessageCircle className="w-4 h-4" />
        <span className="hidden sm:inline">Chat on WhatsApp</span>
      </span>
    </a>
  );
};

export default StickyWhatsApp;
