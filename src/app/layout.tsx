import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "./globals.css";
import { SITE_URL } from "@/lib/site";

const urbanist = Urbanist({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600"],
  variable: "--font-urbanist",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "DG Mawai | Official Website – Rajasthani Rasiya Singer", template: "%s | DG Mawai" },
  description:
    "Official website of DG Mawai, Rajasthani Gurjar Rasiya singer. Listen to viral songs like Chhori Teri Chal Morni Ki Dhal, see upcoming live shows, get tickets and book DG Mawai for your event.",
  applicationName: "DG Mawai",
  keywords: [
    "DG Mawai", "DG Mawai official", "DG Mawai songs", "DG Mawai new song", "DG Mawai rasiya",
    "Rasiya singer", "Gurjar Rasiya", "Rajasthani singer", "Rajasthani folk songs", "book DG Mawai show",
    "डीजी मवई", "डीजी मवई रसिया", "गुर्जर रसिया",
  ],
  authors: [{ name: "DG Mawai" }],
  alternates: { canonical: "/" },
  openGraph: {
    title: "DG Mawai | Official Website",
    description: "Rajasthani Rasiya singer — music, live shows and bookings.",
    url: "/",
    siteName: "DG Mawai",
    locale: "en_IN",
    type: "website",
    images: [{ url: "/images/dg-mawai/photo-02.jpg", alt: "DG Mawai" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "DG Mawai | Official Website",
    description: "Rajasthani Rasiya singer — music, live shows and bookings.",
    images: ["/images/dg-mawai/photo-02.jpg"],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION || undefined,
    other: process.env.BING_SITE_VERIFICATION ? { "msvalidate.01": process.env.BING_SITE_VERIFICATION } : undefined,
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={urbanist.variable}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
