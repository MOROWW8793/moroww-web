import { screeningsPubliek } from "@/lib/screenings";
import { TOTAL_STAYS_REVIEWED } from "@/lib/reviews";
import { liveWoningen, sortForCollectie } from "@/lib/woningen";
import { EigenaarPagina, type EigenaarCopy } from "@/components/eigenaar/EigenaarPagina";

// Labelversie EN (nov 2026). Natuurlijk Engels, geen letterlijke vertaling.

const COPY: EigenaarCopy = {
  eyebrow: 'for owners',
  h1: 'not every home belongs.',
  lead: 'moroww is becoming the place where travellers worldwide find stays that are right. Every home visited in person, every year again. You keep renting through your own channels. We vouch for the standard, so your guests see beforehand what your home is worth.',
  ctaKandidaat: 'put your home forward',
  ctaGesprek: 'book a call',
  heroAlt: 'Open kitchen and living space of a moroww home looking out on the garden',
  waardeEyebrow: 'what it brings you',
  waardeH2: 'more than a label on your listing.',
  waarde: [
    { titel: 'your difference, before the booking', tekst: 'Almost every home has good reviews, so a guest only sees the difference once they walk in. The label shows it beforehand, on your own listings and on moroww.com.' },
    { titel: 'guests who suit your home', tekst: 'People who choose a home we visited ourselves are looking for calm and care, not a party. They are the guests who treat what you built well.' },
    { titel: 'the partners of the collection', tekst: 'Craftspeople, technology and lifestyle brands we choose ourselves and hold to the standard, on terms we agree for all homes together. You no longer have to search yourself.' },
    { titel: 'peace of mind, even when you are away', tekst: 'We hold your home to the standard and keep an eye on what the rules ask, from registration to fire safety. If something is off, you hear it from us before a guest notices.' },
  ],
  huizenEyebrow: 'the homes that belong',
  huizenH2: 'this is the company your home would keep.',
  kringEyebrow: 'why owners want in',
  kringH2: 'a home made with care belongs among homes of its kind.',
  kringP: [
    'You did not buy it on a whim. You chose every material, every light, every chair. On a platform it sits among thousands of others, as if it were one of many.',
    'Not with moroww. We come to look ourselves and say no more often than yes. Those who belong carry a label that means something, because not everyone gets it.',
  ],
  standaardEyebrow: 'the standard',
  standaardH2: 'what a guest notices first, we look at most closely.',
  standaard: [
    { titel: 'no trace of the last guest', tekst: 'No hair, no crumb, no smell, no fingerprint, no forgotten item.', beeld: '/images/over-interieur-2.jpg', alt: 'Tidy living room with a red chair' },
    { titel: 'a bathroom without one hair', tekst: 'No limescale on glass or taps. A drain that runs freely and smells of nothing.', beeld: '/images/og-eigenaar.jpg', alt: 'A hand under a rain shower' },
    { titel: 'fresh linen, every time', tekst: 'Professionally laundered and fully changed at every turnover. The bed is made when the guest arrives.', beeld: '/images/standaard/V2-19.jpg', alt: 'A bed being made with white linen' },
    { titel: 'ready before arrival', tekst: 'The home is completely finished before the guest walks in. Not at the same time, not just after.', beeld: '/images/standaard/V2-40.jpg', alt: 'A guest reading in a freshly made bed' },
  ],
  standaardLink: 'read the standard →',
  erbijEyebrow: 'what comes with it',
  erbijH2: 'the label, and everything that comes with it.',
  erbij: [
    { titel: 'the label', tekst: 'On your own listings and on moroww.com, among homes with character that meet the same standard.' },
    { titel: 'the promise', tekst: 'Your guests get a promise that we stand behind.' },
    { titel: 'the partners', tekst: 'Local craftspeople for cleaning, linen and maintenance, the technology behind a smooth arrival, and lifestyle brands we choose ourselves to be in the homes. We hold them to the standard. You decide what you use.' },
    { titel: 'a say', tekst: 'As one of the first homes, you help shape what the standard looks like.' },
  ],
  erbijBeeldAlt: 'Towels being folded on a made bed',
  partnersLink: 'see the partners →',
  keuzesEyebrow: 'you choose how far we go',
  keuzesH2: 'three ways to belong.',
  keuzes: [
    { nummer: '01', titel: 'the label', kop: 'you rent it out.', tekst: 'We visit, award the label and follow up. Your home is in the collection and carries the label on your own channels.' },
    { nummer: '02', titel: 'help where needed', kop: 'you stay in control.', tekst: 'We fix what chafes. A local partner, a smart lock, sensors that warn you before there is damage.' },
    { nummer: '03', titel: 'we do it for you', kop: 'you get your weekends back.', tekst: 'Distribution across all channels and book.moroww.com. We handle guest contact and run the cleaning.' },
  ],
  keuzesSlot: 'The standard is the same for every home.',
  batchEyebrow: 'the next batch',
  batchH2: 'ten homes.',
  batchP: 'We have opened our next batch to ten homes that want to test the label with us. Not every home gets in.',
  batchStartIt: 'supported by',
  stappenEyebrow: 'how it runs',
  stappen: [
    { nummer: '01', titel: 'put it forward', tekst: 'We get in touch personally within two working days.' },
    { nummer: '02', titel: 'our visit', tekst: 'We come to look, walk through every room and say honestly what it needs.' },
    { nummer: '03', titel: 'the label', tekst: 'If your home passes, it carries the label and joins the collection.' },
  ],
  stappenSlot: 'You are not tied to anything. Your listings, your bookings and your guest data stay yours. If you stop, you stop.',
  formEyebrow: 'put your home forward',
  formH2: 'put your home forward.',
  formP: 'Every home is assessed in person, even when the answer turns out to be no.',
  kennisLink: 'want to figure it out yourself first? read the knowledge base (in Dutch) →',
  gesprekH3: 'prefer to speak to someone directly?',
  gesprekP: 'Book a thirty-minute video call at a time that suits you.',
  gesprekCta: 'book a time',
  teamP: 'You speak with our team, not a call centre. We come to look ourselves and stay your point of contact.',
}

export async function EigenaarContentEN() {
  const cijfers = await screeningsPubliek()
  const statItems = [
    cijfers?.aantal_dossier    ? { cijfer: String(cijfers.aantal_dossier),   label: 'files reviewed'    } : null,
    cijfers?.aantal_bezoek     ? { cijfer: String(cijfers.aantal_bezoek),    label: 'visited in person' } : null,
    cijfers?.aantal_opgenomen  ? { cijfer: String(cijfers.aantal_opgenomen), label: 'accepted'          } : null,
    { cijfer: String(TOTAL_STAYS_REVIEWED), label: 'stays' },
  ].filter((x): x is { cijfer: string; label: string } => x !== null)

  const huizen = sortForCollectie(liveWoningen()).filter((w) => w.heroFoto).map((w) => ({ id: w.id, naam: w.naam, locatie: w.locatie, foto: w.heroFoto as string }))

  return <EigenaarPagina copy={COPY} statItems={statItems} huizen={huizen} kennisHref="/kennis" standaardHref="/en/the-standard" partnersHref="/en/partners" />
}
