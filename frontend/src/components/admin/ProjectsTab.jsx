import { useEffect, useState } from "react";
import axios from "axios";
import {
  Plus,
  Save,
  Trash2,
  ExternalLink,
  Star,
  StarOff,
  ImageIcon,
  X,
  ChevronUp,
  ChevronDown,
  Eye,
  EyeOff,
  Sparkles,
} from "lucide-react";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
const TOKEN_KEY = "admin_jwt";
const authHeader = () => ({ Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}` });

const TIERS = [
  { id: "starter", label: "🌱 Just starting (low-AI, basics-first audience)" },
  { id: "growing", label: "🌿 Growing (some tools, want them to connect)" },
  { id: "established", label: "🌳 Established (custom AI / advanced)" },
];

const SERVICE_TAGS = ["Website", "App", "AI", "Automation", "Ads", "Social", "E-com", "Branding"];

const emptyProject = {
  title: "",
  slug: "",
  summary: "",
  category: "other",
  tags: [],
  tier: "growing",
  what_we_did: [],
  outcomes: [],
  client_quote: "",
  client_quote_by: "",
  live_url: "",
  image_url: "",
  gallery: [],
  featured: false,
  published: true,
  order: 0,
  bg_color: "",
  fg_color: "",
};

// ---------- shared sub-controls ----------
const TextField = ({ label, hint, ...rest }) => (
  <label className="block">
    <div className="font-display text-sm text-[var(--ink)]">{label}</div>
    {hint && <div className="font-body text-xs text-[var(--ink-soft)] mb-1">{hint}</div>}
    <input
      {...rest}
      className="w-full mt-1 px-3 py-2 border-2 border-[var(--ink)] rounded-xl font-body text-sm bg-[var(--bg)] focus:outline-none focus:bg-[var(--p-yellow)]/30"
    />
  </label>
);

const TextArea = ({ label, hint, ...rest }) => (
  <label className="block">
    <div className="font-display text-sm text-[var(--ink)]">{label}</div>
    {hint && <div className="font-body text-xs text-[var(--ink-soft)] mb-1">{hint}</div>}
    <textarea
      rows={3}
      {...rest}
      className="w-full mt-1 px-3 py-2 border-2 border-[var(--ink)] rounded-xl font-body text-sm bg-[var(--bg)] focus:outline-none focus:bg-[var(--p-yellow)]/30"
    />
  </label>
);

const SelectField = ({ label, hint, options, ...rest }) => (
  <label className="block">
    <div className="font-display text-sm text-[var(--ink)]">{label}</div>
    {hint && <div className="font-body text-xs text-[var(--ink-soft)] mb-1">{hint}</div>}
    <select
      {...rest}
      className="w-full mt-1 px-3 py-2 border-2 border-[var(--ink)] rounded-xl font-body text-sm bg-[var(--bg)] focus:outline-none focus:bg-[var(--p-yellow)]/30"
    >
      {options.map((o) => (
        <option key={o.id} value={o.id}>{o.label}</option>
      ))}
    </select>
  </label>
);

// Bullet-list editor — comma/newline separated, super low friction
const BulletList = ({ label, hint, value, onChange, testId, placeholder }) => (
  <label className="block">
    <div className="font-display text-sm text-[var(--ink)]">{label}</div>
    {hint && <div className="font-body text-xs text-[var(--ink-soft)] mb-1">{hint}</div>}
    <textarea
      rows={3}
      value={(value || []).join("\n")}
      onChange={(e) => onChange(e.target.value.split("\n").map((s) => s.trim()).filter(Boolean))}
      placeholder={placeholder || "One bullet per line…"}
      data-testid={testId}
      className="w-full mt-1 px-3 py-2 border-2 border-[var(--ink)] rounded-xl font-body text-sm bg-[var(--bg)] focus:outline-none focus:bg-[var(--p-yellow)]/30"
    />
  </label>
);

const TagPicker = ({ label, options, value, onChange }) => (
  <div>
    <div className="font-display text-sm text-[var(--ink)] mb-2">{label}</div>
    <div className="flex flex-wrap gap-2">
      {options.map((t) => {
        const on = value.includes(t);
        return (
          <button
            key={t}
            type="button"
            onClick={() => onChange(on ? value.filter((x) => x !== t) : [...value, t])}
            data-testid={`tag-${t.toLowerCase()}`}
            className={`px-3 py-1.5 rounded-full border-2 border-[var(--ink)] font-display text-xs ${
              on ? "bg-[var(--p-yellow)] shadow-[2px_2px_0_0_var(--ink)]" : "bg-[var(--surface)]"
            }`}
          >
            {t}
          </button>
        );
      })}
    </div>
  </div>
);

// ---------- categories management (inline at top of tab) ----------
const CategoryManager = ({ categories, onChange }) => {
  const [adding, setAdding] = useState(false);
  const [label, setLabel] = useState("");
  const [busy, setBusy] = useState(false);
  const add = async () => {
    if (!label.trim()) return;
    setBusy(true);
    try {
      await axios.post(`${API}/admin/categories`, { label: label.trim() }, { headers: authHeader() });
      setLabel("");
      setAdding(false);
      onChange();
    } catch (e) {
      alert(e.response?.data?.detail || "Could not add category");
    } finally {
      setBusy(false);
    }
  };
  const del = async (cid) => {
    if (!window.confirm("Delete this custom category? Projects already using it will still keep it as text.")) return;
    await axios.delete(`${API}/admin/categories/${cid}`, { headers: authHeader() });
    onChange();
  };
  return (
    <div className="card-blunt p-4 bg-[var(--bg-2)]">
      <div className="flex items-center justify-between mb-3">
        <div>
          <div className="font-display text-sm text-[var(--ink)]">Categories</div>
          <div className="font-body text-xs text-[var(--ink-soft)]">
            {categories.defaults?.length || 0} fixed + {categories.custom?.length || 0} of yours
          </div>
        </div>
        {!adding && (
          <button
            type="button"
            onClick={() => setAdding(true)}
            data-testid="add-category-btn"
            className="btn-pill !py-1 !px-3 text-xs"
          >
            <Plus className="w-3 h-3" /> Add
          </button>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        {(categories.defaults || []).map((c) => (
          <span key={c.id} className="px-3 py-1.5 rounded-full bg-[var(--surface)] border-2 border-[var(--ink)] font-display text-xs">{c.label}</span>
        ))}
        {(categories.custom || []).map((c) => (
          <span key={c.id} className="px-3 py-1.5 rounded-full bg-[var(--p-mint)] border-2 border-[var(--ink)] font-display text-xs flex items-center gap-1">
            {c.label}
            <button
              type="button"
              onClick={() => del(c.id)}
              data-testid={`delete-category-${c.id}`}
              className="hover:text-red-600"
              aria-label={`Delete ${c.label}`}
            >
              <X className="w-3 h-3" />
            </button>
          </span>
        ))}
      </div>
      {adding && (
        <div className="mt-3 flex items-center gap-2">
          <input
            type="text"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            placeholder="e.g. Wedding planners"
            autoFocus
            data-testid="new-category-input"
            className="flex-1 px-3 py-2 border-2 border-[var(--ink)] rounded-xl font-body text-sm bg-[var(--bg)] focus:outline-none focus:bg-[var(--p-yellow)]/30"
          />
          <button
            type="button"
            onClick={add}
            disabled={busy || !label.trim()}
            data-testid="save-category-btn"
            className="btn-pill btn-pill-pink !py-1.5 !px-3 text-xs"
          >
            {busy ? "…" : "Save"}
          </button>
          <button
            type="button"
            onClick={() => { setAdding(false); setLabel(""); }}
            className="btn-pill !py-1.5 !px-3 text-xs"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

// ---------- editor (form for one project) ----------
const ProjectEditor = ({ project, allCategories, onCancel, onSaved }) => {
  const [form, setForm] = useState({ ...emptyProject, ...project });
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const save = async () => {
    if (!form.title || !form.summary) {
      setErr("Title and summary are required.");
      return;
    }
    setBusy(true);
    setErr("");
    try {
      if (project?.id) {
        await axios.put(`${API}/admin/projects/${project.id}`, form, { headers: authHeader() });
      } else {
        await axios.post(`${API}/admin/projects`, form, { headers: authHeader() });
      }
      onSaved();
    } catch (e) {
      setErr(e.response?.data?.detail || "Save failed");
    } finally {
      setBusy(false);
    }
  };

  const categoryOptions = [
    ...(allCategories || []).map((c) => ({ id: c.id, label: c.label })),
  ];

  return (
    <div className="card-blunt p-5 md:p-6 bg-[var(--surface)] space-y-4" data-testid="project-editor">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-xl text-[var(--ink)]">
          {project?.id ? "Edit project" : "New project"}
        </h3>
        <button type="button" onClick={onCancel} className="btn-pill !py-1.5 !px-3 text-xs">
          <X className="w-3.5 h-3.5" /> Close
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <TextField
          label="Title *"
          hint="The project / client name"
          value={form.title}
          onChange={(e) => set("title", e.target.value)}
          data-testid="project-title"
        />
        <TextField
          label="Slug"
          hint="URL-friendly (auto-generated if empty)"
          value={form.slug}
          onChange={(e) => set("slug", e.target.value)}
          placeholder="auto"
          data-testid="project-slug"
        />
      </div>

      <TextArea
        label="Summary *"
        hint="1–2 sentences shown on the card and hero of the project page"
        value={form.summary}
        onChange={(e) => set("summary", e.target.value)}
        data-testid="project-summary"
      />

      <div className="grid md:grid-cols-3 gap-4">
        <SelectField
          label="Category"
          options={categoryOptions}
          value={form.category}
          onChange={(e) => set("category", e.target.value)}
          data-testid="project-category"
        />
        <SelectField
          label="Audience tier"
          hint="Which audience does this best speak to?"
          options={TIERS}
          value={form.tier}
          onChange={(e) => set("tier", e.target.value)}
          data-testid="project-tier"
        />
        <TextField
          label="Display order"
          type="number"
          hint="Lower = earlier"
          value={form.order}
          onChange={(e) => set("order", parseInt(e.target.value || "0", 10))}
          data-testid="project-order"
        />
      </div>

      <TagPicker
        label="Services used"
        options={SERVICE_TAGS}
        value={form.tags}
        onChange={(v) => set("tags", v)}
      />

      <BulletList
        label="What we did"
        hint="One bullet per line — high level work delivered"
        value={form.what_we_did}
        onChange={(v) => set("what_we_did", v)}
        testId="project-what-we-did"
        placeholder="Designed & built the booking flow&#10;Wired Stripe for deposits&#10;…"
      />

      <BulletList
        label="Outcomes / what changed"
        hint="The 'what helped' bullets — measurable wins where possible"
        value={form.outcomes}
        onChange={(v) => set("outcomes", v)}
        testId="project-outcomes"
        placeholder="+30% bookings in 60 days&#10;Saved 6 hrs/week on phone enquiries&#10;…"
      />

      <div className="grid md:grid-cols-2 gap-4">
        <TextField
          label="Client quote (optional)"
          value={form.client_quote}
          onChange={(e) => set("client_quote", e.target.value)}
          placeholder="Game-changer for us."
          data-testid="project-quote"
        />
        <TextField
          label="Quote attribution"
          value={form.client_quote_by}
          onChange={(e) => set("client_quote_by", e.target.value)}
          placeholder="Jane, owner"
          data-testid="project-quote-by"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <TextField
          label="Live URL"
          hint="https://..."
          value={form.live_url}
          onChange={(e) => set("live_url", e.target.value)}
          data-testid="project-live-url"
        />
        <TextField
          label="Hero image URL"
          hint="Paste any public image URL for now"
          value={form.image_url}
          onChange={(e) => set("image_url", e.target.value)}
          data-testid="project-image-url"
        />
      </div>

      {form.image_url && (
        <div className="card-blunt p-2 bg-[var(--bg)] inline-block">
          <img
            src={form.image_url}
            alt="preview"
            className="max-h-32 rounded-md object-cover"
            data-testid="project-image-preview"
            onError={(e) => { e.target.style.opacity = 0.3; }}
          />
        </div>
      )}

      <BulletList
        label="Gallery image URLs (optional)"
        hint="One URL per line — up to 4 extra screenshots"
        value={form.gallery}
        onChange={(v) => set("gallery", v.slice(0, 4))}
        testId="project-gallery"
        placeholder="https://...png&#10;https://...png"
      />

      <div className="flex items-center gap-4 flex-wrap pt-2">
        <label className="flex items-center gap-2 font-body text-sm cursor-pointer">
          <input
            type="checkbox"
            checked={form.featured}
            onChange={(e) => set("featured", e.target.checked)}
            data-testid="project-featured"
          />
          <Star className="w-4 h-4 text-[var(--p-pink)]" /> Featured (shows first)
        </label>
        <label className="flex items-center gap-2 font-body text-sm cursor-pointer">
          <input
            type="checkbox"
            checked={form.published}
            onChange={(e) => set("published", e.target.checked)}
            data-testid="project-published"
          />
          <Eye className="w-4 h-4" /> Published (visible on site)
        </label>
      </div>

      {err && <div className="font-body text-sm text-red-600">{err}</div>}

      <div className="flex items-center gap-2 pt-2 border-t-2 border-[var(--ink)]/10">
        <button
          type="button"
          onClick={save}
          disabled={busy}
          data-testid="project-save"
          className="btn-pill btn-pill-pink !py-2 !px-4 text-sm"
        >
          {busy ? "Saving…" : (<><Save className="w-4 h-4" /> Save project</>)}
        </button>
        <button type="button" onClick={onCancel} className="btn-pill !py-2 !px-4 text-sm">
          Cancel
        </button>
      </div>
    </div>
  );
};

// ---------- list row ----------
const ProjectRow = ({ project, allCategories, onEdit, onDelete, onMove, onToggle }) => {
  const cat = allCategories.find((c) => c.id === project.category);
  return (
    <div className="card-blunt p-3 md:p-4 bg-[var(--bg)] flex items-center gap-3" data-testid={`project-row-${project.id}`}>
      <div className="flex flex-col gap-0.5 shrink-0">
        <button type="button" onClick={() => onMove(project, -1)} className="text-[var(--ink-soft)] hover:text-[var(--ink)]" aria-label="Move up">
          <ChevronUp className="w-4 h-4" />
        </button>
        <button type="button" onClick={() => onMove(project, 1)} className="text-[var(--ink-soft)] hover:text-[var(--ink)]" aria-label="Move down">
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>
      <div className="w-12 h-12 md:w-16 md:h-16 rounded-lg border-2 border-[var(--ink)] overflow-hidden bg-[var(--bg-2)] flex items-center justify-center shrink-0">
        {project.image_url ? (
          <img src={project.image_url} alt={project.title} className="w-full h-full object-cover" onError={(e)=>{e.target.style.display='none';}} />
        ) : (
          <ImageIcon className="w-5 h-5 text-[var(--ink-soft)]" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-display text-base text-[var(--ink)] truncate">{project.title}</span>
          {project.featured && <Star className="w-3.5 h-3.5 text-[var(--p-pink)]" />}
          {!project.published && <span className="font-body text-[10px] uppercase tracking-wider text-[var(--ink-soft)]">draft</span>}
        </div>
        <div className="font-body text-xs text-[var(--ink-soft)] truncate">{project.summary}</div>
        <div className="mt-1 flex items-center gap-2 flex-wrap text-[10px] font-body uppercase tracking-wider text-[var(--ink-soft)]">
          <span>{cat?.label || project.category}</span>
          {project.tags?.length > 0 && <span>·</span>}
          {project.tags?.slice(0, 3).map((t) => <span key={t}>{t}</span>)}
          {project.live_url && (
            <a href={project.live_url} target="_blank" rel="noreferrer" className="text-[var(--p-pink)] hover:underline normal-case tracking-normal">
              live ↗
            </a>
          )}
        </div>
      </div>
      <div className="flex items-center gap-1 shrink-0">
        <button type="button" onClick={() => onToggle(project, "featured")} title="Toggle featured" className="p-1.5 hover:bg-[var(--bg-2)] rounded">
          {project.featured ? <Star className="w-4 h-4 text-[var(--p-pink)]" /> : <StarOff className="w-4 h-4 text-[var(--ink-soft)]" />}
        </button>
        <button type="button" onClick={() => onToggle(project, "published")} title="Toggle published" className="p-1.5 hover:bg-[var(--bg-2)] rounded">
          {project.published ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4 text-[var(--ink-soft)]" />}
        </button>
        <button type="button" onClick={() => onEdit(project)} data-testid={`project-edit-${project.id}`} className="btn-pill !py-1.5 !px-3 text-xs">
          Edit
        </button>
        <button type="button" onClick={() => onDelete(project)} data-testid={`project-delete-${project.id}`} className="p-1.5 text-red-600 hover:bg-red-50 rounded">
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

// ---------- main tab ----------
export default function ProjectsTab() {
  const [projects, setProjects] = useState([]);
  const [categories, setCategories] = useState({ defaults: [], custom: [] });
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadAll = async () => {
    setLoading(true);
    try {
      const [pRes, cRes] = await Promise.all([
        axios.get(`${API}/admin/projects`, { headers: authHeader() }),
        axios.get(`${API}/admin/categories`, { headers: authHeader() }),
      ]);
      setProjects(pRes.data);
      setCategories(cRes.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadAll(); }, []);

  const allCategories = [...(categories.defaults || []), ...(categories.custom || [])];

  const handleSaved = () => { setEditing(null); loadAll(); };

  const handleDelete = async (p) => {
    if (!window.confirm(`Delete "${p.title}"? This cannot be undone.`)) return;
    await axios.delete(`${API}/admin/projects/${p.id}`, { headers: authHeader() });
    loadAll();
  };

  const handleToggle = async (p, field) => {
    await axios.put(`${API}/admin/projects/${p.id}`, { ...p, [field]: !p[field] }, { headers: authHeader() });
    loadAll();
  };

  const handleMove = async (p, dir) => {
    const newOrder = (p.order || 0) + dir;
    await axios.put(`${API}/admin/projects/${p.id}`, { ...p, order: newOrder }, { headers: authHeader() });
    loadAll();
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="font-display text-2xl text-[var(--ink)]">Projects</h2>
          <p className="font-body text-sm text-[var(--ink-soft)]">
            Your live work. Featured projects show first on <strong>/work</strong> and at the top of <strong>/examples</strong>.
          </p>
        </div>
        {!editing && (
          <button
            type="button"
            onClick={() => setEditing(emptyProject)}
            data-testid="add-project-btn"
            className="btn-pill btn-pill-pink !py-2 !px-4 text-sm"
          >
            <Plus className="w-4 h-4" /> New project
          </button>
        )}
      </div>

      <CategoryManager categories={categories} onChange={loadAll} />

      {editing && (
        <ProjectEditor
          project={editing}
          allCategories={allCategories}
          onCancel={() => setEditing(null)}
          onSaved={handleSaved}
        />
      )}

      {loading && <div className="font-body text-sm text-[var(--ink-soft)]">Loading…</div>}

      {!loading && projects.length === 0 && !editing && (
        <div className="card-blunt p-8 text-center bg-[var(--p-mint)]">
          <Sparkles className="w-8 h-8 mx-auto text-[var(--ink)] mb-2" />
          <h3 className="font-display text-xl text-[var(--ink)]">No projects yet.</h3>
          <p className="font-body text-sm text-[var(--ink-soft)] mt-1 max-w-md mx-auto">
            Add your first one — title, summary, live URL and an image link is enough to get on the site.
          </p>
          <button
            type="button"
            onClick={() => setEditing(emptyProject)}
            className="btn-pill btn-pill-pink !py-1.5 !px-3.5 text-xs mt-4"
          >
            <Plus className="w-3.5 h-3.5" /> Add your first project
          </button>
        </div>
      )}

      {!loading && projects.length > 0 && (
        <div className="space-y-2.5" data-testid="projects-list">
          {projects.map((p) => (
            <ProjectRow
              key={p.id}
              project={p}
              allCategories={allCategories}
              onEdit={setEditing}
              onDelete={handleDelete}
              onMove={handleMove}
              onToggle={handleToggle}
            />
          ))}
        </div>
      )}
    </div>
  );
}
