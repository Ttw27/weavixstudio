import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  LogOut,
  Save,
  Trash2,
  Mail,
  Phone,
  Building,
  Settings as SettingsIcon,
  Inbox,
  Search,
  Link2,
} from "lucide-react";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;
const TOKEN_KEY = "admin_jwt";

const authHeader = () => ({ Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}` });

// ============ LOGIN ============
const Login = ({ onLogin }) => {
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setErr("");
    try {
      const r = await axios.post(`${API}/admin/login`, { password });
      localStorage.setItem(TOKEN_KEY, r.data.token);
      onLogin();
    } catch (e) {
      setErr("Wrong password");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] flex items-center justify-center px-5">
      <form
        onSubmit={submit}
        className="card-blunt p-7 bg-[var(--surface)] w-full max-w-sm"
        data-testid="admin-login-form"
      >
        <div className="font-hand text-2xl text-[var(--p-pink)]">admin</div>
        <h1 className="font-display text-2xl text-[var(--ink)] mt-1">Welcome back.</h1>
        <p className="font-body text-sm text-[var(--ink-soft)] mt-1">
          Enter the admin password to manage leads, settings & SEO.
        </p>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Admin password"
          data-testid="admin-password-input"
          autoFocus
          className="w-full mt-5 px-4 py-3 border-2 border-[var(--ink)] rounded-xl font-body text-base bg-[var(--bg)] focus:outline-none focus:bg-[var(--p-yellow)]/30"
        />
        {err && <div className="mt-3 font-body text-sm text-red-600">{err}</div>}
        <button
          type="submit"
          disabled={busy || !password}
          data-testid="admin-login-submit"
          className="btn-pill btn-pill-pink mt-4 w-full justify-center"
        >
          {busy ? "Signing in…" : "Sign in"}
        </button>
        <Link to="/" className="block mt-4 font-body text-xs text-[var(--ink-soft)] hover:text-[var(--ink)] text-center">
          ← Back to site
        </Link>
      </form>
    </div>
  );
};

// ============ LEADS ============
const STATUS_OPTIONS = ["new", "contacted", "qualified", "closed", "spam"];

const LeadsTab = () => {
  const [leads, setLeads] = useState([]);
  const [query, setQuery] = useState("");
  const [expanded, setExpanded] = useState(null);

  const load = async () => {
    const r = await axios.get(`${API}/admin/leads`, { headers: authHeader() });
    setLeads(r.data);
  };
  useEffect(() => { load(); }, []);

  const updateStatus = async (id, status) => {
    await axios.patch(`${API}/admin/leads/${id}`, { status }, { headers: authHeader() });
    load();
  };
  const remove = async (id) => {
    if (!window.confirm("Delete this lead?")) return;
    await axios.delete(`${API}/admin/leads/${id}`, { headers: authHeader() });
    load();
  };

  const filtered = leads.filter((l) => {
    const q = query.toLowerCase();
    return !q || [l.business_name, l.name, l.email, l.industry].some((f) => (f || "").toLowerCase().includes(q));
  });

  return (
    <div>
      <div className="flex items-center gap-3 mb-4 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--ink-soft)]" />
          <input
            type="text"
            placeholder="Search business, name, email…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            data-testid="leads-search"
            className="w-full pl-9 pr-3 py-2 border-2 border-[var(--ink)] rounded-full bg-[var(--surface)] font-body text-sm"
          />
        </div>
        <span className="font-mono text-xs text-[var(--ink-soft)]">{filtered.length} of {leads.length}</span>
      </div>

      {filtered.length === 0 && (
        <div className="card-blunt p-8 text-center font-body text-[var(--ink-soft)]">No leads yet.</div>
      )}

      <div className="space-y-3">
        {filtered.map((l) => (
          <div key={l.id} data-testid={`lead-row-${l.id}`} className="card-blunt p-4 bg-[var(--surface)]">
            <div className="flex items-start justify-between gap-3 flex-wrap">
              <div className="flex-1 min-w-[200px]">
                <div className="flex items-center gap-2">
                  <span className="font-display text-base text-[var(--ink)]">{l.business_name}</span>
                  <span className="sticker !text-[10px] bg-[var(--bg-2)]">{l.industry}</span>
                  <span className="sticker !text-[10px] bg-[var(--p-blue)]">{l.business_size}</span>
                </div>
                <div className="font-body text-xs text-[var(--ink-soft)] mt-1">
                  {l.name} · <a href={`mailto:${l.email}`} className="underline">{l.email}</a>
                  {l.phone && <> · {l.phone}</>}
                </div>
                <div className="font-body text-xs text-[var(--ink-soft)] mt-0.5">
                  {new Date(l.created_at).toLocaleString()}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <select
                  value={l.status}
                  onChange={(e) => updateStatus(l.id, e.target.value)}
                  data-testid={`lead-status-${l.id}`}
                  className="border-2 border-[var(--ink)] rounded-full px-3 py-1 text-xs font-display bg-[var(--p-yellow)]"
                >
                  {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
                <button
                  onClick={() => setExpanded(expanded === l.id ? null : l.id)}
                  className="btn-pill !py-1 !px-3 text-xs"
                >
                  {expanded === l.id ? "Hide" : "Details"}
                </button>
                <button
                  onClick={() => remove(l.id)}
                  data-testid={`lead-delete-${l.id}`}
                  className="btn-pill !py-1 !px-3 text-xs"
                  title="Delete"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {expanded === l.id && (
              <div className="mt-4 pt-4 border-t-2 border-[var(--ink)]/10 grid grid-cols-1 md:grid-cols-2 gap-3 font-body text-sm">
                <div><strong>Biggest time drain:</strong> {l.biggest_time_drain} {l.biggest_time_drain_other && `(${l.biggest_time_drain_other})`}</div>
                <div><strong>Industry other:</strong> {l.industry_other || "—"}</div>
                <div className="md:col-span-2"><strong>Interested in:</strong> {(l.interested_in || []).join(", ")} {l.interested_in_other && `· ${l.interested_in_other}`}</div>
                <div className="md:col-span-2"><strong>Current tools:</strong> {(l.current_tools || []).join(", ") || "—"} {l.current_tools_other && `· ${l.current_tools_other}`}</div>
                <div><strong>Monthly SaaS spend:</strong> {l.monthly_software_spend || "—"}</div>
                {l.extra_notes && <div className="md:col-span-2"><strong>Notes:</strong> {l.extra_notes}</div>}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// ============ SETTINGS ============
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
      rows={3}
      {...rest}
      className="w-full mt-1 px-3 py-2 border-2 border-[var(--ink)] rounded-xl font-body text-sm bg-[var(--bg)] focus:outline-none focus:bg-[var(--p-yellow)]/30"
    />
  </label>
);

const TestEmailButton = () => {
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState(null);
  const send = async () => {
    setBusy(true);
    setMsg(null);
    try {
      const r = await axios.post(`${API}/admin/test-email`, {}, { headers: authHeader() });
      setMsg({ ok: true, text: `Test email sent ✓ (id: ${r.data.id || "—"})` });
    } catch (e) {
      const detail = e.response?.data?.detail || "Could not send test email.";
      setMsg({ ok: false, text: detail });
    } finally {
      setBusy(false);
    }
  };
  return (
    <div className="flex flex-col gap-2">
      <button
        type="button"
        onClick={send}
        disabled={busy}
        data-testid="settings-test-email"
        className="btn-pill !py-1.5 !px-3.5 text-xs self-start"
      >
        {busy ? "Sending…" : "Send test email"}
      </button>
      {msg && (
        <div
          data-testid="settings-test-email-result"
          className={`font-body text-xs ${msg.ok ? "text-[var(--p-pink)]" : "text-red-600"}`}
        >
          {msg.text}
        </div>
      )}
      <p className="font-body text-xs text-[var(--ink-soft)]">
        Save your changes first, then click "Send test email" to verify Resend
        is wired up.
      </p>
    </div>
  );
};

const SettingsTab = () => {
  const [data, setData] = useState({});
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const load = async () => {
    const r = await axios.get(`${API}/admin/settings`, { headers: authHeader() });
    setData(r.data);
  };
  useEffect(() => { load(); }, []);

  const save = async () => {
    setSaving(true);
    await axios.put(`${API}/admin/settings`, data, { headers: authHeader() });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const set = (k, v) => setData({ ...data, [k]: v });

  return (
    <div className="space-y-8">
      <Section icon={<Building className="w-4 h-4" />} title="Business identity" data-testid="settings-identity">
        <Field label="Studio name" value={data.studioName || ""} onChange={(e) => set("studioName", e.target.value)} data-testid="setting-studioName" />
        <TextArea label="Tagline" value={data.tagline || ""} onChange={(e) => set("tagline", e.target.value)} data-testid="setting-tagline" />
        <Field label="Location" value={data.location || ""} onChange={(e) => set("location", e.target.value)} data-testid="setting-location" />
        <Field label="Established year" value={data.establishedYear || ""} onChange={(e) => set("establishedYear", e.target.value)} />
      </Section>

      <Section icon={<Phone className="w-4 h-4" />} title="Contact & CTAs">
        <Field label="WhatsApp number (international, no +)" hint="e.g. 447900123456" value={data.whatsappNumber || ""} onChange={(e) => set("whatsappNumber", e.target.value)} data-testid="setting-whatsappNumber" />
        <Field label="Default WhatsApp message" value={data.whatsappMessage || ""} onChange={(e) => set("whatsappMessage", e.target.value)} />
        <Field label="Calendly URL" value={data.calendlyUrl || ""} onChange={(e) => set("calendlyUrl", e.target.value)} data-testid="setting-calendlyUrl" />
        <Field label="Email" value={data.email || ""} onChange={(e) => set("email", e.target.value)} />
        <Field label="Instagram URL" value={data.instagram || ""} onChange={(e) => set("instagram", e.target.value)} />
        <Field label="LinkedIn URL" value={data.linkedin || ""} onChange={(e) => set("linkedin", e.target.value)} />
        <Field label="X / Twitter URL" value={data.x_url || ""} onChange={(e) => set("x_url", e.target.value)} />
      </Section>

      <Section icon={<Mail className="w-4 h-4" />} title="Email notifications & admin">
        <Field label="Admin notify email" hint="Where new lead emails get sent" value={data.admin_notify_email || ""} onChange={(e) => set("admin_notify_email", e.target.value)} data-testid="setting-admin_notify_email" />
        <Field label="Resend API key" hint="Get one at resend.com/api-keys" value={data.resend_api_key || ""} onChange={(e) => set("resend_api_key", e.target.value)} type="password" data-testid="setting-resend_api_key" />
        <Field label="Resend sender email" hint="Defaults to onboarding@resend.dev. Once you verify your domain in Resend, switch to e.g. hello@yourstudio.com" value={data.resend_from_email || ""} onChange={(e) => set("resend_from_email", e.target.value)} placeholder="onboarding@resend.dev" data-testid="setting-resend_from_email" />
        <TestEmailButton />
        <Field label="Change admin password" hint="Leave empty to keep current" value={data.admin_password || ""} onChange={(e) => set("admin_password", e.target.value)} type="password" data-testid="setting-admin_password" />
      </Section>

      <div className="sticky bottom-4 z-10 flex items-center justify-end gap-3">
        {saved && <span className="font-hand text-2xl text-[var(--p-pink)]">saved ✨</span>}
        <button onClick={save} disabled={saving} data-testid="settings-save" className="btn-pill btn-pill-pink">
          <Save className="w-4 h-4" /> {saving ? "Saving…" : "Save changes"}
        </button>
      </div>
    </div>
  );
};

const SeoTab = () => {
  const [data, setData] = useState({});
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const load = async () => {
    const r = await axios.get(`${API}/admin/settings`, { headers: authHeader() });
    setData(r.data);
  };
  useEffect(() => { load(); }, []);
  const save = async () => {
    setSaving(true);
    await axios.put(`${API}/admin/settings`, data, { headers: authHeader() });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };
  const set = (k, v) => setData({ ...data, [k]: v });

  const pages = ["home", "work", "services", "examples", "process", "contact", "readiness"];

  return (
    <div className="space-y-8">
      <Section icon={<Search className="w-4 h-4" />} title="Default SEO">
        <TextArea label="Default meta description" hint="Used as fallback across pages" value={data.seo_default_description || ""} onChange={(e) => set("seo_default_description", e.target.value)} data-testid="setting-seo_default_description" />
        <Field label="Default OG image URL" hint="Used in social shares (1200x630 ideal)" value={data.seo_default_og_image || ""} onChange={(e) => set("seo_default_og_image", e.target.value)} />
        <Field label="Google Analytics measurement ID" hint="e.g. G-XXXXXXXX (optional)" value={data.ga_measurement_id || ""} onChange={(e) => set("ga_measurement_id", e.target.value)} />
      </Section>

      <Section icon={<Search className="w-4 h-4" />} title="Per-page titles">
        {pages.map((p) => (
          <Field
            key={p}
            label={`/${p === "home" ? "" : p} title`}
            placeholder={`Override the default title for the ${p} page`}
            value={data[`seo_${p}`] || ""}
            onChange={(e) => set(`seo_${p}`, e.target.value)}
            data-testid={`setting-seo_${p}`}
          />
        ))}
      </Section>

      <div className="sticky bottom-4 z-10 flex items-center justify-end gap-3">
        {saved && <span className="font-hand text-2xl text-[var(--p-pink)]">saved ✨</span>}
        <button onClick={save} disabled={saving} className="btn-pill btn-pill-pink">
          <Save className="w-4 h-4" /> {saving ? "Saving…" : "Save SEO"}
        </button>
      </div>
    </div>
  );
};

const IntegrationsTab = () => {
  const [data, setData] = useState({});
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const load = async () => {
    const r = await axios.get(`${API}/admin/settings`, { headers: authHeader() });
    setData(r.data);
  };
  useEffect(() => { load(); }, []);
  const save = async () => {
    setSaving(true);
    await axios.put(`${API}/admin/settings`, data, { headers: authHeader() });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };
  const set = (k, v) => setData({ ...data, [k]: v });

  return (
    <div className="space-y-8">
      <Section icon={<Link2 className="w-4 h-4" />} title="Google Ads">
        <Field label="Google Ads customer ID" hint="e.g. 123-456-7890 — paste it here once you have OAuth access" value={data.google_ads_id || ""} onChange={(e) => set("google_ads_id", e.target.value)} data-testid="setting-google_ads_id" />
        <p className="font-body text-xs text-[var(--ink-soft)]">
          Live reporting integration requires Google Ads OAuth — coming soon.
          For now we store the ID and you can wire reporting on top.
        </p>
      </Section>

      <Section icon={<Link2 className="w-4 h-4" />} title="Facebook / Meta Ads">
        <Field label="Meta Ad Account ID" hint="e.g. act_1234567890" value={data.facebook_ads_id || ""} onChange={(e) => set("facebook_ads_id", e.target.value)} data-testid="setting-facebook_ads_id" />
        <p className="font-body text-xs text-[var(--ink-soft)]">
          Like Google, full Meta reporting needs a Business System User token —
          contact us once you're ready and we'll wire live dashboards.
        </p>
      </Section>

      <div className="sticky bottom-4 z-10 flex items-center justify-end gap-3">
        {saved && <span className="font-hand text-2xl text-[var(--p-pink)]">saved ✨</span>}
        <button onClick={save} disabled={saving} className="btn-pill btn-pill-pink">
          <Save className="w-4 h-4" /> {saving ? "Saving…" : "Save integrations"}
        </button>
      </div>
    </div>
  );
};

const Section = ({ icon, title, children, ...rest }) => (
  <section className="card-blunt p-6 bg-[var(--surface)]" {...rest}>
    <div className="flex items-center gap-2 mb-4">
      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[var(--p-yellow)] border-2 border-[var(--ink)]">{icon}</span>
      <h3 className="font-display text-lg text-[var(--ink)]">{title}</h3>
    </div>
    <div className="space-y-4">{children}</div>
  </section>
);

// ============ MAIN ============
const TABS = [
  { id: "leads", label: "Leads", icon: <Inbox className="w-4 h-4" /> },
  { id: "settings", label: "Settings", icon: <SettingsIcon className="w-4 h-4" /> },
  { id: "seo", label: "SEO", icon: <Search className="w-4 h-4" /> },
  { id: "integrations", label: "Integrations", icon: <Link2 className="w-4 h-4" /> },
];

export default function AdminPage() {
  const [authed, setAuthed] = useState(!!localStorage.getItem(TOKEN_KEY));
  const [tab, setTab] = useState("leads");

  // Verify token still valid by hitting a protected endpoint
  useEffect(() => {
    if (!authed) return;
    axios.get(`${API}/admin/settings`, { headers: authHeader() }).catch(() => {
      localStorage.removeItem(TOKEN_KEY);
      setAuthed(false);
    });
  }, [authed]);

  if (!authed) return <Login onLogin={() => setAuthed(true)} />;

  return (
    <div data-testid="admin-page" className="min-h-screen bg-[var(--bg)]">
      {/* Top bar */}
      <header className="border-b-2 border-[var(--ink)] bg-[var(--p-yellow)]">
        <div className="max-w-[1400px] mx-auto px-5 md:px-10 h-14 flex items-center justify-between">
          <Link to="/" className="font-display text-xl text-[var(--ink)]">
            Admin<span className="text-[var(--p-pink)]">.</span>
          </Link>
          <button
            onClick={() => { localStorage.removeItem(TOKEN_KEY); setAuthed(false); }}
            data-testid="admin-logout"
            className="btn-pill !py-1.5 !px-3 text-xs"
          >
            <LogOut className="w-3.5 h-3.5" /> Sign out
          </button>
        </div>
      </header>

      {/* Tabs */}
      <nav className="border-b border-[var(--ink)]/15 bg-[var(--bg-2)]">
        <div className="max-w-[1400px] mx-auto px-5 md:px-10 flex items-center gap-2 overflow-x-auto py-2.5">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              data-testid={`admin-tab-${t.id}`}
              className={`btn-pill !py-1.5 !px-3.5 text-xs whitespace-nowrap ${tab === t.id ? "btn-pill-ink" : ""}`}
            >
              {t.icon} {t.label}
            </button>
          ))}
        </div>
      </nav>

      <main className="max-w-[1400px] mx-auto px-5 md:px-10 py-8">
        {tab === "leads" && <LeadsTab />}
        {tab === "settings" && <SettingsTab />}
        {tab === "seo" && <SeoTab />}
        {tab === "integrations" && <IntegrationsTab />}
      </main>
    </div>
  );
}
