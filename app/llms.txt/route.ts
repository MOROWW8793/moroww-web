import { liveWoningen, sortForCollectie, lw } from '@/lib/woningen'
import { site } from '@/lib/merk/site'

// llms.txt (llmstxt.org): een platte beschrijving van moroww voor taalmodellen
// en AI-zoekmachines. Gebouwd uit dezelfde data als de site, zodat de huizen
// en hun feiten nooit uit de pas lopen met de pandpagina's.
export const revalidate = 3600

const BASE = 'https://www.moroww.com'

export function GET() {
  const huizen = sortForCollectie(liveWoningen())
    .map((w) => {
      const feiten = [
        w.slaapkamers ? `${w.slaapkamers} slaapkamers` : '',
        w.maxGasten ? `tot ${w.maxGasten} gasten` : '',
        w.oppervlakte ?? '',
        w.prijs ? `vanaf € ${w.prijs} per nacht` : '',
      ].filter(Boolean).join(', ')
      return `- [${w.naam}](${BASE}/collectie/${w.id}): ${w.locatie} (${w.collectie}). ${feiten}. ${lw(w.slogan, 'nl')}`
    })
    .join('\n')

  const tekst = `# moroww

> moroww is een kwaliteitslabel voor vakantiewoningen in België. Elk huis in de collectie wordt persoonlijk bezocht en elk jaar opnieuw bekeken op wat een gast het eerst opmerkt: hoe proper het is, hoe het bed voelt en of alles klaarstaat. Gasten boeken de huizen rechtstreeks op moroww.com, zonder servicekosten.

De naam wordt altijd met kleine letters en dubbele w geschreven: moroww. moroww is geen boekingsplatform met een open aanbod: alleen huizen die de standaard halen, staan in de collectie. Het bedrijf achter moroww is ${site.bedrijf} (${site.ondernemingsnummer}), gevestigd in ${site.plaats}, België.

## De collectie

Twee streken: the shore (de Belgische kust) en the fields (het Vlaamse platteland).

${huizen}

- [De collectie](${BASE}/collectie): alle huizen naast elkaar, met slaapkamers, gasten, buitenruimte, parking en prijs.
- [Boeken op data](${BASE}/boeken): beschikbaarheid over de hele collectie.
- [De standaard](${BASE}/de-standaard): de vier regels waarop elk huis bezocht wordt.

## Voor eigenaars

- [Het label](${BASE}/het-label): persoonlijk bezoek, het label aan de deur en op de listings, een plaats in de collectie, elk jaar opnieuw bezocht. De eigenaar blijft zelf verhuren of via een beheerder.
- [Volledig beheer](${BASE}/beheer): moroww neemt listings, prijzen, gasten, schoonmaak en onderhoud over.
- [moroww advisory](${BASE}/advisory): per vraag een plan op papier, voor wie start of vastloopt (vergunning, opstart, prijzen, een eigen boekingswebsite).
- [moroww hub](${BASE}/hub): voor eigenaars, beheerders en hotels met het label: vakmensen via moroww, merken in de huizen en de academy.
- [Voor eigenaars](${BASE}/voor-eigenaars): overzicht van alle wegen.

Tarieven voor eigenaars worden niet publiek vermeld; die volgen na een eerste gesprek.

## Kennisbank

Praktische artikels over vakantieverhuur in België, met bron en datum van laatste controle.

- [Kennisbank](${BASE}/kennis)
- [Het Vlaams Logiesdecreet](${BASE}/kennis/logiesdecreet-vakantiewoning-vlaanderen)
- [Omgevingsvergunning voor een vakantiewoning](${BASE}/kennis/omgevingsvergunning-functiewijziging-vakantiewoning)
- [Brandveiligheidsattest vakantiewoning Vlaanderen](${BASE}/kennis/brandveiligheidsattest-vakantiewoning-vlaanderen)
- [Verblijfsbelasting per gemeente](${BASE}/kennis/verblijfsbelasting-vakantiewoning)
- [Tweedeverblijfsbelasting of logiesbelasting](${BASE}/kennis/tweedeverblijfsbelasting-of-logiesbelasting)
- [Wat kost een nacht in je vakantiewoning](${BASE}/kennis/wat-kost-een-nacht-vakantiewoning)
- [Belasting op huurinkomsten](${BASE}/kennis/belasting-huurinkomsten-vakantiewoning)
- [Verzekering voor een vakantiewoning](${BASE}/kennis/verzekering-vakantiewoning)
- [Zelf verhuren, platform, beheerder of label](${BASE}/kennis/vakantiewoning-verhuren-zelf-platform-beheerder-label)

## Contact

- E-mail: ${site.contact.email}
- Telefoon: ${site.contact.telefoon}
- [Contact](${BASE}/contact)
- English version of the guest pages: ${BASE}/en
`
  return new Response(tekst, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'public, max-age=3600' },
  })
}
