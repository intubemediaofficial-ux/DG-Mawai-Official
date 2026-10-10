import type { Metadata } from "next";
import MusicList from "@/components/site/MusicList";
import PageHeader from "@/components/site/PageHeader";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Music",
  description: "Listen to DG Mawai songs and new releases — viral Rasiya hits on YouTube, Spotify, Apple Music and JioSaavn.",
  alternates: { canonical: "/music" },
  openGraph: { title: "Music | DG Mawai", description: "Listen to DG Mawai songs and new releases — viral Rasiya hits on YouTube, Spotify, Apple Music and JioSaavn.", url: "/music" },
};

export default function MusicPage() {
  return (
    <>
      <PageHeader srTitle="DG Mawai Songs & Music" />
      <MusicList />
    </>
  );
}
