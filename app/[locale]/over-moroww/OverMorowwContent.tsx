import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Register } from "@/components/Register";
import { GridSectie } from "@/components/GridSectie";

// /over-moroww hero volgt nu dezelfde opbouw als /de-standaard: paper-
// achtergrond, kop in type-display, één alinea eronder. Het vroegere
// hero-beeld (over-hero.jpg) is naar de Edinburgh-sectie verhuisd.
//
// Sectie-labels boven de kop zijn weggehaald op secties waar het label
// de kop letterlijk of bijna letterlijk herhaalde: "wat wij zijn", "wie
// er gaat kijken", "met wie we werken". Behouden op secties waar het
// label iets toevoegt (ons verhaal, verder).

export async function OverMorowwContent({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'about' })

  return (
    <Register kant="eigenaar">
      {/* ── HERO — geen beeld, paper, kop in type-display ── */}
      <section className="w-full pt-28 pb-mw-6 px-6 md:px-12">
        <div className="mx-auto max-w-6xl">
          <h1
            className="font-bold text-moroww-dark leading-[1.05] tracking-[-0.02em] max-w-[16ch]"
            style={{ fontSize: 'clamp(2.25rem, 6vw, 5rem)' }}
          >
            er staat niemand tussen.
          </h1>
          <p className="mt-mw-5 text-body-lg text-moroww-dark max-w-[62ch]">
            In elke sector waar kwaliteit telt, bestaat een keurmerk. In
            vakantieverhuur niet. Dat is wat we bouwen.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6 md:px-12">

        {/* Ons verhaal — behoudt het label; "story_p1" is een narratieve
            openingsregel over Edinburgh, niet dezelfde tekst als het label. */}
        <GridSectie titel="ons verhaal" geenHairline>
          <p
            className="font-bold text-moroww-dark leading-[1.15] tracking-[-0.02em] max-w-[16ch]"
            style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)' }}
          >
            {t('story_p1')}
          </p>
          <div className="mt-mw-6 space-y-mw-4 text-body-lg text-moroww-dark">
            <p>{t('story_p2')}</p>
            <p>{t('story_p3')}</p>
            <p>{t('story_p4')}</p>
          </div>

          {/* Vroegere hero-beeld verhuist hier — na de Edinburgh-opening
              en voor het probleem-blok. */}
          <div className="mt-mw-8 relative w-full aspect-[3/2] overflow-hidden">
            <Image
              src="/images/over-hero.jpg"
              alt="Edinburgh, waar moroww begon"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
          </div>

          <div className="mt-mw-10">
            <hr className="mb-mw-8 border-0 border-t border-moroww-rule" aria-hidden />
            <p className="text-body-lg text-moroww-dark">{t('story_p5')}</p>
            <h2 className="mt-mw-8 text-h2 text-moroww-dark">{t('story_p6')}</h2>
            <h2 className="mt-mw-6 text-h2 text-moroww-dark">{t('story_p7')}</h2>
            <h2 className="mt-mw-6 text-h2 text-moroww-dark">{t('story_p8')}</h2>
            <hr className="mt-mw-8 border-0 border-t border-moroww-rule" aria-hidden />
          </div>
        </GridSectie>

        {/* Label weggehaald — de h2 zelf ("geen beheerder. geen platform.
            een label.") beantwoordt "wat wij zijn" en heeft het eyebrow
            niet nodig. */}
        <GridSectie>
          <h2
            className="font-bold text-moroww-dark leading-[1.15]"
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
        </GridSectie>

        {/* Label weg — h2 zegt hetzelfde. */}
        <GridSectie>
          <h2 className="text-h2 text-moroww-dark">wie er gaat kijken</h2>
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
          <div className="mt-mw-8 relative w-full aspect-[3/2] overflow-hidden">
            <Image
              src="/images/noam.jpg"
              alt="Noam Landries, oprichter van moroww"
              fill
              className="object-cover object-top"
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
          </div>
        </GridSectie>

        {/* Label weg — h2 zegt hetzelfde. Partners nu op eigen regel met
            rol eronder in text-audit ink-2. */}
        <GridSectie>
          <h2 className="text-h2 text-moroww-dark">met wie we werken</h2>
          <p className="mt-mw-4 text-body text-moroww-dark">
            Een standaard bestaat niet zonder mensen die hem uitvoeren. Deze
            partners leveren wat wij niet zelf maken, en ze zijn geselecteerd
            op hetzelfde criterium als de woningen.
          </p>

          <dl className="mt-mw-6 space-y-mw-5">
            <div>
              <dt className="text-moroww-dark font-semibold">Moro Essentials</dt>
              <dd className="mt-1 text-audit uppercase text-moroww-ink-2">badkamerproducten</dd>
            </div>
            <div>
              <dt className="text-moroww-dark font-semibold">Amelie Bauwens</dt>
              <dd className="mt-1 text-audit uppercase text-moroww-ink-2">fotografie</dd>
            </div>
            <div>
              <dt className="text-moroww-dark font-semibold">Opruimingen CB</dt>
              <dd className="mt-1 text-audit uppercase text-moroww-ink-2">schoonmaak en ontruiming</dd>
            </div>
            <div>
              <dt className="text-moroww-dark font-semibold">Nuki</dt>
              <dd className="mt-1 text-audit uppercase text-moroww-ink-2">slimme sloten</dd>
            </div>
          </dl>

          <p className="mt-mw-6">
            <Link
              href="/partners"
              className="text-audit uppercase text-moroww-dark underline underline-offset-4 decoration-moroww-label hover:decoration-moroww-dark transition-colors"
            >
              alle partners →
            </Link>
          </p>
        </GridSectie>

        {/* Label "verder" behouden — h3 "hoe we keuren" is een ander
            signaal dan "verder". */}
        <GridSectie titel="verder">
          <h3 className="text-h3 text-moroww-dark">hoe we keuren</h3>
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
        </GridSectie>
      </div>
    </Register>
  )
}
