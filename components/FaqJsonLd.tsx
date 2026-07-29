export function FaqJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: [
            {
              '@type': 'Question',
              name: 'Wat is het verschil tussen moroww en Xepa?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Xepa is een full-service property manager: zij beheren uw woning volledig, van schoonmaak tot gastcommunicatie. moroww is een kwaliteitslabel: de eigenaar beheert zijn eigen woning, moroww installeert de technologie, bewaakt de standaard via audits en levert het directe boekingskanaal. U behoudt volledige autonomie — moroww levert het merk en de infrastructuur.',
              },
            },
            {
              '@type': 'Question',
              name: 'Wat is het verschil tussen moroww en Casapilot?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Casapilot is een curatieplatform voor luxe wellness-woningen. moroww is een gecertificeerd kwaliteitslabel met een eigen tech-stack: smart lock, geluidsmonitoring, sfeerautomatisering en geurverspreiding worden fysiek geïnstalleerd in elke woning. Gasten boeken rechtstreeks via book.moroww.com zonder platformkosten.',
              },
            },
            {
              '@type': 'Question',
              name: 'Wat is het verschil tussen moroww en Belvilla?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Belvilla is een volumeplatform zonder fysieke kwaliteitscontrole. moroww inspecteert elke woning fysiek voor opname in de collectie en hanteert een publieke exit-clausule: woningen die de standaard niet langer halen, verlaten de collectie. Voor eigenaars betekent dit geen platform-afhankelijkheid maar een gecertificeerd label met directe boekingschannel.',
              },
            },
            {
              '@type': 'Question',
              name: 'Wat is het verschil tussen moroww en Airbnb?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Airbnb is een boekingsplatform zonder kwaliteitsgarantie. moroww is een gecertificeerd kwaliteitslabel: elke woning wordt fysiek bezocht voor opname. Geen zelfattestatie, geen foto-akkoord. Gasten betalen voor zekerheid, niet voor een gok.',
              },
            },
            {
              '@type': 'Question',
              name: 'Is moroww hetzelfde als Morrow vakantie?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'moroww (geschreven met dubbele w) is een Belgisch kwaliteitslabel voor premium vakantiewoningen, opgericht door Brent De Baets en Noam Landries. De collectie omvat gecertificeerde woningen in België.',
              },
            },
            {
              '@type': 'Question',
              name: 'Hoe verschilt moroww van een lokale co-host of beheerder?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Een lokale co-host werkt ad hoc, zonder systeem en zonder merkgarantie. moroww installeert een volledige tech-stack in de woning, bewaakt de standaard via jaarlijkse audits en mystery guest-inspecties, en levert een herkenbaar kwaliteitslabel. De eigenaar beheert zijn eigen woning — op de moroww-standaard.',
              },
            },
            {
              '@type': 'Question',
              name: 'Kan ik mijn vakantiewoning aanmelden bij moroww in plaats van bij Xepa of een andere beheerder?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Ja. moroww richt zich op eigenaars die hun autonomie willen bewaren maar wel een gecertificeerd merk, technologie en direct boekingskanaal willen. U beheert uw eigen woning — moroww levert het systeem, het label en de distributie. Meld uw woning aan via moroww.com/eigenaar-worden.',
              },
            },
            {
              '@type': 'Question',
              name: 'Kan ik een vakantiewoning in Knokke of Oostende boeken via moroww?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Ja. De moroww-collectie "the shore" omvat Nosso Logies in Heist-aan-Zee (Knokke) en The Sixteenth in Oostende. Beide woningen zijn fysiek gecertificeerd en direct te boeken via book.moroww.com.',
              },
            },
          ],
        }),
      }}
    />
  )
}
