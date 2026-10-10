import type { Metadata } from "next";
import PageHeader from "@/components/site/PageHeader";
import PerformanceList from "@/components/site/PerformanceList";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Performance | DG Mawai" };

export default function PerformancePage() {
  return (
    <>
      <PageHeader />
      <PerformanceList />
    </>
  );
}
