"use client";

import { Calendar, MapPin, Clock, Ticket } from "lucide-react";
import { useSiteContent } from "@/lib/useSiteContent";

import TicketModal from "./TicketModal";
import { useState } from "react";
import type { SiteEvent } from "@/lib/siteContent";

export default function Events() {
  const { content } = useSiteContent();
  const [selected, setSelected] = useState<SiteEvent | null>(null);

  return (
    <section id="events" className="bg-[#080808] px-4 py-16 sm:py-24">
      <div className="section-divider mb-10" />
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-[#d4af37]">
            Live Shows
          </p>
          <h2 className="text-3xl font-black leading-tight text-white sm:text-5xl">
            Upcoming <span className="gradient-gold">Events</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-gray-400">
            Catch DG Mawai live at upcoming shows and events across India.
          </p>
        </div>

        {/* Events Grid */}
        <div className="mb-12 grid gap-6 lg:grid-cols-2">
          {content.events.map((event, index) => (
            <div
              key={index}
              className="rounded-[2rem] border border-[#2a2a2a] bg-[#141414] p-5 card-hover sm:p-6"
            >
              <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h3 className="mb-2 text-xl font-black leading-tight text-white">
                    {event.title}
                  </h3>
                  <p className="text-sm text-gray-400">{event.venue}</p>
                </div>
                <span
                  className={`w-fit whitespace-nowrap rounded-full px-3 py-1 text-xs font-bold ${
                    event.status === "Tickets Available"
                      ? "bg-green-500/20 text-green-400"
                      : "bg-[#d4af37]/20 text-[#d4af37]"
                  }`}
                >
                  {event.status}
                </span>
              </div>

              <div className="mb-5 flex flex-wrap gap-x-5 gap-y-3 text-sm leading-6 text-gray-400">
                <span className="flex items-center gap-1">
                  <Calendar size={14} className="text-[#d4af37]" />
                  {event.date}
                </span>
                <span className="flex items-center gap-1">
                  <Clock size={14} className="text-[#d4af37]" />
                  {event.time}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin size={14} className="text-[#d4af37]" />
                  {event.city}
                </span>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <span className="text-[#d4af37] font-semibold">
                  {event.price}
                </span>
                {event.status === "Tickets Available" ? (
                  event.ticketUrl ? (
                    <a
                      href={event.ticketUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-gradient-gold text-black px-4 py-2 rounded-full text-sm font-semibold hover:scale-105 transition-transform"
                    >
                      <Ticket size={14} />
                      Book Tickets
                    </a>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setSelected(event)}
                      className="inline-flex items-center gap-2 bg-gradient-gold text-black px-4 py-2 rounded-full text-sm font-semibold hover:scale-105 transition-transform"
                    >
                      <Ticket size={14} />
                      Book Tickets
                    </button>
                  )
                ) : (
                  <span className="text-xs text-gray-500">
                    Booking opens soon
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Past Events */}
        <div>
          <h3 className="mb-6 text-center text-2xl font-black leading-tight text-white">
            Past <span className="gradient-gold">Performances</span>
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {content.pastEvents.map((event, index) => (
              <div
                key={index}
                className="rounded-full border border-[#2a2a2a] bg-[#141414] px-4 py-2 text-sm leading-6"
              >
                <span className="text-[#d4af37]">{event.city}</span>
                <span className="text-gray-500 ml-2">- {event.event}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {selected && <TicketModal event={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}
