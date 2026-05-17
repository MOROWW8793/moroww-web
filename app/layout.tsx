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
    'premium vakantiewoning',
    'vakantiewoning kust België',
    'vakantiewoning Knokke',
    'vakantiewoning Oostende',
    'vakantiewoning Meetjesland',
    'vakantiewoning Beernem',
    'luxe vakantiewoning België',
    'vakantiewoning huren België',
    'moroww',
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
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-XXXXXXX');`,
          }}
        />
      </head>
      <body className="antialiased font-sans bg-moroww-blush text-moroww-black">
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <OrganizationJsonLd />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
