import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale === "en") {
    return {
      title: "Privacy Policy",
      description: "moroww privacy policy — how we handle your personal data.",
      alternates: { canonical: "https://www.moroww.com/en/privacy" },
    };
  }
  return {
    title: "Privacybeleid",
    description: "Het privacybeleid van moroww — hoe wij omgaan met uw persoonsgegevens.",
    alternates: { canonical: "https://www.moroww.com/privacy" },
  };
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

function NLPrivacy() {
  return (
    <>
      <p className="text-xs font-semibold uppercase tracking-widest text-moroww-orange mb-4">
        Privacybeleid
      </p>
      <h1 className="font-bold text-moroww-black text-4xl md:text-5xl mb-3 leading-tight">
        Uw gegevens, helder uitgelegd.
      </h1>
      <p className="text-sm text-moroww-black/40 mb-10">
        Versie 1.0 — Laatst bijgewerkt: 15 juni 2026
      </p>

      <P>
        moroww hecht belang aan de bescherming van uw persoonsgegevens. In dit beleid leggen we uit
        welke gegevens we verwerken, waarom we dat doen, met wie we ze delen en welke rechten u
        heeft. We schrijven het zoals we alles bij moroww doen: helder en zonder omwegen.
      </P>
      <P>
        Dit beleid geldt voor iedereen van wie wij gegevens verwerken: gasten die in een woning van
        de collectie verblijven, eigenaars en hosts die met ons samenwerken, kandidaat-hosts die we
        benaderen, en bezoekers van onze website.
      </P>

      <Divider />

      <Section title="1. Wie is verantwoordelijk">
        <P>De verwerkingsverantwoordelijke voor uw persoonsgegevens is:</P>
        <P>
          moroww BV (besloten vennootschap)<br />
          Neerstraat 10, 8793 Sint-Eloois-Vijve (Waregem), België<br />
          Ondernemingsnummer / btw: BE1030.667.956<br />
          E-mail:{" "}
          <a href="mailto:info@moroww.com" className="underline underline-offset-2 hover:text-moroww-orange transition-colors">
            info@moroww.com
          </a>
        </P>
        <P>
          Voor alle vragen over dit beleid of over uw gegevens kan u ons bereiken via{" "}
          <a href="mailto:info@moroww.com" className="underline underline-offset-2 hover:text-moroww-orange transition-colors">
            info@moroww.com
          </a>
          .
        </P>
      </Section>

      <Divider />

      <Section title="2. Welke gegevens wij verwerken">
        <P>Welke gegevens we verwerken, hangt af van uw relatie tot moroww.</P>

        <p className="font-semibold text-moroww-black mb-2">Van gasten</p>
        <Ul>
          <Li><B>Identiteits- en contactgegevens:</B> naam, e-mailadres, telefoonnummer, taal.</Li>
          <Li><B>Boekingsgegevens:</B> de woning, verblijfsdata, aantal gasten, prijs en betaalstatus.</Li>
          <Li><B>Communicatie:</B> berichten die u met ons of via de gastpagina uitwisselt.</Li>
          <Li><B>Toegangsgegevens:</B> de tijdelijke toegangscode voor het slimme slot van de woning tijdens uw verblijf.</Li>
          <Li><B>Geluidsniveaus:</B> decibelwaarden gemeten door de geluidsmonitor in de woning (zie punt 3).</Li>
        </Ul>
        <P>
          Betaalgegevens worden in de regel verwerkt door het boekingskanaal of de betaaldienst
          waarlangs u boekt, niet rechtstreeks door moroww.
        </P>

        <p className="font-semibold text-moroww-black mb-2 mt-4">Van eigenaars en hosts</p>
        <Ul>
          <Li><B>Identiteits- en contactgegevens:</B> naam, e-mailadres, telefoonnummer.</Li>
          <Li>Gegevens over de woning en de samenwerking.</Li>
          <Li><B>Financiële gegevens:</B> uitbetalingen, afrekeningen, commissie en facturatiegegevens.</Li>
          <Li><B>Accountgegevens:</B> uw inloggegevens voor het host-portaal en het tijdstip waarop u de voorwaarden aanvaardde.</Li>
        </Ul>

        <p className="font-semibold text-moroww-black mb-2 mt-4">Van kandidaat-hosts (prospecten)</p>
        <Ul>
          <Li>
            Publiek beschikbare gegevens over de woning en de contactgegevens van de eigenaar of
            beheerder, die we gebruiken om de woning te beoordelen en u eventueel te benaderen.
          </Li>
        </Ul>

        <p className="font-semibold text-moroww-black mb-2 mt-4">Van websitebezoekers</p>
        <Ul>
          <Li>Technische gegevens en cookies (zie punt 9), en de gegevens die u zelf invult in een contactformulier.</Li>
        </Ul>
      </Section>

      <Divider />

      <Section title="3. De geluidsmonitor en de slimme toestellen">
        <P>
          In de woningen van de collectie staan slimme toestellen die deel uitmaken van de
          tech-stack. Twee daarvan verwerken gegevens, en daar willen we volledig transparant over
          zijn.
        </P>
        <P>
          <B>De geluidsmonitor</B> registreert uitsluitend decibelwaarden. Er worden geen gesprekken,
          stemmen of andere geluidsinformatie opgenomen of bewaard. De data worden uitsluitend
          gebruikt voor kwaliteitsmonitoring en buurtbescherming, zodat overlast tijdig kan worden
          vastgesteld zonder de privacy van de gast aan te tasten.
        </P>
        <P>
          <B>Het slimme slot</B> maakt sleutelloze toegang mogelijk. Tijdens uw verblijf wordt een
          tijdelijke toegangscode aangemaakt die na afloop vervalt. De codes worden beheerd door
          moroww en zijn niet zichtbaar voor de eigenaar van de woning.
        </P>
      </Section>

      <Divider />

      <Section title="4. Waarvoor wij uw gegevens gebruiken en op welke grond">
        <P>
          We verwerken uw gegevens enkel voor de doeleinden hieronder, telkens op basis van een
          geldige rechtsgrond uit de GDPR.
        </P>
        <Ul>
          <Li>
            <B>De boeking en het verblijf mogelijk maken</B> (reservatie, communicatie, toegang tot de
            woning). Grond: uitvoering van de overeenkomst.
          </Li>
          <Li>
            <B>De samenwerking met eigenaars beheren</B> (afrekeningen, uitbetalingen, portaal). Grond:
            uitvoering van de overeenkomst.
          </Li>
          <Li>
            <B>De kwaliteit en de rust bewaken</B> (geluidsmonitoring, buurtbescherming, beveiliging van
            de woning). Grond: gerechtvaardigd belang van moroww en van de eigenaar bij de
            bescherming van de woning en de omgeving.
          </Li>
          <Li>
            <B>Kandidaat-hosts beoordelen en benaderen.</B> Grond: gerechtvaardigd belang bij het
            opbouwen van de collectie. U kan hiertegen bezwaar maken (zie punt 10).
          </Li>
          <Li>
            <B>Wettelijke verplichtingen naleven</B> (boekhouding, btw, fiscale bewaarplicht). Grond:
            wettelijke verplichting.
          </Li>
          <Li>
            <B>U informeren en, indien u dat wenst, marketing sturen.</B> Grond: toestemming, die u op
            elk moment kan intrekken.
          </Li>
        </Ul>
      </Section>

      <Divider />

      <Section title="5. Met wie wij gegevens delen">
        <P>
          moroww verkoopt uw gegevens niet. We delen ze enkel met partijen die ons helpen de dienst
          te leveren, en enkel voor zover dat nodig is. Onze belangrijkste verwerkers en ontvangers
          zijn:
        </P>
        <Ul>
          <Li><B>Guesty</B> — boekingsbeheer en synchronisatie met boekingskanalen.</Li>
          <Li><B>PriceLabs</B> — dynamische prijszetting.</Li>
          <Li><B>Nuki</B> — beheer van de slimme sloten.</Li>
          <Li><B>Resend</B> — verzending van transactionele e-mails.</Li>
          <Li><B>Supabase en Vercel</B> — hosting en opslag van onze systemen.</Li>
          <Li><B>Anthropic</B> — automatische vertaling van berichten, zodat we u in uw eigen taal kunnen helpen.</Li>
          <Li>
            <B>Beehive Facility Services</B> — gecertificeerde poetspartner, die voor de planning van
            de schoonmaak de nodige boekings- en contactgegevens ontvangt.
          </Li>
          <Li>
            <B>Boekingskanalen</B> (zoals Airbnb en Booking.com), die voor de gegevens die zij zelf
            verzamelen optreden als eigen verantwoordelijke.
          </Li>
          <Li>Onze boekhouder en, indien wettelijk verplicht, de bevoegde overheden.</Li>
        </Ul>
        <P>Met elke verwerker die namens ons gegevens verwerkt, sluiten we een verwerkersovereenkomst.</P>
      </Section>

      <Divider />

      <Section title="6. Doorgifte buiten de Europese Economische Ruimte">
        <P>
          Enkele van onze verwerkers zijn gevestigd buiten de EER, onder meer in de Verenigde
          Staten. Wanneer uw gegevens daarheen worden doorgegeven, gebeurt dat met passende
          waarborgen zoals de modelcontractbepalingen van de Europese Commissie, zodat uw gegevens
          een gelijkwaardig beschermingsniveau genieten.
        </P>
      </Section>

      <Divider />

      <Section title="7. Hoe lang wij uw gegevens bewaren">
        <P>We bewaren uw gegevens niet langer dan nodig voor de doeleinden hierboven.</P>
        <Ul>
          <Li>Boekings- en gastgegevens: gedurende de samenwerking en een redelijke periode nadien.</Li>
          <Li>Boekhoudkundige en fiscale gegevens: gedurende de wettelijke bewaartermijn van zeven jaar.</Li>
          <Li>Decibelwaarden van de geluidsmonitor: niet langer dan nodig voor kwaliteitsmonitoring en buurtbescherming.</Li>
          <Li>Toegangscodes van de sloten: gedurende het verblijf en een korte periode nadien.</Li>
          <Li>Accountgegevens van hosts: zolang het account actief is.</Li>
          <Li>Gegevens van kandidaat-hosts: tot u bezwaar maakt of tot ze niet langer relevant zijn.</Li>
        </Ul>
      </Section>

      <Divider />

      <Section title="8. Hoe wij uw gegevens beveiligen">
        <P>
          We nemen passende technische en organisatorische maatregelen om uw gegevens te beschermen
          tegen verlies, misbruik en ongeoorloofde toegang. De toegang tot gegevens is afgeschermd
          en beperkt tot wie ze nodig heeft.
        </P>
      </Section>

      <Divider />

      <Section title="9. Cookies">
        <P>
          Onze website gebruikt cookies om te werken en, mits uw toestemming, om het gebruik te
          meten. U beheert uw voorkeuren via de instellingen op de website.
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
          U oefent deze rechten uit via{" "}
          <a href="mailto:info@moroww.com" className="underline underline-offset-2 hover:text-moroww-orange transition-colors">
            info@moroww.com
          </a>
          . Bent u het niet eens met hoe wij met uw gegevens omgaan, dan kan u ook klacht indienen
          bij de Gegevensbeschermingsautoriteit (Drukpersstraat 35, 1000 Brussel,{" "}
          <a
            href="https://www.gegevensbeschermingsautoriteit.be"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:text-moroww-orange transition-colors"
          >
            www.gegevensbeschermingsautoriteit.be
          </a>
          ).
        </P>
      </Section>

      <Divider />

      <Section title="11. Wijzigingen aan dit beleid">
        <P>
          We kunnen dit beleid van tijd tot tijd aanpassen. De meest recente versie vindt u steeds
          op deze pagina, met de datum van de laatste wijziging bovenaan.
        </P>
      </Section>

      <Divider />

      <Section title="12. Contact">
        <P>
          Vragen over dit beleid of over uw gegevens? Schrijf ons gerust op{" "}
          <a href="mailto:info@moroww.com" className="underline underline-offset-2 hover:text-moroww-orange transition-colors">
            info@moroww.com
          </a>
          .
        </P>
      </Section>
    </>
  );
}

function ENPrivacy() {
  return (
    <>
      <p className="text-xs font-semibold uppercase tracking-widest text-moroww-orange mb-4">
        Privacy Policy
      </p>
      <h1 className="font-bold text-moroww-black text-4xl md:text-5xl mb-3 leading-tight">
        Your data, clearly explained.
      </h1>
      <p className="text-sm text-moroww-black/40 mb-10">
        Version 1.0 — Last updated: 15 June 2026
      </p>

      <div className="rounded-xl border border-moroww-orange/30 bg-moroww-orange/5 px-5 py-4 mb-8">
        <p className="text-sm text-moroww-black/70">
          The English version of this privacy policy is coming soon.{" "}
          <a href="/privacy" className="underline underline-offset-2 hover:text-moroww-orange transition-colors">
            Read the Dutch version
          </a>{" "}
          in the meantime, or contact us at{" "}
          <a href="mailto:info@moroww.com" className="underline underline-offset-2 hover:text-moroww-orange transition-colors">
            info@moroww.com
          </a>{" "}
          with any questions.
        </p>
      </div>
    </>
  );
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
        {locale === "en" ? <ENPrivacy /> : <NLPrivacy />}
      </div>
    </div>
  );
}
