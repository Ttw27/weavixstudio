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
  if (!live) return defaultConfig;
  return {
    ...defaultConfig,
    ...(live.studioName ? { studioName: live.studioName } : {}),
    ...(live.tagline ? { tagline: live.tagline } : {}),
    ...(live.location ? { location: live.location } : {}),
    ...(live.establishedYear ? { establishedYear: live.establishedYear } : {}),
    ...(live.whatsappNumber ? { whatsappNumber: live.whatsappNumber } : {}),
    ...(live.whatsappMessage ? { whatsappMessage: live.whatsappMessage } : {}),
    ...(live.calendlyUrl ? { calendlyUrl: live.calendlyUrl } : {}),
    ...(live.email ? { email: live.email } : {}),
    socials: {
      instagram: live.instagram || defaultConfig.socials.instagram,
      linkedin: live.linkedin || defaultConfig.socials.linkedin,
      x: live.x_url || defaultConfig.socials.x,
    },
    seo: {
      title: live.seo_default_title || "",
      description: live.seo_default_description || "",
      ogImage: live.seo_default_og_image || "",
      perPage: {
        home: live.seo_home || "",
        work: live.seo_work || "",
        services: live.seo_services || "",
        examples: live.seo_examples || "",
        process: live.seo_process || "",
        contact: live.seo_contact || "",
        readiness: live.seo_readiness || "",
      },
    },
    ga: live.ga_measurement_id || "",
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
