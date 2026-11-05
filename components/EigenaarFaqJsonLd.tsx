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
                text: 'Meld je woning aan via het formulier op moroww.com/eigenaar-worden. We nemen binnen 48u persoonlijk contact op. Elke woning wordt beoordeeld op de vier poorten: minimum 100 m² met twee slaapkamers, karakter in natuurlijke materialen, een rustige ligging, en een fysiek bezoek. Haalt de woning de keuring, dan draagt ze het moroww-label en krijgt ze een plaats in de collectie.',
              },
            },
            {
              '@type': 'Question',
              name: 'Wat doet moroww voor eigenaars van vakantiewoningen?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'moroww keurt je woning ter plaatse en houdt ze elk jaar opnieuw aan de standaard. Je woning draagt het label op je eigen listings en staat op moroww.com. Je krijgt toegang tot de partners van het label. Wil je meer hulp, dan kies je voor hulp op maat of laat je de verhuur volledig aan ons over.',
              },
            },
            {
              '@type': 'Question',
              name: 'Moet ik mijn vakantiewoning volledig uit handen geven aan moroww?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Nee. moroww is in de eerste plaats een kwaliteitslabel. Je blijft verhuren via je eigen kanalen en beslist zelf welke partners je gebruikt. Wil je de verhuur toch uit handen geven, dan kan dat ook.',
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
                text: 'Ja. moroww is actief in België en de collectie breidt gestaag uit. Woningen moeten minimum 100 m² zijn met twee slaapkamers, karakter in natuurlijke materialen, en in een rustige omgeving liggen.',
              },
            },
            {
              '@type': 'Question',
              name: 'Wat is het verschil tussen moroww en een platform zoals Airbnb?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Airbnb is een boekingsplatform: iedereen kan er een woning op zetten. moroww is het kwaliteitslabel voor vakantiewoningen in België: elke moroww-woning is geauditeerd, uitgerust en opgevolgd.',
              },
            },
            {
              '@type': 'Question',
              name: 'Welke woningen komen in aanmerking voor het moroww-label?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Minimum 100 m² met minstens twee slaapkamers, karakter in natuurlijke materialen (minstens één authentiek architecturaal element, zicht op groen of water vanuit de leefruimte), rustige of natuurlijke omgeving (kust, landelijk, bosrand — geen drukke stadscentra). Elke woning wordt fysiek bezocht door ons team voor de certificeringsbeslissing.',
              },
            },
          ],
        }),
      }}
    />
  )
}
