import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "./globals.css";

const urbanist = Urbanist({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600"],
  variable: "--font-urbanist",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.SITE_URL || "https://dgmawai.162.35.107.192.sslip.io"),
  title: "DG Mawai | Official Website",
  description:
    "Official website of DG Mawai — Rajasthani Rasiya singer. Music, live performances, tickets and show bookings.",
  keywords: ["DG Mawai", "Rasiya", "Rajasthani Singer", "Gurjar Rasiya", "Book Show", "Live Events"],
  openGraph: {
    title: "DG Mawai | Official Website",
    description: "Rajasthani Rasiya singer — music, live shows and bookings.",
    type: "website",
    images: ["/images/dg-mawai/photo-02.jpg"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={urbanist.variable}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
