import { useEffect, useState } from "react";
import "@/App.css";
import axios from "axios";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { SiteSettingsProvider } from "./lib/SiteSettings";
import SEO from "./components/SEO";
import Navbar from "./components/site/Navbar";
import Hero from "./components/site/Hero";
import SalesHooks from "./components/site/SalesHooks";
import AiReady from "./components/site/AiReady";
import AiFrustration from "./components/site/AiFrustration";
import Services from "./components/site/Services";
import Portfolio from "./components/site/Portfolio";
import LiveProjects from "./components/site/LiveProjects";
import Process from "./components/site/Process";
import Testimonials from "./components/site/Testimonials";
import Contact from "./components/site/Contact";
import Footer from "./components/site/Footer";
import StickyWhatsApp from "./components/site/StickyWhatsApp";
import ProjectDetail from "./components/site/ProjectDetail";
import ProjectDetailPage from "./pages/ProjectDetailPage";
import ServiceDetail from "./components/site/ServiceDetail";
import DesignPreviews from "./components/site/DesignPreviews";
import WorkPage from "./pages/WorkPage";
import ServicesPage from "./pages/ServicesPage";
import ProcessPage from "./pages/ProcessPage";
import ContactPage from "./pages/ContactPage";
import ExamplesPage from "./pages/ExamplesPage";
import ReadinessPlanPage from "./pages/ReadinessPlanPage";
import AdminPage from "./pages/AdminPage";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const ScrollToTopOnRouteChange = () => {
  const location = useLocation();
  useEffect(() => {
    if (location.hash) {
      const el = document.getElementById(location.hash.replace("#", ""));
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 60);
        return;
      }
    }
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [location.pathname, location.hash]);
  return null;
};

// On the home page, show real CMS-managed projects when present, fall back to
// the static playful mockups (Portfolio) until projects exist.
const HomeWork = () => {
  const [hasLive, setHasLive] = useState(null);
  useEffect(() => {
    axios.get(`${API}/projects`).then((r) => setHasLive((r.data || []).length > 0)).catch(() => setHasLive(false));
  }, []);
  if (hasLive === null) return null;
  return hasLive ? (
    <section className="py-14 md:py-20 px-5 md:px-10 bg-[var(--bg-2)]">
      <div className="max-w-[1400px] mx-auto mb-10 md:mb-14 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div>
          <span className="sticker bg-[var(--p-pink)] text-white mb-5">♥ recent work</span>
          <h2 className="display-xl text-[var(--ink)] max-w-3xl mt-4">
            Real projects.<br />
            <span className="squiggle">Real outcomes.</span>
          </h2>
        </div>
        <p className="font-body text-base text-[var(--ink-soft)] max-w-md leading-relaxed">
          A slice of recent work. Each one is a digital ecosystem we built to save
          its owner time, win customers, and future-proof the business.
        </p>
      </div>
      <div className="max-w-[1400px] mx-auto">
        <LiveProjects limit={6} hideEmpty />
      </div>
    </section>
  ) : (
    <Portfolio />
  );
};

const Home = () => (
  <main data-testid="home-page" className="bg-[var(--bg)] text-[var(--ink)]">
    <SEO page="home" />
    <Navbar />
    <Hero />
    <SalesHooks />
    <AiReady />
    <AiFrustration />
    <Services />
    <HomeWork />
    <Process />
    <Testimonials />
    <Contact />
    <Footer />
    <StickyWhatsApp />
  </main>
);

function App() {
  return (
    <HelmetProvider>
      <SiteSettingsProvider>
        <div className="App">
          <BrowserRouter>
            <ScrollToTopOnRouteChange />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/work" element={<WorkPage />} />
              <Route path="/work/:slug" element={<ProjectDetailPage />} />
              <Route path="/work-legacy/:id" element={<ProjectDetail />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/services/:slug" element={<ServiceDetail />} />
              <Route path="/process" element={<ProcessPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/examples" element={<ExamplesPage />} />
              <Route path="/readiness-plan" element={<ReadinessPlanPage />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/previews" element={<DesignPreviews />} />
            </Routes>
          </BrowserRouter>
        </div>
      </SiteSettingsProvider>
    </HelmetProvider>
  );
}

export default App;
