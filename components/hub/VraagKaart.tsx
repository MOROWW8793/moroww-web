import { soortLabel, statusNaam, wanneer, kort, type Vraag, type VraagUpdate } from '@/lib/hub/vragen';

// Eén vraag zoals de eigenaar ze ziet: status, wie het doet, de tijdlijn en de foto.
export function VraagKaart({
  v,
  updates,
  partner,
  fotos,
  scoreActie,
}: {
  v: Vraag;
  updates: VraagUpdate[];
  partner?: string | null;
  fotos: Map<string, string>;
  scoreActie?: (f: FormData) => Promise<void>;
}) {
  const stappen: [string, boolean][] = [
    ['binnen', true],
    ['ingepland', v.status !== 'binnen'],
    [v.status === 'lukt-niet' ? 'lukt niet' : 'geregeld', v.status === 'geregeld' || v.status === 'lukt-niet'],
  ];
  const foto = v.foto ? fotos.get(v.foto) : null;
  return (
    <article className={`vraag vraag-${v.status}`}>
      <div className="vraag-kop">
        <span className="kaart-label">{soortLabel(v.soort)} · {v.huis}</span>
        <span className={`hub-label ${v.status === 'geregeld' ? 'live' : ''}`}>{statusNaam[v.status]}</span>
      </div>
      <h3 className="kaart-titel" style={{ fontSize: 22 }}>{v.wat}</h3>
      <div className="vraag-stappen" aria-label="voortgang">
        {stappen.map(([naam, aan]) => <span key={naam} className={aan ? 'aan' : ''}>{naam}</span>)}
      </div>
      <p className="hub-meta" style={{ margin: 0 }}>
        {v.tegen ? <>klaar tegen {wanneer(v.tegen)} · </> : null}
        {partner ? <>via moroww · {partner}</> : <>moroww zoekt een partner</>}
      </p>
      {foto ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={foto} alt="foto van het resultaat" className="vraag-foto" />
      ) : null}
      {updates.length ? (
        <ol className="vraag-tijdlijn">
          {updates.map((u) => (
            <li key={u.id} className={`wie-${u.wie}`}>
              <span className="hub-meta">{u.wie === 'jij' ? 'jij' : u.wie === 'partner' ? partner || 'de partner' : 'moroww'} · {kort(u.created_at)}</span>
              <p>{u.tekst}</p>
              {u.foto && fotos.get(u.foto) && u.foto !== v.foto ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={fotos.get(u.foto)} alt="foto bij deze update" className="vraag-foto" />
              ) : null}
            </li>
          ))}
        </ol>
      ) : null}
      {v.status === 'geregeld' && scoreActie ? (
        v.score ? (
          <p className="hub-meta" style={{ margin: 0 }}>Je gaf {partner || 'de partner'} {v.score} op 5. Dat telt mee voor de moroww-standaard.</p>
        ) : (
          <form action={scoreActie} className="vraag-score">
            <input type="hidden" name="id" value={v.id} />
            <span className="hub-meta">hoe ging het{partner ? ` met ${partner}` : ''}?</span>
            {[1, 2, 3, 4, 5].map((n) => (
              <button key={n} type="submit" name="score" value={n} className="hub-knopklein" aria-label={`${n} op 5`}>{n}</button>
            ))}
          </form>
        )
      ) : null}
    </article>
  );
}
