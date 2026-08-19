import { kennisMetadata, KENNIS_GEPUBLICEERD } from '@/lib/kennis/meta'
import { ArticleLayout } from '@/components/kennis/ArticleLayout'
import { Cta, VerderLezen } from '@/components/kennis/Cta'
import { Faq } from '@/components/kennis/Faq'
import { Actualiteitsblok } from '@/components/kennis/Actualiteitsblok'
import { ArticleJsonLd } from '@/components/kennis/JsonLd'
import { SCREENINGS_TOTAL, SCREENINGS_ACCEPTED } from '@/lib/screenings'

const URL = 'https://www.moroww.com/kennis/vakantiewoning-verhuren-zelf-platform-beheerder-label'

export const metadata = kennisMetadata({
  titel: 'Zelf verhuren, platform, beheerder of label? · vier modellen vergeleken',
  beschrijving:
    'Wat de vier manieren om een vakantiewoning te verhuren je kosten, opleveren en vragen aan tijd. Inclusief wanneer moroww niet de juiste keuze is.',
  pad: '/kennis/vakantiewoning-verhuren-zelf-platform-beheerder-label',
})

export default function VierModellenPage() {
  return (
    <>
      <ArticleJsonLd
        titel="Zelf verhuren, platform, beheerder of label?"
        beschrijving="Vergelijking van de vier gangbare modellen om een vakantiewoning in België te verhuren, met kosten, tijdsbesteding en kwaliteitscontrole."
        url={URL}
        datumGepubliceerd={KENNIS_GEPUBLICEERD}
        datumGewijzigd="2026-08-19"
      />

      <ArticleLayout
        eyebrow="kiezen hoe je verhuurt"
        terug={{ href: '/kennis', label: 'kennisbank' }}
        titel="Zelf verhuren, via een platform, een beheerder, of een label?"
        korteAntwoord="Er zijn vier manieren om een vakantiewoning te verhuren: volledig zelf, via boekingsplatformen met eigen beheer, via een beheerder die alles overneemt, of via een label dat een standaard oplegt en het systeem levert. Ze verschillen in kost, in tijdsbesteding en vooral in wie de kwaliteit bewaakt."
      >
        <h2>De vier modellen naast elkaar</h2>
        <div className="overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th></th>
                <th>Zelf</th>
                <th>Platform + eigen beheer</th>
                <th>Beheerder</th>
                <th>Label</th>
              </tr>
            </thead>
            <tbody>
              <tr><th>Wie zoekt gasten</th><td>jij</td><td>het platform</td><td>de beheerder</td><td>het label en de platformen</td></tr>
              <tr><th>Wie bepaalt de standaard</th><td>jij</td><td>niemand</td><td>de beheerder, vaak impliciet</td><td>het label, expliciet en met inspectie</td></tr>
              <tr><th>Kost</th><td>tijd</td><td>platformcommissie</td><td>commissie, doorgaans hoger</td><td>commissie plus lidmaatschap</td></tr>
              <tr><th>Tijdsbesteding per week</th><td>hoog</td><td>middelhoog</td><td>laag</td><td>laag</td></tr>
              <tr><th>Kwaliteitscontrole ter plaatse</th><td>jijzelf</td><td>geen</td><td>wisselend</td><td>fysieke audit, met heraudit</td></tr>
              <tr><th>Kan je woning geweigerd worden</th><td>nee</td><td>nee</td><td>zelden</td><td>ja, meestal wel</td></tr>
            </tbody>
          </table>
        </div>
        <p>
          Die laatste rij is het hele verschil. Bij de eerste drie modellen bepaalt
          niemand of jouw woning goed genoeg is. Dat klinkt comfortabel, tot je beseft dat
          het ook betekent dat de woning naast de jouwe, die het niet is, in dezelfde
          lijst staat en dezelfde gast bereikt.
        </p>

        <h2>Wat het label anders doet</h2>
        <p>
          moroww is een kwaliteitslabel voor vakantiewoningen, geen beheerder en geen
          platform. De eigenaar levert de muren. Het label legt de belevingslaag erover:
          linnen en essentials op niveau, een schoonmaakprotocol dat wij bepalen en
          controleren, en de stille systemen die het verblijf dragen.
        </p>
        <p>
          De woning wordt fysiek geïnspecteerd voor ze in de collectie komt. Ze wordt
          opnieuw geauditeerd. En ze gaat eruit als ze niet meer voldoet. Van de{' '}
          {SCREENINGS_TOTAL} woningen die we bekeken, kwamen er {SCREENINGS_ACCEPTED} in.
        </p>
        <p>
          Wat het niet is: wij nemen je gastcontact niet over als je dat zelf wil doen.
          Veel eigenaars beschouwen dat contact als deel van hun vakmanschap, en terecht.
          De gastpagina&apos;s en welkomstflows liggen klaar voor de praktische informatie.
          Wat persoonlijk hoort te blijven, blijft persoonlijk.
        </p>

        <Cta kind="poortentoets" />

        <h2>Wanneer moroww níet de juiste keuze is</h2>
        <p>Vier situaties waarin je beter iets anders kiest, en we zeggen dat liever nu dan in maand zes.</p>

        <p>
          <strong>Je woning haalt de poorten niet.</strong> Onder 100 m², minder dan twee
          slaapkamers, of in een drukke stadskern. Dat zijn geen richtlijnen maar
          voorwaarden, en we maken er geen uitzonderingen op.
        </p>
        <p>
          <strong>Je wil zelf de standaard bepalen.</strong> Het label betekent dat wij
          bepalen hoe de woning erbij ligt bij aankomst, tot in het detail van het linnen.
          Als dat wringt, is een beheerder of eigen beheer eerlijker voor iedereen.
        </p>
        <p>
          <strong>Je verhuurt enkele weekends per jaar.</strong> Het model, met
          lidmaatschap en onboarding, weegt dan niet op tegen de opbrengst. Blijf bij
          eigen beheer via de platformen.
        </p>
        <p>
          <strong>Je zoekt in de eerste plaats de laagste kost.</strong> Een beheerder
          zonder standaard is soms goedkoper. Wat je daarvoor inlevert, is de garantie.
          Dat is een legitieme keuze; ze is alleen niet de onze.
        </p>

        <Cta
          kind="vraag"
          intro="Twijfel je tussen twee van deze vier modellen voor jouw woning?"
        />

        <Faq
          items={[
            {
              vraag: 'Word ik exclusief aan moroww gebonden?',
              antwoord:
                'De collectie werkt met een label en een standaard, niet met een slot op je deur. De precieze afspraken rond distributie bespreken we in het gesprek, voor er iets getekend wordt.',
            },
            {
              vraag: 'Blijf ik eigenaar van mijn boekingen en gastgegevens?',
              antwoord:
                'Ja. De hardware wordt na volledige betaling jouw eigendom, de software blijft in licentie. De geldstroom loopt over een gescheiden rekening, en dat is zo sinds de start.',
            },
            {
              vraag: 'Wat als ik na een jaar wil stoppen?',
              antwoord:
                'Dan stop je. Een label dat mensen moet vasthouden met een contract, heeft geen label nodig maar een advocaat.',
            },
            {
              vraag: 'Doen jullie ook het onderhoud en de schoonmaak zelf?',
              antwoord:
                'De standaard is de onze en de checklist is de onze. De uitvoering regel je zelf of via een partner die aan die standaard voldoet.',
            },
          ]}
        />

        <Cta kind="poortentoets" />
        <Cta kind="gesprek" />

        <VerderLezen
          items={[
            {
              href: '/kennis/wat-kost-een-nacht-vakantiewoning',
              title: 'Wat een nacht echt kost',
              eyebrow: 'opbrengst en rendement',
            },
            {
              href: '/kennis/waarom-vakantiewoningen-afvallen',
              title: 'Waarom woningen afvallen',
              eyebrow: 'wat het label anders doet',
            },
            {
              href: '/kennis/rendement-vakantiewoning-berekenen',
              title: 'Rendement berekenen',
              eyebrow: 'opbrengst en rendement',
            },
          ]}
        />

        <Actualiteitsblok nagekekenOp="19 augustus 2026" />
      </ArticleLayout>
    </>
  )
}
