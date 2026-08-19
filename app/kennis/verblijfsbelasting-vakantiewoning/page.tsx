import Link from 'next/link'
import { kennisMetadata, KENNIS_GEPUBLICEERD } from '@/lib/kennis/meta'
import { ArticleLayout } from '@/components/kennis/ArticleLayout'
import { Cta, VerderLezen } from '@/components/kennis/Cta'
import { Faq } from '@/components/kennis/Faq'
import { Actualiteitsblok } from '@/components/kennis/Actualiteitsblok'
import { ArticleJsonLd } from '@/components/kennis/JsonLd'
import {
  alleGemeenten,
  formatDatumNL,
  HEFFINGSVORM_LABEL,
} from '@/lib/kennis/verblijfsbelasting'

const URL = 'https://www.moroww.com/kennis/verblijfsbelasting-vakantiewoning'

export const metadata = kennisMetadata({
  titel: 'Verblijfsbelasting vakantiewoning per gemeente · tarieven 2026',
  beschrijving:
    'Wat de verblijfsbelasting op een vakantiewoning kost per gemeente, hoe ze berekend wordt en wanneer je aangifte doet. Nagekeken tegen het gemeentelijk reglement.',
  pad: '/kennis/verblijfsbelasting-vakantiewoning',
})

export const revalidate = 3600

function tariefKort(r: {
  heffingsvorm: string
  tarief_bedrag: number | null
  tarief_eenheid: string | null
  tarief_bedrag_alt: number | null
  tarief_eenheid_alt: string | null
  status: string | null
}): string {
  if (r.tarief_bedrag != null) {
    let s = `€ ${r.tarief_bedrag}`
    if (r.tarief_eenheid) s += ` — ${r.tarief_eenheid}`
    if (r.tarief_bedrag_alt != null) {
      s += ` · € ${r.tarief_bedrag_alt}`
      if (r.tarief_eenheid_alt) s += ` — ${r.tarief_eenheid_alt}`
    }
    return s
  }
  return r.status ?? 'op te vragen'
}

export default async function VerblijfsbelastingHubPage() {
  const rijen = await alleGemeenten()

  return (
    <>
      <ArticleJsonLd
        titel="Verblijfsbelasting vakantiewoning per gemeente"
        beschrijving="Tarieven van de gemeentelijke verblijfs- en logiesbelasting per Belgische gemeente, met bron en datum van laatste controle."
        url={URL}
        datumGepubliceerd={KENNIS_GEPUBLICEERD}
        datumGewijzigd="2026-08-19"
      />

      <ArticleLayout
        eyebrow="regels en vergunningen"
        terug={{ href: '/kennis', label: 'kennisbank' }}
        titel="Verblijfsbelasting voor een vakantiewoning, per gemeente"
        korteAntwoord="De verblijfsbelasting op een vakantiewoning is een gemeentelijke belasting en verschilt sterk per gemeente. Er bestaan twee systemen: een bedrag per persoon per overnachting, of een vast bedrag per jaar per slaapplaats of per verblijfseenheid. Aan de kust geldt meestal het tweede systeem, met bedragen tot enkele honderden euro's per eenheid of per bed per jaar."
      >
        <h2>De tarieven per gemeente</h2>

        {rijen.length === 0 ? (
          <p>
            De tabel wordt zo dadelijk geladen. Krijg je deze zin te zien nadat je de
            pagina hebt herladen, laat het weten via{' '}
            <a href="mailto:info@moroww.com">info@moroww.com</a>.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table>
              <thead>
                <tr>
                  <th>Gemeente</th>
                  <th>Systeem</th>
                  <th>Tarief</th>
                  <th>Bron nagekeken</th>
                </tr>
              </thead>
              <tbody>
                {rijen.map((r) => (
                  <tr key={r.gemeente_slug}>
                    <td>
                      <Link
                        href={`/kennis/verblijfsbelasting-vakantiewoning/${r.gemeente_slug}`}
                        className="font-semibold"
                      >
                        {r.gemeente_naam}
                      </Link>
                      <div className="text-xs text-[#1A1A1A]/60">{r.provincie}</div>
                    </td>
                    <td>{HEFFINGSVORM_LABEL[r.heffingsvorm]}</td>
                    <td>{tariefKort(r)}</td>
                    <td>{formatDatumNL(r.laatst_nagekeken_op)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <p>
          Staat jouw gemeente er nog niet bij? Vraag ze op via{' '}
          <a href="mailto:info@moroww.com">info@moroww.com</a> en we zoeken het uit.
        </p>

        <Cta
          kind="vraag"
          intro="Staat jouw gemeente nog niet in de tabel, of klopt het bedrag op je aanslagbiljet niet met wat hier staat?"
        />

        <h2>Waarom de bedragen zo ver uit elkaar liggen</h2>
        <p>
          Verblijfsbelasting is geen Vlaamse maar een gemeentelijke belasting. Elke
          gemeenteraad stemt een eigen reglement, doorgaans voor een periode van zes jaar
          die samenvalt met de legislatuur. Vandaar dat veel reglementen nu lopen van 2026
          tot 2031.
        </p>
        <p>Er zijn twee systemen en het verschil is voor een grote woning aanzienlijk.</p>

        <table>
          <thead>
            <tr>
              <th>Systeem</th>
              <th>Hoe het werkt</th>
              <th>Wat het voor jou betekent</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Per persoon per overnachting</td>
              <td>Je betaalt per gast per nacht</td>
              <td>
                Schaalt mee met je bezetting. Lege nachten kosten niets. Vraagt wel dat je
                een register bijhoudt en periodiek aangeeft.
              </td>
            </tr>
            <tr>
              <td>Forfait per jaar</td>
              <td>Een vast bedrag per slaapplaats of per verblijfseenheid, ongeacht of er iemand slaapt</td>
              <td>Administratief eenvoudig, maar je betaalt evenveel in een slecht jaar als in een goed jaar.</td>
            </tr>
          </tbody>
        </table>
        <p>
          Voor woningen die aan de moroww-standaard voldoen, minstens 100 m² en minstens
          twee slaapkamers, weegt het forfaitaire systeem per slaapplaats het zwaarst. Een
          woning in Knokke-Heist met tien slaapplaatsen betaalt aan € 250 per slaapplaats
          € 2.500 per jaar, of er nu vijftig of tweehonderd nachten geboekt worden. Dat is
          een vaste kost die in geen enkele publieke rekentool staat.
        </p>
        <p>Onze rekenmodule neemt hem wel mee.</p>

        <Cta kind="rekenmodule" />

        <h2>Mag je de belasting doorrekenen aan je gasten?</h2>
        <p>
          Doorgaans wel, en sommige gemeenten zeggen er expliciet iets over. Oostende laat
          toe dat je maximaal € 4,72 exclusief btw per kamer of verblijfseenheid per nacht
          doorrekent aan je gasten. De Panne adviseert € 1 per persoon per nacht bovenop
          de normale prijs. Bij een forfaitair systeem betekent dat concreet: je betaalt
          de gemeente één bedrag per jaar, en wat je bij je gasten int, kan meer of minder
          zijn dan dat.
        </p>
        <p>Controleer altijd de tekst van je eigen reglement voor je iets aan een gast aanrekent.</p>

        <h2>Wat als je niet aangeeft</h2>
        <p>
          De aangifteplicht ligt bij de uitbater. Verhuur je via een makelaar of kantoor,
          dan ontvangt die het aanslagbiljet, maar de verantwoordelijkheid blijft
          contractueel bepaald.
        </p>
        <p>
          <strong>Je bent belastingplichtig ook als je niet in orde bent.</strong> De
          gemeente De Panne stelt het onomwonden: wie niet gekend is bij Toerisme
          Vlaanderen of wiens woning niet conform is, is evengoed belastingplichtig. Je
          biedt tegen betaling een verblijf aan op de toeristische markt, en dat volstaat.
          Sommige gemeenten belasten niet-aangemelde logies zelfs aan een hoger tarief. In
          Knokke-Heist betalen informele logies € 500 per slaapplaats tegenover € 250 voor
          aangemelde vakantiewoningen. Niet aanmelden is daar dus letterlijk twee keer
          duurder.
        </p>
        <p>
          <strong>
            De aangifte bij de gemeente en de aanmelding bij Toerisme Vlaanderen zijn twee
            verschillende verplichtingen.
          </strong>{' '}
          Bij twee verschillende overheden. De ene regelen ontslaat je niet van de andere.
        </p>
        <p>
          Bij een laattijdige of onjuiste aangifte kan de belasting ambtshalve
          ingekohierd worden, met verhogingen. Oostende hanteert vijftig procent bij een
          eerste overtreding en honderd procent bij herhaling.
        </p>

        <Cta kind="poortentoets" />

        <Faq
          items={[
            {
              vraag: 'Is de verblijfsbelasting hetzelfde als de belasting op tweede verblijven?',
              antwoord:
                'Nee. Het zijn twee verschillende gemeentelijke belastingen met twee verschillende reglementen. In sommige gemeenten sluiten ze elkaar uit voor wie verhuurt, in andere zijn ze allebei verschuldigd. Zie de aparte pagina hierover.',
            },
            {
              vraag: 'Ik verhuur maar enkele weken per jaar. Betaal ik het volle bedrag?',
              antwoord:
                'Dat hangt van het systeem af. Oostende voorziet sinds 1 juli 2025 een verlaagd tarief van € 275 voor occasionele verhuur tot 120 dagen per jaar tegenover € 825 voor permanent aanbod. Bij een systeem per overnachting betaal je automatisch naar rato. Bij een zuiver forfait doorgaans niet.',
            },
            {
              vraag: 'Mijn woning stond maanden leeg door verbouwing.',
              antwoord:
                'Verschillende gemeenten voorzien een vermindering. Oostende geeft een pro rata vrijstelling bij een sluiting van minstens dertig dagen, op voorwaarde dat je dat vooraf correct meldt. Vooraf, niet achteraf.',
            },
            {
              vraag: 'Wie betaalt als ik met moroww werk?',
              antwoord:
                'Jij. De aangifte en de fiscale relatie met de gemeente blijven bij de eigenaar. Wij leveren de overnachtingsgegevens uit het systeem aan zodat de aangifte klopt en op tijd vertrekt. Een label bepaalt de standaard; het neemt je fiscale positie niet over.',
            },
          ]}
        />

        <Cta kind="gesprek" />

        <VerderLezen
          items={[
            {
              href: '/kennis/tweedeverblijfsbelasting-of-logiesbelasting',
              title: 'Tweedeverblijf of logies?',
              eyebrow: 'regels en vergunningen',
            },
            {
              href: '/kennis/wat-kost-een-nacht-vakantiewoning',
              title: 'Wat een nacht echt kost',
              eyebrow: 'opbrengst en rendement',
            },
            {
              href: '/kennis/brandveiligheidsattest-vakantiewoning-vlaanderen',
              title: 'Brandveiligheidsattest',
              eyebrow: 'regels en vergunningen',
            },
          ]}
        />

        <Actualiteitsblok
          nagekekenOp="19 augustus 2026"
          bron="bronnen per gemeente in de tabel — zie de detailpagina van elke gemeente"
        />
      </ArticleLayout>
    </>
  )
}
