import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/site/Navbar";
import Hero from "./components/site/Hero";
import Services from "./components/site/Services";
import Portfolio from "./components/site/Portfolio";
import Process from "./components/site/Process";
import Testimonials from "./components/site/Testimonials";
import Contact from "./components/site/Contact";
import Footer from "./components/site/Footer";
import StickyWhatsApp from "./components/site/StickyWhatsApp";
import DesignPreviews from "./components/site/DesignPreviews";

const Home = () => {
  return (
    <main data-testid="home-page" className="bg-[var(--bg)] text-[var(--text)]">
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
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/previews" element={<DesignPreviews />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
