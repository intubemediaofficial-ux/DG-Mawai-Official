import TopNav from "@/components/site/TopNav";
import BottomBar from "@/components/site/BottomBar";
import { SiteContentProvider } from "@/lib/useSiteContent";
import { getContent } from "@/lib/store";

export const dynamic = "force-dynamic";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const content = await getContent();
  return (
    <SiteContentProvider content={content}>
      <TopNav />
      <main className="min-h-screen bg-black">{children}</main>
      <BottomBar />
    </SiteContentProvider>
  );
}
