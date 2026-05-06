import { siteConfig } from "../../lib/siteConfig";

export const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer
      data-testid="site-footer"
      className="relative border-t border-[var(--line)] bg-black"
    >
      <div className="px-6 md:px-10 py-12 md:py-16 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="col-span-2">
          <div className="font-display text-3xl md:text-4xl uppercase tracking-tighter text-[var(--text)]">
            {siteConfig.studioName}<span className="text-[var(--accent)]">.</span>
          </div>
          <p className="mt-4 font-mono text-sm text-[var(--text-dim)] max-w-sm">
            Websites · AI · Apps · Ads · Social. One studio for founders who
            ship.
          </p>
        </div>

        <div>
          <div className="eyebrow mb-3">Studio</div>
          <ul className="space-y-2 font-mono text-sm">
            <li><a href="#work" className="text-[var(--text-dim)] hover:text-[var(--text)]">Work</a></li>
            <li><a href="#services" className="text-[var(--text-dim)] hover:text-[var(--text)]">Services</a></li>
            <li><a href="#process" className="text-[var(--text-dim)] hover:text-[var(--text)]">Process</a></li>
            <li><a href="#contact" className="text-[var(--text-dim)] hover:text-[var(--text)]">Contact</a></li>
          </ul>
        </div>

        <div>
          <div className="eyebrow mb-3">Elsewhere</div>
          <ul className="space-y-2 font-mono text-sm">
            <li><a data-testid="footer-instagram" href={siteConfig.socials.instagram} target="_blank" rel="noreferrer" className="text-[var(--text-dim)] hover:text-[var(--text)]">Instagram ↗</a></li>
            <li><a data-testid="footer-linkedin" href={siteConfig.socials.linkedin} target="_blank" rel="noreferrer" className="text-[var(--text-dim)] hover:text-[var(--text)]">LinkedIn ↗</a></li>
            <li><a data-testid="footer-x" href={siteConfig.socials.x} target="_blank" rel="noreferrer" className="text-[var(--text-dim)] hover:text-[var(--text)]">X / Twitter ↗</a></li>
            <li><a data-testid="footer-email" href={`mailto:${siteConfig.email}`} className="text-[var(--text-dim)] hover:text-[var(--text)]">{siteConfig.email}</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-[var(--line)] px-6 md:px-10 py-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-2 font-mono text-xs text-[var(--text-dim)] uppercase tracking-[0.2em]">
        <div>© {year} {siteConfig.studioName} — All rights reserved.</div>
        <div className="flex items-center gap-3">
          <span className="text-[var(--accent)]">●</span>
          <span>System operational</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
