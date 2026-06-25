import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useSiteSettings, liveWaLink } from "../../lib/SiteSettings";

const links = [
  { label: "Work", to: "/work" },
  { label: "Services", to: "/services" },
  { label: "Examples", to: "/examples" },
  { label: "Process", to: "/process" },
  { label: "Contact", to: "/contact" },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { settings } = useSiteSettings();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <header
      data-testid="site-navbar"
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-200 ${
        scrolled || open ? "bg-[var(--bg)]/90 backdrop-blur-md border-b-2 border-[var(--ink)]" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto max-w-[1400px] px-5 md:px-10 h-14 md:h-16 flex items-center justify-between">
        <Link
          to="/"
          data-testid="nav-logo"
          aria-label={settings.studioName}
          className="flex items-center"
        >
          <img
            src="/weavix-logo.png"
            alt={settings.studioName}
            className="h-9 md:h-11 w-auto select-none"
            draggable={false}
          />
        </Link>

        <ul className="hidden md:flex items-center gap-7 font-body font-bold text-sm">
          {links.map((l) => (
            <li key={l.to}>
              <NavLink
                to={l.to}
                data-testid={`nav-link-${l.label.toLowerCase()}`}
                className={({ isActive }) =>
                  `text-[var(--ink)] hover:underline decoration-[var(--p-pink)] decoration-[3px] underline-offset-4 ${
                    isActive ? "underline" : ""
                  }`
                }
              >
                {l.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-3">
          <a
            data-testid="nav-whatsapp-btn"
            href={liveWaLink(settings)}
            target="_blank"
            rel="noreferrer"
            className="btn-pill btn-pill-yellow !py-1.5 !px-3.5 text-xs"
          >
            Say hi 👋
          </a>
        </div>

        <button
          data-testid="nav-mobile-toggle"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden btn-pill btn-pill-yellow !py-1.5 !px-3.5 text-xs"
          aria-label="Toggle menu"
        >
          {open ? "Close" : "Menu"}
        </button>
      </nav>

      {open && (
        <div className="md:hidden bg-[var(--bg)] border-b-2 border-[var(--ink)]">
          <ul className="flex flex-col py-3 px-5 gap-1.5 font-display text-base">
            {links.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  data-testid={`nav-mobile-${l.label.toLowerCase()}`}
                  className="block py-1.5 text-[var(--ink)]"
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <a
                href={liveWaLink(settings)}
                target="_blank"
                rel="noreferrer"
                data-testid="nav-mobile-whatsapp"
                className="btn-pill btn-pill-yellow w-full justify-center"
              >
                WhatsApp 👋
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;
