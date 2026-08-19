import { kennisMetadata, KENNIS_GEPUBLICEERD } from '@/lib/kennis/meta'
import { ArticleLayout } from '@/components/kennis/ArticleLayout'
import { H2Section } from '@/components/kennis/H2Section'
import { Cta, VerderLezen } from '@/components/kennis/Cta'
import { Actualiteitsblok } from '@/components/kennis/Actualiteitsblok'
import { ArticleJsonLd } from '@/components/kennis/JsonLd'

const URL = 'https://www.moroww.com/kennis/tweedeverblijfsbelasting-of-logiesbelasting'

export const metadata = kennisMetadata({
  titel: 'Tweedeverblijfsbelasting of logiesbelasting? · het verschil',
  beschrijving:
    'Twee gemeentelijke belastingen, twee reglementen, soms allebei verschuldigd. Wanneer welke geldt en waarom het honderden euro\'s per jaar scheelt.',
  pad: '/kennis/tweedeverblijfsbelasting-of-logiesbelasting',
})

export default function VerschilPage() {
  return (
    <>
      <ArticleJsonLd
        titel="Tweedeverblijfsbelasting of logiesbelasting?"
        beschrijving="Vergelijking van de twee gemeentelijke belastingen die eigenaars van vakantiewoningen aan de Belgische kust structureel verwarren."
        url={URL}
        datumGepubliceerd={KENNIS_GEPUBLICEERD}
        datumGewijzigd="2026-08-19"
      />

      <ArticleLayout
        eyebrow="regels en vergunningen"
        terug={{ href: '/kennis', label: 'kennisbank' }}
        titel="Tweedeverblijfsbelasting of logiesbelasting?"
        korteAntwoord="De belasting op tweede verblijven treft eigenaars van een woning waar niemand gedomicilieerd is. De belasting op toeristische logies treft wie tegen betaling toeristen laat overnachten. Het zijn twee aparte gemeentelijke belastingen. In sommige gemeenten sluiten ze elkaar uit zodra je verhuurt, in andere zijn ze allebei verschuldigd. Alleen het reglement van je eigen gemeente geeft uitsluitsel."
      >
        <H2Section titel="Waar het verschil zit" />
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Tweede verblijven</th>
              <th>Toeristische logies</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>Wat wordt belast</th>
              <td>Het bezit van een woning zonder domicilie</td>
              <td>Het verstrekken van verblijf tegen betaling</td>
            </tr>
            <tr>
              <th>Wie betaalt</th>
              <td>De eigenaar</td>
              <td>De uitbater</td>
            </tr>
            <tr>
              <th>Hangt af van verhuur</th>
              <td>Nee, ook een leegstaand tweede verblijf betaalt</td>
              <td>Ja</td>
            </tr>
            <tr>
              <th>Vorm</th>
              <td>Doorgaans één jaarlijks forfait</td>
              <td>Per overnachting, per slaapplaats of per eenheid</td>
            </tr>
          </tbody>
        </table>

        <H2Section titel="De twee regimes in de praktijk" />
        <p>
          <strong>Gemeenten waar ze elkaar uitsluiten.</strong> In Knokke-Heist vallen
          woningen die als vakantiewoning verhuurd worden onder het logiesreglement en
          niet onder het tweedeverblijfsreglement. Je zit in het ene of in het andere
          dossier.
        </p>
        <p>
          <strong>Gemeenten waar ze cumuleren.</strong> De Panne bevestigt uitdrukkelijk
          dat beide belastingen verschuldigd zijn, ook als je al belast wordt op een
          wooneenheid zonder domicilie. De motivering: de logiesbelasting laat ook wie
          occasioneel in de gemeente verblijft meebetalen voor uitgaven die de gemeente
          doet. Koksijde voerde in 2026 een belasting op de uitbating van toeristische
          logies in, bovenop de bestaande tweedeverblijfstaks.
        </p>
        <p>Er is geen algemene regel. Er is enkel jouw reglement.</p>

        <Cta
          kind="vraag"
          intro="Zit je in het juiste dossier bij je gemeente? Stuur je aanslagbiljet of je gemeente door en we zoeken uit welk regime bij jou geldt."
        />

        <H2Section titel="Waarom dit meer dan administratie is" />
        <p>Twee gevolgen die eigenaars pas laat ontdekken.</p>
        <p>
          <strong>Het bedrag verschilt sterk.</strong> Aan de kust liggen de
          tweedeverblijfstarieven voor 2026 rond € 990 in Knokke-Heist, € 1.119 in De
          Panne en € 1.200 in Koksijde, met verlaagde tarieven voor kleinere oppervlakten
          in De Panne en Koksijde. Een logiesbelasting per slaapplaats kan voor een grote
          woning ruim daarboven uitkomen, en voor een kleine woning ver eronder.
        </p>
        <p>
          <strong>Het verkeerde dossier corrigeert zichzelf niet.</strong> Gemeenten
          vergelijken hun bestanden steeds vaker met het basisregister van aangemelde
          logies en met wat publiek op boekingsplatformen staat. Een woning die zichtbaar
          verhuurt maar enkel als tweede verblijf gekend is, valt daarbij op.
        </p>

        <H2Section titel="En de lopende procedures?" />
        <p>
          Rond de tweedeverblijfstaks in Knokke-Heist, Koksijde en De Panne lopen
          procedures, onder meer bij de Raad van State. De kern van het geschil is dat de
          vaste inwoners van die gemeenten geen of nauwelijks aanvullende
          personenbelasting betalen, terwijl tweedeverblijvers wel belast worden. Koksijde
          en De Panne voerden vanaf 2026 een aanvullende personenbelasting van vijf
          procent in, wat deels tegemoetkomt aan die kritiek.
        </p>
        <p>
          Als een reglement vernietigd wordt, moet de gemeente de betaalde belasting
          terugbetalen. Het kan ook dat de vernietiging enkel voor de toekomst geldt. Wie
          zijn aanslag wil openhouden, dient een bezwaarschrift in binnen drie maanden
          vanaf de derde werkdag na verzending.
        </p>
        <p>
          moroww is geen partij in deze procedures en geeft geen juridisch advies. We
          zetten het hier omdat het meebepaalt wat een pand aan de kust kost, en omdat de
          termijn om te reageren kort is.
        </p>

        <Cta kind="poortentoets" />
        <Cta kind="gesprek" />

        <VerderLezen
          items={[
            {
              href: '/kennis/verblijfsbelasting-vakantiewoning',
              title: 'Alle gemeenten',
              eyebrow: 'tabel per gemeente',
            },
            {
              href: '/kennis/verblijfsbelasting-vakantiewoning/oostende',
              title: 'Oostende',
              eyebrow: 'gemeente uitgewerkt',
            },
            {
              href: '/kennis/brandveiligheidsattest-vakantiewoning-vlaanderen',
              title: 'Brandveiligheidsattest',
              eyebrow: 'regels en vergunningen',
            },
          ]}
        />

        <Actualiteitsblok nagekekenOp="19 augustus 2026" />
      </ArticleLayout>
    </>
  )
}
