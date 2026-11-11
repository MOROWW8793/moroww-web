import type { Metadata } from 'next';
import { Header } from '@/components/merk/Shell';
import { NlFooter } from '@/components/layout/NlFooter';
import { MerkTeken } from '@/components/merk/Logo';
import { Analytics } from '@vercel/analytics/next';
import { MotionIn } from '@/components/MotionIn';
import { SmoothScroll } from '@/components/SmoothScroll';
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
import '@/components/merk/zwitsers.css';


export const metadata: Metadata = {
  title: { default: 'moroww advisory · elke vraag, een plan', template: '%s · moroww advisory' },
  description: 'moroww advisory helpt wie een vakantiewoning wil verhuren of ergens op vastloopt: een vergunning, de opstart, je prijzen, foto\'s of teksten. Per vraag een plan, zwart op wit.',
};

export default function AdvisoryLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl-BE">
      <body>
        {/* mw-js zet een flag vóór render zodat data-mw-reveal zijn hidden
            state kan aannemen zonder flash. */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('mw-js')",
          }}
        />
        <div className="merk merk-advisory">
          <div className="z z-advisory">
          <Header
            home="/advisory"
            merk={<MerkTeken merk="advisory" op="licht" size={24} />}
            nav={[
              { href: '/advisory#werkwijze', label: 'werkwijze' },
              { href: '/advisory/website', label: 'website' },
            ]}
            cta={{ href: '/advisory/contact', label: 'vertel je vraag' }}
          />
          <main>{children}</main>
          </div>
        </div>
        <NlFooter />
        <SmoothScroll />
        <MotionIn />
        <Analytics />
      </body>
    </html>
  );
}
