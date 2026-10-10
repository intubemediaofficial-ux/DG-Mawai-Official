import type { Metadata } from "next";
import PageHeader from "@/components/site/PageHeader";
import PerformanceList from "@/components/site/PerformanceList";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Live Shows & Tickets",
  description: "Upcoming DG Mawai live Rasiya shows, past performances and ticket requests.",
  alternates: { canonical: "/performance" },
  openGraph: { title: "Live Shows & Tickets | DG Mawai", description: "Upcoming DG Mawai live Rasiya shows, past performances and ticket requests.", url: "/performance" },
};

export default function PerformancePage() {
  return (
    <>
      <PageHeader srTitle="DG Mawai Live Shows & Tickets" />
      <PerformanceList />
    </>
  );
}
