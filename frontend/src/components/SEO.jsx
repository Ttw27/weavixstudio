import { Helmet } from "react-helmet-async";
import { useSiteSettings } from "../lib/SiteSettings";

const titles = {
  home: "Bespoke digital ecosystems & custom AI",
  work: "Work — selected projects",
  services: "Services — websites, AI, apps, ads & more",
  examples: "Examples — what a digital ecosystem looks like for your business",
  process: "Process — how we work",
  contact: "Contact — let's build something",
  readiness: "Free AI readiness plan — find out what you'd save",
};

const descriptions = {
  home: "We design unified platforms — sites, apps, customer portals, automations and custom AIs — that lower costs and put AI to work for your business.",
  work: "Recent websites, AI automations, apps and campaigns we've shipped.",
  services: "Eight services — from digital ecosystems and custom AI to ads and social — all built so you OWN what we build.",
  examples: "20+ illustrative digital ecosystem builds for cafés, clinics, agencies, trades, creators and more.",
  process: "Four phases, weekly demos, senior operators. Less theatre, more shipping.",
  contact: "Book a chat or get a free personalised readiness plan emailed back within 24 hours.",
  readiness: "Answer 7 quick questions about your business. We'll email you a free, personalised plan showing what we'd build and what it'd save.",
};

export default function SEO({ page = "home", titleOverride, descriptionOverride }) {
  const { settings } = useSiteSettings();
  const studio = settings.studioName || "Your Studio";
  const liveTitle = settings.seo?.perPage?.[page];
  const baseTitle = titleOverride || liveTitle || titles[page] || titles.home;
  const finalTitle = `${baseTitle} · ${studio}`;
  const description =
    descriptionOverride ||
    settings.seo?.description ||
    descriptions[page] ||
    descriptions.home;
  const ogImage = settings.seo?.ogImage || "";

  return (
    <Helmet>
      <title>{finalTitle}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      {ogImage && <meta property="og:image" content={ogImage} />}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={description} />
      {ogImage && <meta name="twitter:image" content={ogImage} />}
      <link
        rel="canonical"
        href={typeof window !== "undefined" ? window.location.href : ""}
      />
      {settings.ga && (
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${settings.ga}`}
        />
      )}
      {settings.ga && (
        <script>{`window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', '${settings.ga}');`}</script>
      )}
    </Helmet>
  );
}
