import { useEffect, useState } from "react";
import axios from "axios";
import {
  Plus,
  Save,
  Trash2,
  X,
  Eye,
  EyeOff,
  ChevronUp,
  ChevronDown,
  Sparkles,
} from "lucide-react";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
const TOKEN_KEY = "admin_jwt";
const authHeader = () => ({ Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}` });

const TIERS = [
  { id: "starter", label: "🌱 Just starting" },
  { id: "growing", label: "🌿 Growing" },
  { id: "established", label: "🌳 Established" },
];

const CATS = [
  { id: "hospitality", label: "Hospitality" },
  { id: "service", label: "Services & trades" },
  { id: "digital", label: "Digital & creators" },
  { id: "retail", label: "Retail & e-commerce" },
  { id: "health", label: "Health & fitness" },
  { id: "pro", label: "Professional services" },
  { id: "education", label: "Education" },
  { id: "community", label: "Community & events" },
  { id: "other", label: "Other" },
];

const COLORS = [
  { id: "yellow", label: "Yellow" },
  { id: "pink", label: "Pink" },
  { id: "mint", label: "Mint" },
  { id: "blue", label: "Blue" },
  { id: "ink", label: "Ink (dark)" },
];

const emptyExample = {
  slug: "",
  icon: "",
  industry: "",
  size: "",
  color: "yellow",
  tagline: "",
  before: [],
  integrated: [],
  ai: [],
  quote: "",
  quoteBy: "",
  results: [],
  category: "other",
  tier: "growing",
  published: true,
  order: 0,
};

// Reusable field components
const Field = ({ label, hint, ...rest }) => (
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
      rows={2}
      {...rest}
      className="w-full mt-1 px-3 py-2 border-2 border-[var(--ink)] rounded-xl font-body text-sm bg-[var(--bg)] focus:outline-none focus:bg-[var(--p-yellow)]/30"
    />
  </label>
);

const Select = ({ label, options, ...rest }) => (
  <label className="block">
    <div className="font-display text-sm text-[var(--ink)]">{label}</div>
    <select
      {...rest}
      className="w-full mt-1 px-3 py-2 border-2 border-[var(--ink)] rounded-xl font-body text-sm bg-[var(--bg)] focus:outline-none focus:bg-[var(--p-yellow)]/30"
    >
      {options.map((o) => <option key={o.id} value={o.id}>{o.label}</option>)}
    </select>
  </label>
);

const BulletList = ({ label, hint, value, onChange, testId, placeholder }) => (
  <label className="block">
    <div className="font-display text-sm text-[var(--ink)]">{label}</div>
    {hint && <div className="font-body text-xs text-[var(--ink-soft)] mb-1">{hint}</div>}
    <textarea
      rows={4}
      value={(value || []).join("\n")}
      onChange={(e) => onChange(e.target.value.split("\n").map((s) => s.trim()).filter(Boolean))}
      placeholder={placeholder || "One bullet per line…"}
      data-testid={testId}
      className="w-full mt-1 px-3 py-2 border-2 border-[var(--ink)] rounded-xl font-body text-sm bg-[var(--bg)] focus:outline-none focus:bg-[var(--p-yellow)]/30"
    />
  </label>
);

// Results is an array of {k, v}
const ResultsEditor = ({ value, onChange }) => {
  const rows = value || [];
  const update = (i, key, v) => {
    const next = rows.map((r, idx) => idx === i ? { ...r, [key]: v } : r);
    onChange(next);
  };
  const add = () => onChange([...rows, { k: "", v: "" }]);
  const remove = (i) => onChange(rows.filter((_, idx) => idx !== i));
  return (
    <div>
      <div className="font-display text-sm text-[var(--ink)] mb-1">Results / metrics</div>
      <div className="font-body text-xs text-[var(--ink-soft)] mb-2">Small stat cards shown in the example drawer. e.g. label "Owner time saved" · value "~8 hrs/wk"</div>
      <div className="space-y-2">
        {rows.map((r, i) => (
          <div key={i} className="flex items-center gap-2">
            <input
              type="text"
              value={r.k}
              onChange={(e) => update(i, "k", e.target.value)}
              placeholder="Label"
              data-testid={`result-k-${i}`}
              className="flex-1 px-3 py-1.5 border-2 border-[var(--ink)] rounded-lg font-body text-sm bg-[var(--bg)] focus:outline-none focus:bg-[var(--p-yellow)]/30"
            />
            <input
              type="text"
              value={r.v}
              onChange={(e) => update(i, "v", e.target.value)}
              placeholder="Value (e.g. +38%)"
              data-testid={`result-v-${i}`}
              className="w-40 px-3 py-1.5 border-2 border-[var(--ink)] rounded-lg font-body text-sm bg-[var(--bg)] focus:outline-none focus:bg-[var(--p-yellow)]/30"
            />
            <button
              type="button"
              onClick={() => remove(i)}
              className="text-red-600 hover:bg-red-50 rounded p-1.5"
              aria-label="Remove"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={add}
        data-testid="add-result-btn"
        className="btn-pill !py-1 !px-3 text-xs mt-2"
      >
        <Plus className="w-3 h-3" /> Add result
      </button>
    </div>
  );
};

// Editor form
const ExampleEditor = ({ example, onCancel, onSaved }) => {
  const [form, setForm] = useState({ ...emptyExample, ...example });
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const save = async () => {
    if (!form.industry?.trim() || !form.tagline?.trim()) {
      setErr("Business name (industry) and tagline are required.");
      return;
    }
    setBusy(true); setErr("");
    try {
      if (example?.id) {
        await axios.put(`${API}/admin/examples/${example.id}`, form, { headers: authHeader() });
      } else {
        await axios.post(`${API}/admin/examples`, form, { headers: authHeader() });
      }
      onSaved();
    } catch (e) {
      setErr(e.response?.data?.detail || "Save failed");
    } finally { setBusy(false); }
  };

  return (
    <div className="card-blunt p-5 md:p-6 bg-[var(--surface)] space-y-4" data-testid="example-editor">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-xl text-[var(--ink)]">
          {example?.id ? "Edit example" : "New example"}
        </h3>
        <button type="button" onClick={onCancel} className="btn-pill !py-1.5 !px-3 text-xs">
          <X className="w-3.5 h-3.5" /> Close
        </button>
      </div>

      <div className="grid md:grid-cols-4 gap-3">
        <Field
          label="Icon"
          hint="Single emoji e.g. ☕ 🦷 🔧"
          value={form.icon}
          onChange={(e) => set("icon", e.target.value)}
          maxLength={4}
          data-testid="example-icon"
        />
        <div className="md:col-span-3">
          <Field
            label="Business type (industry) *"
            hint="Card headline — the kind of business"
            value={form.industry}
            onChange={(e) => set("industry", e.target.value)}
            placeholder="e.g. Local Café & Brunch Spot"
            data-testid="example-industry"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-3">
        <Field
          label="Size / detail"
          hint="e.g. '1 location · 8 staff'"
          value={form.size}
          onChange={(e) => set("size", e.target.value)}
          data-testid="example-size"
        />
        <Field
          label="Slug (optional)"
          hint="Auto from industry if blank"
          value={form.slug}
          onChange={(e) => set("slug", e.target.value)}
          data-testid="example-slug"
        />
      </div>

      <TextArea
        label="Tagline *"
        hint="One-line story shown on card and drawer"
        value={form.tagline}
        onChange={(e) => set("tagline", e.target.value)}
        placeholder="From a Squarespace site and paper receipts — to one branded HQ."
        data-testid="example-tagline"
      />

      <div className="grid md:grid-cols-3 gap-3">
        <Select
          label="Category"
          options={CATS}
          value={form.category}
          onChange={(e) => set("category", e.target.value)}
          data-testid="example-category"
        />
        <Select
          label="Audience tier"
          options={TIERS}
          value={form.tier}
          onChange={(e) => set("tier", e.target.value)}
          data-testid="example-tier"
        />
        <Select
          label="Card colour"
          options={COLORS}
          value={form.color}
          onChange={(e) => set("color", e.target.value)}
          data-testid="example-color"
        />
      </div>

      <BulletList
        label="BEFORE — what they had"
        hint="One bullet per line"
        value={form.before}
        onChange={(v) => set("before", v)}
        testId="example-before"
        placeholder="Squarespace site for menu&#10;Paper supplier orders&#10;…"
      />

      <BulletList
        label="INTEGRATED — what we built"
        value={form.integrated}
        onChange={(v) => set("integrated", v)}
        testId="example-integrated"
        placeholder="Booking + online ordering&#10;Staff app for shifts&#10;…"
      />

      <BulletList
        label="AI — where AI runs the shop"
        value={form.ai}
        onChange={(v) => set("ai", v)}
        testId="example-ai"
        placeholder="AI receptionist that handles bookings 24/7&#10;Auto-replies to reviews&#10;…"
      />

      <div className="grid md:grid-cols-2 gap-3">
        <TextArea
          label="Client quote"
          value={form.quote}
          onChange={(e) => set("quote", e.target.value)}
          placeholder="I get my weekends back."
          data-testid="example-quote"
        />
        <Field
          label="Quote attribution"
          value={form.quoteBy}
          onChange={(e) => set("quoteBy", e.target.value)}
          placeholder="Owner · brunch spot, Bristol"
          data-testid="example-quote-by"
        />
      </div>

      <ResultsEditor value={form.results} onChange={(v) => set("results", v)} />

      <div className="grid md:grid-cols-2 gap-3">
        <Field
          label="Display order"
          type="number"
          hint="Lower = earlier on the page"
          value={form.order}
          onChange={(e) => set("order", parseInt(e.target.value || "0", 10))}
          data-testid="example-order"
        />
        <label className="flex items-center gap-2 font-body text-sm cursor-pointer mt-6">
          <input
            type="checkbox"
            checked={form.published}
            onChange={(e) => set("published", e.target.checked)}
            data-testid="example-published"
          />
          <Eye className="w-4 h-4" /> Published (visible on /examples)
        </label>
      </div>

      {err && <div className="font-body text-sm text-red-600">{err}</div>}

      <div className="flex items-center gap-2 pt-2 border-t-2 border-[var(--ink)]/10">
        <button type="button" onClick={save} disabled={busy} data-testid="example-save" className="btn-pill btn-pill-pink !py-2 !px-4 text-sm">
          {busy ? "Saving…" : (<><Save className="w-4 h-4" /> Save example</>)}
        </button>
        <button type="button" onClick={onCancel} className="btn-pill !py-2 !px-4 text-sm">Cancel</button>
      </div>
    </div>
  );
};

// Row in the list
const ExampleRow = ({ example, onEdit, onDelete, onMove, onToggle }) => (
  <div className="card-blunt p-3 md:p-4 bg-[var(--bg)] flex items-center gap-3" data-testid={`example-row-${example.id}`}>
    <div className="flex flex-col gap-0.5 shrink-0">
      <button type="button" onClick={() => onMove(example, -1)} className="text-[var(--ink-soft)] hover:text-[var(--ink)]" aria-label="Move up">
        <ChevronUp className="w-4 h-4" />
      </button>
      <button type="button" onClick={() => onMove(example, 1)} className="text-[var(--ink-soft)] hover:text-[var(--ink)]" aria-label="Move down">
        <ChevronDown className="w-4 h-4" />
      </button>
    </div>
    <div className="w-12 h-12 md:w-14 md:h-14 rounded-lg border-2 border-[var(--ink)] bg-[var(--surface)] flex items-center justify-center shrink-0 text-2xl">
      {example.icon || "✦"}
    </div>
    <div className="flex-1 min-w-0">
      <div className="flex items-center gap-2 flex-wrap">
        <span className="font-display text-base text-[var(--ink)] truncate">{example.industry}</span>
        {!example.published && <span className="font-body text-[10px] uppercase tracking-wider text-[var(--ink-soft)]">draft</span>}
      </div>
      <div className="font-body text-xs text-[var(--ink-soft)] truncate">{example.tagline}</div>
      <div className="mt-1 flex items-center gap-2 flex-wrap text-[10px] font-body uppercase tracking-wider text-[var(--ink-soft)]">
        <span>{example.category}</span>
        <span>·</span>
        <span>{example.tier}</span>
        {example.size && <><span>·</span><span className="normal-case tracking-normal">{example.size}</span></>}
      </div>
    </div>
    <div className="flex items-center gap-1 shrink-0">
      <button type="button" onClick={() => onToggle(example, "published")} title="Toggle published" className="p-1.5 hover:bg-[var(--bg-2)] rounded">
        {example.published ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4 text-[var(--ink-soft)]" />}
      </button>
      <button type="button" onClick={() => onEdit(example)} data-testid={`example-edit-${example.id}`} className="btn-pill !py-1.5 !px-3 text-xs">Edit</button>
      <button type="button" onClick={() => onDelete(example)} data-testid={`example-delete-${example.id}`} className="p-1.5 text-red-600 hover:bg-red-50 rounded">
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  </div>
);

export default function ExamplesTab() {
  const [examples, setExamples] = useState([]);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");

  const load = async () => {
    setLoading(true);
    try {
      const r = await axios.get(`${API}/admin/examples`, { headers: authHeader() });
      setExamples(r.data);
    } finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const del = async (e) => {
    if (!window.confirm(`Delete "${e.industry}"? This cannot be undone.`)) return;
    await axios.delete(`${API}/admin/examples/${e.id}`, { headers: authHeader() });
    load();
  };

  const toggle = async (e, field) => {
    await axios.put(`${API}/admin/examples/${e.id}`, { ...e, [field]: !e[field] }, { headers: authHeader() });
    load();
  };

  const move = async (e, dir) => {
    await axios.put(`${API}/admin/examples/${e.id}`, { ...e, order: (e.order || 0) + dir }, { headers: authHeader() });
    load();
  };

  const filtered = examples.filter((e) => {
    if (!q) return true;
    const t = q.toLowerCase();
    return e.industry.toLowerCase().includes(t) || e.tagline.toLowerCase().includes(t) || e.category.toLowerCase().includes(t);
  });

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="font-display text-2xl text-[var(--ink)]">Examples</h2>
          <p className="font-body text-sm text-[var(--ink-soft)]">
            The illustrative business-type cards on <strong>/examples</strong>. Edit copy, change tiers, add new business types.
          </p>
        </div>
        {!editing && (
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search…"
              data-testid="examples-search"
              className="px-3 py-1.5 border-2 border-[var(--ink)] rounded-xl font-body text-sm bg-[var(--bg)]"
            />
            <button
              type="button"
              onClick={() => setEditing(emptyExample)}
              data-testid="add-example-btn"
              className="btn-pill btn-pill-pink !py-2 !px-4 text-sm"
            >
              <Plus className="w-4 h-4" /> New example
            </button>
          </div>
        )}
      </div>

      {editing && (
        <ExampleEditor
          example={editing}
          onCancel={() => setEditing(null)}
          onSaved={() => { setEditing(null); load(); }}
        />
      )}

      {loading && <div className="font-body text-sm text-[var(--ink-soft)]">Loading…</div>}

      {!loading && filtered.length === 0 && !editing && (
        <div className="card-blunt p-8 text-center bg-[var(--p-mint)]">
          <Sparkles className="w-8 h-8 mx-auto text-[var(--ink)] mb-2" />
          <h3 className="font-display text-xl text-[var(--ink)]">
            {q ? "Nothing matches your search" : "No examples yet"}
          </h3>
        </div>
      )}

      {!loading && filtered.length > 0 && (
        <div className="space-y-2.5" data-testid="examples-list">
          {filtered.map((e) => (
            <ExampleRow
              key={e.id}
              example={e}
              onEdit={setEditing}
              onDelete={del}
              onMove={move}
              onToggle={toggle}
            />
          ))}
        </div>
      )}
    </div>
  );
}
