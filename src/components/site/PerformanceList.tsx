"use client";

import { useState } from "react";
import { Ticket } from "lucide-react";
import type { SiteEvent } from "@/lib/siteContent";
import { useSiteContent } from "@/lib/useSiteContent";
import TicketModal from "@/components/TicketModal";
import Img from "./Img";
import Tabs from "./Tabs";

export default function PerformanceList() {
  const { content } = useSiteContent();
  const t = content.texts;
  const [tab, setTab] = useState<"upcoming" | "archives">("upcoming");
  const [selected, setSelected] = useState<SiteEvent | null>(null);

  const row = "reveal grid gap-5 border-b border-white/[0.07] px-5 py-12 sm:px-[7%] md:grid-cols-[1.25fr_1fr_auto] md:items-center md:gap-10 md:py-16";

  return (
    <>
      <Tabs tabs={[{ id: "upcoming", label: t.showsUpcomingTab }, { id: "archives", label: t.showsArchivesTab }]} value={tab} onChange={setTab} />
      <div className="pb-40">
        {tab === "upcoming" &&
          (content.events.length ? (
            content.events.map((e, i) => {
              const tiers = (e.tickets ?? []).filter((x) => x.name || x.price);
              const sold = /sold/i.test(e.status) || (tiers.length > 0 && tiers.every((x) => x.soldOut));
              return (
                <div key={i} className={row}>
                  <div>
                    {e.image && <Img src={e.image} alt={e.title} className="mb-6 aspect-[4/3] w-full max-w-sm rounded-2xl object-cover" />}
                    <p className="text-3xl font-extralight leading-snug text-white sm:text-[2.4rem]">{e.title}</p>
                    <p className="mt-2 font-light text-muted">{e.city}</p>
                    {e.description && <p className="mt-3 max-w-md whitespace-pre-line text-sm font-light leading-relaxed text-white/60">{e.description}</p>}
                  </div>
                  <div>
                    <p className="font-normal text-white">{e.venue}</p>
                    <p className="mt-1 font-light text-muted">{[e.date, e.time].filter(Boolean).join(", ")}</p>
                    {tiers.length > 0 ? (
                      <ul className="mt-2 space-y-1 text-sm font-light">
                        {tiers.map((x, k) => (
                          <li key={k} className={x.soldOut ? "text-white/30 line-through" : "text-gold"}>{x.name} · {x.price}</li>
                        ))}
                      </ul>
                    ) : (
                      e.price && <p className="mt-1 text-sm font-light text-gold">{e.price}</p>
                    )}
                  </div>
                  <div className="md:text-right">
                    {e.ticketUrl ? (
                      <a href={e.ticketUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/80 px-8 py-4 text-white transition hover:bg-white hover:text-black">
                        <Ticket size={18} /> {t.getTickets}
                      </a>
                    ) : (
                      <button
                        disabled={sold}
                        onClick={() => setSelected(e)}
                        className="inline-flex items-center gap-2 rounded-full border border-white/80 px-8 py-4 text-white transition hover:bg-white hover:text-black disabled:border-white/20 disabled:text-white/30 disabled:hover:bg-transparent"
                      >
                        <Ticket size={18} /> {sold ? t.soldOut : /available/i.test(e.status) ? t.getTickets : t.requestTickets}
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <p className="py-24 text-center font-light text-muted">{t.noShows}</p>
          ))}
        {tab === "archives" &&
          content.pastEvents.map((e, i) => (
            <div key={i} className={row}>
              <div>
                <p className="text-3xl font-extralight leading-snug text-white sm:text-[2.4rem]">{e.event}</p>
                <p className="mt-2 font-light text-muted">{e.city}</p>
              </div>
              <div>
                {e.venue && <p className="text-white">{e.venue}</p>}
                {e.date && <p className="mt-1 font-light text-muted">{e.date}</p>}
              </div>
              <p className="nav-link text-[10px] uppercase text-white/40 md:text-right">{t.performedLabel}</p>
            </div>
          ))}
      </div>
      {selected && <TicketModal event={selected} onClose={() => setSelected(null)} />}
    </>
  );
}
