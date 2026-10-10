import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import PageHeader from "@/components/site/PageHeader";
import PerformanceList from "@/components/site/PerformanceList";

export const dynamic = "force-dynamic";
export function generateMetadata(): Promise<Metadata> {
  return pageMetadata("performance", "/performance");
}

export default function PerformancePage() {
  return (
    <>
      <PageHeader srTitle="DG Mawai Live Shows & Tickets" />
      <PerformanceList />
    </>
  );
}
