import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { Register } from "@/components/Register";

// Over moroww, herschreven nov 2026: wie achter het label staat. Beeldtaal
// van de homepage. Staat er een /images/brent.jpg, dan tonen de oprichters
// als twee portretten; anders een breed beeld met beide namen eronder.

const COPY = {
  nl: {
    eyebrow: 'over moroww',
    h1: 'iedere gast verdient te weten waarvoor hij betaalt.',
    lead: 'moroww is een kwaliteitslabel voor karaktervolle vakantiewoningen in België. We keuren elk huis zelf, houden het aan de standaard en geven het label alleen aan wie die haalt.',
    heroAlt: 'Leefruimte van een moroww-woning, iemand schuift het gordijn open',
    begonEyebrow: 'waar het begon',
    begonH2: 'niemand had gelogen. er had gewoon niemand gekeken.',
    begonP: [
      'Edinburgh. Een mooie woning, goede foto’s, sterke reviews. De eerste nacht tilden we de matras op. Eronder zat schimmel.',
      'Toen begrepen we het. Een gast betaalt vooraf, voor iets wat hij pas ziet als hij binnenstapt. Dat verschil willen we zichtbaar maken, voor de boeking.',
    ],
    labelEyebrow: 'waarom een label',
    labelH2: 'geen platform. geen verhuurkantoor. een label.',
    labelP: [
      'Een platform laat iedereen toe. Een label zegt nee. We komen zelf kijken, keuren elk huis op wat een gast het eerst opmerkt, en doen dat elk jaar opnieuw.',
      'Eigenaars blijven verhuren zoals zij willen. Wie hulp wil, krijgt die, tot de volledige verhuur toe. Maar het label komt eerst.',
    ],
    teamEyebrow: 'wie wij zijn',
    teamH2: 'twee oprichters, één standaard.',
    team: [
      { naam: 'Noam', rol: 'oprichter · visie, strategie en eigenaars', tekst: 'Bouwt het label en de collectie. Wie een huis kandidaat stelt, spreekt eerst met hem.' },
      { naam: 'Brent', rol: 'oprichter · kwaliteit en werking', tekst: 'Bewaakt de standaard in de praktijk: hoe we keuren, hoe huizen opgevolgd worden, en dat het elke keer klopt.' },
    ],
    teamSlot: 'Wie een vraag heeft, gast of eigenaar, spreekt met ons. Niet met een callcenter.',
    noamAlt: 'Noam aan tafel in een moroww-woning',
    brentAlt: 'Brent, oprichter van moroww',
    steunEyebrow: 'supported by',
    steunH2: 'geselecteerd voor Start it @KBC.',
    steunP: 'In oktober werd moroww geselecteerd voor Start it @KBC, het acceleratorprogramma van KBC voor jonge ondernemingen. De coaching daar scherpte het label tot wat het vandaag is.',
    partnersLink: 'met wie we werken →',
    links: [
      { href: '/de-standaard', tekst: 'de standaard →' },
      { href: '/collectie', tekst: 'de collectie →' },
      { href: '/eigenaar-worden', tekst: 'je huis in de collectie →' },
    ],
  },
  en: {
    eyebrow: 'about moroww',
    h1: 'every guest deserves to know what they are paying for.',
    lead: 'moroww is a quality label for holiday homes with character in Belgium. We inspect every home ourselves, hold it to the standard and give the label only to those who meet it.',
    heroAlt: 'Living space of a moroww home, someone drawing back the curtain',
    begonEyebrow: 'where it started',
    begonH2: 'nobody had lied. nobody had looked.',
    begonP: [
      'Edinburgh. A beautiful flat, good photos, strong reviews. The first night we lifted the mattress. Underneath was mould.',
      'That is when it clicked. A guest pays upfront for something they only see once they walk in. We want to make that difference visible, before the booking.',
    ],
    labelEyebrow: 'why a label',
    labelH2: 'not a platform. not a rental agency. a label.',
    labelP: [
      'A platform lets everyone in. A label says no. We come to look ourselves, inspect every home on what a guest notices first, and do it again every year.',
      'Owners keep renting the way they want. Those who want help get it, up to the full rental. But the label comes first.',
    ],
    teamEyebrow: 'who we are',
    teamH2: 'two founders, one standard.',
    team: [
      { naam: 'Noam', rol: 'founder · vision, strategy and owners', tekst: 'Builds the label and the collection. Whoever puts a home forward speaks with him first.' },
      { naam: 'Brent', rol: 'founder · quality and operations', tekst: 'Guards the standard in practice: how we inspect, how homes are followed up, and that it is right every time.' },
    ],
    teamSlot: 'Whoever has a question, guest or owner, speaks with us. Not with a call centre.',
    noamAlt: 'Noam at the table in a moroww home',
    brentAlt: 'Brent, founder of moroww',
    steunEyebrow: 'supported by',
    steunH2: 'selected for Start it @KBC.',
    steunP: 'In October moroww was selected for Start it @KBC, the KBC accelerator for young companies. The coaching there sharpened the label into what it is today.',
    partnersLink: 'who we work with →',
    links: [
      { href: '/de-standaard', tekst: 'the standard →' },
      { href: '/collectie', tekst: 'the collection →' },
      { href: '/eigenaar-worden', tekst: 'your home in the collection →' },
    ],
  },
} as const

const LINK = "text-audit uppercase text-moroww-dark underline underline-offset-4 decoration-moroww-label hover:decoration-moroww-dark transition-colors"
const STARTIT_URL = 'https://www.kbc.be/ondernemen/nl/artikel/zelfstandige-worden/eigen-zaak-starten/wat-is-kbc-start-it.html'

export function OverMorowwContent({ locale, brentFoto }: { locale: string; brentFoto: boolean }) {
  const c = locale === 'nl' ? COPY.nl : COPY.en

  return (
    <Register kant="eigenaar">
      {/* ── HERO ── */}
      <section className="w-full px-6 md:px-12 pt-mw-8 lg:pt-mw-10 overflow-visible">
        <div className="mx-auto max-w-7xl">
          <p className="text-audit uppercase text-moroww-label">{c.eyebrow}</p>
          <h1 className="mt-mw-4 text-display text-moroww-dark max-w-[16ch]">{c.h1}</h1>
          <p className="mt-mw-6 text-body-lg text-moroww-dark max-w-[56ch]">{c.lead}</p>
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
            <p className="text-audit uppercase text-moroww-label">{c.begonEyebrow}</p>
            <h2 className="mt-mw-4 text-h2 text-moroww-dark">{c.begonH2}</h2>
          </div>
          <div className="lg:col-span-6 lg:col-start-7 space-y-mw-3 text-body-lg text-moroww-dark max-w-[52ch]">
            {c.begonP.map((p) => <p key={p}>{p}</p>)}
          </div>
        </div>
      </section>

      {/* ── WAAROM EEN LABEL ── */}
      <section className="w-full px-6 md:px-12 mt-mw-8 lg:mt-mw-12">
        <div className="mx-auto max-w-7xl border-t border-moroww-dark pt-mw-6 grid grid-cols-1 lg:grid-cols-12 gap-mw-6">
          <div className="lg:col-span-5">
            <p className="text-audit uppercase text-moroww-label">{c.labelEyebrow}</p>
            <h2 className="mt-mw-4 text-h2 text-moroww-dark">{c.labelH2}</h2>
          </div>
          <div className="lg:col-span-6 lg:col-start-7 space-y-mw-3 text-body-lg text-moroww-dark max-w-[52ch]">
            {c.labelP.map((p) => <p key={p}>{p}</p>)}
            <p className="pt-mw-2"><Link href="/de-standaard" className={LINK}>{c.links[0].tekst}</Link></p>
          </div>
        </div>
      </section>

      {/* ── WIE WIJ ZIJN ── */}
      <section className="w-full px-6 md:px-12 mt-mw-8 lg:mt-mw-12">
        <div className="mx-auto max-w-7xl">
          <p className="text-audit uppercase text-moroww-label">{c.teamEyebrow}</p>
          <h2 className="mt-mw-4 text-h2 text-moroww-dark">{c.teamH2}</h2>
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
                  <h3 className="mt-mw-4 text-h2 text-moroww-dark">{p.naam}</h3>
                  <p className="mt-mw-2 text-audit uppercase text-moroww-label">{p.rol}</p>
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
                  <div key={p.naam} className="border-t border-moroww-dark pt-mw-4">
                    <h3 className="text-h2 text-moroww-dark">{p.naam}</h3>
                    <p className="mt-mw-2 text-audit uppercase text-moroww-label">{p.rol}</p>
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
            <p className="text-audit uppercase text-white/70">{c.steunEyebrow}</p>
            <a href={STARTIT_URL} target="_blank" rel="noopener noreferrer" aria-label="Start it @KBC" className="mt-mw-4 inline-block">
              <Image src="/images/partners/start-it-kbc.png" alt="Start it @KBC" width={550} height={213} className="h-16 md:h-20 w-auto" />
            </a>
            <h2 className="mt-mw-5 text-h2 text-white">{c.steunH2}</h2>
          </div>
          <div className="lg:col-span-5 space-y-mw-4">
            <p className="text-body-lg text-white/90">{c.steunP}</p>
            <Link href="/partners" className="text-audit uppercase text-white underline underline-offset-4 decoration-white/40 hover:decoration-white transition-colors">{c.partnersLink}</Link>
          </div>
        </div>
      </section>

      {/* ── VERDER ── */}
      <section className="w-full px-6 md:px-12 mt-mw-8 lg:mt-mw-12 mb-mw-8 lg:mb-mw-12">
        <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-mw-6">
          {c.links.map((l) => (
            <Link key={l.href} href={l.href as '/de-standaard' | '/collectie' | '/eigenaar-worden'} className="group border-t border-moroww-dark pt-mw-4 text-h2 text-moroww-dark hover:text-moroww-ink-2 transition-colors">
              {l.tekst}
            </Link>
          ))}
        </div>
      </section>
    </Register>
  )
}
