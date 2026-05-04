import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.moroww.com"),
  title: {
    default: "moroww — Gecureerde vakantiewoningen in België",
    template: "%s | moroww",
  },
  description:
    "moroww is een kwaliteitslabel voor premium vakantiewoningen in België. Gecureerde woningen aan de kust en in het Meetjesland. Geen platform — een standaard.",
  keywords: [
    "vakantiewoningen België",
    "vakantiewoning kust",
    "vakantiewoning Meetjesland",
    "premium vakantieverblijf",
    "holiday home Belgium",
    "vakantie Knokke",
    "vakantie Oostende",
    "vakantie Ursel",
  ],
  authors: [{ name: "moroww", url: "https://www.moroww.com" }],
  creator: "moroww",
  publisher: "moroww",
  openGraph: {
    type: "website",
    locale: "nl_BE",
    url: "https://www.moroww.com",
    siteName: "moroww",
    title: "moroww — Gecureerde vakantiewoningen in België",
    description:
      "Een kwaliteitslabel voor premium vakantiewoningen. Gecureerde woningen aan de kust en in het Meetjesland.",
    images: [
      {
        url: "/images/woningen/knokke/2026-AmelieBauwens-Moroww-V2-132.jpg",
        width: 1200,
        height: 630,
        alt: "moroww — Premium vakantiewoningen in België",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "moroww — Gecureerde vakantiewoningen in België",
    description: "Een kwaliteitslabel voor premium vakantiewoningen in België.",
    images: ["/images/woningen/knokke/2026-AmelieBauwens-Moroww-V2-132.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://www.moroww.com",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl">
      <body className="antialiased font-sans bg-moroww-blush text-moroww-black">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LodgingBusiness",
              name: "moroww",
              description:
                "Een kwaliteitslabel voor premium vakantiewoningen in België.",
              url: "https://www.moroww.com",
              logo: "https://www.moroww.com/images/logo.png",
              email: "info@moroww.com",
              areaServed: "Belgium",
              address: {
                "@type": "PostalAddress",
                addressCountry: "BE",
              },
              sameAs: [
                "https://www.instagram.com/moroww.com_/",
                "https://www.linkedin.com/company/moroww/",
              ],
            }),
          }}
        />
        <Navbar />
        <main className="pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
