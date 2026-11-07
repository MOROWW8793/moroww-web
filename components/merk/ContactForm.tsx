'use client';

import { useState, type FormEvent } from 'react';
import { site, type Merk } from '@/lib/merk/site';

export type Veld = {
  naam: string;
  label: string;
  type?: 'text' | 'email' | 'tel' | 'textarea' | 'select';
  opties?: string[];
  verplicht?: boolean;
};

type Props = {
  merk: Merk;
  soort: string; // bv. 'keuring', 'scan', 'partner'
  velden: Veld[];
  knop?: string;
  bedankt?: string;
  // tw = opmaak met de Tailwind-tokens van moroww.com (voor pagina's buiten how en hub)
  tw?: boolean;
};

type Status = 'idle' | 'bezig' | 'verzonden' | 'fout';

export function ContactForm({ merk, soort, velden, knop = 'verstuur', bedankt = 'bedankt. we nemen snel contact op.', tw = false }: Props) {
  const c = tw
    ? {
        form: 'flex flex-col gap-mw-4',
        veld: 'flex flex-col gap-2',
        label: 'text-audit uppercase text-moroww-ink-2',
        input: 'w-full border border-moroww-rule bg-white px-4 py-3 text-body text-moroww-dark focus:outline-none focus:border-moroww-dark',
        knop: 'self-start bg-moroww-orange text-moroww-dark px-6 py-3 text-body font-semibold min-h-[48px] disabled:opacity-60',
        bedankt: 'text-body-lg text-moroww-dark bg-moroww-blush p-mw-5',
        fout: 'text-body text-red-800',
      }
    : { form: 'form', veld: 'form-veld', label: '', input: '', knop: 'btn btn-primair', bedankt: 'form-bedankt', fout: 'form-fout' };
  const [status, setStatus] = useState<Status>('idle');

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;
    const { naam = '', email = '', telefoon = '', adres = '', bericht = '', website_url = '', ...extra } = data;
    if (website_url) return;

    setStatus('bezig');
    try {
      const res = await fetch('/api/aanvraag', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ merk, soort, naam, email, telefoon, adres, bericht, extra }),
      });
      if (!res.ok) throw new Error(String(res.status));
    } catch {
      // Valt de server weg: open een e-mail met de ingevulde gegevens.
      const body = Object.entries(data).filter(([k]) => k !== 'website_url').map(([k, v]) => `${k}: ${v}`).join('\n');
      window.location.href = `mailto:${site.contact.email}?subject=${encodeURIComponent(`moroww ${merk} · ${soort}`)}&body=${encodeURIComponent(body)}`;
      setStatus('idle');
      return;
    }
    form.reset();
    setStatus('verzonden');
  }

  if (status === 'verzonden') {
    return <p className={c.bedankt} role="status">{bedankt}</p>;
  }

  return (
    <form className={c.form} onSubmit={onSubmit}>
      <input type="text" name="website_url" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }} />
      {velden.map((v) => {
        const id = `${soort}-${v.naam}`;
        return (
          <div className={c.veld} key={v.naam}>
            <label htmlFor={id} className={c.label || undefined}>{v.label}</label>
            {v.type === 'textarea' ? (
              <textarea id={id} name={v.naam} rows={4} required={v.verplicht} className={c.input || undefined} />
            ) : v.type === 'select' ? (
              <select id={id} name={v.naam} required={v.verplicht} defaultValue="" className={c.input || undefined}>
                <option value="" disabled>kies</option>
                {v.opties?.map((o) => (
                  <option key={o} value={o}>{o}</option>
                ))}
              </select>
            ) : (
              <input id={id} name={v.naam} type={v.type ?? 'text'} required={v.verplicht} autoComplete={v.naam === 'email' ? 'email' : v.naam === 'naam' ? 'name' : v.naam === 'telefoon' ? 'tel' : undefined} className={c.input || undefined} />
            )}
          </div>
        );
      })}
      <button type="submit" className={c.knop} disabled={status === 'bezig'}>
        {status === 'bezig' ? 'bezig…' : knop}
      </button>
      {status === 'fout' && (
        <p className={c.fout} role="alert">
          Dat lukte niet. Mail ons op <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>.
        </p>
      )}
    </form>
  );
}
