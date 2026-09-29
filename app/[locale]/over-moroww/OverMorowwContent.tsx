import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { Register } from "@/components/Register";
import { TekstBlok } from "@/components/sections/TekstBlok";

// WP M-versie. Kort en duidelijk: hero (label-zin + lead), verhaal
// (Edinburgh + wat we bouwen), team (kort blok met foto), en drie
// verder-links. Weggehaald: de drie keurmerk-koppen, het "geen beheerder"-
// blok, de partnerlijst en de foto met onderschrift "Edinburgh, waar
// moroww begon" (toonde geen Edinburgh).

export function OverMorowwContent({ locale }: { locale: string }) {
  const isNl = locale === 'nl'

  return (
    <Register kant="eigenaar">
      {/* ── HERO — label + lead ── */}
      <section className="w-full pt-28 pb-mw-6 px-6 md:px-12">
        <div className="mx-auto max-w-6xl">
          <h1
            className="font-bold text-moroww-dark leading-[1.05] tracking-[-0.02em] max-w-[22ch]"
            style={{ fontSize: 'clamp(2.25rem, 6vw, 5rem)' }}
          >
            {isNl
              ? 'moroww is het kwaliteitslabel voor vakantiewoningen in België.'
              : 'moroww is the quality label for holiday homes in Belgium.'}
          </h1>
          <p className="mt-mw-5 text-body-lg text-moroww-dark max-w-[62ch]">
            {isNl
              ? 'Elke moroww-woning is geauditeerd, uitgerust en opgevolgd.'
              : 'Every moroww home is audited, equipped and looked after.'}
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6 md:px-12">

        {/* ── ONS VERHAAL ── */}
        <TekstBlok eyebrow={isNl ? 'ons verhaal' : 'our story'}>
          {isNl ? (
            <>
              <p>
                moroww begon in een appartement in Edinburgh. Op de foto&apos;s:
                uitzicht op het kasteel. In werkelijkheid: schimmel. Onze klacht
                bij het platform werd afgewezen. Het staat nog altijd online,
                met goede beoordelingen.
              </p>
              <p>
                Restaurants hebben een keurmerk. Hotels ook. Zelfs eieren.
                Vakantiewoningen niet. Dat is wat we bouwen.
              </p>
            </>
          ) : (
            <>
              <p>
                moroww began in an apartment in Edinburgh. In the photos: a
                view of the castle. In reality: mould. Our complaint to the
                platform was dismissed. The listing is still online, with good
                reviews.
              </p>
              <p>
                Restaurants have a quality label. Hotels do too. Even eggs.
                Holiday homes don&apos;t. That is what we are building.
              </p>
            </>
          )}
        </TekstBlok>

        {/* ── HET TEAM ── */}
        <TekstBlok eyebrow={isNl ? 'het team' : 'the team'}>
          {isNl ? (
            <p>
              Een klein team. Wij bezoeken elke woning zelf voor ze in de
              collectie komt, installeren wat het verblijf draagt en volgen
              elk huis op. Wie een vraag heeft, gast of eigenaar, spreekt met
              ons.
            </p>
          ) : (
            <p>
              A small team. We visit every home ourselves before it enters
              the collection, install what carries the stay and follow every
              house afterwards. Whoever has a question — guest or owner —
              speaks with us.
            </p>
          )}
          <div className="mt-mw-6 relative w-full aspect-[3/2] overflow-hidden">
            <Image
              src="/images/noam.jpg"
              alt={isNl
                ? 'Noam Landries, oprichter van moroww'
                : 'Noam Landries, founder of moroww'}
              fill
              className="object-cover object-top"
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
          </div>
        </TekstBlok>

        {/* ── VERDER ── drie links */}
        <TekstBlok eyebrow={isNl ? 'verder' : 'more'}>
          <ul className="space-y-mw-3 text-audit uppercase">
            <li>
              <Link
                href="/de-standaard"
                className="text-moroww-dark underline underline-offset-4 decoration-moroww-label hover:decoration-moroww-dark transition-colors"
              >
                {isNl ? 'hoe we keuren →' : 'how we inspect →'}
              </Link>
            </li>
            <li>
              <Link
                href="/collectie"
                className="text-moroww-dark underline underline-offset-4 decoration-moroww-label hover:decoration-moroww-dark transition-colors"
              >
                {isNl ? 'de collectie →' : 'the collection →'}
              </Link>
            </li>
            <li>
              <Link
                href="/partners"
                className="text-moroww-dark underline underline-offset-4 decoration-moroww-label hover:decoration-moroww-dark transition-colors"
              >
                {isNl ? 'met wie we werken →' : 'who we work with →'}
              </Link>
            </li>
          </ul>
        </TekstBlok>
      </div>
    </Register>
  )
}
