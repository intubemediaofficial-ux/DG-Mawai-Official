"use client";

import { useState } from "react";
import { ArrowUpRight, CheckCircle2, Loader2 } from "lucide-react";
import { useSiteContent } from "@/lib/useSiteContent";
import { WhatsappIcon } from "./icons";

const field = "w-full border-0 border-b border-white/20 bg-transparent px-0 py-4 text-lg font-light text-white placeholder:text-white/35 focus:border-white focus:outline-none focus:ring-0";

export default function BookingForm() {
  const { content } = useSiteContent();
  const t = content.texts;
  const fill = (s: string) => s.replace(/\{name\}/g, f.name.split(" ")[0] || "friend").replace(/\{phone\}/g, f.phone);
  const [f, setF] = useState({ name: "", email: "", phone: "", eventType: "", eventDate: "", city: "", message: "", website: "" });
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");
  const [error, setError] = useState("");
  const on = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => setF({ ...f, [e.target.name]: e.target.value });

  const whatsapp = `https://wa.me/${content.contact.whatsapp}?text=${encodeURIComponent(
    `Hello DG Mawai Team! I want to book a show.\nName: ${f.name}\nPhone: ${f.phone}\nEvent: ${f.eventType}\nDate: ${f.eventDate}\nCity: ${f.city}\n${f.message}`,
  )}`;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState("sending");
    setError("");
    try {
      const res = await fetch("/api/enquiry", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...f, type: "booking" }) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");
      setState("done");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setState("idle");
    }
  };

  if (state === "done") {
    return (
      <div className="py-16 text-center">
        <CheckCircle2 className="mx-auto text-white" size={48} strokeWidth={1} />
        <p className="mt-6 text-3xl font-extralight text-white">{fill(t.bookSuccessTitle)}</p>
        <p className="mt-3 font-light text-muted">{fill(t.bookSuccessText)}</p>
        <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="mt-10 inline-flex items-center gap-2 rounded-full border border-white/70 px-7 py-3 text-white transition hover:bg-white hover:text-black">
          <WhatsappIcon size={18} /> {t.whatsappButton}
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-2">
      <input type="text" name="website" value={f.website} onChange={on} className="hidden" tabIndex={-1} autoComplete="off" aria-hidden />
      <div className="grid gap-x-10 sm:grid-cols-2">
        <input className={field} name="name" placeholder={t.formName} required value={f.name} onChange={on} />
        <input className={field} name="phone" type="tel" placeholder={t.formPhone} required value={f.phone} onChange={on} />
        <input className={field} name="email" type="email" placeholder={t.formEmail} value={f.email} onChange={on} />
        <input className={field} name="city" placeholder={t.formCity} value={f.city} onChange={on} />
        <select className={`${field} [&>option]:bg-black`} name="eventType" value={f.eventType} onChange={on}>
          <option value="">{t.formEventType}</option>
          {t.eventTypes.filter(Boolean).map((o) => <option key={o}>{o}</option>)}
        </select>
        <input className={`${field} [color-scheme:dark]`} name="eventDate" type="date" value={f.eventDate} onChange={on} aria-label="Event date" />
      </div>
      <textarea className={`${field} min-h-32 resize-none`} name="message" placeholder={t.formMessage} value={f.message} onChange={on} />
      {error && <p className="pt-2 text-sm text-accent">{error}</p>}
      <div className="pt-8">
        <button disabled={state === "sending"} className="inline-flex items-center gap-3 rounded-full bg-white px-9 py-4 font-medium text-black transition hover:bg-white/85 disabled:opacity-60">
          {state === "sending" ? <Loader2 className="animate-spin" size={18} /> : <ArrowUpRight size={18} />} {t.bookButton}
        </button>
      </div>
    </form>
  );
}
