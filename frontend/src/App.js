import { useEffect } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
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

const Home = () => {
  return (
    <main data-testid="home-page" className="bg-[var(--bg)] text-[var(--ink)]">
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
};

function App() {
  return (
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
          <Route path="/previews" element={<DesignPreviews />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
