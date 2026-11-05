import { screeningsPubliek } from "@/lib/screenings";
import { TOTAL_STAYS_REVIEWED } from "@/lib/reviews";
import { EigenaarPagina, type EigenaarCopy } from "@/components/eigenaar/EigenaarPagina";

// Labelversie NL (nov 2026). Copy hier, opbouw in EigenaarPagina.

const COPY: EigenaarCopy = {
  eyebrow: 'voor eigenaars',
  h1: 'niet elk huis hoort erbij.',
  lead: 'moroww is een kleine collectie karaktervolle vakantiewoningen, ter plaatse gekeurd en elk jaar opnieuw. Je blijft verhuren via je eigen kanalen. Wij staan in voor de standaard, zodat je gasten vooraf zien wat je huis waard is.',
  ctaKandidaat: 'stel je huis kandidaat',
  ctaGesprek: 'plan een gesprek',
  heroAlt: 'Open keuken en leefruimte van een moroww-woning met zicht op de tuin',
  waardeEyebrow: 'wat het je oplevert',
  waardeH2: 'meer dan een label op je listing.',
  waarde: [
    { titel: 'je verschil, vóór de boeking', tekst: 'Bijna elk huis heeft goede reviews, dus een gast ziet het verschil pas als hij binnenstapt. Het label toont het vooraf, op je eigen listings en op moroww.com.' },
    { titel: 'gasten die bij je huis passen', tekst: 'Wie kiest voor een gekeurd huis, zoekt rust en zorg, geen feestje. Dat zijn de gasten die goed omgaan met wat je gebouwd hebt.' },
    { titel: 'de partners van de collectie', tekst: 'Vakmensen, techniek en lifestylemerken die we zelf kiezen en aan de standaard houden, aan voorwaarden die we voor alle huizen samen afspreken. Jij hoeft niet meer zelf te zoeken.' },
    { titel: 'rust, ook als je er niet bent', tekst: 'Wij houden je huis aan de standaard en kijken mee naar wat de regels vragen, van aanmelding tot brandveiligheid. Wringt er iets, dan hoor je het van ons voor een gast het merkt.' },
  ],
  kringEyebrow: 'waarom eigenaars erbij willen',
  kringH2: 'een huis dat je met zorg maakte, hoort tussen huizen van zijn soort.',
  kringP: [
    'Je kocht het niet zomaar. Je koos elk materiaal, elk licht, elke stoel. Op een platform staat het tussen duizenden andere, alsof het er een van velen is.',
    'Bij moroww niet. We komen zelf kijken en zeggen vaker nee dan ja. Wie erbij hoort, draagt een label dat iets betekent, omdat niet iedereen het krijgt.',
  ],
  standaardEyebrow: 'de standaard',
  standaardH2: 'wat een gast het eerst opmerkt, keuren we het strengst.',
  standaard: [
    { titel: 'geen spoor van de vorige gast', tekst: 'Geen haar, geen kruimel, geen geur, geen vingerafdruk, geen vergeten voorwerp.', beeld: '/images/over-interieur-2.jpg', alt: 'Opgeruimde leefruimte met een rode stoel' },
    { titel: 'een badkamer zonder één haar', tekst: 'Geen kalk op glas en kranen. Een afvoer die vrij is en nergens naar ruikt.', beeld: '/images/og-eigenaar.jpg', alt: 'Hand onder een regendouche' },
    { titel: 'vers linnen, elke keer', tekst: 'Professioneel gewassen, bij elke wissel volledig vervangen. Het bed is opgemaakt als de gast aankomt.', beeld: '/images/standaard/V2-19.jpg', alt: 'Een bed wordt opgemaakt met wit linnen' },
    { titel: 'klaar vóór aankomst', tekst: 'Het huis is volledig af voor de gast binnenkomt. Niet gelijktijdig, niet net erna.', beeld: '/images/standaard/V2-40.jpg', alt: 'Gast leest in een opgemaakt bed' },
  ],
  standaardLink: 'lees de standaard →',
  erbijEyebrow: 'wat erbij hoort',
  erbijH2: 'het label, en alles wat ermee meekomt.',
  erbij: [
    { titel: 'het label', tekst: 'Op je eigen listings en op moroww.com, in een kleine collectie karaktervolle huizen.' },
    { titel: 'de belofte', tekst: 'Je gasten krijgen een belofte waar wij mee voor instaan.' },
    { titel: 'de partners', tekst: 'Lokale vakmensen voor schoonmaak, linnen en onderhoud, de techniek achter een vlotte aankomst, en lifestylemerken die we zelf kiezen om in de huizen te staan. Wij houden ze aan de standaard. Jij beslist wat je gebruikt.' },
    { titel: 'een stem', tekst: 'Als een van de eerste huizen bepaal je mee hoe de standaard eruitziet.' },
  ],
  erbijBeeldAlt: 'Handdoeken worden gevouwen op een opgemaakt bed',
  partnersLink: 'bekijk de partners →',
  keuzesEyebrow: 'jij kiest hoe ver wij gaan',
  keuzesH2: 'drie manieren om erbij te horen.',
  keuzes: [
    { nummer: '01', titel: 'het label', kop: 'je verhuurt zelf.', tekst: 'Wij keuren, certificeren en volgen op. Je huis staat in de collectie en draagt het label op je eigen kanalen.' },
    { nummer: '02', titel: 'hulp op maat', kop: 'je houdt de touwtjes.', tekst: 'Wij lossen op wat wringt. Een partner ter plaatse, een slim slot, sensoren die je verwittigen voor er schade is.' },
    { nummer: '03', titel: 'wij doen het voor je', kop: 'je krijgt je weekends terug.', tekst: 'Distributie via alle kanalen en book.moroww.com. Wij doen het gastcontact en sturen de schoonmaak aan.' },
  ],
  keuzesSlot: 'De standaard is voor elk huis dezelfde.',
  batchEyebrow: 'de volgende batch',
  batchH2: 'tien woningen.',
  batchP: 'We hebben onze volgende batch geopend voor tien woningen die het label samen met ons willen testen. Niet elk huis haalt de keuring.',
  batchStartIt: 'supported by',
  stappenEyebrow: 'hoe het loopt',
  stappen: [
    { nummer: '01', titel: 'kandidaat stellen', tekst: 'Binnen twee werkdagen nemen we persoonlijk contact op.' },
    { nummer: '02', titel: 'de keuring', tekst: 'We komen kijken, lopen door elke kamer en zeggen eerlijk wat er nodig is.' },
    { nummer: '03', titel: 'het label', tekst: 'Haalt je huis de keuring, dan draagt het het label en staat het in de collectie.' },
  ],
  stappenSlot: 'Je zit nergens aan vast. Je listings, je boekingen en je gastgegevens blijven van jou. Stop je, dan stop je.',
  formEyebrow: 'kandidaat stellen',
  formH2: 'stel je huis kandidaat.',
  formP: 'Elke woning wordt fysiek beoordeeld, ook als het antwoord uiteindelijk nee is.',
  kennisLink: 'eerst alles zelf uitzoeken? lees de kennisbank →',
  gesprekH3: 'liever meteen iemand spreken?',
  gesprekP: 'Kies zelf een moment voor een digitaal gesprek van dertig minuten.',
  gesprekCta: 'kies een moment',
  teamP: 'Je spreekt met ons team, niet met een callcenter. Wij komen zelf kijken en blijven je aanspreekpunt.',
}

export async function EigenaarContent() {
  const cijfers = await screeningsPubliek()
  const statItems = [
    cijfers?.aantal_dossier    ? { cijfer: String(cijfers.aantal_dossier),   label: 'dossiers bekeken' } : null,
    cijfers?.aantal_bezoek     ? { cijfer: String(cijfers.aantal_bezoek),    label: 'fysiek bezocht'   } : null,
    cijfers?.aantal_opgenomen  ? { cijfer: String(cijfers.aantal_opgenomen), label: 'opgenomen'        } : null,
    { cijfer: String(TOTAL_STAYS_REVIEWED), label: 'verblijven' },
  ].filter((x): x is { cijfer: string; label: string } => x !== null)

  return <EigenaarPagina copy={COPY} statItems={statItems} kennisHref="/kennis" standaardHref="/de-standaard" partnersHref="/partners" />
}
