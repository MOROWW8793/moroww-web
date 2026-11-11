import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { CollectieOverzicht } from "@/components/collectie/CollectieOverzicht";
import { CollectieHero } from "@/components/collectie/CollectieHero";
import { SneakPeek } from "@/components/sections/SneakPeek";
import { Register } from "@/components/Register";
import { siteMetadata } from "@/lib/seo/siteMetadata";
import { liveWoningen, sortForCollectie, type Locale } from "@/lib/woningen";
import { countWord } from "@/lib/getallen";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const isNl = locale === 'nl'
  return siteMetadata({
    titel: isNl ? 'De collectie — geselecteerde vakantiewoningen' : 'The collection — selected holiday homes',
    beschrijving: isNl
      ? 'Karaktervolle vakantiewoningen, elk persoonlijk bezocht en geselecteerd. Per huis alles op een rij: slaapkamers, gasten, buitenruimte, parking en prijs.'
      : 'Holiday homes with character, each visited in person and selected. Everything per home side by side: bedrooms, guests, outdoor space, parking and price.',
    pad: isNl ? '/collectie' : '/en/collection',
    locale: isNl ? 'nl' : 'en',
    hreflang: { nl: '/collectie', en: '/en/collection' },
  })
}

export default async function CollectiePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  const isNl = locale === 'nl'
  const loc: Locale = isNl ? 'nl' : 'en'
  const woningen = liveWoningen()
  const aantal = countWord(woningen.length, loc, false)
  const slides = sortForCollectie(woningen).map((w) => ({ id: w.id, src: w.heroFoto, naam: w.naam, plaats: w.locatie }))
  const pil = 'inline-flex items-center min-h-[44px] rounded-full px-mw-4 text-[0.9375rem] transition-colors'
  return (
    <Register kant="gast">
      {/* ── HERO ── */}
      <CollectieHero
        slides={slides}
        labels={{
          pauzeer: isNl ? 'pauzeer de foto’s' : 'pause the photos',
          speel: isNl ? 'speel de foto’s af' : 'play the photos',
          dia: isNl ? 'foto' : 'photo',
        }}
      >
        <p className="text-audit text-white/80">{isNl ? 'de collectie' : 'the collection'}</p>
        <h1 className="mt-mw-3 text-display font-light text-white max-w-[14ch] drop-shadow-md">
          {isNl ? 'verblijven die kloppen.' : 'stays that are right.'}
        </h1>
        <p className="mt-mw-4 text-body-lg text-white/90 max-w-[56ch]">
          {isNl
            ? `We bouwen de plek waar je overal ter wereld een verblijf vindt dat klopt. We beginnen in België: ${aantal} karaktervolle huizen, elk persoonlijk bezocht.`
            : `We are building the place where you find a stay that is right, anywhere in the world. We start in Belgium: ${aantal} homes with character, each visited in person.`}
        </p>
        <nav
          aria-label={isNl ? 'streken' : 'regions'}
          className="mt-mw-5 inline-flex max-w-full flex-wrap items-center gap-1 rounded-[28px] md:rounded-full p-1.5 bg-white/[0.12] backdrop-blur-xl backdrop-saturate-150 border border-white/25 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.7)]"
        >
          <span className={`${pil} bg-white text-moroww-dark`} aria-current="page">{isNl ? 'alles' : 'all'}</span>
          <Link href="/the-shore" className={`${pil} text-white hover:bg-white/15`}>the shore</Link>
          <Link href="/the-fields" className={`${pil} text-white hover:bg-white/15`}>the fields</Link>
          <Link href="/boeken" className={`${pil} bg-moroww-orange text-moroww-dark font-semibold hover:bg-white`}>{isNl ? 'zoek op data' : 'search by date'}</Link>
        </nav>
      </CollectieHero>

      {/* ── OVERZICHT ── */}
      <section className="w-full px-6 md:px-12 mt-mw-8 mb-mw-8 lg:mb-mw-10">
        <div className="mx-auto max-w-7xl">
          <CollectieOverzicht woningen={woningen} locale={loc} />
        </div>
      </section>

      {/* Sneak peek: twee panden die nog niet boekbaar zijn. */}
      <SneakPeek locale={locale} />
      <div className="mb-mw-8 lg:mb-mw-12" />
    </Register>
  );
}
