import TopNav from "@/components/site/TopNav";
import BottomBar from "@/components/site/BottomBar";
import { SiteContentProvider } from "@/lib/useSiteContent";
import { getContent } from "@/lib/store";
import JsonLd from "@/components/site/JsonLd";
import { SITE_URL } from "@/lib/site";
import type { SiteContent } from "@/lib/siteContent";

export const dynamic = "force-dynamic";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const content = await getContent();
  return (
    <SiteContentProvider content={content}>
      <JsonLd data={structuredData(content)} />
      <TopNav />
      <main className="min-h-screen bg-black">{children}</main>
      <BottomBar />
    </SiteContentProvider>
  );
}

function abs(src: string) {
  return src.startsWith("http") ? src : `${SITE_URL}${src}`;
}

function istDate(d: Date, withTime: boolean) {
  const p = (n: number) => String(n).padStart(2, "0");
  const day = `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
  return withTime ? `${day}T${p(d.getHours())}:${p(d.getMinutes())}:00+05:30` : day;
}

function structuredData(content: SiteContent) {
  const artistId = `${SITE_URL}/#artist`;
  const sameAs = Object.values(content.socials).filter((u) => typeof u === "string" && u.startsWith("http"));
  const cover = content.photos.find((p) => p.hero) ?? content.photos[0];
  const events = content.events
    .map((e) => ({ e, start: new Date(`${e.date} ${e.time}`.trim()) }))
    .filter(({ start }) => !Number.isNaN(start.getTime()))
    .map(({ e, start }) => {
      const url = e.ticketUrl || `${SITE_URL}/performance`;
      const tiers = (e.tickets ?? []).filter((x) => x.name || x.price);
      const offer = (name: string | undefined, price: string, soldOut?: boolean) => ({
        "@type": "Offer",
        name,
        price: price.replace(/[^\d.]/g, "") || undefined,
        priceCurrency: "INR",
        availability: soldOut || /sold/i.test(e.status) ? "https://schema.org/SoldOut" : "https://schema.org/InStock",
        url,
      });
      return {
        "@type": "MusicEvent",
        name: e.title,
        description: e.description || `${e.title} — live Rasiya performance by DG Mawai${e.venue ? ` at ${e.venue}` : ""}${e.city ? `, ${e.city}` : ""}.`,
        image: [abs(e.image || cover?.src || content.about.image)],
        startDate: istDate(start, Boolean(e.time)),
        endDate: istDate(e.time ? new Date(start.getTime() + 3 * 3600 * 1000) : start, Boolean(e.time)),
        eventStatus: "https://schema.org/EventScheduled",
        eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
        location: {
          "@type": "Place",
          name: e.venue || e.city,
          address: { "@type": "PostalAddress", addressLocality: e.city.split(",")[0].trim(), addressRegion: e.city.split(",")[1]?.trim() || undefined, addressCountry: "IN" },
        },
        performer: { "@id": artistId },
        organizer: { "@type": "Organization", name: "DG Mawai Official", url: SITE_URL },
        offers: tiers.length ? tiers.map((x) => offer(x.name, x.price, x.soldOut)) : [offer(undefined, e.price)],
        url,
      };
    });
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: "DG Mawai",
        inLanguage: "en-IN",
        publisher: { "@id": artistId },
      },
      {
        "@type": ["Person", "MusicGroup"],
        "@id": artistId,
        name: "DG Mawai",
        alternateName: ["DG Mawai Official", "Singer DG Mawai", "डीजी मवई"],
        url: SITE_URL,
        image: content.photos.slice(0, 4).map((p) => abs(p.src)),
        description: content.about.intro || content.hero.tagline,
        genre: ["Rasiya", "Rajasthani Folk", "Gurjar Rasiya"],
        jobTitle: "Singer",
        homeLocation: { "@type": "Place", name: content.contact.location },
        email: content.contact.email ? `mailto:${content.contact.email}` : undefined,
        sameAs,
        track: content.songs.slice(0, 10).map((s) => ({
          "@type": "MusicRecording",
          name: s.title,
          byArtist: { "@id": artistId },
          url: s.youtube || undefined,
          datePublished: s.year || undefined,
        })),
        event: events,
      },
    ],
  };
}
