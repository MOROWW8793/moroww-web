import { hubBeheerClient } from '@/lib/hub/supabase';
import { kort, wanneer, duur, type Vraag } from '@/lib/hub/vragen';
import { opdrachtStatusNaam, opdrachtKleur, restVanBelofte, type Opdracht, type DienstPartner } from '@/lib/hub/opdrachten';
import { stuurNaarPartner } from '@/lib/hub/opdracht-acties';

// Regie: stuur de vraag als opdracht naar een partner en volg wie antwoordt.
// Alleen te gebruiken op pagina's die al door eisBeheer gegaan zijn.
export async function OpdrachtBlok({ vraag, uitkomst }: { vraag: Vraag; uitkomst?: string }) {
  const db = hubBeheerClient();
  const [{ data: ops }, { data: ptn }, { data: vast }] = await Promise.all([
    db.from('hub_opdrachten').select('*').eq('vraag_id', vraag.id).order('verstuurd_om'),
    db.from('hub_partners').select('id,naam,vak,regio,telefoon,email,kanaal,preferred').eq('soort', 'dienst').order('preferred', { ascending: false }).order('naam'),
    // De vaste partner van dit lid voor dit soort werk: die krijgt de vraag eerst.
    vraag.eigenaar ? db.from('hub_eigen_partners').select('naam,telefoon').eq('profiel_id', vraag.eigenaar).eq('soort', vraag.soort).maybeSingle() : Promise.resolve({ data: null }),
  ]);
  const eigen = vast as { naam: string; telefoon: string | null } | null;
  const opdrachten = (ops ?? []) as Opdracht[];
  const partners = (ptn ?? []) as DienstPartner[];
  const naam = new Map(partners.map((p) => [p.id, p.naam]));
  const gevraagd = new Set(opdrachten.map((o) => o.partner_id));
  const rest = restVanBelofte(vraag);
  const open = vraag.status === 'binnen';

  return (
    <div className="kaart" style={{ gap: 14 }}>
      <span className="kaart-label">opdracht naar een partner</span>
      {open ? (
        <p className="klein" style={{ margin: 0 }}>
          {rest > 0 ? `Nog ${duur(rest)} tot de eigenaar een antwoord moet hebben (2 uur na zijn vraag).` : 'De 2 uur zijn voorbij. Laat de eigenaar nu weten waar hij staat.'}
        </p>
      ) : null}

      {eigen ? (
        <p className="plat-ok" style={{ margin: 0 }}>
          Vaste partner van dit lid: <strong>{eigen.naam}</strong>{eigen.telefoon ? <> · <a href={`tel:${eigen.telefoon.replace(/\s/g, '')}`}>{eigen.telefoon}</a></> : null}. Vraag die eerst, zonder marge.
        </p>
      ) : null}

      {opdrachten.length ? (
        <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
          {opdrachten.map((o) => {
            const verlopen = o.status === 'verstuurd' && o.vervalt_om && new Date(o.vervalt_om).getTime() < Date.now();
            return (
              <li key={o.id} style={{ display: 'flex', flexWrap: 'wrap', gap: '2px 12px', alignItems: 'baseline' }}>
                <strong style={{ fontWeight: 500 }}>{naam.get(o.partner_id) ?? 'partner'}</strong>
                <span className={`hub-label ${verlopen ? opdrachtKleur.verlopen : opdrachtKleur[o.status]}`}>{verlopen ? opdrachtStatusNaam.verlopen : opdrachtStatusNaam[o.status]}</span>
                <span className="hub-meta">verstuurd {kort(o.verstuurd_om)}{o.status === 'verstuurd' && o.vervalt_om && !verlopen ? ` · antwoord ten laatste ${wanneer(o.vervalt_om)}` : ''}</span>
                {o.antwoord ? <span className="klein" style={{ flexBasis: '100%' }}>{o.antwoord}</span> : null}
              </li>
            );
          })}
        </ul>
      ) : null}

      {open ? (
        <form action={stuurNaarPartner} className="hub-form" style={{ maxWidth: 'none' }}>
          <input type="hidden" name="id" value={vraag.id} />
          <div className="rij-velden">
            <div className="veld">
              <label htmlFor="op-partner">partner</label>
              <select id="op-partner" name="partner" required defaultValue="">
                <option value="" disabled>kies een partner</option>
                {partners.map((p) => (
                  <option key={p.id} value={p.id} disabled={!p.email}>
                    {p.preferred ? 'preferred · ' : ''}{p.naam}{p.vak ? ` · ${p.vak}` : ''}{p.regio ? ` · ${p.regio}` : ''}{!p.email ? ' · geen e-mailadres' : ''}{gevraagd.has(p.id) ? ' · al gevraagd' : ''}
                  </option>
                ))}
              </select>
            </div>
            <div className="veld">
              <label htmlFor="op-minuten">antwoord binnen</label>
              <select id="op-minuten" name="minuten" defaultValue="30">
                <option value="15">15 minuten</option>
                <option value="30">30 minuten</option>
                <option value="60">1 uur</option>
                <option value="120">2 uur</option>
              </select>
            </div>
          </div>
          <div className="veld"><label htmlFor="op-bericht">extra bericht voor de partner</label><textarea id="op-bericht" name="bericht" /></div>
          {uitkomst === 'ok' ? <p className="plat-ok">De opdracht is verstuurd.</p> : null}
          {uitkomst === 'geen-mail' ? <p className="hub-fout">Deze partner heeft geen e-mailadres. Vul het aan onder leden, partners, academy.</p> : null}
          {uitkomst === 'fout' ? <p className="hub-fout">Versturen lukte niet. Probeer het opnieuw.</p> : null}
          <p className="klein" style={{ margin: 0 }}>De partner krijgt een mail met een link om te aanvaarden of te weigeren. Het adres en de toegang ziet hij pas na het aanvaarden.</p>
          <button type="submit" className="btn btn-primair">stuur de opdracht</button>
        </form>
      ) : null}
    </div>
  );
}
