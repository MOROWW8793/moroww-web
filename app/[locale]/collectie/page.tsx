import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { CollectieOverzicht } from "@/components/collectie/CollectieOverzicht";
import { CollectieHero } from "@/components/collectie/CollectieHero";
import { StreekNav } from "@/components/collectie/StreekNav";
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
        <StreekNav actief="alles" isNl={isNl} />
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
