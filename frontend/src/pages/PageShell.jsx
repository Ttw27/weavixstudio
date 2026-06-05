import Navbar from "../components/site/Navbar";
import Footer from "../components/site/Footer";
import StickyWhatsApp from "../components/site/StickyWhatsApp";

// Standard page layout used across /work, /services, /process, /contact
export default function PageShell({ children, testId = "page" }) {
  return (
    <main data-testid={testId} className="bg-[var(--bg)] text-[var(--ink)] min-h-screen">
      <Navbar />
      <div className="pt-24 md:pt-28">{children}</div>
      <Footer />
      <StickyWhatsApp />
    </main>
  );
}
