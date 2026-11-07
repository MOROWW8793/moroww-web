import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { Register } from "@/components/Register";

// Over moroww, herschreven nov 2026 (2): waarom moroww bestaat (de juiste mensen
// samen, eenvoud voor eigenaars en gasten), de drie takken en wie erachter staat. Beeldtaal
// van de homepage. Staat er een /images/brent.jpg, dan tonen de oprichters
// als twee portretten; anders een breed beeld met beide namen eronder.

const COPY = {
  nl: {
    eyebrow: 'over moroww',
    h1: 'een goed verblijf maak je niet alleen.',
    lead: 'moroww brengt eigenaars, gasten en de vakmensen achter een goed verblijf samen rond één standaard. Het label voor het huis, hulp op maat voor eigenaars, en partners die we zelf kiezen.',
    heroAlt: 'Leefruimte van een moroww-woning, iemand schuift het gordijn open',
    begonEyebrow: 'waarom we begonnen',
    begonH2: 'veel goede mensen. weinig samenhang.',
    begonP: [
      'Een goed verblijf hangt af van veel mensen. Wie poetst, wie het linnen brengt, wie de regels kent, wie de prijzen zet, wie het slot installeert, wie de gast verwelkomt. Ze bestaan allemaal, maar ze werken zelden samen.',
      'Voor een eigenaar wordt het een puzzel met tien stukken en tien telefoonnummers. Voor een gast blijft het een gok: de foto’s zeggen weinig over wat er achter de deur gebeurt.',
      'Daarom hebben we moroww opgericht. Om die mensen samen te brengen, rond één standaard en met één aanspreekpunt. Zodat het eenvoudig wordt, voor wie verhuurt en voor wie verblijft.',
    ],
    labelEyebrow: 'hoe we het doen',
    labelH2: 'één naam. drie takken.',
    labelP: [
      'moroww is het label voor het huis. We bezoeken elk huis persoonlijk, zetten het in de collectie en doen dat elk jaar opnieuw. Zo weet een gast vooraf wat hij krijgt.',
      'moroww how helpt eigenaars bij wat ze tegenkomen: een vergunning, een opstart, een eigen boekingssite. Op maat, want geen vraag is dezelfde.',
      'moroww hub brengt de partners samen die het mogelijk maken: merken, vakmensen en tools die we eerst in onze eigen huizen gebruiken.',
    ],
    takkenLink: 'de drie takken voor eigenaars →',
    teamEyebrow: 'wie wij zijn',
    teamH2: 'twee oprichters, één standaard.',
    team: [
      { naam: 'Noam', rol: 'oprichter · visie, strategie en eigenaars', tekst: 'Bouwt het label en brengt eigenaars en partners samen. Wie een huis kandidaat stelt, spreekt eerst met hem.' },
      { naam: 'Brent', rol: 'oprichter · kwaliteit en werking', tekst: 'Bewaakt de standaard in de praktijk: hoe we huizen bezoeken, hoe huizen opgevolgd worden, en dat het elke keer klopt.' },
    ],
    teamSlot: 'Eenvoud begint bij wie je aan de lijn krijgt. Gast of eigenaar: je spreekt met ons, niet met een callcenter.',
    noamAlt: 'Noam aan tafel in een moroww-woning',
    brentAlt: 'Brent, oprichter van moroww',
    steunEyebrow: 'supported by',
    steunH2: 'geselecteerd voor Start it @KBC.',
    steunP: 'In oktober werd moroww geselecteerd voor Start it @KBC, het acceleratorprogramma van KBC voor jonge ondernemingen. De coaching daar scherpte het label tot wat het vandaag is.',
    partnersLink: 'met wie we werken →',
    links: [
      { href: '/de-standaard', tekst: 'de standaard →' },
      { href: '/collectie', tekst: 'de collectie →' },
      { href: '/voor-eigenaars', tekst: 'voor eigenaars →' },
    ],
  },
  en: {
    eyebrow: 'about moroww',
    h1: 'a good stay is never made alone.',
    lead: 'moroww brings owners, guests and the people behind a good stay together around one standard. The label for the home, tailored help for owners, and partners we choose ourselves.',
    heroAlt: 'Living space of a moroww home, someone drawing back the curtain',
    begonEyebrow: 'why we started',
    begonH2: 'many good people. little coherence.',
    begonP: [
      'A good stay depends on many people. Who cleans, who brings the linen, who knows the rules, who sets the prices, who installs the lock, who welcomes the guest. They all exist, but they rarely work together.',
      'For an owner it becomes a puzzle with ten pieces and ten phone numbers. For a guest it stays a gamble: the photos say little about what happens behind the door.',
      'That is why we founded moroww. To bring those people together, around one standard and with one point of contact. So it becomes simple, for those who rent out and those who stay.',
    ],
    labelEyebrow: 'how we do it',
    labelH2: 'one name. three branches.',
    labelP: [
      'moroww is the label for the home. We visit every home in person, add it to the collection and do it again every year. So a guest knows what they get, before they go.',
      'moroww how helps owners with whatever they run into: a permit, a start-up, their own booking site. Tailored, because no question is the same.',
      'moroww hub brings together the partners who make it possible: brands, craftspeople and tools we first use in our own homes.',
    ],
    takkenLink: 'the three branches for owners →',
    teamEyebrow: 'who we are',
    teamH2: 'two founders, one standard.',
    team: [
      { naam: 'Noam', rol: 'founder · vision, strategy and owners', tekst: 'Builds the label and brings owners and partners together. Whoever puts a home forward speaks with him first.' },
      { naam: 'Brent', rol: 'founder · quality and operations', tekst: 'Guards the standard in practice: how we visit homes, how homes are followed up, and that it is right every time.' },
    ],
    teamSlot: 'Simplicity starts with who picks up the phone. Guest or owner: you speak with us, not with a call centre.',
    noamAlt: 'Noam at the table in a moroww home',
    brentAlt: 'Brent, founder of moroww',
    steunEyebrow: 'supported by',
    steunH2: 'selected for Start it @KBC.',
    steunP: 'In October moroww was selected for Start it @KBC, the KBC accelerator for young companies. The coaching there sharpened the label into what it is today.',
    partnersLink: 'who we work with →',
    links: [
      { href: '/de-standaard', tekst: 'the standard →' },
      { href: '/collectie', tekst: 'the collection →' },
      { href: '/voor-eigenaars', tekst: 'for owners →' },
    ],
  },
} as const

const LINK = 'text-[0.9375rem] text-moroww-dark underline underline-offset-[6px] decoration-moroww-dark/30 hover:decoration-moroww-dark transition-colors'
const STARTIT_URL = 'https://www.kbc.be/ondernemen/nl/artikel/zelfstandige-worden/eigen-zaak-starten/wat-is-kbc-start-it.html'

export function OverMorowwContent({ locale, brentFoto }: { locale: string; brentFoto: boolean }) {
  const c = locale === 'nl' ? COPY.nl : COPY.en

  return (
    <Register kant="eigenaar">
      {/* ── HERO ── */}
      <section className="w-full px-6 md:px-12 pt-mw-8 lg:pt-mw-10 overflow-visible">
        <div className="mx-auto max-w-7xl">
          <p className="mw-in text-[0.9375rem] text-moroww-ink-2">{c.eyebrow}</p>
          <h1 className="mw-in mt-mw-4 text-display font-light text-moroww-dark max-w-[16ch]">{c.h1}</h1>
          <p className="mw-in-2 mt-mw-6 text-body-lg text-moroww-dark max-w-[56ch]">{c.lead}</p>
        </div>
      </section>

      <section className="w-full px-6 md:px-12 mt-mw-8">
        <div className="mx-auto max-w-7xl relative aspect-[4/5] sm:aspect-[16/9] lg:max-h-[78vh] w-full overflow-hidden">
          <Image src="/images/over-hero.jpg" alt={c.heroAlt} fill priority className="object-cover" sizes="(max-width: 1280px) 100vw, 1280px" />
        </div>
      </section>

      {/* ── WAAR HET BEGON ── */}
      <section className="w-full px-6 md:px-12 mt-mw-8 lg:mt-mw-12">
        <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-mw-6">
          <div className="lg:col-span-5">
            <p className="text-[0.9375rem] text-moroww-ink-2">{c.begonEyebrow}</p>
            <h2 className="mt-mw-4 text-h2 font-light text-moroww-dark">{c.begonH2}</h2>
          </div>
          <div className="lg:col-span-6 lg:col-start-7 space-y-mw-3 text-body-lg text-moroww-dark max-w-[52ch]">
            {c.begonP.map((p) => <p key={p}>{p}</p>)}
          </div>
        </div>
      </section>

      {/* ── WAAROM EEN LABEL ── */}
      <section className="w-full px-6 md:px-12 mt-mw-8 lg:mt-mw-12">
        <div className="mx-auto max-w-7xl border-t border-moroww-dark/20 pt-mw-6 grid grid-cols-1 lg:grid-cols-12 gap-mw-6">
          <div className="lg:col-span-5">
            <p className="text-[0.9375rem] text-moroww-ink-2">{c.labelEyebrow}</p>
            <h2 className="mt-mw-4 text-h2 font-light text-moroww-dark">{c.labelH2}</h2>
          </div>
          <div className="lg:col-span-6 lg:col-start-7 space-y-mw-3 text-body-lg text-moroww-dark max-w-[52ch]">
            {c.labelP.map((p) => <p key={p}>{p}</p>)}
            <p className="pt-mw-2"><Link href="/voor-eigenaars" className={LINK}>{c.takkenLink}</Link></p>
          </div>
        </div>
      </section>

      {/* ── WIE WIJ ZIJN ── */}
      <section className="w-full px-6 md:px-12 mt-mw-8 lg:mt-mw-12">
        <div className="mx-auto max-w-7xl">
          <p className="text-[0.9375rem] text-moroww-ink-2">{c.teamEyebrow}</p>
          <h2 className="mt-mw-4 text-h2 font-light text-moroww-dark">{c.teamH2}</h2>
          {brentFoto ? (
            <div className="mt-mw-6 grid grid-cols-1 md:grid-cols-2 gap-mw-6">
              {c.team.map((p, i) => (
                <div key={p.naam}>
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <Image
                      src={i === 0 ? '/images/noam-portret.jpg' : '/images/brent.jpg'}
                      alt={i === 0 ? c.noamAlt : c.brentAlt}
                      fill
                      className={`object-cover ${i === 0 ? 'object-[52%_center]' : 'object-[42%_center]'}`}
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  <h3 className="mt-mw-4 text-h2 font-light text-moroww-dark">{p.naam}</h3>
                  <p className="mt-mw-2 text-[0.9375rem] text-moroww-ink-2">{p.rol}</p>
                  <p className="mt-mw-3 text-body text-moroww-ink-2 max-w-[44ch]">{p.tekst}</p>
                </div>
              ))}
            </div>
          ) : (
            <>
              <div className="mt-mw-6 relative aspect-[4/5] sm:aspect-[3/2] w-full overflow-hidden">
                <Image src="/images/noam.jpg" alt={c.noamAlt} fill className="object-cover" sizes="(max-width: 1280px) 100vw, 1280px" />
              </div>
              <div className="mt-mw-6 grid grid-cols-1 md:grid-cols-2 gap-mw-6">
                {c.team.map((p) => (
                  <div key={p.naam} className="border-t border-moroww-dark/20 pt-mw-4">
                    <h3 className="text-h2 font-light text-moroww-dark">{p.naam}</h3>
                    <p className="mt-mw-2 text-[0.9375rem] text-moroww-ink-2">{p.rol}</p>
                    <p className="mt-mw-3 text-body text-moroww-ink-2 max-w-[44ch]">{p.tekst}</p>
                  </div>
                ))}
              </div>
            </>
          )}
          <p className="mt-mw-6 text-body-lg text-moroww-dark">{c.teamSlot}</p>
          <p className="mt-mw-3"><a href="mailto:info@moroww.com" className={LINK}>info@moroww.com</a></p>
        </div>
      </section>

      {/* ── SUPPORTED BY ── donkere band */}
      <section className="w-full bg-moroww-dark text-white px-6 md:px-12 py-mw-8 lg:py-mw-10 mt-mw-8 lg:mt-mw-12">
        <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-mw-6 items-end">
          <div className="lg:col-span-7">
            <p className="text-[0.9375rem] text-white/60">{c.steunEyebrow}</p>
            <a href={STARTIT_URL} target="_blank" rel="noopener noreferrer" aria-label="Start it @KBC" className="mt-mw-4 inline-block">
              <Image src="/images/partners/start-it-kbc.png" alt="Start it @KBC" width={550} height={213} className="h-16 md:h-20 w-auto" />
            </a>
            <h2 className="mt-mw-5 text-h2 font-light text-white">{c.steunH2}</h2>
          </div>
          <div className="lg:col-span-5 space-y-mw-4">
            <p className="text-body-lg text-white/90">{c.steunP}</p>
            <Link href="/partners" className="text-[0.9375rem] text-white underline underline-offset-[6px] decoration-white/30 hover:decoration-white transition-colors">{c.partnersLink}</Link>
          </div>
        </div>
      </section>

      {/* ── VERDER ── */}
      <section className="w-full px-6 md:px-12 mt-mw-8 lg:mt-mw-12 mb-mw-8 lg:mb-mw-12">
        <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-mw-6">
          {c.links.map((l) => (
            <Link key={l.href} href={l.href as '/de-standaard' | '/collectie' | '/voor-eigenaars'} className="group border-t border-moroww-dark/20 pt-mw-4 text-h2 font-light text-moroww-dark hover:text-moroww-ink-2 transition-colors">
              {l.tekst}
            </Link>
          ))}
        </div>
      </section>
    </Register>
  )
}
