import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight, ExternalLink, Sparkles } from "lucide-react";
import axios from "axios";
import { useSiteSettings } from "../../lib/SiteSettings";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
const tilts = ["tilt-l", "tilt-r", "tilt-l-3", "tilt-r-3", "tilt-r", "tilt-l"];

const CARD_BGS = ["var(--p-yellow)", "var(--p-pink)", "var(--p-mint)", "var(--p-blue)"];

const PlaceholderTile = ({ title, color }) => (
  <div
    className="w-full h-full flex flex-col items-center justify-center p-6"
    style={{ background: color }}
  >
    <Sparkles className="w-8 h-8 text-[var(--ink)] mb-2" />
    <span className="font-display text-xl text-[var(--ink)] text-center">{title}</span>
  </div>
);

const ProjectCard = ({ project, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 28 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.5, delay: (index % 3) * 0.06 }}
    className={tilts[index % tilts.length]}
  >
    <Link
      to={`/work/${project.slug || project.id}`}
      data-testid={`live-project-${project.slug || project.id}`}
      className="block group"
    >
      <div className="relative aspect-[4/3] w-full border-[2.5px] border-[var(--ink)] overflow-hidden rounded-3xl shadow-[var(--shadow-blunt)] group-hover:shadow-[var(--shadow-blunt-lg)] group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 transition-all">
        {project.image_url ? (
          <img
            src={project.image_url}
            alt={project.title}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
            onError={(e) => { e.target.style.display = "none"; }}
          />
        ) : (
          <PlaceholderTile title={project.title} color={CARD_BGS[index % CARD_BGS.length]} />
        )}
        {project.featured && (
          <span className="absolute top-3 left-3 sticker bg-[var(--p-pink)] text-white !text-[10px]">
            ★ featured
          </span>
        )}
        {project.live_url && (
          <span className="absolute top-3 right-3 sticker text-[var(--bg)] !text-[10px]" style={{ background: "var(--ink)" }}>
            live ↗
          </span>
        )}
      </div>

      <div className="mt-5 flex items-start justify-between gap-4">
        <div className="flex-1">
          {project.tags?.length > 0 && (
            <div className="flex items-center gap-1.5 flex-wrap mb-2">
              {project.tags.slice(0, 3).map((t) => (
                <span key={t} className="sticker bg-white text-[var(--ink)] !text-[10px]">{t}</span>
              ))}
            </div>
          )}
          <h3 className="font-display text-2xl text-[var(--ink)] leading-tight">
            {project.title}
          </h3>
          <p className="font-body text-sm text-[var(--ink-soft)] mt-1 leading-snug line-clamp-2">
            {project.summary}
          </p>

          {project.outcomes?.length > 0 && (
            <div className="mt-3 flex gap-2 flex-wrap">
              {project.outcomes.slice(0, 2).map((o, i) => (
                <span
                  key={i}
                  className="text-[11px] font-bold text-[var(--ink)] bg-[var(--p-yellow)] border-[1.5px] border-[var(--ink)] px-2 py-0.5 rounded-full"
                >
                  {o.length > 32 ? o.slice(0, 30) + "…" : o}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="shrink-0 mt-1">
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[var(--p-pink)] border-[2px] border-[var(--ink)] shadow-[3px_3px_0_0_var(--ink)] group-hover:rotate-45 transition-transform">
            <ArrowUpRight className="w-4 h-4 text-[var(--ink)]" />
          </span>
        </div>
      </div>
    </Link>
  </motion.div>
);

const EmptyState = ({ settings }) => (
  <div className="card-blunt p-8 md:p-12 bg-[var(--p-mint)] text-center max-w-2xl mx-auto">
    <Sparkles className="w-10 h-10 mx-auto text-[var(--ink)] mb-3" />
    <h3 className="font-display text-2xl md:text-3xl text-[var(--ink)]">
      Fresh start<span className="text-[var(--p-pink)]">.</span>
    </h3>
    <p className="mt-3 font-body text-sm md:text-base text-[var(--ink)] max-w-md mx-auto">
      We're putting the finishing touches on our case studies. In the meantime, the
      best way to see what we do is a 25-min chat — we'll show you live work, and
      sketch what your business could look like.
    </p>
    <div className="mt-5 flex flex-wrap gap-2 justify-center">
      <a href={settings.calendlyUrl} target="_blank" rel="noreferrer" className="btn-pill btn-pill-pink">
        Book a chat →
      </a>
      <Link to="/examples" className="btn-pill btn-pill-yellow">
        See industry examples
      </Link>
    </div>
  </div>
);

export const LiveProjects = ({ limit, hideEmpty = false }) => {
  const [projects, setProjects] = useState(null);
  const { settings } = useSiteSettings();

  useEffect(() => {
    axios.get(`${API}/projects`)
      .then((r) => setProjects(r.data))
      .catch(() => setProjects([]));
  }, []);

  if (projects === null) {
    return (
      <div className="font-body text-sm text-[var(--ink-soft)] text-center py-10">
        Loading projects…
      </div>
    );
  }

  if (projects.length === 0) {
    return hideEmpty ? null : <EmptyState settings={settings} />;
  }

  const list = typeof limit === "number" ? projects.slice(0, limit) : projects;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 md:gap-9" data-testid="live-projects-grid">
      {list.map((p, i) => (
        <ProjectCard key={p.id} project={p} index={i} />
      ))}
    </div>
  );
};

export default LiveProjects;
