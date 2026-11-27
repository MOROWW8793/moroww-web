import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import { Sectie } from '@/components/merk/Shell';
import { tekst, brusselNaarISO } from '@/lib/hub/supabase';
import { soortLabel, wanneer } from '@/lib/hub/vragen';
import { leesOpdracht, beantwoordOpdracht } from '@/lib/hub/opdrachten';
import { huisRegels } from '@/lib/hub/huizen';
import { site } from '@/lib/merk/site';

export const metadata: Metadata = { title: 'opdracht', robots: { index: false } };
export const dynamic = 'force-dynamic';

// De partner opent deze pagina via de link in zijn mail, zonder login.
// Hij aanvaardt of weigert; adres en toegang verschijnen pas na het aanvaarden.
async function antwoord(formData: FormData) {
  'use server';
  const token = tekst(formData.get('token'), 60);
  const ja = formData.get('keuze') === 'ja';
  await beantwoordOpdracht(token, ja, tekst(formData.get('antwoord'), 1000), ja ? brusselNaarISO(tekst(formData.get('om'), 20)) : null);
  redirect(`/hub/opdracht/${token}`);
}

export default async function OpdrachtPagina({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const dossier = await leesOpdracht(token);
  if (!dossier) notFound();
  const { opdracht, vraag, partner, huis } = dossier;
  const bel = site.contact.telefoon;

  return (
    <>
      <section className="held">
        <div className="wrap" style={{ display: 'flex', flexDirection: 'column', gap: 18, maxWidth: 760 }}>
          <span className="boven">moroww hub · opdracht voor {partner.naam}</span>
          <h1 className="titel-1">{soortLabel(vraag.soort)} · <i>{vraag.huis}</i></h1>
          <p className="inleiding" style={{ whiteSpace: 'pre-wrap' }}>{vraag.wat}</p>
          <p className="hub-meta" style={{ margin: 0 }}>{vraag.tegen ? `klaar tegen ${wanneer(vraag.tegen)}` : 'geen vaste deadline'}</p>
          {opdracht.bericht ? <p style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{opdracht.bericht}</p> : null}
        </div>
      </section>

      <Sectie>
        {opdracht.status === 'verstuurd' ? (
          <div className="raster-2" style={{ alignItems: 'start' }}>
            <form action={antwoord} className="hub-form kaart" style={{ maxWidth: 'none' }}>
              <input type="hidden" name="token" value={opdracht.token} />
              <input type="hidden" name="keuze" value="ja" />
              <span className="kaart-label">ik kan dit doen</span>
              <div className="veld"><label htmlFor="om">ik kom op</label><input id="om" name="om" type="datetime-local" /></div>
              <div className="veld"><label htmlFor="ja-antwoord">opmerking voor moroww</label><textarea id="ja-antwoord" name="antwoord" /></div>
              <p className="klein" style={{ margin: 0 }}>Na het aanvaarden zie je het adres en de toegang.{opdracht.vervalt_om ? ` Antwoord ten laatste ${wanneer(opdracht.vervalt_om)}.` : ''}</p>
              <button type="submit" className="btn btn-primair">ik aanvaard de opdracht</button>
            </form>
            <form action={antwoord} className="hub-form kaart" style={{ maxWidth: 'none' }}>
              <input type="hidden" name="token" value={opdracht.token} />
              <input type="hidden" name="keuze" value="nee" />
              <span className="kaart-label">ik kan niet</span>
              <div className="veld"><label htmlFor="nee-antwoord">reden, als je die wil geven</label><textarea id="nee-antwoord" name="antwoord" /></div>
              <p className="klein" style={{ margin: 0 }}>Zeg het ons meteen, dan zoeken wij verder.</p>
              <button type="submit" className="btn btn-lijn">ik kan niet</button>
            </form>
          </div>
        ) : null}

        {opdracht.status === 'aanvaard' ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 760 }}>
            <p className="plat-ok">Bedankt. Je hebt deze opdracht aanvaard{vraag.ingepland_om ? ` en komt ${wanneer(vraag.ingepland_om)}` : ''}.</p>
            {huis ? (
              <div className="kaart" style={{ gap: 10 }}>
                <span className="kaart-label">het huis</span>
                <dl style={{ margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {huisRegels(huis).map(([k, w]) => (
                    <div key={k} style={{ display: 'flex', flexWrap: 'wrap', gap: '2px 16px' }}><dt className="hub-meta" style={{ flex: '0 0 150px' }}>{k}</dt><dd style={{ margin: 0, flex: '1 1 260px', whiteSpace: 'pre-wrap' }}>{w}</dd></div>
                  ))}
                </dl>
              </div>
            ) : (
              <p style={{ margin: 0 }}>moroww bezorgt je het adres en de toegang.</p>
            )}
            <p className="klein" style={{ margin: 0 }}>Klaar, of loopt er iets mis? Stuur een foto of bel moroww: <a href={`tel:${bel.replace(/\s/g, '')}`}>{bel}</a></p>
          </div>
        ) : null}

        {opdracht.status === 'geweigerd' ? <p className="plat-ok" style={{ maxWidth: 760 }}>Genoteerd. Je kan deze opdracht niet doen; wij zoeken verder. Bedankt om het snel te laten weten.</p> : null}
        {opdracht.status === 'verlopen' ? <p className="plat-ok" style={{ maxWidth: 760 }}>De termijn voor deze opdracht is voorbij. Kan je toch nog? Bel moroww: <a href={`tel:${bel.replace(/\s/g, '')}`}>{bel}</a></p> : null}
        {opdracht.status === 'ingetrokken' ? <p className="plat-ok" style={{ maxWidth: 760 }}>Deze opdracht is intussen ingevuld. Bedankt, we denken aan je voor de volgende.</p> : null}
      </Sectie>
    </>
  );
}
