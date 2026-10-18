import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { ArrowRight } from "lucide-react";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const swaps = [
  { rent: "A design app, paid per seat", own: "Your own designer tool, with your templates" },
  { rent: "A social scheduling subscription", own: "Posts created and scheduled from your back office" },
  { rent: "A booking app taking a cut", own: "Bookings and deposits on your own site" },
  { rent: "A quiz or gift-finder app", own: "A finder that knows your whole catalogue" },
  { rent: "A size-chart plugin", own: "A fit finder built for your exact cut" },
  { rent: "A CRM charged per user", own: "Your customer list, any number of users" },
  { rent: "A page-builder subscription", own: "Pages you edit yourself, that never switch off" },
];

// What it replaces, and what we built instead. Real client "replaced" lines come from the projects CMS.
export const RentVsOwn = ({ limit = 6 }) => {
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    axios.get(`${API}/projects`).then((r) => setProjects((r.data || []).filter((p) => p.replaced).slice(0, limit))).catch(() => {});
  }, [limit]);

  return (
    <section id="rent-vs-own" data-testid="rent-vs-own-section" className="py-14 md:py-20 px-5 md:px-10">
      <div className="max-w-[1400px] mx-auto">
        <div className="max-w-3xl">
          <span className="sticker bg-[var(--p-pink)] text-white mb-4">✦ rent vs own</span>
          <h2 className="display-xl text-[var(--ink)] mt-3">
            What it replaces. <span className="squiggle">What we build instead.</span>
          </h2>
          <p className="mt-5 font-body text-base md:text-lg text-[var(--ink-soft)] leading-relaxed">
            Most businesses pay for a stack of tools that nearly work. We build the
            parts you actually need into one system in your name, built around how
            your business works.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-6 md:gap-8 items-start">
          <div className="card-blunt p-5 md:p-7 bg-[var(--surface)]">
            <div className="grid grid-cols-[1fr_auto_1fr] gap-x-3 font-display text-sm md:text-base text-[var(--ink)] mb-3">
              <span>You rent</span><span /><span>You own</span>
            </div>
            <ul className="space-y-3">
              {swaps.map((s) => (
                <li key={s.rent} className="grid grid-cols-[1fr_auto_1fr] gap-x-3 items-center font-body text-sm md:text-base">
                  <span className="line-through decoration-[var(--p-pink)] decoration-2 text-[var(--ink-soft)]">{s.rent}</span>
                  <span className="font-display text-[var(--p-pink)]">→</span>
                  <span className="font-bold text-[var(--ink)] bg-[var(--p-yellow)] rounded-lg px-2 py-1">{s.own}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
            {projects.map((p) => (
              <Link key={p.slug} to={`/work/${p.slug}`} className="card-blunt p-5 bg-[var(--bg-2)] hover:-translate-y-0.5 transition-transform block" data-testid={`rent-vs-own-${p.slug}`}>
                <div className="flex items-center justify-between gap-2">
                  <span className="font-display text-lg text-[var(--ink)]">{p.title}</span>
                  <span className="sticker !text-[10px] bg-[var(--ink)] text-[var(--p-yellow)]">real client</span>
                </div>
                <div className="mt-3 font-hand text-xl text-[var(--p-pink)]">what we replaced</div>
                <p className="font-body text-sm text-[var(--ink)] leading-relaxed line-clamp-4">{p.replaced}</p>
                <span className="mt-3 inline-flex items-center gap-1 font-body text-xs font-bold text-[var(--ink)]">See the build <ArrowRight className="w-3 h-3" /></span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RentVsOwn;
