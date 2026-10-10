import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import MusicList from "@/components/site/MusicList";
import PageHeader from "@/components/site/PageHeader";

export const dynamic = "force-dynamic";
export function generateMetadata(): Promise<Metadata> {
  return pageMetadata("music", "/music");
}

export default function MusicPage() {
  return (
    <>
      <PageHeader srTitle="DG Mawai Songs & Music" />
      <MusicList />
    </>
  );
}
