import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { siteConfig, waLink } from "../../lib/siteConfig";

const links = [
  { label: "Work", to: "work" },
  { label: "Services", to: "services" },
  { label: "Process", to: "process" },
  { label: "Contact", to: "contact" },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLink = (e, to) => {
    e.preventDefault();
    setOpen(false);
    if (location.pathname !== "/") {
      navigate("/", { state: { scrollTo: to } });
    } else {
      const el = document.getElementById(to);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      data-testid="site-navbar"
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-200 ${
        scrolled ? "bg-[var(--bg)]/85 backdrop-blur-md border-b-2 border-[var(--ink)]" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto max-w-[1400px] px-5 md:px-10 h-16 md:h-20 flex items-center justify-between">
        <Link
          to="/"
          data-testid="nav-logo"
          className="font-display text-2xl md:text-3xl text-[var(--ink)] flex items-center gap-1"
        >
          {siteConfig.studioName}
          <span className="dot ml-1" />
        </Link>

        <ul className="hidden md:flex items-center gap-8 font-body font-bold text-sm">
          {links.map((l) => (
            <li key={l.to}>
              <a
                href={`#${l.to}`}
                onClick={(e) => handleLink(e, l.to)}
                data-testid={`nav-link-${l.label.toLowerCase()}`}
                className="text-[var(--ink)] hover:underline decoration-[var(--p-pink)] decoration-[3px] underline-offset-4"
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
            className="btn-pill btn-pill-yellow !py-2 !px-4 text-sm"
          >
            Say hi 👋
          </a>
        </div>

        <button
          data-testid="nav-mobile-toggle"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden btn-pill btn-pill-yellow !py-2 !px-4 text-sm"
          aria-label="Toggle menu"
        >
          {open ? "Close" : "Menu"}
        </button>
      </nav>

      {open && (
        <div className="md:hidden bg-[var(--bg)] border-b-2 border-[var(--ink)]">
          <ul className="flex flex-col py-4 px-5 gap-3 font-display text-lg">
            {links.map((l) => (
              <li key={l.to}>
                <a
                  href={`#${l.to}`}
                  onClick={(e) => handleLink(e, l.to)}
                  data-testid={`nav-mobile-${l.label.toLowerCase()}`}
                  className="block py-1.5 text-[var(--ink)]"
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
