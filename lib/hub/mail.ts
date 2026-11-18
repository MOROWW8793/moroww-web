import { Resend } from 'resend';

const ONTVANGER = process.env.AANVRAAG_MAIL_NAAR || 'info@moroww.com';
const VAN = 'moroww hub <info@moroww.com>';

function esc(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);
}

// Eén opmaak voor elke mail van de hub: licht, met het blauw van de hub als
// enige accent, zoals de site. Webfonts laden niet in mail, dus Arial.
const P = 'margin:0 0 14px;font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:1.6;color:#1A1A1A';
function kader(boven: string, inhoud: string, knop?: { href: string; label: string }) {
  return `<div style="background:#FBFAF8;padding:32px 12px"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;margin:0 auto;background:#FFFFFF;border:1px solid #E3DED7"><tr><td style="padding:32px 36px">
    <p style="margin:0 0 22px;padding-bottom:14px;border-bottom:1px solid #1A1A1A;font-family:Arial,Helvetica,sans-serif;font-size:13px;color:#6B6863">${esc(boven)}</p>
    ${inhoud}
    ${knop ? `<p style="margin:24px 0 0"><a href="${knop.href}" style="display:inline-block;background:#7FA0C9;color:#1A1A1A;font-family:Arial,Helvetica,sans-serif;font-size:15px;font-weight:bold;text-decoration:none;padding:13px 24px;border-radius:999px">${esc(knop.label)}</a></p>` : ''}
    <p style="margin:28px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.6;color:#6B6863">moroww · +32 456 91 20 24 · info@moroww.com</p>
  </td></tr></table></div>`;
}
const p = (t: string) => `<p style="${P}">${t}</p>`;

async function stuur(naar: string, onderwerp: string, html: string) {
  const key = process.env.RESEND_API_KEY;
  if (!key || !naar) return;
  try {
    await new Resend(key).emails.send({ from: VAN, to: naar, subject: onderwerp, html });
  } catch {
    // Faalt stil: wat de mail meldt, staat ook in de hub.
  }
}

// Laat beheer weten dat er iets wacht in /hub/beheer.
export async function meldBeheer(onderwerp: string, regels: [string, string][]) {
  const tabel = `<table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse:collapse;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.5;color:#1A1A1A">${regels
    .filter(([, v]) => v)
    .map(([k, v]) => `<tr><td style="padding:5px 18px 5px 0;color:#6B6863;vertical-align:top;white-space:nowrap">${esc(k)}</td><td style="padding:5px 0;white-space:pre-wrap">${esc(v)}</td></tr>`)
    .join('')}</table>`;
  await stuur(ONTVANGER, `moroww hub · ${onderwerp}`, kader('moroww hub · beheer', p(`<strong>${esc(onderwerp)}</strong>`) + tabel, { href: 'https://www.moroww.com/hub/beheer', label: 'naar het beheer' }));
}

// Na de goedkeuring: toegang voor een lid, of voor een merk of vakman.
export async function mailLid(naar: string, naam: string, partner = false) {
  const voornaam = esc(naam.split(' ')[0] || naam);
  const inhoud = partner
    ? p(`Dag ${voornaam},`) +
      p('Je aanmelding is goedgekeurd. In je portaal vul je je fiche aan en voeg je producten toe. Staat je fiche live, dan zien eigenaars je in de hub.') +
      p('Inloggen doe je met je e-mailadres en je wachtwoord. Nog geen wachtwoord? Kies er een via “wachtwoord vergeten”.')
    : p(`Dag ${voornaam},`) +
      p('Welkom in moroww hub. Zet eerst je huizen in de hub: adres, toegang en wat er staat. Daarna vraag je met een paar klikken wat een huis nodig heeft, en regelt moroww het met een partner in de buurt.') +
      p('Je vindt er ook de partners, de merken, de academy en de ledenbrief. Inloggen doe je met je e-mailadres en je wachtwoord. Nog geen wachtwoord? Kies er een via “wachtwoord vergeten”.');
  await stuur(
    naar,
    partner ? 'je merk is goedgekeurd · moroww hub' : 'je hebt toegang tot moroww hub',
    kader('moroww hub', inhoud, { href: `https://www.moroww.com/hub/inloggen?naar=${partner ? '/hub/partner' : '/hub/leden/huizen'}`, label: 'log in' }),
  );
}

// Een update bij een vraag, naar de eigenaar.
export async function mailVraag(naar: string, naam: string, huis: string, tekst: string, metFoto: boolean) {
  const voornaam = esc((naam || '').split(' ')[0]);
  await stuur(
    naar,
    `${huis} · ${tekst.split('.')[0].toLowerCase()} · moroww`,
    kader(
      `vraag het moroww · ${huis}`,
      p(`Dag ${voornaam},`) + p(esc(tekst)) + (metFoto ? p('De foto van het resultaat staat in de hub.') : ''),
      { href: 'https://www.moroww.com/hub/leden', label: 'bekijk in de hub' },
    ),
  );
}
