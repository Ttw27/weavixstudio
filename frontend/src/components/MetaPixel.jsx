import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSiteSettings } from "../lib/SiteSettings";

// Meta (Facebook) pixel. Switched on by pasting the pixel ID into Admin > SEO.
// Loads once, then fires PageView on every route change (the site is a SPA,
// so Meta would otherwise only see the first page). Admin pages are skipped.
const loadPixel = (id) => {
  if (window.fbq) return;
  /* eslint-disable */
  !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
  n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
  document,'script','https://connect.facebook.net/en_US/fbevents.js');
  /* eslint-enable */
  window.fbq("init", id);
};

export const trackMeta = (event, params) => {
  if (window.fbq) window.fbq("track", event, params);
};

export default function MetaPixel() {
  const { settings } = useSiteSettings();
  const location = useLocation();
  const id = (settings.metaPixel || "").trim();

  useEffect(() => {
    if (!id || location.pathname.startsWith("/admin")) return;
    loadPixel(id);
    window.fbq("track", "PageView");
  }, [id, location.pathname]);

  return null;
}
