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
                text: 'moroww (geschreven met dubbele w) is een Belgisch kwaliteitslabel voor premium vakantiewoningen, opgericht door Noam Landries. De collectie omvat gecertificeerde woningen in België.',
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
