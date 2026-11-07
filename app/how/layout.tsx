import type { Metadata } from 'next';
import { Header, Footer } from '@/components/merk/Shell';
import { MerkTeken } from '@/components/merk/Logo';
import { Analytics } from '@vercel/analytics/next';
import '@fontsource/fraunces/300.css';
import '@fontsource/fraunces/300-italic.css';
import '@fontsource/fraunces/400.css';
import '@fontsource/dm-sans/400.css';
import '@fontsource/dm-sans/500.css';
import '@fontsource/inter-tight/300.css';
import '@fontsource/inter-tight/400.css';
import '@fontsource/inter-tight/500.css';
import '@fontsource/inter-tight/600.css';
import '@/components/merk/merk.css';


export const metadata: Metadata = {
  title: { default: 'moroww how · consulting voor kortverhuur, op maat', template: '%s · moroww how' },
  description: 'moroww how is consulting voor kortverhuur, op maat van de vraag waar je tegenaan loopt: vergunning, opstart, een eigen boekingswebsite of je cijfers. Ook voor property managers.',
};

export default function HowLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl-BE">
      <body>
    <div className="merk merk-how">
      <Header
        donker
        home="/how"
        merk={<MerkTeken merk="how" op="donker" size={22} />}
        nav={[
          { href: '/how#werkwijze', label: 'werkwijze' },
          { href: '/how/website', label: 'website' },
          { href: '/how/property-managers', label: 'voor property managers' },
        ]}
        cta={{ href: '/how/contact', label: 'vertel je vraag' }}
      />
      <main>{children}</main>
      <Footer donker merk={<span>elke vraag is anders. de aanpak ook.</span>} />
    </div>
        <Analytics />
      </body>
    </html>
  );
}
