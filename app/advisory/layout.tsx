import type { Metadata } from 'next';
import { Header, Footer } from '@/components/merk/Shell';
import { MerkTeken } from '@/components/merk/Logo';
import { Analytics } from '@vercel/analytics/next';
import '@fontsource/fraunces/300.css';
import '@fontsource/fraunces/300-italic.css';
import '@fontsource/fraunces/400.css';
import '@fontsource/dm-sans/400.css';
import '@fontsource/dm-sans/500.css';
import '@fontsource/cormorant-garamond/500.css';
import '@fontsource/cormorant-garamond/500-italic.css';
import '@fontsource/inter-tight/300.css';
import '@fontsource/inter-tight/400.css';
import '@fontsource/inter-tight/500.css';
import '@fontsource/inter-tight/600.css';
import '@/components/merk/merk.css';


export const metadata: Metadata = {
  title: { default: 'moroww advisory · every question, a plan', template: '%s · moroww advisory' },
  description: 'moroww advisory is advies op maat voor eigenaars en property managers: consulting voor kortverhuur, op maat van de vraag waar je tegenaan loopt: vergunning, opstart, een eigen boekingswebsite of je cijfers. Ook voor property managers.',
};

export default function AdvisoryLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl-BE">
      <body>
    <div className="merk merk-advisory">
      <Header
        donker
        home="/advisory"
        merk={<MerkTeken merk="advisory" op="donker" size={24} />}
        nav={[
          { href: '/advisory#werkwijze', label: 'werkwijze' },
          { href: '/advisory/website', label: 'website' },
          { href: '/advisory/property-managers', label: 'voor property managers' },
        ]}
        cta={{ href: '/advisory/contact', label: 'vertel je vraag' }}
      />
      <main>{children}</main>
      <Footer donker merk={<span>every question, a plan.</span>} />
    </div>
        <Analytics />
      </body>
    </html>
  );
}
