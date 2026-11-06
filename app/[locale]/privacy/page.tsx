import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { siteMetadata } from "@/lib/seo/siteMetadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  await params;
  // NL-only pagina — geen hreflang naar EN.
  return siteMetadata({
    titel: 'Privacybeleid',
    beschrijving:
      'Het privacybeleid van moroww — hoe wij omgaan met uw persoonsgegevens.',
    pad: '/privacy',
    locale: 'nl',
  });
}

function Divider() {
  return <hr className="border-moroww-black/10 my-8" />;
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-lg font-semibold text-moroww-black mb-3">{title}</h2>
      {children}
    </section>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="text-moroww-black/70 leading-relaxed mb-3">{children}</p>;
}

function Ul({ children }: { children: React.ReactNode }) {
  return <ul className="list-disc list-inside space-y-1 text-moroww-black/70 leading-relaxed mb-3 pl-1">{children}</ul>;
}

function Li({ children }: { children: React.ReactNode }) {
  return <li>{children}</li>;
}

function B({ children }: { children: React.ReactNode }) {
  return <strong className="font-semibold text-moroww-black">{children}</strong>;
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="bg-moroww-blush min-h-screen">
      <div className="mx-auto max-w-2xl px-6 py-24 md:py-32">

        {/* Notice voor Engelstalige lezers — dit document bestaat alleen in het Nederlands. */}
        <p className="text-sm text-moroww-black/50 italic border-l-2 border-moroww-orange pl-4 mb-10">
          This privacy policy is available in Dutch. For questions in English, contact{" "}
          <a href="mailto:info@moroww.com" className="underline underline-offset-2 hover:text-moroww-orange transition-colors">
            info@moroww.com
          </a>
          .
        </p>

        <p className="text-xs font-semibold uppercase tracking-widest text-moroww-orange mb-4">
          Privacybeleid
        </p>
        <h1 className="font-bold text-moroww-black text-4xl md:text-5xl mb-3 leading-tight">
          Uw gegevens, helder uitgelegd.
        </h1>
        <p className="text-sm text-moroww-black/40 mb-10">
          Versie 1.3 — Laatst bijgewerkt: 6 november 2026
        </p>

        <P>
          In dit beleid leest u welke persoonsgegevens moroww verwerkt, waarom, met wie we ze delen,
          hoe lang we ze bewaren en welke rechten u heeft. Het geldt voor gasten, eigenaars en
          hosts, kandidaat-hosts en bezoekers van moroww.com.
        </P>

        <Divider />

        <Section title="1. Wie is verantwoordelijk">
          <P>De verwerkingsverantwoordelijke is:</P>
          <P>
            moroww bv (besloten vennootschap)<br />
            Neerstraat 10, 8793 Sint-Eloois-Vijve (Waregem), België<br />
            Ondernemingsnummer / btw: BE1030.667.956<br />
            E-mail:{" "}
            <a href="mailto:info@moroww.com" className="underline underline-offset-2 hover:text-moroww-orange transition-colors">
              info@moroww.com
            </a>
          </P>
        </Section>

        <Divider />

        <Section title="2. Welke gegevens wij verwerken">
          <P>Welke gegevens we verwerken, hangt af van uw relatie tot moroww.</P>

          <p className="font-semibold text-moroww-black mb-2">Gasten</p>
          <Ul>
            <Li><B>Identiteit en contact:</B> naam, e-mailadres, telefoonnummer en taal.</Li>
            <Li><B>Boeking:</B> woning, verblijfsdata, aantal gasten, prijs en betaalstatus.</Li>
            <Li><B>Communicatie:</B> berichten die u met ons of via de gastpagina uitwisselt.</Li>
            <Li><B>Toegang:</B> de tijdelijke code voor het slimme slot tijdens uw verblijf.</Li>
            <Li><B>Geluidsniveau:</B> decibelwaarden van de geluidsmonitor in de woning (zie punt 3).</Li>
            <Li><B>Partnerlink:</B> via welke partner u bij ons kwam, als u daarvoor toestemming gaf (zie punt 9).</Li>
          </Ul>
          <P>
            Uw kaartgegevens verwerkt de betaaldienst of het boekingsplatform waarlangs u betaalt.
            moroww ziet ze niet.
          </P>

          <p className="font-semibold text-moroww-black mb-2 mt-4">Eigenaars en hosts</p>
          <Ul>
            <Li><B>Identiteit en contact:</B> naam, e-mailadres en telefoonnummer.</Li>
            <Li><B>Woning en samenwerking:</B> gegevens over de woning en de afspraken met moroww.</Li>
            <Li><B>Financieel:</B> uitbetalingen, afrekeningen, commissie en facturatiegegevens.</Li>
            <Li><B>Account:</B> uw inloggegevens voor het host-portaal en het tijdstip waarop u de voorwaarden aanvaardde.</Li>
          </Ul>

          <p className="font-semibold text-moroww-black mb-2 mt-4">Kandidaat-hosts</p>
          <P>
            Publiek beschikbare gegevens over de woning en de contactgegevens van de eigenaar of
            beheerder. We gebruiken ze om de woning te beoordelen en u eventueel te contacteren.
          </P>

          <p className="font-semibold text-moroww-black mb-2 mt-4">Websitebezoekers</p>
          <P>Cookies (zie punt 9) en wat u zelf invult in een contactformulier.</P>
        </Section>

        <Divider />

        <Section title="3. De geluidsmonitor en het slimme slot">
          <P>
            In de woningen van de collectie staan slimme toestellen. Twee ervan verwerken gegevens.
          </P>
          <P>
            <B>De geluidsmonitor</B> meet enkel decibelwaarden. Hij neemt geen gesprekken, stemmen of
            ander geluid op. We gebruiken de waarden alleen om de kwaliteit te bewaken en de buren te
            beschermen, zodat we overlast tijdig zien zonder uw privacy te raken.
          </P>
          <P>
            <B>Het slimme slot</B> maakt sleutelloze toegang mogelijk. Voor uw verblijf maken we een
            tijdelijke code aan die daarna vervalt. moroww beheert de codes; de eigenaar van de
            woning ziet ze niet.
          </P>
        </Section>

        <Divider />

        <Section title="4. Waarvoor en op welke grond">
          <P>We verwerken uw gegevens enkel voor deze doeleinden, telkens op een rechtsgrond uit de GDPR.</P>
          <Ul>
            <Li><B>Uw boeking en verblijf</B> (reservatie, communicatie, toegang tot de woning). Grond: uitvoering van de overeenkomst.</Li>
            <Li><B>De samenwerking met eigenaars</B> (afrekeningen, uitbetalingen, portaal). Grond: uitvoering van de overeenkomst.</Li>
            <Li><B>Kwaliteit en rust</B> (geluidsmonitor, buurtbescherming, beveiliging van de woning). Grond: gerechtvaardigd belang van moroww en de eigenaar.</Li>
            <Li><B>Kandidaat-hosts beoordelen en contacteren.</B> Grond: gerechtvaardigd belang bij het opbouwen van de collectie. U kunt hiertegen bezwaar maken (zie punt 10).</Li>
            <Li><B>Samenwerkingen met partners opvolgen</B> (partnerlink). Grond: toestemming.</Li>
            <Li><B>Wettelijke verplichtingen</B> (boekhouding, btw, fiscale bewaarplicht). Grond: wettelijke verplichting.</Li>
            <Li><B>Nieuws en aanbiedingen,</B> als u dat wenst. Grond: toestemming, die u altijd kunt intrekken.</Li>
          </Ul>
        </Section>

        <Divider />

        <Section title="5. Met wie wij gegevens delen">
          <P>
            moroww verkoopt uw gegevens niet. We delen ze alleen met wie ze nodig heeft om de dienst
            te leveren, en alleen wat daarvoor nodig is:
          </P>
          <Ul>
            <Li><B>Dienstverleners</B> voor reservatie- en kanaalbeheer, prijszetting, betalingen, slimme sloten, e-mail, hosting en opslag, en automatische vertaling van berichten.</Li>
            <Li><B>Partners ter plaatse,</B> zoals de schoonmaak, voor wat ze nodig hebben om uw verblijf voor te bereiden.</Li>
            <Li><B>De eigenaar of host</B> van de woning, voor zover nodig voor uw verblijf.</Li>
            <Li><B>Boekingsplatformen</B> waarlangs u boekt. Voor de gegevens die zij zelf verzamelen, zijn zij zelf verantwoordelijk.</Li>
            <Li><B>Onze boekhouder</B> en, als de wet het vraagt, de bevoegde overheden.</Li>
          </Ul>
          <P>
            Partners die gasten naar moroww.com sturen, krijgen alleen totalen: hoeveel bezoekers en
            boekingen via hen kwamen. Nooit gegevens waarmee u herkend kunt worden.
          </P>
          <P>
            Met elke dienstverlener die namens ons gegevens verwerkt, sluiten we een
            verwerkersovereenkomst. Een lijst van deze dienstverleners krijgt u op verzoek via{" "}
            <a href="mailto:info@moroww.com" className="underline underline-offset-2 hover:text-moroww-orange transition-colors">
              info@moroww.com
            </a>
            .
          </P>
        </Section>

        <Divider />

        <Section title="6. Doorgifte buiten de Europese Economische Ruimte">
          <P>
            Enkele dienstverleners zijn gevestigd buiten de EER, onder meer in de Verenigde Staten.
            Gaan uw gegevens daarheen, dan gebeurt dat met passende waarborgen, zoals de
            modelcontractbepalingen van de Europese Commissie.
          </P>
        </Section>

        <Divider />

        <Section title="7. Hoe lang wij uw gegevens bewaren">
          <P>Niet langer dan nodig voor de doeleinden hierboven:</P>
          <Ul>
            <Li><B>Boekings- en gastgegevens:</B> tijdens de samenwerking en een redelijke periode nadien.</Li>
            <Li><B>Boekhoudkundige en fiscale gegevens:</B> de wettelijke termijn van zeven jaar.</Li>
            <Li><B>Decibelwaarden:</B> niet langer dan nodig voor kwaliteitsbewaking en buurtbescherming.</Li>
            <Li><B>Toegangscodes:</B> tijdens het verblijf en een korte periode nadien.</Li>
            <Li><B>Accountgegevens van hosts:</B> zolang het account actief is.</Li>
            <Li><B>Gegevens van kandidaat-hosts:</B> tot u bezwaar maakt of ze niet langer relevant zijn.</Li>
            <Li><B>Partner bij een reservatie:</B> zolang we de boekingsgegevens bewaren.</Li>
          </Ul>
        </Section>

        <Divider />

        <Section title="8. Hoe wij uw gegevens beveiligen">
          <P>
            We nemen passende technische en organisatorische maatregelen tegen verlies, misbruik en
            ongeoorloofde toegang. Alleen wie de gegevens nodig heeft, heeft er toegang toe.
          </P>
        </Section>

        <Divider />

        <Section title="9. Cookies">
          <P>
            Voor het meten van het gebruik van de site gebruiken we een cookieloze analysetool, die
            geen persoonsgegevens of unieke identificatoren opslaat. Daarnaast plaatsen we:
          </P>
          <Ul>
            <Li>
              <B>Noodzakelijke cookies:</B> uw taalkeuze (NEXT_LOCALE) en uw cookiekeuze
              (moroww_toestemming, 6 maanden). Zonder deze werkt de site niet zoals het hoort; ze
              vragen geen toestemming.
            </Li>
            <Li>
              <B>Partnerlink</B> (moroww_partner, tot 18 maanden), alleen met uw toestemming. Komt u
              via de link van een partner, zoals een immokantoor, dan bevat deze cookie de naam van
              die partner en het tijdstip van uw eerste bezoek. Boekt u binnen 18 maanden na dat
              bezoek, dan noteren we bij uw reservatie via welke partner u kwam. Omdat sommige
              browsers een cookie na ongeveer 13 maanden wissen, vernieuwen we ze bij elk bezoek,
              maar nooit voorbij die 18 maanden.
            </Li>
          </Ul>
          <P>
            Bij uw eerste bezoek vragen we uw keuze. Weigert u, dan plaatsen we alleen de
            noodzakelijke cookies. We onthouden uw keuze 6 maanden en vragen ze daarna opnieuw. U
            kunt ze altijd wijzigen via &ldquo;cookie-instellingen&rdquo; onderaan elke pagina. Trekt
            u uw toestemming in, dan verwijderen we de partnercookie meteen.
          </P>
        </Section>

        <Divider />

        <Section title="10. Uw rechten">
          <P>Onder de GDPR heeft u het recht om:</P>
          <Ul>
            <Li>inzage te vragen in de gegevens die we over u verwerken;</Li>
            <Li>onjuiste gegevens te laten verbeteren;</Li>
            <Li>uw gegevens te laten wissen;</Li>
            <Li>de verwerking te laten beperken;</Li>
            <Li>uw gegevens in een overdraagbaar formaat te ontvangen;</Li>
            <Li>bezwaar te maken tegen een verwerking op grond van gerechtvaardigd belang;</Li>
            <Li>een gegeven toestemming op elk moment in te trekken.</Li>
          </Ul>
          <P>
            Dat doet u via{" "}
            <a href="mailto:info@moroww.com" className="underline underline-offset-2 hover:text-moroww-orange transition-colors">
              info@moroww.com
            </a>
            . Bent u het niet eens met hoe we met uw gegevens omgaan, dan kunt u klacht indienen bij
            de Gegevensbeschermingsautoriteit, Drukpersstraat 35, 1000 Brussel
            (www.gegevensbeschermingsautoriteit.be).
          </P>
        </Section>

        <Divider />

        <Section title="11. Wijzigingen">
          <P>
            We kunnen dit beleid aanpassen. De meest recente versie staat altijd op deze pagina, met
            de datum van de laatste wijziging bovenaan.
          </P>
        </Section>

        <Divider />

        <Section title="12. Contact">
          <P>
            Vragen over dit beleid of over uw gegevens? Schrijf ons op{" "}
            <a href="mailto:info@moroww.com" className="underline underline-offset-2 hover:text-moroww-orange transition-colors">
              info@moroww.com
            </a>
            .
          </P>
        </Section>
      </div>
    </div>
  );
}
