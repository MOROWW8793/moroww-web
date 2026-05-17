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
                text: 'moroww is geen boekingsplatform. Het is een gecertificeerd kwaliteitslabel. Elke woning in de collectie wordt fysiek geïnspecteerd door ons team voor opname. Airbnb heeft geen fysieke kwaliteitscontrole. moroww garandeert wat je boekt.',
              },
            },
            {
              '@type': 'Question',
              name: 'Wat is het verschil tussen moroww en een lokale co-host?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'moroww is geen co-host en geen beheerder. Wij installeren een technologie-stack, bewaken de standaard via audits en bieden een gecureerd label. Lokale co-hosts werken ad hoc, zonder systeem en zonder merkgarantie.',
              },
            },
            {
              '@type': 'Question',
              name: 'Kan ik een vakantiewoning in Knokke boeken via moroww?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Ja. Nosso Logies in Heist-aan-Zee (Knokke) maakt deel uit van de moroww-collectie the shore. Direct te boeken via book.moroww.com.',
              },
            },
            {
              '@type': 'Question',
              name: 'Kan ik mijn vakantiewoning verhuren via moroww?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'moroww neemt enkel woningen op die door onze fysieke selectie komen. Voldoet je woning aan de criteria (min. 100m², eigen parking, rustige omgeving)? Meld je aan via moroww.com/eigenaar-worden.',
              },
            },
            {
              '@type': 'Question',
              name: 'Wat kost het om mijn woning bij moroww aan te melden?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'De aanmelding is gratis. Na de selectieprocedure volgt een eenmalige certificeringsaudit inclusief tech-installatie. moroww rekent vervolgens een commissie op gerealiseerde boekingen en een maandelijks tech-abonnement.',
              },
            },
          ],
        }),
      }}
    />
  )
}
