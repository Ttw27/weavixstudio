import { useEffect, useState } from "react";
import { siteConfig, waLink } from "../../lib/siteConfig";

const links = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      data-testid="site-navbar"
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-200 ${
        scrolled ? "bg-black/70 backdrop-blur-md border-b border-[#1a1a1a]" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto max-w-[1600px] px-6 md:px-10 h-16 flex items-center justify-between">
        <a
          href="#top"
          data-testid="nav-logo"
          className="font-display text-xl tracking-tighter uppercase text-[var(--text)]"
        >
          {siteConfig.studioName}<span className="text-[var(--accent)]">.</span>
        </a>

        <ul className="hidden md:flex items-center gap-10 font-mono text-xs uppercase tracking-[0.2em] text-[var(--text-dim)]">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                data-testid={`nav-link-${l.label.toLowerCase()}`}
                className="hover:text-[var(--text)] transition-colors"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-3">
          <a
            data-testid="nav-whatsapp-btn"
            href={waLink()}
            target="_blank"
            rel="noreferrer"
            className="btn-brutal btn-brutal-accent !py-2 !px-4 text-xs"
          >
            WhatsApp
          </a>
        </div>

        <button
          data-testid="nav-mobile-toggle"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden font-mono text-xs uppercase tracking-[0.2em] text-[var(--text)] border-2 border-[var(--text)] px-3 py-2"
          aria-label="Toggle menu"
        >
          {open ? "Close" : "Menu"}
        </button>
      </nav>

      {open && (
        <div className="md:hidden bg-black border-b border-[#1a1a1a]">
          <ul className="flex flex-col py-4 px-6 gap-4 font-mono text-sm uppercase tracking-[0.18em]">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  data-testid={`nav-mobile-${l.label.toLowerCase()}`}
                  className="block py-2 text-[var(--text-dim)] hover:text-[var(--text)]"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li className="pt-2">
              <a
                href={waLink()}
                target="_blank"
                rel="noreferrer"
                data-testid="nav-mobile-whatsapp"
                className="btn-brutal btn-brutal-accent w-full justify-center"
              >
                WhatsApp
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;
