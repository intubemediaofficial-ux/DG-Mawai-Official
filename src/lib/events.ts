import type { SiteContent, SiteEvent } from "./siteContent";

const MONTH_ONLY = /^\s*[a-z]+\.?,?\s+\d{4}\s*$/i;

export function eventStart(e: SiteEvent): Date | null {
  const d = new Date(`${e.date} ${e.time}`.trim());
  return Number.isNaN(d.getTime()) ? null : d;
}

export function hasExactDate(e: SiteEvent) {
  return eventStart(e) !== null && !MONTH_ONLY.test(e.date);
}

function eventEnd(e: SiteEvent, start: Date) {
  if (MONTH_ONLY.test(e.date)) return new Date(start.getFullYear(), start.getMonth() + 1, 1);
  if (e.time) return new Date(start.getTime() + 6 * 3600 * 1000);
  return new Date(start.getFullYear(), start.getMonth(), start.getDate() + 1);
}

export function splitEvents(content: Pick<SiteContent, "events" | "pastEvents">, now = new Date()) {
  const upcoming: SiteEvent[] = [];
  const ended: { e: SiteEvent; start: Date }[] = [];
  for (const e of content.events) {
    const start = eventStart(e);
    if (start && eventEnd(e, start) <= now) ended.push({ e, start });
    else upcoming.push(e);
  }
  ended.sort((a, b) => b.start.getTime() - a.start.getTime());
  const past: SiteContent["pastEvents"] = [
    ...ended.map(({ e }) => ({ event: e.title, city: e.city, venue: e.venue, date: e.date })),
    ...content.pastEvents,
  ];
  return { upcoming, past };
}
