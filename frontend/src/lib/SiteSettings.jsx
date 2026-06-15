import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { siteConfig as defaultConfig } from "./siteConfig";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const SiteSettingsContext = createContext({
  settings: defaultConfig,
  loading: false,
  refresh: () => {},
});

// Map flat backend keys to siteConfig shape
const mergeWithDefaults = (live) => {
  const safe = live || {};
  return {
    ...defaultConfig,
    ...(safe.studioName ? { studioName: safe.studioName } : {}),
    ...(safe.tagline ? { tagline: safe.tagline } : {}),
    ...(safe.location ? { location: safe.location } : {}),
    ...(safe.establishedYear ? { establishedYear: safe.establishedYear } : {}),
    ...(safe.whatsappNumber ? { whatsappNumber: safe.whatsappNumber } : {}),
    ...(safe.whatsappMessage ? { whatsappMessage: safe.whatsappMessage } : {}),
    ...(safe.calendlyUrl ? { calendlyUrl: safe.calendlyUrl } : {}),
    ...(safe.email ? { email: safe.email } : {}),
    socials: {
      instagram: safe.instagram || defaultConfig.socials.instagram,
      linkedin: safe.linkedin || defaultConfig.socials.linkedin,
      x: safe.x_url || defaultConfig.socials.x,
    },
    seo: {
      title: safe.seo_default_title || "",
      description: safe.seo_default_description || "",
      ogImage: safe.seo_default_og_image || "",
      perPage: {
        home: safe.seo_home || "",
        work: safe.seo_work || "",
        services: safe.seo_services || "",
        examples: safe.seo_examples || "",
        process: safe.seo_process || "",
        contact: safe.seo_contact || "",
        readiness: safe.seo_readiness || "",
      },
    },
    ga: safe.ga_measurement_id || "",
  };
};

export const SiteSettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(mergeWithDefaults(null));
  const [loading, setLoading] = useState(true);

  const fetchSettings = async () => {
    try {
      const r = await axios.get(`${API}/settings`);
      setSettings(mergeWithDefaults(r.data));
    } catch (e) {
      // keep defaults on failure
      setSettings(mergeWithDefaults(null));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  return (
    <SiteSettingsContext.Provider value={{ settings, loading, refresh: fetchSettings }}>
      {children}
    </SiteSettingsContext.Provider>
  );
};

export const useSiteSettings = () => useContext(SiteSettingsContext);

// Convenience helper for WhatsApp link using live settings
export const liveWaLink = (cfg) =>
  `https://wa.me/${cfg.whatsappNumber}?text=${encodeURIComponent(cfg.whatsappMessage)}`;
