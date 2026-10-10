import type { Metadata } from "next";
import MusicList from "@/components/site/MusicList";
import PageHeader from "@/components/site/PageHeader";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Music | DG Mawai" };

export default function MusicPage() {
  return (
    <>
      <PageHeader />
      <MusicList />
    </>
  );
}
