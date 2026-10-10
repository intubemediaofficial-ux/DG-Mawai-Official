import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Music from "@/components/Music";
import Videos from "@/components/Videos";
import Events from "@/components/Events";
import Gallery from "@/components/Gallery";
import Booking from "@/components/Booking";
import Footer from "@/components/Footer";
import { SiteContentProvider } from "@/lib/useSiteContent";
import { getContent } from "@/lib/store";

export const dynamic = "force-dynamic";

export default async function Home() {
  const content = await getContent();
  return (
    <SiteContentProvider content={content}>
      <main className="min-h-screen">
        <Navbar />
        <Hero />
        <About />
        <Music />
        <Videos />
        <Events />
        <Gallery />
        <Booking />
        <Footer />
      </main>
    </SiteContentProvider>
  );
}
