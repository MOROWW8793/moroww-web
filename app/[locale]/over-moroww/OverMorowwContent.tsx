import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Register } from "@/components/Register";
import { AuditLijn } from "@/components/AuditLijn";

// Sectie-inner wordt tweemaal gewrapped: mx-auto max-w-6xl centreert het
// gebied op zeer brede schermen, en register-column beperkt de tekstkolom
// tot 68ch. Vanaf 1440px centreert register-column zichzelf ook — zo
// blijft de rechterhelft niet leeg.

export async function OverMorowwContent({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'about' })

  return (
    <Register kant="eigenaar">
      {/* ── HERO — beeld blijft ── */}
      <section className="h-hero-calc relative -mt-16 w-full overflow-hidden">
        <Image
          src="/images/over-hero.jpg"
          alt="moroww — over ons"
          fill
          priority
          className="object-cover"
          sizes="100vw"
          style={{ objectPosition: "center center" }}
        />
        <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.45)" }} />
        <div className="absolute inset-0 flex items-center justify-center px-8">
          <h1
            className="text-white font-bold lowercase leading-[1.1] tracking-[-0.02em] text-center w-full"
            style={{ fontSize: "clamp(32px,5vw,80px)" }}
          >
            {t('hero_h1_bold')}
            <span className="hidden sm:inline-block sm:w-24" />
            <br className="sm:hidden" />
            <span className="font-light whitespace-nowrap">{t('hero_h1_light')}</span>
          </h1>
        </div>
      </section>

      {/* ── HET VERHAAL — Edinburgh + probleem-blok ── */}
      <section className="w-full py-mw-10 px-6 md:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="register-column">
            <AuditLijn density="quiet" items={['ons verhaal']} />

            <p
              className="mt-mw-4 font-bold text-moroww-dark leading-[1.15] tracking-[-0.02em] max-w-[16ch]"
              style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)' }}
            >
              {t('story_p1')}
            </p>

            <div className="mt-mw-6 space-y-mw-4 text-body-lg text-moroww-dark">
              <p>{t('story_p2')}</p>
              <p>{t('story_p3')}</p>
              <p>{t('story_p4')}</p>
            </div>

            <div className="mt-mw-10">
              <hr className="mb-mw-8 border-0 border-t border-moroww-rule" aria-hidden />
              <p className="text-body-lg text-moroww-dark">{t('story_p5')}</p>
              <h2 className="mt-mw-8 text-h2 text-moroww-dark">{t('story_p6')}</h2>
              <h2 className="mt-mw-6 text-h2 text-moroww-dark">{t('story_p7')}</h2>
              <h2 className="mt-mw-6 text-h2 text-moroww-dark">{t('story_p8')}</h2>
              <hr className="mt-mw-8 border-0 border-t border-moroww-rule" aria-hidden />
            </div>
          </div>
        </div>
      </section>

      {/* ── WAT WIJ ZIJN ── */}
      <section className="w-full py-mw-8 px-6 md:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="register-column">
            <AuditLijn density="quiet" items={['wat wij zijn']} />
            <h2
              className="mt-mw-4 font-bold text-moroww-dark leading-[1.15]"
              style={{ fontSize: 'clamp(1.9rem, 3.8vw, 3.5rem)' }}
            >
              {t('what_h2_1')} <span className="font-light">{t('what_h2_2')}</span> {t('what_h2_3')}
            </h2>
            <p className="mt-mw-5 text-body-lg text-moroww-dark">
              {t('what_body_before')}
              <Link
                href="/collectie"
                className="underline underline-offset-4 decoration-moroww-label hover:decoration-moroww-dark transition-colors"
              >
                {t('what_collection_link')}
              </Link>
              {t('what_body_after')}
            </p>
          </div>
        </div>
      </section>

      {/* ── WIE ER GAAT KIJKEN ── */}
      <section className="w-full py-mw-8 px-6 md:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="register-column">
            <AuditLijn density="quiet" items={['wie er gaat kijken']} />
            <h2 className="mt-mw-4 text-h2 text-moroww-dark">wie er gaat kijken</h2>
            <div className="mt-mw-5 space-y-mw-4 text-body-lg text-moroww-dark">
              <p>
                Elk huis in deze collectie is bezocht door Noam. Niet door een
                fotograaf, niet door een partner, niet op basis van een video.
              </p>
              <p>
                Hij bouwt moroww voltijds, onder marktloon. Wie nee zegt tegen
                een huis dat geld opbrengt, moet daar zelf iets bij verliezen.
                Anders is het geen standaard, dan is het een voorkeur.
              </p>
            </div>

            <div className="mt-mw-8 relative w-full aspect-[16/9] overflow-hidden">
              <Image
                src="/images/noam.jpg"
                alt="Noam Landries, oprichter van moroww"
                fill
                className="object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── PARTNERS ── */}
      <section className="w-full py-mw-8 px-6 md:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="register-column">
            <AuditLijn density="quiet" items={['met wie we werken']} />
            <h2 className="mt-mw-4 text-h2 text-moroww-dark">met wie we werken</h2>
            <p className="mt-mw-4 text-body text-moroww-dark">
              Een standaard bestaat niet zonder mensen die hem uitvoeren. Deze
              partners leveren wat wij niet zelf maken, en ze zijn geselecteerd
              op hetzelfde criterium als de woningen.
            </p>

            <p className="mt-mw-6 text-audit uppercase text-moroww-ink-2">
              Moro Essentials · badkamerproducten
              {' · '}Amelie Bauwens · fotografie
              {' · '}Opruimingen CB · schoonmaak
              {' · '}Nuki · slimme sloten
            </p>

            <p className="mt-mw-5">
              <Link
                href="/partners"
                className="text-audit uppercase text-moroww-dark underline underline-offset-4 decoration-moroww-label hover:decoration-moroww-dark transition-colors"
              >
                alle partners →
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* ── AFSLUITER ── */}
      <section className="w-full pt-mw-8 pb-mw-10 px-6 md:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="register-column">
            <hr className="mb-mw-6 border-0 border-t border-moroww-rule" aria-hidden />
            <AuditLijn density="quiet" items={['verder']} />
            <h3 className="mt-mw-4 text-h3 text-moroww-dark">hoe we keuren</h3>
            <p className="mt-mw-3 text-body text-moroww-dark">
              De vier poorten, het keuringsverslag en wat er gebeurt als een
              huis niet meer voldoet.
            </p>
            <p className="mt-mw-5">
              <Link
                href="/de-standaard"
                className="text-audit uppercase text-moroww-dark underline underline-offset-4 decoration-moroww-label hover:decoration-moroww-dark transition-colors"
              >
                lees de standaard →
              </Link>
            </p>
          </div>
        </div>
      </section>
    </Register>
  )
}
