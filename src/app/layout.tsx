import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin", "devanagari"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "DG Mawai | Official Website - Rajasthani Rasiya Singer",
  description:
    "Official website of DG Mawai - Rajasthani Rasiya Singer. Book shows, listen to trending songs, upcoming events, and more.",
  keywords: [
    "DG Mawai",
    "Rasiya",
    "Rajasthani Singer",
    "Gurjar Rasiya",
    "Book Show",
    "Live Events",
  ],
  openGraph: {
    title: "DG Mawai | Official Website",
    description:
      "Official website of DG Mawai - Rajasthani Rasiya Singer",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hi" className="scroll-smooth">
      <body className={`${poppins.className} antialiased`}>{children}</body>
    </html>
  );
}
