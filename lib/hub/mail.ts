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
        <p>Welkom in moroww hub. Je vindt er de voordelen bij de partners, de academy-sessies, de ledenbrief en de community.</p>
        <p><a href="https://moroww.com/hub/inloggen">inloggen</a> · je krijgt een link per mail, geen wachtwoord nodig.</p>
        <p>Tot snel,<br>moroww</p></div>`,
    });
  } catch {
    // niets
  }
}
