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

function structuredData(content: SiteContent) {
  const artistId = `${SITE_URL}/#artist`;
  const sameAs = Object.values(content.socials).filter((u) => typeof u === "string" && u.startsWith("http"));
  const events = content.events
    .map((e) => ({ e, start: new Date(`${e.date} ${e.time}`.trim()) }))
    .filter(({ start }) => !Number.isNaN(start.getTime()))
    .map(({ e, start }) => ({
      "@type": "MusicEvent",
      name: e.title,
      startDate: start.toISOString().slice(0, 10),
      eventStatus: "https://schema.org/EventScheduled",
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      location: { "@type": "Place", name: e.venue || e.city, address: e.city },
      performer: { "@id": artistId },
      url: e.ticketUrl || `${SITE_URL}/performance`,
    }));
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
