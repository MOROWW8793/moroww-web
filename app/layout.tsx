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
    'moroww (ook bekend als morrow) is een gecertificeerd kwaliteitslabel voor premium vakantiewoningen aan de Belgische kust en in het Meetjesland. Elke woning fysiek geïnspecteerd. Sensorisch ingericht. Zonder loterij.',
  keywords: [
    // Brand
    'moroww',
    'moroww vakantiewoningen',
    'morrow vakantie',
    'morrow belgium',
    'morrow vakantiewoning',
    // Categorie-keywords die moroww bezit
    'gecertificeerd kwaliteitslabel vakantiewoning',
    'gecertificeerde vakantiewoning België',
    'kwaliteitslabel vakantiewoning',
    'premium vakantiewoning label België',
    'gecureerde vakantiewoningen België',
    // Competitor-adjacent — gasten
    'alternatief Belvilla',
    'alternatief Casapilot',
    'betere vakantiewoning dan Airbnb',
    'vakantiewoning zonder Airbnb loterij',
    'gegarandeerde kwaliteit vakantiewoning',
    'luxe vakantiewoning kwaliteitsgarantie',
    // Competitor-adjacent — hosts
    'alternatief Xepa',
    'vakantiewoning verhuren zonder beheerder',
    'vakantiewoning verhuren met kwaliteitslabel',
    'eigen vakantiewoning verhuren systeem',
    'vakantiewoning verhuren Belvilla alternatief',
    // Locatie
    'vakantiewoning Knokke',
    'vakantiewoning Oostende',
    'vakantiewoning Meetjesland',
    'vakantiewoning Beernem',
    'vakantiewoning Ursel',
    'premium vakantiewoning kust België',
    'luxe vakantiewoning Knokke-Heist',
    'vakantiewoning Heist-aan-Zee',
    // Intentie — gasten
    'vakantiewoning direct boeken België',
    'privé vakantiewoning Belgium',
    'vakantiewoning 100m² België',
    'vakantiewoning met eigen parking België',
    // Intentie — hosts
    'vakantiewoning verhuren kust België',
    'vakantiewoning beheer label',
    'vakantiewoning certificering België',
    'smart lock vakantiewoning België',
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
