"use client";

import { useState } from "react";
import { Send, Phone, Mail, MapPin, Calendar, CheckCircle2, Loader2 } from "lucide-react";
import { useSiteContent } from "@/lib/useSiteContent";

export default function Booking() {
  const { content } = useSiteContent();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    eventType: "",
    eventDate: "",
    city: "",
    message: "",
  });
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const whatsappLink = `https://wa.me/${content.contact.whatsapp}?text=${encodeURIComponent(
    `Hello DG Mawai Team!\n\nI want to book a show.\n\nName: ${formData.name}\nPhone: ${formData.phone}\nEvent: ${formData.eventType}\nDate: ${formData.eventDate}\nCity: ${formData.city}\nDetails: ${formData.message}`
  )}`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState("sending");
    setError("");
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, type: "booking" }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");
      setState("done");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setState("error");
    }
  };

  return (
    <section id="booking" className="bg-[#080808] px-4 py-16 sm:py-24">
      <div className="section-divider mb-10" />
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-[#d4af37]">
            Booking
          </p>
          <h2 className="text-3xl font-black leading-tight text-white sm:text-5xl">
            Book a <span className="gradient-gold">Show</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-gray-400">
            Want DG Mawai to perform at your event? Fill out the form below or
            contact directly.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          {/* Contact Info */}
          <div>
            <h3 className="mb-6 text-2xl font-black leading-tight text-[#d4af37]">
              Contact Information
            </h3>

            <div className="space-y-4 mb-8">
              <a
                href={`mailto:${content.contact.email}`}
                className="flex items-center gap-4 bg-[#141414] border border-[#2a2a2a] rounded-xl p-4 hover:border-[#d4af37]/50 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-[#d4af37]/20 flex items-center justify-center">
                  <Mail size={18} className="text-[#d4af37]" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Email</p>
                  <p className="break-all text-base font-semibold leading-6 text-white">
                    {content.contact.email}
                  </p>
                </div>
              </a>

              <a
                href={`https://wa.me/${content.contact.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 bg-[#141414] border border-[#2a2a2a] rounded-xl p-4 hover:border-[#d4af37]/50 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                  <Phone size={18} className="text-green-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">WhatsApp</p>
                  <p className="text-white font-medium">
                    Contact on WhatsApp
                  </p>
                </div>
              </a>

              <div className="flex items-center gap-4 bg-[#141414] border border-[#2a2a2a] rounded-xl p-4">
                <div className="w-10 h-10 rounded-full bg-[#d4af37]/20 flex items-center justify-center">
                  <MapPin size={18} className="text-[#d4af37]" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Based in</p>
                  <p className="text-white font-medium">{content.contact.location}</p>
                </div>
              </div>
            </div>

            {/* Booking Info */}
            <div className="bg-[#141414] border border-[#d4af37]/30 rounded-xl p-5">
              <h4 className="font-semibold text-[#d4af37] mb-3">
                Booking Info
              </h4>
              <ul className="space-y-2 text-sm text-gray-300">
                {content.bookingInfo.map((info) => (
                  <li key={info} className="flex items-center gap-2">
                    <Calendar size={14} className="shrink-0 text-[#d4af37]" />
                    {info}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Booking Form */}
          <div>
            {state === "done" ? (
              <div className="flex h-full flex-col items-center justify-center rounded-[2rem] border border-[#d4af37]/40 bg-[#141414] p-8 text-center">
                <CheckCircle2 size={56} className="mb-4 text-green-400" />
                <h3 className="text-2xl font-black text-white">Enquiry Received!</h3>
                <p className="mt-3 max-w-sm text-gray-400">
                  Thank you {formData.name}. DG Mawai team will contact you soon on {formData.phone}.
                </p>
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-green-500 px-6 py-3 font-semibold text-white transition hover:scale-105"
                >
                  <Phone size={18} /> Also send on WhatsApp
                </a>
                <button
                  type="button"
                  onClick={() => {
                    setState("idle");
                    setFormData({ name: "", email: "", phone: "", eventType: "", eventDate: "", city: "", message: "" });
                  }}
                  className="mt-4 text-sm text-gray-400 underline hover:text-[#d4af37]"
                >
                  Send another enquiry
                </button>
              </div>
            ) : (
            <form
              onSubmit={handleSubmit}
              className="rounded-[2rem] border border-[#2a2a2a] bg-[#141414] p-5 sm:p-7"
            >
              <h3 className="mb-6 text-xl font-black leading-tight text-white">
                Fill Booking <span className="gradient-gold">Enquiry</span>
              </h3>

              <div className="space-y-4">
                <div>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Full Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-[#0a0a0a] border border-[#2a2a2a] rounded-lg px-4 py-3 text-white placeholder:text-gray-600 focus:border-[#d4af37] focus:outline-none transition-colors"
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-[#0a0a0a] border border-[#2a2a2a] rounded-lg px-4 py-3 text-white placeholder:text-gray-600 focus:border-[#d4af37] focus:outline-none transition-colors"
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full bg-[#0a0a0a] border border-[#2a2a2a] rounded-lg px-4 py-3 text-white placeholder:text-gray-600 focus:border-[#d4af37] focus:outline-none transition-colors"
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <select
                    name="eventType"
                    value={formData.eventType}
                    onChange={handleChange}
                    required
                    className="w-full bg-[#0a0a0a] border border-[#2a2a2a] rounded-lg px-4 py-3 text-white focus:border-[#d4af37] focus:outline-none transition-colors"
                  >
                    <option value="">Event Type</option>
                    <option value="wedding">Wedding</option>
                    <option value="corporate">Corporate Event</option>
                    <option value="concert">Concert</option>
                    <option value="festival">Festival</option>
                    <option value="private">Private Party</option>
                    <option value="other">Other</option>
                  </select>
                  <input
                    type="date"
                    name="eventDate"
                    value={formData.eventDate}
                    onChange={handleChange}
                    required
                    className="w-full bg-[#0a0a0a] border border-[#2a2a2a] rounded-lg px-4 py-3 text-white focus:border-[#d4af37] focus:outline-none transition-colors"
                  />
                </div>

                <input
                  type="text"
                  name="city"
                  placeholder="Event City / Location"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#0a0a0a] border border-[#2a2a2a] rounded-lg px-4 py-3 text-white placeholder:text-gray-600 focus:border-[#d4af37] focus:outline-none transition-colors"
                />

                <textarea
                  name="message"
                  placeholder="Tell us about your event..."
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full bg-[#0a0a0a] border border-[#2a2a2a] rounded-lg px-4 py-3 text-white placeholder:text-gray-600 focus:border-[#d4af37] focus:outline-none transition-colors resize-none"
                />

                {error && <p className="text-sm text-red-400">{error}</p>}
                <button
                  type="submit"
                  disabled={state === "sending"}
                  className="w-full bg-gradient-gold text-black py-3 rounded-lg font-semibold hover:scale-[1.02] transition-transform flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {state === "sending" ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                  Send Booking Enquiry
                </button>
              </div>
            </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
