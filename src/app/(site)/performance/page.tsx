import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import PageHeader from "@/components/site/PageHeader";
import PerformanceList from "@/components/site/PerformanceList";
import { getContent } from "@/lib/store";
import { splitEvents } from "@/lib/events";

export const dynamic = "force-dynamic";
export function generateMetadata(): Promise<Metadata> {
  return pageMetadata("performance", "/performance");
}

export default async function PerformancePage() {
  const { upcoming, past } = splitEvents(await getContent());
  return (
    <>
      <PageHeader srTitle="DG Mawai Live Shows & Tickets" />
      <PerformanceList upcoming={upcoming} past={past} />
    </>
  );
}
