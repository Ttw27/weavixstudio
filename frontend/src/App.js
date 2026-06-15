import { useEffect } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { SiteSettingsProvider } from "./lib/SiteSettings";
import SEO from "./components/SEO";
import Navbar from "./components/site/Navbar";
import Hero from "./components/site/Hero";
import AiReady from "./components/site/AiReady";
import AiFrustration from "./components/site/AiFrustration";
import Services from "./components/site/Services";
import Portfolio from "./components/site/Portfolio";
import Process from "./components/site/Process";
import Testimonials from "./components/site/Testimonials";
import Contact from "./components/site/Contact";
import Footer from "./components/site/Footer";
import StickyWhatsApp from "./components/site/StickyWhatsApp";
import ProjectDetail from "./components/site/ProjectDetail";
import ServiceDetail from "./components/site/ServiceDetail";
import DesignPreviews from "./components/site/DesignPreviews";
import WorkPage from "./pages/WorkPage";
import ServicesPage from "./pages/ServicesPage";
import ProcessPage from "./pages/ProcessPage";
import ContactPage from "./pages/ContactPage";
import ExamplesPage from "./pages/ExamplesPage";
import ReadinessPlanPage from "./pages/ReadinessPlanPage";
import AdminPage from "./pages/AdminPage";

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

const Home = () => (
  <main data-testid="home-page" className="bg-[var(--bg)] text-[var(--ink)]">
    <SEO page="home" />
    <Navbar />
    <Hero />
    <AiReady />
    <AiFrustration />
    <Services />
    <Portfolio />
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
              <Route path="/work/:id" element={<ProjectDetail />} />
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
