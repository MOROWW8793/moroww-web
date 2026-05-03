import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import StructuredData from "@/components/StructuredData";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.moroww.com"),
  title: {
    default: "moroww — Gecureerde vakantiewoningen in België",
    template: "%s | moroww",
  },
  description:
    "moroww is een kwaliteitslabel voor premium vakantiewoningen in België. Elk pand fysiek geïnspecteerd. Hotelkwaliteit, privacycomfort. Kust, Ardennen en Meetjesland.",
  keywords: [
    "vakantiewoning België",
    "premium vakantieverblijf",
    "vakantiehuisje kust België",
    "vakantiewoning Ardennen",
    "luxe vakantiewoning",
    "vakantiewoning huren België",
    "kwaliteit vakantiewoning",
    "moroww",
  ],
  authors: [{ name: "moroww BV" }],
  creator: "moroww BV",
  publisher: "moroww BV",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    type: "website",
    locale: "nl_BE",
    url: "https://www.moroww.com",
    siteName: "moroww",
    title: "moroww — Gecureerde vakantiewoningen in België",
    description:
      "Geen gok. Een garantie. moroww selecteert vakantiewoningen die aan elk detail kloppen.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "moroww — premium vakantiewoningen België",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "moroww — Gecureerde vakantiewoningen in België",
    description:
      "Geen gok. Een garantie. moroww selecteert vakantiewoningen die aan elk detail kloppen.",
    images: ["/images/og-image.jpg"],
  },
  alternates: {
    canonical: "https://www.moroww.com",
    languages: {
      "nl-BE": "https://www.moroww.com",
    },
  },
  other: {
    "geo.region": "BE",
    "geo.country": "Belgium",
    language: "nl-BE",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="nl">
      <body className="antialiased font-sans bg-moroww-blush text-moroww-black">
        <StructuredData />
        <Navbar />
        <main className="pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
