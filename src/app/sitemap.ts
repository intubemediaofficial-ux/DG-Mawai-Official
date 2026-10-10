import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { getContent } from "@/lib/store";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const content = await getContent();
  const now = new Date();
  const image = (src: string) => (src.startsWith("http") ? src : `${SITE_URL}${src}`);
  return [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "weekly", priority: 1, images: content.photos.slice(0, 6).map((p) => image(p.src)) },
    { url: `${SITE_URL}/music`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/performance`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.8, images: [image(content.about.image)] },
    { url: `${SITE_URL}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
  ];
}
