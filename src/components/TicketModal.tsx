"use client";

import { useState } from "react";
import { CheckCircle2, Loader2, Ticket, X } from "lucide-react";
import type { SiteEvent } from "@/lib/siteContent";
import { useSiteContent } from "@/lib/useSiteContent";

const inputClass =
  "w-full rounded-lg border border-[#2a2a2a] bg-[#0a0a0a] px-4 py-3 text-white placeholder:text-gray-600 focus:border-[#d4af37] focus:outline-none";

export default function TicketModal({ event, onClose }: { event: SiteEvent; onClose: () => void }) {
  const { content } = useSiteContent();
  const [form, setForm] = useState({ name: "", phone: "", email: "", city: "", tickets: 1 });
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");
  const [error, setError] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState("sending");
    setError("");
    const res = await fetch("/api/enquiry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
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
    `Hello DG Mawai Team! I want ${form.tickets} ticket(s) for ${event.title} (${event.date}, ${event.city}). Name: ${form.name}, Phone: ${form.phone}`
  )}`;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm" onClick={onClose}>
      <div className="relative w-full max-w-md rounded-[2rem] border border-[#d4af37]/40 bg-[#141414] p-6" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute right-4 top-4 text-gray-400 hover:text-white" aria-label="Close">
          <X size={22} />
        </button>
        {state === "done" ? (
          <div className="py-6 text-center">
            <CheckCircle2 size={52} className="mx-auto mb-4 text-green-400" />
            <h3 className="text-2xl font-black text-white">Tickets Requested!</h3>
            <p className="mt-3 text-gray-400">Team will call you on {form.phone} to confirm your {form.tickets} ticket(s).</p>
            <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex rounded-full bg-green-500 px-6 py-3 font-semibold text-white">
              Confirm on WhatsApp
            </a>
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-4">
            <div>
              <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-[#d4af37]">
                <Ticket size={16} /> Book Tickets
              </p>
              <h3 className="mt-2 text-xl font-black text-white">{event.title}</h3>
              <p className="text-sm text-gray-400">
                {event.date} • {event.time} • {event.venue}, {event.city}
              </p>
              <p className="mt-1 font-semibold text-[#d4af37]">{event.price}</p>
            </div>
            <input className={inputClass} placeholder="Your Name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <input className={inputClass} placeholder="Phone Number" type="tel" required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            <input className={inputClass} placeholder="Email (optional)" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            <div className="grid grid-cols-2 gap-3">
              <input className={inputClass} placeholder="Your City" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />
              <input className={inputClass} type="number" min={1} max={50} value={form.tickets} onChange={(e) => setForm({ ...form, tickets: Number(e.target.value) })} aria-label="Tickets" />
            </div>
            {error && <p className="text-sm text-red-400">{error}</p>}
            <button disabled={state === "sending"} className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-gold py-3 font-semibold text-black disabled:opacity-60">
              {state === "sending" && <Loader2 size={18} className="animate-spin" />}
              Request Tickets
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
