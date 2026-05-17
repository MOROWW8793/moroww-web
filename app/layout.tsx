import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { OrganizationJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  metadataBase: new URL('https://www.moroww.com'),
  title: {
    default: 'moroww — premium vakantiewoningen in België',
    template: '%s | moroww',
  },
  description:
    'moroww is een gecureerd kwaliteitslabel voor premium vakantiewoningen aan de Belgische kust en in de Vlaamse Ardennen. Fysiek geïnspecteerd. Sensorisch ingericht. Zonder loterij.',
  keywords: [
    'vakantiewoning België',
    'premium vakantiewoning België',
    'luxe vakantiewoning België',
    'gecertificeerde vakantiewoning',
    'kwaliteitslabel vakantiewoning',
    'gecureerde vakantiewoningen',
    'vakantiewoning huren België',
    'vakantiewoning kust België',
    'vakantiewoning Knokke',
    'vakantiewoning Knokke-Heist',
    'vakantiewoning Oostende',
    'vakantiewoning Heist-aan-Zee',
    'luxe vakantiewoning kust',
    'vakantiewoning Meetjesland',
    'vakantiewoning Beernem',
    'vakantiewoning Ursel',
    'chalet huren Meetjesland',
    'vakantiewoning Vlaamse Ardennen',
    'vakantiewoning zonder Airbnb',
    'vakantiewoning direct boeken',
    'betrouwbare vakantiewoning België',
    'vakantiewoning gegarandeerde kwaliteit',
    'privé vakantiewoning België',
    'vakantiewoning verhuren België',
    'vakantiewoning beheer België',
    'vakantiewoning verhuren kust',
    'alternatief Airbnb verhuren',
    'vakantiewoning label België',
    'moroww',
    'moroww vakantiewoningen',
  ],
  authors: [{ name: 'moroww', url: 'https://www.moroww.com' }],
  creator: 'moroww',
  publisher: 'moroww',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'nl_BE',
    url: 'https://www.moroww.com',
    siteName: 'moroww',
    title: 'moroww — premium vakantiewoningen in België',
    description:
      'Een gecureerd kwaliteitslabel voor premium vakantiewoningen. Fysiek geïnspecteerd. Sensorisch ingericht.',
    images: [
      {
        url: '/images/og-default.jpg',
        width: 1200,
        height: 630,
        alt: 'moroww — premium vakantiewoningen',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'moroww — premium vakantiewoningen in België',
    description:
      'Een gecureerd kwaliteitslabel voor premium vakantiewoningen. Fysiek geïnspecteerd. Sensorisch ingericht.',
    images: ['/images/og-default.jpg'],
  },
  alternates: {
    canonical: 'https://www.moroww.com',
    languages: {
      'nl-BE': 'https://www.moroww.com',
    },
  },
  other: {
    'geo.region': 'BE-VWV',
    'geo.placename': 'België',
    'geo.position': '51.0500;3.7167',
    ICBM: '51.0500, 3.7167',
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
      {/* GTM wordt toegevoegd zodra het account aangemaakt is */}
      <body className="antialiased font-sans bg-moroww-blush text-moroww-black">
        <OrganizationJsonLd />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
