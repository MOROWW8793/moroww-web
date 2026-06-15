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
          Onze website gebruikt enkel functionele cookies die nodig zijn om te werken, zoals het
          onthouden van uw taalkeuze. Voor het meten van het gebruik zetten we een
          privacyvriendelijke, cookieloze analysetool in, die geen persoonsgegevens of unieke
          identificatoren opslaat. Daarom is er geen toestemmingsvenster nodig.
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

      <P>
        moroww values the protection of your personal data. In this policy we explain which data we
        process, why we do so, with whom we share it, and what rights you have. We write it the way
        we do everything at moroww: clearly and without detours.
      </P>
      <P>
        This policy applies to everyone whose data we process: guests staying in a property from the
        collection, owners and hosts who work with us, prospective hosts we approach, and visitors to
        our website.
      </P>

      <Divider />

      <Section title="1. Who is responsible">
        <P>The controller responsible for your personal data is:</P>
        <P>
          moroww BV (private limited company)<br />
          Neerstraat 10, 8793 Sint-Eloois-Vijve (Waregem), Belgium<br />
          Company number / VAT: BE1030.667.956<br />
          Email:{" "}
          <a href="mailto:info@moroww.com" className="underline underline-offset-2 hover:text-moroww-orange transition-colors">
            info@moroww.com
          </a>
        </P>
        <P>
          For any questions about this policy or your data, you can reach us at{" "}
          <a href="mailto:info@moroww.com" className="underline underline-offset-2 hover:text-moroww-orange transition-colors">
            info@moroww.com
          </a>
          .
        </P>
      </Section>

      <Divider />

      <Section title="2. What data we process">
        <P>The data we process depends on your relationship with moroww.</P>

        <p className="font-semibold text-moroww-black mb-2">From guests</p>
        <Ul>
          <Li><B>Identity and contact data:</B> name, email address, phone number, language.</Li>
          <Li><B>Booking data:</B> the property, stay dates, number of guests, price and payment status.</Li>
          <Li><B>Communications:</B> messages you exchange with us or via the guest page.</Li>
          <Li><B>Access data:</B> the temporary access code for the smart lock during your stay.</Li>
          <Li><B>Sound levels:</B> decibel values measured by the noise monitor in the property (see section 3).</Li>
        </Ul>
        <P>
          Payment data is generally processed by the booking channel or payment service through which
          you book, not directly by moroww.
        </P>

        <p className="font-semibold text-moroww-black mb-2 mt-4">From owners and hosts</p>
        <Ul>
          <Li><B>Identity and contact data:</B> name, email address, phone number.</Li>
          <Li>Data about the property and the cooperation.</Li>
          <Li><B>Financial data:</B> payouts, statements, commission and invoicing details.</Li>
          <Li><B>Account data:</B> your login credentials for the host portal and the moment you accepted the terms.</Li>
        </Ul>

        <p className="font-semibold text-moroww-black mb-2 mt-4">From prospective hosts</p>
        <Ul>
          <Li>
            Publicly available data about the property and the contact details of the owner or
            manager, which we use to assess the property and possibly approach you.
          </Li>
        </Ul>

        <p className="font-semibold text-moroww-black mb-2 mt-4">From website visitors</p>
        <Ul>
          <Li>Technical data and cookies (see section 9), and the data you enter in a contact form.</Li>
        </Ul>
      </Section>

      <Divider />

      <Section title="3. The noise monitor and smart devices">
        <P>
          The properties in the collection contain smart devices that are part of the tech stack. Two
          of them process data, and we want to be fully transparent about this.
        </P>
        <P>
          <B>The noise monitor</B> records decibel values only. No conversations, voices or other
          sound information are recorded or stored. The data are used solely for quality monitoring
          and neighbourhood protection, so that nuisance can be detected in time without infringing
          the privacy of the guest.
        </P>
        <P>
          <B>The smart lock</B> enables keyless access. During your stay a temporary access code is
          created that expires afterwards. The codes are managed by moroww and are not visible to the
          owner of the property.
        </P>
      </Section>

      <Divider />

      <Section title="4. Why we use your data and on what basis">
        <P>
          We process your data only for the purposes listed below, each time on the basis of a valid
          legal ground under the GDPR.
        </P>
        <Ul>
          <Li>
            <B>Enabling the booking and the stay</B> (reservation, communication, access to the
            property). Basis: performance of the contract.
          </Li>
          <Li>
            <B>Managing the cooperation with owners</B> (statements, payouts, portal). Basis:
            performance of the contract.
          </Li>
          <Li>
            <B>Monitoring quality and tranquillity</B> (noise monitoring, neighbourhood protection,
            security of the property). Basis: legitimate interest of moroww and of the owner in
            protecting the property and its surroundings.
          </Li>
          <Li>
            <B>Assessing and approaching prospective hosts.</B> Basis: legitimate interest in
            building the collection. You may object to this (see section 10).
          </Li>
          <Li>
            <B>Complying with legal obligations</B> (accounting, VAT, statutory retention periods).
            Basis: legal obligation.
          </Li>
          <Li>
            <B>Informing you and, if you wish, sending marketing.</B> Basis: consent, which you may
            withdraw at any time.
          </Li>
        </Ul>
      </Section>

      <Divider />

      <Section title="5. With whom we share data">
        <P>
          moroww does not sell your data. We share it only with parties that help us deliver the
          service, and only to the extent necessary. Our main processors and recipients are:
        </P>
        <Ul>
          <Li><B>Guesty</B> — booking management and synchronisation with booking channels.</Li>
          <Li><B>PriceLabs</B> — dynamic pricing.</Li>
          <Li><B>Nuki</B> — management of the smart locks.</Li>
          <Li><B>Resend</B> — sending transactional emails.</Li>
          <Li><B>Supabase and Vercel</B> — hosting and storage of our systems.</Li>
          <Li><B>Anthropic</B> — automatic translation of messages so we can assist you in your own language.</Li>
          <Li>
            <B>Beehive Facility Services</B> — certified cleaning partner, who receives the necessary
            booking and contact data to schedule cleaning.
          </Li>
          <Li>
            <B>Booking channels</B> (such as Airbnb and Booking.com), which act as independent
            controllers for the data they collect themselves.
          </Li>
          <Li>Our accountant and, where legally required, the competent authorities.</Li>
        </Ul>
        <P>We conclude a data processing agreement with each processor that processes data on our behalf.</P>
      </Section>

      <Divider />

      <Section title="6. Transfer outside the European Economic Area">
        <P>
          Some of our processors are established outside the EEA, including in the United States.
          When your data is transferred there, this is done with appropriate safeguards such as the
          standard contractual clauses of the European Commission, so that your data enjoys an
          equivalent level of protection.
        </P>
      </Section>

      <Divider />

      <Section title="7. How long we retain your data">
        <P>We do not retain your data longer than necessary for the purposes above.</P>
        <Ul>
          <Li>Booking and guest data: for the duration of the cooperation and a reasonable period thereafter.</Li>
          <Li>Accounting and tax data: for the statutory retention period of seven years.</Li>
          <Li>Decibel values from the noise monitor: no longer than necessary for quality monitoring and neighbourhood protection.</Li>
          <Li>Smart lock access codes: for the duration of the stay and a short period thereafter.</Li>
          <Li>Host account data: for as long as the account is active.</Li>
          <Li>Prospective host data: until you object or until it is no longer relevant.</Li>
        </Ul>
      </Section>

      <Divider />

      <Section title="8. How we secure your data">
        <P>
          We take appropriate technical and organisational measures to protect your data against
          loss, misuse and unauthorised access. Access to data is restricted to those who need it.
        </P>
      </Section>

      <Divider />

      <Section title="9. Cookies">
        <P>
          Our website uses only functional cookies that are necessary to operate, such as remembering
          your language choice. To measure usage we use a privacy-friendly, cookieless analytics
          tool that stores no personal data or unique identifiers. No consent banner is therefore
          required.
        </P>
      </Section>

      <Divider />

      <Section title="10. Your rights">
        <P>Under the GDPR you have the right to:</P>
        <Ul>
          <Li>request access to the data we process about you;</Li>
          <Li>have inaccurate data corrected;</Li>
          <Li>have your data erased;</Li>
          <Li>have processing restricted;</Li>
          <Li>receive your data in a portable format;</Li>
          <Li>object to processing based on legitimate interest;</Li>
          <Li>withdraw consent given at any time.</Li>
        </Ul>
        <P>
          You exercise these rights via{" "}
          <a href="mailto:info@moroww.com" className="underline underline-offset-2 hover:text-moroww-orange transition-colors">
            info@moroww.com
          </a>
          . If you disagree with how we handle your data, you may also lodge a complaint with the
          Data Protection Authority (Drukpersstraat 35, 1000 Brussels,{" "}
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

      <Section title="11. Changes to this policy">
        <P>
          We may update this policy from time to time. The most recent version is always available
          on this page, with the date of the last update at the top.
        </P>
      </Section>

      <Divider />

      <Section title="12. Contact">
        <P>
          Questions about this policy or your data? Feel free to write to us at{" "}
          <a href="mailto:info@moroww.com" className="underline underline-offset-2 hover:text-moroww-orange transition-colors">
            info@moroww.com
          </a>
          .
        </P>
      </Section>
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
