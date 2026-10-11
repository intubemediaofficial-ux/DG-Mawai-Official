"use client";

import { useState } from "react";
import { CheckCircle2, Loader2, Ticket, X } from "lucide-react";
import type { SiteEvent } from "@/lib/siteContent";
import { useSiteContent } from "@/lib/useSiteContent";

const inputClass =
  "w-full border-0 border-b border-white/20 bg-transparent px-0 py-3 font-light text-white placeholder:text-white/35 focus:border-white focus:outline-none";

export default function TicketModal({ event, onClose }: { event: SiteEvent; onClose: () => void }) {
  const { content } = useSiteContent();
  const tiers = (event.tickets ?? []).filter((x) => x.name || x.price);
  const [form, setForm] = useState({ name: "", phone: "", email: "", city: "", tickets: 1, website: "", tier: tiers.find((x) => !x.soldOut)?.name ?? "" });
  const tier = tiers.find((x) => x.name === form.tier);
  const ticketType = tier ? `${tier.name} (${tier.price})` : "";
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");
  const [error, setError] = useState("");
  const t = content.texts;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState("sending");
    setError("");
    const res = await fetch("/api/enquiry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        ticketType,
        type: "ticket",
        eventTitle: `${event.title} — ${event.date}, ${event.city}`,
        eventDate: event.date,
      }),
    }).catch(() => null);
    if (res?.ok) setState("done");
    else {
      setError("Could not send, please try again or use WhatsApp.");
      setState("idle");
    }
  };

  const whatsapp = `https://wa.me/${content.contact.whatsapp}?text=${encodeURIComponent(
    `Hello DG Mawai Team! I want ${form.tickets}${ticketType ? ` ${ticketType}` : ""} ticket(s) for ${event.title} (${event.date}, ${event.city}). Name: ${form.name}, Phone: ${form.phone}`
  )}`;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm" onClick={onClose}>
      <div className="relative w-full max-w-md rounded-3xl border border-white/10 bg-neutral-950 p-8" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute right-4 top-4 text-gray-400 hover:text-white" aria-label="Close">
          <X size={22} />
        </button>
        {state === "done" ? (
          <div className="py-6 text-center">
            <CheckCircle2 size={48} strokeWidth={1} className="mx-auto mb-4 text-white" />
            <h3 className="text-3xl font-extralight text-white">{t.ticketSuccessTitle}</h3>
            <p className="mt-3 text-gray-400">{t.ticketSuccessText.replace(/\{phone\}/g, form.phone).replace(/\{name\}/g, form.name)}</p>
            <p className="mt-2 text-sm text-gold">{form.tickets} × {tier ? ticketType : event.title}</p>
            <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex rounded-full border border-white/70 px-7 py-3 text-white transition hover:bg-white hover:text-black">
              {t.whatsappButton}
            </a>
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-4">
            <input type="text" value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })} className="hidden" tabIndex={-1} autoComplete="off" aria-hidden />
            <div>
              <p className="flex items-center gap-2 nav-link text-[10px] uppercase text-gold">
                <Ticket size={16} /> {t.ticketTitle}
              </p>
              <h3 className="mt-3 text-3xl font-extralight text-white">{event.title}</h3>
              <p className="text-sm font-light text-muted">
                {event.date} • {event.time} • {event.venue}, {event.city}
              </p>
              {!tiers.length && <p className="mt-1 text-sm font-light text-gold">{event.price}</p>}
            </div>
            {tiers.length > 0 && (
              <div className="grid gap-2 pt-2">
                {tiers.map((x, k) => (
                  <button
                    type="button"
                    key={k}
                    disabled={x.soldOut}
                    onClick={() => setForm({ ...form, tier: x.name })}
                    className={`flex items-center justify-between rounded-xl border px-4 py-3 text-left font-light transition disabled:opacity-30 ${form.tier === x.name ? "border-white bg-white/10 text-white" : "border-white/15 text-white/70 hover:border-white/40"}`}
                  >
                    <span>{x.name}</span>
                    <span className="text-gold">{x.soldOut ? t.soldOut : x.price}</span>
                  </button>
                ))}
              </div>
            )}
            <input className={inputClass} placeholder={t.formName} required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <input className={inputClass} placeholder={t.formPhone} type="tel" required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            <input className={inputClass} placeholder={t.formEmail} type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            <div className="grid grid-cols-2 gap-3">
              <input className={inputClass} placeholder={t.formCity} value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />
              <input className={inputClass} type="number" min={1} max={50} value={form.tickets} onChange={(e) => setForm({ ...form, tickets: Math.max(1, Math.min(50, Number(e.target.value) || 1)) })} aria-label="Tickets" />
            </div>
            {error && <p className="text-sm text-accent">{error}</p>}
            <button disabled={state === "sending"} className="!mt-8 flex w-full items-center justify-center gap-2 rounded-full bg-white py-4 font-medium text-black transition hover:bg-white/85 disabled:opacity-60">
              {state === "sending" && <Loader2 size={18} className="animate-spin" />}
              {t.requestTickets}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
