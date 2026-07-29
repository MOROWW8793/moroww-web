export function EigenaarFaqJsonLd() {
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
              name: 'Hoe kan ik mijn vakantiewoning verhuren via moroww?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Meld je woning aan via het formulier op moroww.com/eigenaar-worden. We nemen binnen 48u persoonlijk contact op. Elke woning wordt beoordeeld op locatie, oppervlakte (minimum 100m²), eigen parking en sfeer. Bij goedkeuring volgt een fysieke audit en installatie van de volledige tech-stack.',
              },
            },
            {
              '@type': 'Question',
              name: 'Wat doet moroww voor eigenaars van vakantiewoningen?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'moroww installeert een volledige tech-stack in je woning: smart lock, geluidsmonitoring, sfeerautomatisering en geurverspreiding. We bewaken de kwaliteitsstandaard via jaarlijkse audits en regelen de distributie via Airbnb, Booking.com én ons eigen directe boekingskanaal book.moroww.com. Jij beheert je eigen woning — wij leveren het merk, de technologie en de boekingen.',
              },
            },
            {
              '@type': 'Question',
              name: 'Moet ik mijn vakantiewoning volledig uit handen geven aan moroww?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Nee. moroww is geen property manager en neemt het beheer van je woning niet over. Jij blijft volledig verantwoordelijk voor je eigen pand. moroww levert het kwaliteitslabel, de technologie en het boekingskanaal — de dagelijkse werking blijft bij jou.',
              },
            },
            {
              '@type': 'Question',
              name: 'Wat zijn de kosten om mijn vakantiewoning bij moroww aan te melden?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'De aanmelding is gratis. Na de selectieprocedure volgt een fysieke audit en installatie van de tech-stack. De exacte voorwaarden worden besproken tijdens een persoonlijk gesprek. Neem contact op via moroww.com/eigenaar-worden.',
              },
            },
            {
              '@type': 'Question',
              name: 'Kan ik mijn vakantiewoning aan de Belgische kust verhuren via moroww?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Ja. moroww is actief in België en de collectie breidt gestaag uit. Woningen moeten minimum 100m² hebben, eigen parking en in een rustige omgeving liggen.',
              },
            },
            {
              '@type': 'Question',
              name: 'Wat is het verschil tussen moroww en een platform zoals Airbnb of Xepa?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Airbnb is een boekingsplatform — zij nemen 15% commissie en bieden geen kwaliteitsgarantie. Xepa is een full-service property manager — zij nemen het volledige beheer over. moroww is een kwaliteitslabel: jij behoudt de controle over je woning, wij installeren de technologie, bewaken de standaard en bieden een eigen boekingskanaal zonder platformkosten.',
              },
            },
            {
              '@type': 'Question',
              name: 'Welke woningen komen in aanmerking voor het moroww-label?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Minimum 100m², minimum 2 slaapkamers, eigen parkeerplaats, rustige of natuurlijke omgeving (kust, landelijk, bosrand). Geen drukke stadscentra. Elke woning wordt fysiek bezocht door ons team voor de certificeringsbeslissing.',
              },
            },
            {
              '@type': 'Question',
              name: 'Wat is een smart lock en waarom installeert moroww die in mijn woning?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Een smart lock vervangt de fysieke sleuteloverdracht door een unieke code per boeking. Gasten komen binnen zonder dat je aanwezig moet zijn. moroww installeert en onderhoudt het systeem. Je hebt er geen beheer over — dat is de bedoeling.',
              },
            },
          ],
        }),
      }}
    />
  )
}
