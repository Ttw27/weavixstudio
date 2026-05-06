import { siteConfig } from "../../lib/siteConfig";

export const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer
      data-testid="site-footer"
      className="relative bg-[var(--ink)] text-[var(--bg)] border-t-[3px] border-[var(--ink)]"
    >
      <div className="max-w-[1400px] mx-auto px-5 md:px-10 py-14 md:py-20 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="col-span-2">
          <div className="font-display text-4xl md:text-5xl text-[var(--bg)]">
            {siteConfig.studioName}<span className="text-[var(--p-yellow)]">.</span>
          </div>
          <p className="mt-4 font-body text-sm text-[var(--bg)] opacity-70 max-w-sm">
            Websites · AI · Apps · Ads · Social. One playful studio for
            founders who actually ship.
          </p>
          <p className="mt-6 font-hand text-3xl text-[var(--p-yellow)]">made with care ✨</p>
        </div>

        <div>
          <div className="font-display text-sm uppercase text-[var(--p-yellow)] mb-3">Studio</div>
          <ul className="space-y-2 font-body text-sm">
            <li><a href="/#work" className="hover:text-[var(--p-yellow)]">Work</a></li>
            <li><a href="/#services" className="hover:text-[var(--p-yellow)]">Services</a></li>
            <li><a href="/#process" className="hover:text-[var(--p-yellow)]">Process</a></li>
            <li><a href="/#contact" className="hover:text-[var(--p-yellow)]">Contact</a></li>
          </ul>
        </div>

        <div>
          <div className="font-display text-sm uppercase text-[var(--p-yellow)] mb-3">Elsewhere</div>
          <ul className="space-y-2 font-body text-sm">
            <li><a data-testid="footer-instagram" href={siteConfig.socials.instagram} target="_blank" rel="noreferrer" className="hover:text-[var(--p-yellow)]">Instagram ↗</a></li>
            <li><a data-testid="footer-linkedin" href={siteConfig.socials.linkedin} target="_blank" rel="noreferrer" className="hover:text-[var(--p-yellow)]">LinkedIn ↗</a></li>
            <li><a data-testid="footer-x" href={siteConfig.socials.x} target="_blank" rel="noreferrer" className="hover:text-[var(--p-yellow)]">X / Twitter ↗</a></li>
            <li><a data-testid="footer-email" href={`mailto:${siteConfig.email}`} className="hover:text-[var(--p-yellow)]">{siteConfig.email}</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/15 px-5 md:px-10 py-5 max-w-[1400px] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-2 font-body text-xs text-[var(--bg)] opacity-70">
        <div>© {year} {siteConfig.studioName} — All rights reserved.</div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[var(--p-mint)] inline-block" />
          <span>Open for projects</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
