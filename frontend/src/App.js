import { useEffect } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/site/Navbar";
import Hero from "./components/site/Hero";
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

const ScrollToTopOrAnchor = () => {
  const location = useLocation();
  useEffect(() => {
    // Handle nav-driven scroll-to-section
    const target = location.state?.scrollTo;
    if (target) {
      setTimeout(() => {
        const el = document.getElementById(target);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 60);
      return;
    }
    // Handle hash links like /#work coming from outside
    if (location.hash) {
      const el = document.getElementById(location.hash.replace("#", ""));
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 60);
        return;
      }
    }
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [location]);
  return null;
};

const Home = () => {
  return (
    <main data-testid="home-page" className="bg-[var(--bg)] text-[var(--ink)]">
      <Navbar />
      <Hero />
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
        <ScrollToTopOrAnchor />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/work/:id" element={<ProjectDetail />} />
          <Route path="/services/:slug" element={<ServiceDetail />} />
          <Route path="/previews" element={<DesignPreviews />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
