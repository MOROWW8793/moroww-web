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
              ? 'moroww kijkt, zodat jij het niet hoeft te doen.'
              : 'moroww looks, so you don\u2019t have to.'}
          </h1>
          <p className="mt-mw-5 text-body-lg text-moroww-dark max-w-[62ch]">
            {isNl
              ? 'moroww is het kwaliteitslabel voor vakantiewoningen in België: elke moroww-woning is geauditeerd, uitgerust en opgevolgd.'
              : 'moroww is the quality label for holiday homes in Belgium: every moroww home is audited, equipped and looked after.'}
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6 md:px-12">

        {/* ── WAAR HET BEGON ── tekst uit 'De moroww-belofte' (nov 2026). */}
        <TekstBlok eyebrow={isNl ? 'waar het begon' : 'where it started'}>
          {isNl ? (
            <>
              <p>
                Edinburgh. Een mooie woning, goede foto&apos;s, sterke reviews.
                De eerste nacht tilden we de matras op. Eronder zat schimmel.
              </p>
              <p>Niemand had gelogen. Er had gewoon niemand gekeken.</p>
              <p>
                Dat is de vakantiewoning vandaag. Een loterij. Soms win je.
                Soms til je de matras op.
              </p>
              <p>
                Aan de ene kant staan de grote spelers. Duizenden woningen, nul
                gezichten. Aan de andere kant de goedbedoelende lokale
                beheerder. Veel hart, geen systeem. Daartussen ontbreekt iets.
                Iemand die kijkt. Iemand die een standaard zet en er niet van
                afwijkt.
              </p>
              <p>
                moroww is dat iets. Een label. Wij kiezen huizen uit, wij
                leggen de lat, en wij blijven kijken. Ook na de eerste nacht.
                Ook als niemand het vraagt.
              </p>
            </>
          ) : (
            <>
              <p>
                Edinburgh. A beautiful flat, good photos, strong reviews. The
                first night we lifted the mattress. Underneath was mould.
              </p>
              <p>Nobody had lied. Nobody had looked.</p>
              <p>
                That is the holiday home today. A lottery. Sometimes you win.
                Sometimes you lift the mattress.
              </p>
              <p>
                On one side, the big players. Thousands of homes, no faces. On
                the other, the well-meaning local manager. Plenty of heart, no
                system. Something is missing in between. Someone who looks.
                Someone who sets a standard and does not stray from it.
              </p>
              <p>
                moroww is that something. A label. We choose the houses, we set
                the bar, and we keep looking. After the first night too. Even
                when nobody asks.
              </p>
            </>
          )}
        </TekstBlok>

        {/* ── VOOR DE GAST ── */}
        <TekstBlok eyebrow={isNl ? 'voor de gast' : 'for the guest'}>
          {isNl ? (
            <>
              <p>
                Een week voor je vertrekt, vragen we een paar dingen. Hoe laat
                je aankomt. Met wie je komt. Of je koffie drinkt of thee. Meer
                niet.
              </p>
              <p>
                Je opent de deur en het huis staat klaar. De juiste
                temperatuur. Het licht aan, als het al donker is. Op tafel
                brood van de bakker in het dorp en een fles wijn van de
                streek.
              </p>
              <p>
                En dan laten we je met rust. Alles is nagekeken voor je kwam,
                tot onder de matras. Je hoeft alleen aan te komen.
              </p>
            </>
          ) : (
            <>
              <p>
                A week before you leave, we ask a few things. What time you
                arrive. Who you are coming with. Coffee or tea. Nothing more.
              </p>
              <p>
                You open the door and the house is ready. The right
                temperature. The lights on, if it is already dark. On the
                table, bread from the village bakery and a bottle of local
                wine.
              </p>
              <p>
                And then we leave you be. Everything was checked before you
                came, right down to under the mattress. All you have to do is
                arrive.
              </p>
            </>
          )}
        </TekstBlok>

        {/* ── VOOR DE EIGENAAR ── */}
        <TekstBlok eyebrow={isNl ? 'voor de eigenaar' : 'for the owner'}>
          {isNl ? (
            <>
              <p>
                Jouw huis blijft van jou. Wij houden het aan een standaard,
                ook als je er niet bent.
              </p>
              <p className="text-audit uppercase">
                <Link
                  href="/eigenaar-worden"
                  className="text-moroww-dark underline underline-offset-4 decoration-moroww-label hover:decoration-moroww-dark transition-colors"
                >
                  je huis in de collectie →
                </Link>
              </p>
            </>
          ) : (
            <>
              <p>
                Your home stays yours. We hold it to a standard, even when you
                are not there.
              </p>
              <p className="text-audit uppercase">
                <Link
                  href="/eigenaar-worden"
                  className="text-moroww-dark underline underline-offset-4 decoration-moroww-label hover:decoration-moroww-dark transition-colors"
                >
                  your home in the collection →
                </Link>
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
