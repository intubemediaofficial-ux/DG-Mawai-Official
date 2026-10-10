"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  ArrowDown, ArrowUp, CalendarDays, Check, Download, ExternalLink, Film, Home, Image as ImageIcon, Inbox,
  KeyRound, Loader2, LogOut, Mail, Menu, Music2, Phone, Plus, Save, Share2, Trash2, Upload, User, X,
} from "lucide-react";
import Link from "next/link";
import type { SiteContent } from "@/lib/siteContent";

type Enquiry = {
  id: string; type: "booking" | "ticket" | "contact"; name: string; phone: string; email: string; city: string;
  eventType: string; eventDate: string; eventTitle: string; tickets: number; message: string;
  status: "new" | "contacted" | "confirmed" | "closed"; note: string; createdAt: string;
};

type FieldType = "text" | "textarea" | "checkbox" | "image";
type Field = { key: string; label: string; type?: FieldType; placeholder?: string; options?: string[] };

const input = "w-full rounded-lg border border-[#2a2a2a] bg-[#0a0a0a] px-3 py-2.5 text-sm text-white placeholder:text-gray-600 focus:border-[#d4af37] focus:outline-none";
const card = "rounded-2xl border border-[#2a2a2a] bg-[#141414] p-5";
const btnGold = "inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-gold px-4 py-2.5 text-sm font-bold text-black transition hover:brightness-110 disabled:opacity-50";
const btnGhost = "inline-flex items-center justify-center gap-2 rounded-lg border border-[#2a2a2a] px-3 py-2 text-sm text-gray-300 transition hover:border-[#d4af37] hover:text-[#d4af37] disabled:opacity-40";

async function uploadFiles(files: FileList | File[]): Promise<string[]> {
  const form = new FormData();
  Array.from(files).forEach((f) => form.append("files", f));
  const res = await fetch("/api/admin/upload", { method: "POST", body: form });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Upload failed");
  return data.urls;
}

function ImageInput({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [busy, setBusy] = useState(false);
  return (
    <div className="flex items-center gap-3">
      {value ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={value} alt="" className="h-16 w-16 shrink-0 rounded-lg border border-[#2a2a2a] object-cover" />
      ) : (
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg border border-dashed border-[#2a2a2a] text-gray-600"><ImageIcon size={20} /></div>
      )}
      <div className="flex-1 space-y-2">
        <input className={input} value={value} placeholder="/images/... or https://..." onChange={(e) => onChange(e.target.value)} />
        <label className={`${btnGhost} cursor-pointer`}>
          {busy ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />} Upload image
          <input type="file" accept="image/*" className="hidden" onChange={async (e) => {
            if (!e.target.files?.length) return;
            setBusy(true);
            try { onChange((await uploadFiles(e.target.files))[0]); } catch (err) { alert((err as Error).message); }
            setBusy(false);
            e.target.value = "";
          }} />
        </label>
      </div>
    </div>
  );
}

function FieldInput({ field, value, onChange }: { field: Field; value: unknown; onChange: (v: unknown) => void }) {
  if (field.type === "checkbox") {
    return (
      <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-300">
        <input type="checkbox" checked={Boolean(value)} onChange={(e) => onChange(e.target.checked)} className="h-4 w-4 accent-[#d4af37]" />
        {field.label}
      </label>
    );
  }
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-semibold uppercase tracking-wider text-gray-500">{field.label}</span>
      {field.type === "textarea" ? (
        <textarea className={`${input} min-h-24`} value={String(value ?? "")} placeholder={field.placeholder} onChange={(e) => onChange(e.target.value)} />
      ) : field.type === "image" ? (
        <ImageInput value={String(value ?? "")} onChange={onChange} />
      ) : field.options ? (
        <select className={input} value={String(value ?? "")} onChange={(e) => onChange(e.target.value)}>
          {field.options.map((o) => <option key={o}>{o}</option>)}
        </select>
      ) : (
        <input className={input} value={String(value ?? "")} placeholder={field.placeholder} onChange={(e) => onChange(e.target.value)} />
      )}
    </label>
  );
}

function ObjectEditor<T extends object>({ value, fields, onChange }: { value: T; fields: Field[]; onChange: (v: T) => void }) {
  const rec = value as Record<string, unknown>;
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {fields.map((f) => (
        <div key={f.key} className={f.type === "textarea" || f.type === "image" ? "md:col-span-2" : ""}>
          <FieldInput field={f} value={rec[f.key]} onChange={(v) => onChange({ ...value, [f.key]: v })} />
        </div>
      ))}
    </div>
  );
}

function ListEditor<T extends object>({ items, fields, blank, onChange, title, addLabel = "Add new" }: {
  items: T[]; fields: Field[]; blank: T; onChange: (v: T[]) => void; title: (item: T, i: number) => string; addLabel?: string;
}) {
  const move = (i: number, d: number) => {
    const next = [...items];
    const j = i + d;
    if (j < 0 || j >= next.length) return;
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  };
  return (
    <div className="space-y-4">
      {items.map((item, i) => (
        <div key={i} className={card}>
          <div className="mb-4 flex items-center justify-between gap-3">
            <p className="truncate font-bold text-white"><span className="mr-2 text-[#d4af37]">#{i + 1}</span>{title(item, i) || "Untitled"}</p>
            <div className="flex shrink-0 gap-2">
              <button className={btnGhost} disabled={i === 0} onClick={() => move(i, -1)} aria-label="Move up"><ArrowUp size={14} /></button>
              <button className={btnGhost} disabled={i === items.length - 1} onClick={() => move(i, 1)} aria-label="Move down"><ArrowDown size={14} /></button>
              <button className={`${btnGhost} hover:!border-red-500 hover:!text-red-400`} onClick={() => confirm("Remove this item?") && onChange(items.filter((_, k) => k !== i))} aria-label="Remove"><Trash2 size={14} /></button>
            </div>
          </div>
          <ObjectEditor value={item} fields={fields} onChange={(v) => onChange(items.map((it, k) => (k === i ? v : it)))} />
        </div>
      ))}
      <button className={btnGhost} onClick={() => onChange([...items, { ...blank }])}><Plus size={16} /> {addLabel}</button>
    </div>
  );
}

function StringList({ items, onChange, placeholder }: { items: string[]; onChange: (v: string[]) => void; placeholder?: string }) {
  return (
    <div className="space-y-3">
      {items.map((s, i) => (
        <div key={i} className="flex gap-2">
          <textarea className={`${input} min-h-20`} value={s} placeholder={placeholder} onChange={(e) => onChange(items.map((x, k) => (k === i ? e.target.value : x)))} />
          <button className={btnGhost} onClick={() => onChange(items.filter((_, k) => k !== i))} aria-label="Remove"><Trash2 size={14} /></button>
        </div>
      ))}
      <button className={btnGhost} onClick={() => onChange([...items, ""])}><Plus size={16} /> Add</button>
    </div>
  );
}

function Section({ title, desc, children }: { title: string; desc?: string; children: React.ReactNode }) {
  return (
    <section className="mb-8">
      <h2 className="text-xl font-black text-white">{title}</h2>
      {desc && <p className="mt-1 text-sm text-gray-500">{desc}</p>}
      <div className="mt-4">{children}</div>
    </section>
  );
}

function Login({ onDone }: { onDone: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  return (
    <main className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,#2a2208,#0a0a0a_60%)] p-4">
      <form
        className="w-full max-w-sm rounded-[2rem] border border-[#d4af37]/30 bg-[#141414]/90 p-8 shadow-2xl shadow-[#d4af37]/10"
        onSubmit={async (e) => {
          e.preventDefault();
          setBusy(true);
          setError("");
          const res = await fetch("/api/admin/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, password }) });
          setBusy(false);
          if (res.ok) onDone();
          else setError((await res.json().catch(() => ({}))).error || "Login failed");
        }}
      >
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-gold text-2xl font-black text-black">DG</div>
          <h1 className="text-2xl font-black text-white">DG Mawai <span className="gradient-gold">Admin</span></h1>
          <p className="mt-1 text-sm text-gray-500">Sign in to manage the website</p>
        </div>
        <div className="space-y-4">
          <input className={input} type="email" placeholder="Admin email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="username" />
          <input className={input} type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required autoComplete="current-password" />
          {error && <p className="text-sm text-red-400">{error}</p>}
          <button className={`${btnGold} w-full py-3`} disabled={busy}>{busy && <Loader2 size={16} className="animate-spin" />} Sign In</button>
        </div>
        <Link href="/" className="mt-6 block text-center text-xs text-gray-500 hover:text-[#d4af37]">← Back to website</Link>
      </form>
    </main>
  );
}

const STATUS_STYLE: Record<Enquiry["status"], string> = {
  new: "bg-blue-500/15 text-blue-300",
  contacted: "bg-yellow-500/15 text-yellow-300",
  confirmed: "bg-green-500/15 text-green-300",
  closed: "bg-gray-500/15 text-gray-400",
};

function Enquiries({ items, setItems }: { items: Enquiry[]; setItems: (v: Enquiry[]) => void }) {
  const [filter, setFilter] = useState<"all" | Enquiry["type"]>("all");
  const [statusFilter, setStatusFilter] = useState<"all" | Enquiry["status"]>("all");
  const shown = items.filter((e) => (filter === "all" || e.type === filter) && (statusFilter === "all" || e.status === statusFilter));
  const update = async (id: string, patch: Partial<Enquiry>) => {
    const res = await fetch("/api/admin/enquiries", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, ...patch }) });
    if (res.ok) {
      const updated = await res.json();
      setItems(items.map((e) => (e.id === id ? updated : e)));
    }
  };
  const exportCsv = () => {
    const cols: (keyof Enquiry)[] = ["createdAt", "type", "status", "name", "phone", "email", "city", "eventType", "eventDate", "eventTitle", "tickets", "message", "note"];
    const csv = [cols.join(","), ...shown.map((e) => cols.map((c) => `"${String(e[c] ?? "").replace(/"/g, '""')}"`).join(","))].join("\n");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    a.download = `dg-mawai-enquiries-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
  };
  return (
    <Section title="Booking & Ticket Enquiries" desc="Every show booking and ticket request from the website lands here.">
      <div className="mb-4 flex flex-wrap items-center gap-2">
        {(["all", "booking", "ticket"] as const).map((f) => (
          <button key={f} onClick={() => setFilter(f)} className={`rounded-full px-4 py-1.5 text-sm capitalize ${filter === f ? "bg-gradient-gold font-bold text-black" : "border border-[#2a2a2a] text-gray-400"}`}>{f}</button>
        ))}
        <select className={`${input} !w-auto`} value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}>
          <option value="all">All status</option>
          {Object.keys(STATUS_STYLE).map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        <button className={`${btnGhost} ml-auto`} onClick={exportCsv} disabled={!shown.length}><Download size={14} /> Export CSV</button>
      </div>
      {!shown.length && <div className={`${card} py-12 text-center text-gray-500`}><Inbox className="mx-auto mb-3" />No enquiries yet</div>}
      <div className="space-y-4">
        {shown.map((e) => (
          <div key={e.id} className={card}>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold uppercase ${e.type === "ticket" ? "bg-purple-500/15 text-purple-300" : "bg-[#d4af37]/15 text-[#d4af37]"}`}>{e.type}</span>
                  <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold capitalize ${STATUS_STYLE[e.status]}`}>{e.status}</span>
                  <span className="text-xs text-gray-500">{new Date(e.createdAt).toLocaleString("en-IN")}</span>
                </div>
                <p className="mt-2 text-lg font-bold text-white">{e.name}</p>
                <p className="text-sm text-gray-400">
                  {[e.eventTitle, e.eventType, e.eventDate, e.city, e.tickets ? `${e.tickets} ticket(s)` : ""].filter(Boolean).join(" • ")}
                </p>
                {e.message && <p className="mt-2 whitespace-pre-wrap text-sm text-gray-300">{e.message}</p>}
              </div>
              <div className="flex flex-wrap gap-2">
                <a className={btnGhost} href={`tel:${e.phone}`}><Phone size={14} /> {e.phone}</a>
                <a className={btnGhost} href={`https://wa.me/${e.phone.replace(/\D/g, "").replace(/^(\d{10})$/, "91$1")}`} target="_blank" rel="noopener noreferrer">WhatsApp</a>
                {e.email && <a className={btnGhost} href={`mailto:${e.email}`}><Mail size={14} /></a>}
              </div>
            </div>
            <div className="mt-4 grid gap-3 md:grid-cols-[180px_1fr]">
              <select className={input} value={e.status} onChange={(ev) => update(e.id, { status: ev.target.value as Enquiry["status"] })}>
                {Object.keys(STATUS_STYLE).map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
              <input className={input} placeholder="Private note (press Enter to save)" defaultValue={e.note} onKeyDown={(ev) => ev.key === "Enter" && update(e.id, { note: (ev.target as HTMLInputElement).value })} onBlur={(ev) => ev.target.value !== e.note && update(e.id, { note: ev.target.value })} />
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

function PasswordForm() {
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [msg, setMsg] = useState("");
  return (
    <Section title="Change Password">
      <form className={`${card} max-w-md space-y-4`} onSubmit={async (e) => {
        e.preventDefault();
        const res = await fetch("/api/admin/password", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ current, next }) });
        const data = await res.json();
        setMsg(res.ok ? "Password updated" : data.error);
        if (res.ok) { setCurrent(""); setNext(""); }
      }}>
        <input className={input} type="password" placeholder="Current password" value={current} onChange={(e) => setCurrent(e.target.value)} required />
        <input className={input} type="password" placeholder="New password (min 8)" value={next} onChange={(e) => setNext(e.target.value)} required minLength={8} />
        {msg && <p className="text-sm text-[#d4af37]">{msg}</p>}
        <button className={btnGold}><KeyRound size={16} /> Update password</button>
      </form>
    </Section>
  );
}

const TABS = [
  { id: "dashboard", label: "Dashboard", icon: Home },
  { id: "enquiries", label: "Enquiries", icon: Inbox },
  { id: "hero", label: "Hero & About", icon: User },
  { id: "photos", label: "Photos", icon: ImageIcon },
  { id: "music", label: "Songs & Releases", icon: Music2 },
  { id: "videos", label: "Videos", icon: Film },
  { id: "events", label: "Events", icon: CalendarDays },
  { id: "contact", label: "Contact & Social", icon: Share2 },
  { id: "settings", label: "Settings", icon: KeyRound },
] as const;
type Tab = (typeof TABS)[number]["id"];

function Dashboard({ email, onLogout }: { email: string; onLogout: () => void }) {
  const [content, setContentState] = useState<SiteContent | null>(null);
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [tab, setTab] = useState<Tab>("dashboard");
  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [menu, setMenu] = useState(false);
  const [bulkBusy, setBulkBusy] = useState(false);

  useEffect(() => {
    fetch("/api/admin/content").then((r) => r.json()).then(setContentState);
    fetch("/api/admin/enquiries").then((r) => r.json()).then(setEnquiries);
  }, []);

  useEffect(() => {
    const warn = (e: BeforeUnloadEvent) => { if (dirty) e.preventDefault(); };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  const set = useCallback(<K extends keyof SiteContent>(key: K, value: SiteContent[K]) => {
    setContentState((c) => (c ? { ...c, [key]: value } : c));
    setDirty(true);
    setSaved(false);
  }, []);

  const save = async () => {
    if (!content) return;
    setSaving(true);
    const res = await fetch("/api/admin/content", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(content) });
    setSaving(false);
    if (res.ok) { setDirty(false); setSaved(true); } else alert("Save failed. Please login again.");
  };

  const stats = useMemo(() => [
    { label: "New enquiries", value: enquiries.filter((e) => e.status === "new").length, icon: Inbox, tab: "enquiries" as Tab },
    { label: "Ticket requests", value: enquiries.filter((e) => e.type === "ticket").length, icon: CalendarDays, tab: "enquiries" as Tab },
    { label: "Songs", value: content?.songs.length ?? 0, icon: Music2, tab: "music" as Tab },
    { label: "Photos", value: content?.photos.length ?? 0, icon: ImageIcon, tab: "photos" as Tab },
    { label: "Videos", value: content?.videos.length ?? 0, icon: Film, tab: "videos" as Tab },
    { label: "Events", value: content?.events.length ?? 0, icon: CalendarDays, tab: "events" as Tab },
  ], [content, enquiries]);

  if (!content) return <div className="flex min-h-screen items-center justify-center bg-[#0a0a0a]"><Loader2 className="animate-spin text-[#d4af37]" size={32} /></div>;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white lg:flex">
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 border-r border-[#2a2a2a] bg-[#0f0f0f] p-4 transition-transform lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 ${menu ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="mb-8 flex items-center gap-3 px-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-gold font-black text-black">DG</div>
          <div><p className="font-black">DG Mawai</p><p className="text-xs text-gray-500">Admin Panel</p></div>
          <button className="ml-auto lg:hidden" onClick={() => setMenu(false)}><X size={20} /></button>
        </div>
        <nav className="space-y-1">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button key={id} onClick={() => { setTab(id); setMenu(false); }} className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${tab === id ? "bg-[#d4af37]/15 font-bold text-[#d4af37]" : "text-gray-400 hover:bg-white/5 hover:text-white"}`}>
              <Icon size={18} /> {label}
              {id === "enquiries" && enquiries.some((e) => e.status === "new") && <span className="ml-auto rounded-full bg-[#d4af37] px-2 text-xs font-bold text-black">{enquiries.filter((e) => e.status === "new").length}</span>}
            </button>
          ))}
        </nav>
        <div className="absolute inset-x-4 bottom-4 space-y-2">
          <a href="/" target="_blank" className={`${btnGhost} w-full`}><ExternalLink size={14} /> View website</a>
          <button onClick={onLogout} className={`${btnGhost} w-full`}><LogOut size={14} /> Logout</button>
        </div>
      </aside>

      <div className="flex-1">
        <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-[#2a2a2a] bg-[#0a0a0a]/90 px-4 py-3 backdrop-blur sm:px-8">
          <button className="lg:hidden" onClick={() => setMenu(true)}><Menu /></button>
          <div className="min-w-0">
            <p className="font-bold">{TABS.find((t) => t.id === tab)?.label}</p>
            <p className="truncate text-xs text-gray-500">{email}</p>
          </div>
          <div className="ml-auto flex items-center gap-3">
            {dirty && <span className="hidden text-xs text-yellow-400 sm:inline">Unsaved changes</span>}
            {saved && !dirty && <span className="flex items-center gap-1 text-xs text-green-400"><Check size={14} /> Live on website</span>}
            <button className={btnGold} onClick={save} disabled={!dirty || saving}>{saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />} Save</button>
          </div>
        </header>

        <main className="mx-auto max-w-5xl p-4 sm:p-8">
          {tab === "dashboard" && (
            <>
              <Section title={`Welcome back 👋`} desc="Overview of your website. Changes go live as soon as you press Save.">
                <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                  {stats.map(({ label, value, icon: Icon, tab: t }) => (
                    <button key={label} onClick={() => setTab(t)} className={`${card} text-left transition hover:border-[#d4af37]/50`}>
                      <Icon className="mb-3 text-[#d4af37]" size={22} />
                      <p className="text-3xl font-black">{value}</p>
                      <p className="text-sm text-gray-500">{label}</p>
                    </button>
                  ))}
                </div>
              </Section>
              <Section title="Latest enquiries">
                <div className="space-y-2">
                  {enquiries.slice(0, 5).map((e) => (
                    <button key={e.id} onClick={() => setTab("enquiries")} className={`${card} flex w-full items-center justify-between gap-3 !py-3 text-left`}>
                      <span className="truncate"><b>{e.name}</b> <span className="text-gray-500">• {e.eventTitle || e.eventType || e.type} • {e.phone}</span></span>
                      <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold capitalize ${STATUS_STYLE[e.status]}`}>{e.status}</span>
                    </button>
                  ))}
                  {!enquiries.length && <p className="text-sm text-gray-500">No enquiries yet.</p>}
                </div>
              </Section>
            </>
          )}

          {tab === "enquiries" && <Enquiries items={enquiries} setItems={setEnquiries} />}

          {tab === "hero" && (
            <>
              <Section title="Hero">
                <div className={card}>
                  <ObjectEditor value={content.hero} onChange={(v) => set("hero", v)} fields={[
                    { key: "badge", label: "Badge" }, { key: "title", label: "Title" }, { key: "highlight", label: "Highlighted name" },
                    { key: "tagline", label: "Tagline", type: "textarea" },
                  ]} />
                </div>
              </Section>
              <Section title="Hero stats">
                <ListEditor items={content.hero.stats} blank={{ value: "", label: "" }} title={(s) => `${s.value} ${s.label}`} onChange={(v) => set("hero", { ...content.hero, stats: v })} fields={[{ key: "value", label: "Value" }, { key: "label", label: "Label" }]} />
              </Section>
              <Section title="Biography">
                <div className={`${card} space-y-4`}>
                  <ObjectEditor value={content.about} onChange={(v) => set("about", v)} fields={[
                    { key: "eyebrow", label: "Eyebrow" }, { key: "title", label: "Title" }, { key: "highlight", label: "Highlight" },
                    { key: "heading", label: "Heading" }, { key: "intro", label: "Intro", type: "textarea" }, { key: "image", label: "Biography photo", type: "image" },
                  ]} />
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Paragraphs</p>
                  <StringList items={content.about.paragraphs} onChange={(v) => set("about", { ...content.about, paragraphs: v })} />
                </div>
              </Section>
              <Section title="Achievements">
                <ListEditor items={content.achievements} blank={{ value: "", label: "" }} title={(s) => `${s.value} ${s.label}`} onChange={(v) => set("achievements", v)} fields={[{ key: "value", label: "Value" }, { key: "label", label: "Label" }]} />
              </Section>
            </>
          )}

          {tab === "photos" && (
            <Section title="Photo Gallery" desc="Tick 'Hero slider' to show a photo in the top slider. 'Large' makes it bigger in the gallery.">
              <label className={`${btnGold} mb-6 cursor-pointer`}>
                {bulkBusy ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />} Upload photos
                <input type="file" accept="image/*" multiple className="hidden" onChange={async (e) => {
                  if (!e.target.files?.length) return;
                  setBulkBusy(true);
                  try {
                    const urls = await uploadFiles(e.target.files);
                    set("photos", [...content.photos, ...urls.map((src) => ({ src, label: "DG Mawai", category: "Gallery" }))]);
                  } catch (err) { alert((err as Error).message); }
                  setBulkBusy(false);
                  e.target.value = "";
                }} />
              </label>
              <ListEditor items={content.photos} blank={{ src: "", label: "", category: "Gallery" }} addLabel="Add photo by URL" title={(p) => p.label} onChange={(v) => set("photos", v)} fields={[
                { key: "src", label: "Image", type: "image" }, { key: "label", label: "Caption" }, { key: "category", label: "Category" },
                { key: "hero", label: "Hero slider", type: "checkbox" }, { key: "large", label: "Large in gallery", type: "checkbox" },
              ]} />
            </Section>
          )}

          {tab === "music" && (
            <>
              <Section title="Trending Songs">
                <ListEditor items={content.songs} blank={{ title: "", plays: "", year: String(new Date().getFullYear()), duration: "", trending: false }} title={(s) => s.title} onChange={(v) => set("songs", v)} fields={[
                  { key: "title", label: "Song title" }, { key: "plays", label: "Plays / views", placeholder: "500K+" }, { key: "year", label: "Year" }, { key: "duration", label: "Duration", placeholder: "4:30" },
                  { key: "trending", label: "Trending (fire badge)", type: "checkbox" },
                ]} />
              </Section>
              <Section title="Upcoming / Latest Releases">
                <ListEditor items={content.releases} blank={{ title: "", status: "Coming Soon", year: String(new Date().getFullYear()) }} title={(s) => s.title} onChange={(v) => set("releases", v)} fields={[
                  { key: "title", label: "Title" }, { key: "status", label: "Status", placeholder: "Coming Soon / Latest Release / Released" }, { key: "year", label: "Year" },
                ]} />
              </Section>
            </>
          )}

          {tab === "videos" && (
            <Section title="Music Videos">
              <ListEditor items={content.videos} blank={{ title: "", image: "", url: "", views: "", duration: "" }} title={(s) => s.title} onChange={(v) => set("videos", v)} fields={[
                { key: "title", label: "Title" }, { key: "url", label: "YouTube link" }, { key: "views", label: "Views" }, { key: "duration", label: "Duration" },
                { key: "image", label: "Thumbnail", type: "image" },
              ]} />
            </Section>
          )}

          {tab === "events" && (
            <>
              <Section title="Upcoming Events" desc="Status 'Tickets Available' shows a Book Tickets button. Leave ticket link empty to collect requests in Enquiries.">
                <ListEditor items={content.events} blank={{ title: "", date: "", time: "", venue: "", city: "", status: "Coming Soon", price: "TBA", ticketUrl: "" }} title={(s) => `${s.title} — ${s.date}`} onChange={(v) => set("events", v)} fields={[
                  { key: "title", label: "Event name" }, { key: "date", label: "Date" }, { key: "time", label: "Time" }, { key: "venue", label: "Venue" }, { key: "city", label: "City" },
                  { key: "status", label: "Status", options: ["Tickets Available", "Coming Soon", "Sold Out"] }, { key: "price", label: "Price", placeholder: "From ₹499" },
                  { key: "ticketUrl", label: "External ticket link (optional)", placeholder: "https://..." },
                ]} />
              </Section>
              <Section title="Past Performances">
                <ListEditor items={content.pastEvents} blank={{ city: "", event: "" }} title={(s) => `${s.city} — ${s.event}`} onChange={(v) => set("pastEvents", v)} fields={[{ key: "city", label: "City" }, { key: "event", label: "Event" }]} />
              </Section>
            </>
          )}

          {tab === "contact" && (
            <>
              <Section title="Contact">
                <div className={card}>
                  <ObjectEditor value={content.contact} onChange={(v) => set("contact", v)} fields={[
                    { key: "email", label: "Email" }, { key: "whatsapp", label: "WhatsApp number (with 91)", placeholder: "919876543210" },
                    { key: "phone", label: "Phone (optional)" }, { key: "location", label: "Location" },
                  ]} />
                </div>
              </Section>
              <Section title="Social & Streaming Links">
                <div className={card}>
                  <ObjectEditor value={content.socials} onChange={(v) => set("socials", v)} fields={[
                    { key: "instagram", label: "Instagram" }, { key: "facebook", label: "Facebook" }, { key: "youtube", label: "YouTube" },
                    { key: "spotify", label: "Spotify" }, { key: "appleMusic", label: "Apple Music" }, { key: "jiosaavn", label: "JioSaavn" },
                  ]} />
                </div>
              </Section>
              <Section title="Booking Info Points">
                <StringList items={content.bookingInfo} onChange={(v) => set("bookingInfo", v)} />
              </Section>
            </>
          )}

          {tab === "settings" && <PasswordForm />}
        </main>
      </div>
    </div>
  );
}

export default function AdminPage() {
  const [email, setEmail] = useState<string | null | undefined>(undefined);
  const check = useCallback(() => {
    fetch("/api/admin/me").then(async (r) => setEmail(r.ok ? (await r.json()).email : null)).catch(() => setEmail(null));
  }, []);
  useEffect(check, [check]);

  if (email === undefined) return <div className="flex min-h-screen items-center justify-center bg-[#0a0a0a]"><Loader2 className="animate-spin text-[#d4af37]" size={32} /></div>;
  if (!email) return <Login onDone={check} />;
  return <Dashboard email={email} onLogout={async () => { await fetch("/api/admin/logout", { method: "POST" }); setEmail(null); }} />;
}
