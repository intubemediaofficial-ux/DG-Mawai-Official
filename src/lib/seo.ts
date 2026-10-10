import type { Metadata } from "next";
import type { SeoPage } from "./siteContent";
import { getContent } from "./store";

export async function pageMetadata(page: SeoPage, path: string): Promise<Metadata> {
  const { seo, photos } = await getContent();
  const { title, description } = seo[page];
  const cover = photos.find((p) => p.hero) ?? photos[0];
  const ogTitle = page === "home" ? title : `${title} | DG Mawai`;
  return {
    title: page === "home" ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: { title: ogTitle, description, url: path, images: cover ? [{ url: cover.src, alt: "DG Mawai" }] : undefined },
    twitter: { title: ogTitle, description, images: cover ? [cover.src] : undefined },
  };
}
