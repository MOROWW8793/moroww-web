import Image from "next/image";
import Link from "next/link";
import { Link as IntlLink } from "@/i18n/navigation";
import { LeadForm } from "@/components/ui/LeadForm";
import { Statrij } from "@/components/sections/Statrij";
import { Register } from "@/components/Register";

// Eigenaarspagina in de beeldtaal van de homepage (nov 2026): display-kop,
// volle beelden, veel lucht, weinig woorden. Copy komt per taal binnen via
// EigenaarContent (NL) en EigenaarContentEN (EN); deze component bouwt enkel.

export type EigenaarCopy = {
  eyebrow: string
  h1: string
  lead: string
  ctaKandidaat: string
  ctaGesprek: string
  heroAlt: string
  waardeEyebrow: string
  waardeH2: string
  waarde: Array<{ titel: string; tekst: string }>
  huizenEyebrow: string
  huizenH2: string
  kringEyebrow: string
  kringH2: string
  kringP: string[]
  standaardEyebrow: string
  standaardH2: string
  standaard: Array<{ titel: string; tekst: string; beeld: string; alt: string }>
  standaardLink: string
  erbijEyebrow: string
  erbijH2: string
  erbij: Array<{ titel: string; tekst: string }>
  erbijBeeldAlt: string
  partnersLink: string
  keuzesEyebrow: string
  keuzesH2: string
  keuzes: Array<{ nummer: string; titel: string; kop: string; tekst: string }>
  keuzesSlot: string
  batchEyebrow: string
  batchH2: string
  batchP: string
  batchStartIt: string
  stappenEyebrow: string
  stappen: Array<{ nummer: string; titel: string; tekst: string }>
  stappenSlot: string
  formEyebrow: string
  formH2: string
  formP: string
  kennisLink: string
  gesprekH3: string
  gesprekP: string
  gesprekCta: string
  teamP: string
}

const GESPREK = "https://calendar.app.google/BH8wYeA9AGf6KrUz7"
const LINK = "text-[0.9375rem] text-moroww-dark underline underline-offset-[6px] decoration-moroww-dark/30 hover:decoration-moroww-dark transition-colors"
const CTA_VOL = "inline-flex items-center justify-center min-h-[52px] px-mw-5 py-4 text-[0.9375rem] tracking-[0.01em] bg-moroww-dark text-moroww-paper border border-moroww-dark hover:bg-transparent hover:text-moroww-dark transition-colors duration-500"
const CTA_RAND = "inline-flex items-center justify-center min-h-[52px] px-mw-5 py-4 text-[0.9375rem] tracking-[0.01em] border border-moroww-dark/40 text-moroww-dark hover:border-moroww-dark transition-colors duration-500"
const CTA_LICHT = "inline-flex items-center justify-center min-h-[52px] px-mw-5 py-4 text-[0.9375rem] tracking-[0.01em] bg-moroww-blush text-moroww-dark border border-moroww-blush hover:bg-transparent hover:text-moroww-blush transition-colors duration-500"

function Eyebrow({ children, licht = false }: { children: React.ReactNode; licht?: boolean }) {
  return (
    <p className={`text-[0.9375rem] ${licht ? 'text-white/60' : 'text-moroww-ink-2'}`}>{children}</p>
  )
}

export function EigenaarPagina({
  copy: c,
  statItems,
  kennisHref,
  standaardHref,
  partnersHref,
  huizen,
}: {
  copy: EigenaarCopy
  statItems: Array<{ cijfer: string; label: string }>
  kennisHref: string
  standaardHref: string
  partnersHref: string
  huizen: Array<{ id: string; naam: string; locatie: string; foto: string }>
}) {
  return (
    <Register kant="eigenaar">
      {/* Warme ondergrond (nov 2026): crème in plaats van koel papierwit,
          zodat de pagina uitnodigt in plaats van keurt. */}
      <div className="bg-[#F5ECE3] flow-root">
      {/* ── HERO ── display-kop zoals op de homepage */}
      <section className="w-full px-6 md:px-12 pt-mw-8 lg:pt-mw-10 overflow-visible">
        <div className="mx-auto max-w-7xl">
          <div className="mw-in"><Eyebrow>{c.eyebrow}</Eyebrow></div>
          <h1 data-regels className="mw-in mt-mw-4 text-display font-light text-moroww-dark max-w-[14ch]">{c.h1}</h1>
          <div className="mw-in-2 mt-mw-6 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_auto] gap-mw-5 items-end">
            <p className="text-body-lg text-moroww-dark max-w-[48ch]">{c.lead}</p>
            <div className="flex flex-wrap gap-mw-3">
              <a href="#kandidaat" className={CTA_VOL}>{c.ctaKandidaat}</a>
              <a href={GESPREK} target="_blank" rel="noopener noreferrer" className={CTA_RAND}>{c.ctaGesprek}</a>
            </div>
          </div>
        </div>
      </section>

      {/* ── HEROBEELD ── clip-opent van onder (data-beeld); binnenin een
          overmaat-laag met parallax zodat het beeld traag meebeweegt tegen
          de scroll. De cert-badge zit buiten de parallax-laag en blijft
          vast t.o.v. de container. */}
      <section className="w-full px-6 md:px-12 mt-mw-8">
        <div data-beeld className="mx-auto max-w-7xl relative aspect-[4/5] sm:aspect-[16/9] lg:max-h-[78vh] w-full overflow-hidden">
          <div data-parallax className="absolute inset-x-0 -top-[8%] -bottom-[8%]">
            <Image src="/images/hero.jpg" alt={c.heroAlt} fill priority className="object-cover" sizes="(max-width: 1280px) 100vw, 1280px" />
          </div>
          <Image src="/images/Moroww_Certified_01_RGB.png" alt="moroww certified" width={240} height={240} className="absolute right-mw-4 bottom-mw-4 md:right-mw-6 md:bottom-mw-6 w-20 md:w-28 h-auto" />
        </div>
      </section>

      {/* ── CIJFERS ── */}
      <div className="mt-mw-8">{statItems.length > 1 && <Statrij items={statItems} />}</div>

      {/* ── WAT HET JE OPLEVERT ── de toegevoegde waarde, vooraan */}
      <section className="w-full px-6 md:px-12 mt-mw-8 lg:mt-mw-12">
        <div className="mx-auto max-w-7xl">
          <Eyebrow>{c.waardeEyebrow}</Eyebrow>
          <h2 data-regels className="mt-mw-4 text-h2 font-light text-moroww-dark max-w-[22ch]">{c.waardeH2}</h2>
          <div className="mt-mw-6 lg:mt-mw-8 grid grid-cols-1 md:grid-cols-2 gap-x-mw-8 gap-y-mw-6 lg:gap-y-mw-8">
            {c.waarde.map((w, i) => (
              <div key={w.titel} className="border-t border-moroww-dark/20 pt-mw-5 grid grid-cols-1 sm:grid-cols-[3.5rem_1fr] gap-mw-2 sm:gap-mw-4">
                <p className="text-h2 font-light text-moroww-label">0{i + 1}</p>
                <div>
                  <h3 className="text-h2 font-light text-moroww-dark">{w.titel}</h3>
                  <p className="mt-mw-3 text-body-lg text-moroww-ink-2 max-w-[44ch]">{w.tekst}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DE KRING ── waarom je erbij wil horen */}
      <section className="w-full bg-moroww-blush px-6 md:px-12 py-mw-8 lg:py-mw-10 mt-mw-8 lg:mt-mw-12">
        <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-mw-6">
          <div className="lg:col-span-5">
            <Eyebrow>{c.kringEyebrow}</Eyebrow>
            <h2 data-regels className="mt-mw-4 text-h2 font-light text-moroww-dark">{c.kringH2}</h2>
          </div>
          <div className="lg:col-span-6 lg:col-start-7 space-y-mw-3 text-body-lg text-moroww-dark max-w-[52ch]">
            {c.kringP.map((p) => <p key={p}>{p}</p>)}
          </div>
        </div>
      </section>

      {/* ── DE HUIZEN DIE ERBIJ HOREN ── het gezelschap waar je bij komt */}
      {huizen.length > 0 && (
        <section className="w-full bg-moroww-blush pb-mw-8 lg:pb-mw-10">
          <div className="px-6 md:px-12">
            <div className="mx-auto max-w-7xl">
              <Eyebrow>{c.huizenEyebrow}</Eyebrow>
              <h2 data-regels className="mt-mw-4 text-h2 font-light text-moroww-dark max-w-[24ch]">{c.huizenH2}</h2>
            </div>
          </div>
          {/* Strook lijnt links uit met het raster van de pagina en loopt rechts door tot de rand. */}
          <ul
            className="mt-mw-6 flex gap-mw-4 overflow-x-auto snap-x snap-mandatory pb-mw-3 pr-6 md:pr-12 [scrollbar-width:thin] pl-6 md:pl-[max(3rem,calc((100vw-80rem)/2))] scroll-pl-6 md:scroll-pl-[max(3rem,calc((100vw-80rem)/2))]"
          >
            {huizen.map((h) => (
              <li key={h.id} className="snap-start shrink-0 w-[72vw] sm:w-[44vw] lg:w-[28vw] max-w-[380px]">
                <IntlLink href={{ pathname: '/collectie/[id]', params: { id: h.id } }} className="group block">
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <Image src={h.foto} alt={h.naam} fill className="object-cover transition-transform duration-[2000ms] ease-out group-hover:scale-[1.02] motion-reduce:group-hover:scale-100" sizes="(max-width: 640px) 72vw, (max-width: 1024px) 44vw, 380px" />
                  </div>
                  <p className="mt-mw-3 text-h3 font-normal text-moroww-dark">{h.naam}</p>
                  <p className="text-[0.9375rem] text-moroww-ink-2">{h.locatie}</p>
                </IntlLink>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* ── DE STANDAARD ── vier beeldtegels */}
      <section className="w-full px-6 md:px-12 mt-mw-8 lg:mt-mw-12">
        <div className="mx-auto max-w-7xl">
          <Eyebrow>{c.standaardEyebrow}</Eyebrow>
          <h2 data-regels className="mt-mw-4 text-h2 font-light text-moroww-dark max-w-[22ch]">{c.standaardH2}</h2>
          <ol className="mt-mw-6 grid grid-cols-1 md:grid-cols-2 gap-2">
            {c.standaard.map((s, i) => (
              <li key={s.titel} className="group relative aspect-[4/5] lg:aspect-[5/4] overflow-hidden bg-moroww-dark">
                <Image
                  src={s.beeld}
                  alt={s.alt}
                  fill
                  className="object-cover transition-transform duration-[2000ms] ease-out group-hover:scale-[1.02] motion-reduce:group-hover:scale-100"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div
                  className="absolute inset-x-0 bottom-0 h-[65%] pointer-events-none"
                  style={{ background: 'linear-gradient(to top, rgba(26,26,26,0.72), rgba(26,26,26,0))' }}
                  aria-hidden
                />
                <div className="absolute inset-x-0 bottom-0 p-mw-5 text-white">
                  <div className="h-[3px] w-10 bg-white" aria-hidden />
                  <p className="mt-mw-3 text-audit uppercase text-white/80">0{i + 1}</p>
                  <h3 className="mt-mw-2 text-h2 font-light text-white max-w-[16ch]">{s.titel}</h3>
                  <p className="mt-mw-2 text-body text-white/90 max-w-[40ch]">{s.tekst}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="mt-mw-5"><Link href={standaardHref} className={LINK}>{c.standaardLink}</Link></p>
        </div>
      </section>

      {/* ── WAT ERBIJ HOORT ── beeld links, lijst rechts */}
      <section className="w-full px-6 md:px-12 mt-mw-8 lg:mt-mw-12">
        <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-mw-6 items-center">
          <div className="lg:col-span-6 relative aspect-[4/5] overflow-hidden">
            <Image src="/images/standaard/V2-12.jpg" alt={c.erbijBeeldAlt} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <Eyebrow>{c.erbijEyebrow}</Eyebrow>
            <h2 data-regels className="mt-mw-4 text-h2 font-light text-moroww-dark">{c.erbijH2}</h2>
            <dl className="mt-mw-6 border-t border-moroww-rule">
              {c.erbij.map((e) => (
                <div key={e.titel} className="border-b border-moroww-rule py-mw-4">
                  <dt className="text-h3 font-normal text-moroww-dark">{e.titel}</dt>
                  <dd className="mt-mw-2 text-body text-moroww-ink-2">{e.tekst}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-mw-5"><Link href={partnersHref} className={LINK}>{c.partnersLink}</Link></p>
          </div>
        </div>
      </section>

      {/* ── DRIE KEUZES ── */}
      <section className="w-full px-6 md:px-12 mt-mw-8 lg:mt-mw-12">
        <div className="mx-auto max-w-7xl">
          <Eyebrow>{c.keuzesEyebrow}</Eyebrow>
          <h2 data-regels className="mt-mw-4 text-h2 font-light text-moroww-dark max-w-[22ch]">{c.keuzesH2}</h2>
          <div className="mt-mw-6 grid grid-cols-1 md:grid-cols-3 gap-mw-6">
            {c.keuzes.map((k) => (
              <div key={k.titel} className="border-t border-moroww-dark/20 pt-mw-4">
                <p className="text-[0.9375rem] text-moroww-ink-2">{k.nummer} · {k.titel}</p>
                <h3 className="mt-mw-3 text-h3 font-normal text-moroww-dark">{k.kop}</h3>
                <p className="mt-mw-3 text-body text-moroww-ink-2">{k.tekst}</p>
              </div>
            ))}
          </div>
          <p className="mt-mw-6 text-body-lg text-moroww-dark">{c.keuzesSlot}</p>
        </div>
      </section>

      {/* ── DE VOLGENDE BATCH ── donkere band */}
      <section className="w-full bg-[#2A211C] text-white px-6 md:px-12 py-mw-8 lg:py-mw-10 mt-mw-8 lg:mt-mw-12">
        <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-mw-6 items-end">
          <div className="lg:col-span-7">
            <Eyebrow licht>{c.batchEyebrow}</Eyebrow>
            <h2 data-regels className="mt-mw-4 text-display font-light text-white">{c.batchH2}</h2>
          </div>
          <div className="lg:col-span-5 space-y-mw-4">
            <p className="text-body-lg text-white/90">{c.batchP}</p>
            <a href="#kandidaat" className={CTA_LICHT}>{c.ctaKandidaat}</a>
            <div className="pt-mw-4 flex items-center gap-mw-4">
              <span className="text-[0.9375rem] text-white/60">{c.batchStartIt}</span>
              <a href="https://www.kbc.be/ondernemen/nl/artikel/zelfstandige-worden/eigen-zaak-starten/wat-is-kbc-start-it.html" target="_blank" rel="noopener noreferrer" aria-label="Start it @KBC">
                <Image src="/images/partners/start-it-kbc.png" alt="Start it @KBC" width={550} height={213} className="h-12 w-auto" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOE HET LOOPT ── */}
      <section className="w-full px-6 md:px-12 mt-mw-8 lg:mt-mw-12">
        <div className="mx-auto max-w-7xl">
          <Eyebrow>{c.stappenEyebrow}</Eyebrow>
          <ol className="mt-mw-6 grid grid-cols-1 md:grid-cols-3 gap-mw-6">
            {c.stappen.map((s) => (
              <li key={s.titel}>
                <p className="text-display font-light text-moroww-rule leading-none">{s.nummer}</p>
                <h3 className="mt-mw-3 text-h3 font-normal text-moroww-dark">{s.titel}</h3>
                <p className="mt-mw-2 text-body text-moroww-ink-2">{s.tekst}</p>
              </li>
            ))}
          </ol>
          <p className="mt-mw-6 text-body text-moroww-dark max-w-[60ch]">{c.stappenSlot}</p>
        </div>
      </section>

      {/* ── KANDIDAAT STELLEN ── formulier links, gesprek rechts */}
      <section id="kandidaat" className="w-full px-6 md:px-12 mt-mw-8 lg:mt-mw-12 mb-mw-8 lg:mb-mw-12 scroll-mt-24">
        <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-mw-8">
          <div className="lg:col-span-6">
            <Eyebrow>{c.formEyebrow}</Eyebrow>
            <h2 data-regels className="mt-mw-4 text-h2 font-light text-moroww-dark">{c.formH2}</h2>
            <p className="mt-mw-4 text-body text-moroww-dark max-w-[52ch]">{c.formP}</p>
            <div id="poortentoets" className="mt-mw-5 max-w-[52ch]">
              <LeadForm />
            </div>
            <p className="mt-mw-5"><Link href={kennisHref} className={LINK}>{c.kennisLink}</Link></p>
          </div>
          <div className="lg:col-span-5 lg:col-start-8 lg:pt-mw-10 space-y-mw-4">
            <h3 className="text-h3 font-normal text-moroww-dark">{c.gesprekH3}</h3>
            <p className="text-body text-moroww-dark">{c.gesprekP}</p>
            <a href={GESPREK} target="_blank" rel="noopener noreferrer" className={CTA_RAND}>{c.gesprekCta}</a>
            <p className="pt-mw-4 text-body text-moroww-ink-2">{c.teamP}</p>
            <p><a href="mailto:info@moroww.com" className={LINK}>info@moroww.com</a></p>
          </div>
        </div>
      </section>
      </div>
    </Register>
  )
}
