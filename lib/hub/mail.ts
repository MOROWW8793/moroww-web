import { Resend } from 'resend';

const ONTVANGER = process.env.AANVRAAG_MAIL_NAAR || 'info@moroww.com';

function esc(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);
}

// Laat beheer weten dat er iets wacht in /hub/beheer. Faalt stil: de aanvraag zelf staat al in Supabase.
export async function meldBeheer(onderwerp: string, regels: [string, string][]) {
  const key = process.env.RESEND_API_KEY;
  if (!key) return;
  try {
    const resend = new Resend(key);
    await resend.emails.send({
      from: 'moroww hub <info@moroww.com>',
      to: ONTVANGER,
      subject: `moroww hub · ${onderwerp}`,
      html: `<div style="font-family:Arial,sans-serif;font-size:15px;color:#0F2238">
        <h1 style="font-size:20px;margin:0 0 16px">${esc(onderwerp)}</h1>
        <table style="border-collapse:collapse">${regels
          .map(([k, v]) => `<tr><td style="padding:4px 16px 4px 0;color:#5F7896">${esc(k)}</td><td style="padding:4px 0">${esc(v)}</td></tr>`)
          .join('')}</table>
        <p style="margin-top:20px"><a href="https://moroww.com/hub/beheer">naar het beheer</a></p></div>`,
    });
  } catch {
    // niets: beheer ziet de aanvraag ook in /hub/beheer
  }
}

export async function mailLid(naar: string, naam: string) {
  const key = process.env.RESEND_API_KEY;
  if (!key || !naar) return;
  try {
    const resend = new Resend(key);
    await resend.emails.send({
      from: 'moroww hub <info@moroww.com>',
      to: naar,
      subject: 'je hebt toegang tot moroww hub',
      html: `<div style="font-family:Arial,sans-serif;font-size:15px;line-height:1.6;color:#0F2238">
        <p>Dag ${esc(naam.split(' ')[0] || naam)},</p>
        <p>Welkom in moroww hub. Heeft je huis iets nodig, een extra schoonmaak, de ramen of een herstelling? Vraag het in de hub, en moroww regelt het met een partner in de buurt. Je vindt er ook de partners, de merken, de academy en de ledenbrief.</p>
        <p><a href="https://moroww.com/hub/inloggen">inloggen</a> · met je e-mailadres en je wachtwoord. Nog geen wachtwoord? Kies er een via “wachtwoord vergeten”.</p>
        <p>Tot snel,<br>moroww</p></div>`,
    });
  } catch {
    // niets
  }
}

// Een update bij een vraag, naar de eigenaar. Zelfde stijl als de inlogmails.
export async function mailVraag(naar: string, naam: string, huis: string, tekst: string, metFoto: boolean) {
  const key = process.env.RESEND_API_KEY;
  if (!key || !naar) return;
  try {
    const resend = new Resend(key);
    const voornaam = (naam || '').split(' ')[0];
    await resend.emails.send({
      from: 'moroww hub <info@moroww.com>',
      to: naar,
      subject: `${huis} · ${tekst.split('.')[0].toLowerCase()} · moroww`,
      html: `<div style="background:#EEF3F8;padding:32px 12px"><table role="presentation" width="100%" style="max-width:560px;margin:0 auto;background:#0F2238"><tr><td style="padding:36px 40px">
        <p style="margin:0 0 20px;font-family:Georgia,serif;font-style:italic;font-size:18px;color:#C9D8E8">vraag het moroww · ${esc(huis)}</p>
        <p style="margin:0 0 14px;font-family:Arial,sans-serif;font-size:16px;line-height:1.6;color:#F4F7FB">Dag ${esc(voornaam)},</p>
        <p style="margin:0 0 14px;font-family:Arial,sans-serif;font-size:16px;line-height:1.6;color:#F4F7FB">${esc(tekst)}</p>
        ${metFoto ? '<p style="margin:0 0 14px;font-family:Arial,sans-serif;font-size:16px;line-height:1.6;color:#F4F7FB">De foto van het resultaat staat in de hub.</p>' : ''}
        <p style="margin:24px 0 0"><a href="https://moroww.com/hub/leden" style="display:inline-block;background:#C9D8E8;color:#0F2238;font-family:Arial,sans-serif;font-size:15px;font-weight:bold;text-decoration:none;padding:13px 24px">bekijk in de hub</a></p>
        <p style="margin:24px 0 0;font-family:Arial,sans-serif;font-size:14px;line-height:1.6;color:#C9D8E8">Warme groet,<br>moroww · +32 456 91 20 24</p>
      </td></tr></table></div>`,
    });
  } catch {
    // niets
  }
}
