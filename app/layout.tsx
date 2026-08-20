import type { Metadata, Viewport } from "next";
import "./globals.css";

// Root-metadata: alleen platform-brede defaults. og/twitter/canonical/keywords
// worden bewust NIET hier gezet — die zijn per-pagina uniek en Next.js vervangt
// deze objecten wholesale bij een child-override, dus een generieke openGraph
// hier zou stille misleiding zijn op elke pagina die er een deelt.
//
// - `keywords`: weggehaald. Google negeert de tag sinds 2009 en de lijst met
//   concurrenten-alternatieven was zichtbaar in de broncode.
// - `openGraph`/`twitter`: verhuizen naar per-pagina via lib/seo/siteMetadata.ts
//   en lib/kennis/meta.ts.
// - `alternates`: idem, per-pagina.
// - `other` (geo/ICBM): weggehaald. Geen ranking-signaal en op kennispagina's
//   die over Oostende of Knokke gaan wees dit blok naar coördinaten in Gent.
export const metadata: Metadata = {
  metadataBase: new URL('https://www.moroww.com'),
  title: {
    default: 'moroww — premium vakantiewoningen in België',
    template: '%s | moroww',
  },
  description:
    'moroww (ook bekend als morrow) is een gecertificeerd kwaliteitslabel voor premium vakantiewoningen in België. Elke woning fysiek geïnspecteerd. Sensorisch ingericht. Zonder loterij.',
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
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#FAE4D6",
};

// De <html> en <body> zitten in app/[locale]/layout.tsx zodat het lang-attribuut
// dynamisch per locale kan (nl-BE voor NL, en voor EN). Root-layout blijft nodig
// voor de globale metadata en css-import.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children as React.ReactElement;
}
