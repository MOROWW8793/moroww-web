import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'
import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
  const resend = new Resend(process.env.RESEND_API_KEY)
  try {
    const formData = await request.formData()

    const naam                  = formData.get('naam') as string
    const email                 = formData.get('email') as string
    const telefoon              = formData.get('telefoon') as string
    const adres                 = formData.get('adres') as string
    const type_pand             = formData.get('type_pand') as string
    const oppervlakte           = formData.get('oppervlakte') as string
    const slaapkamers           = formData.get('slaapkamers') as string
    const badkamers             = formData.get('badkamers') as string
    const regio                 = formData.get('regio') as string
    const eigenaar_of_beheerder = formData.get('eigenaar_of_beheerder') as string
    const hoe_lang_verhuurd     = formData.get('hoe_lang_verhuurd') as string
    const huidig_platform       = formData.get('huidig_platform') as string
    const beschikbaarheid       = formData.get('beschikbaarheid') as string
    const verwachte_inkomsten   = formData.get('verwachte_inkomsten') as string
    const opmerkingen           = formData.get('opmerkingen') as string

    // Upload foto's naar Supabase Storage
    const fotoFiles = formData.getAll('fotos') as File[]
    const foto_urls: string[] = []

    for (const foto of fotoFiles) {
      if (foto.size > 0) {
        const bestandsnaam = `${Date.now()}-${foto.name.replace(/\s/g, '-')}`
        const arrayBuffer = await foto.arrayBuffer()
        const buffer = Buffer.from(arrayBuffer)

        const { error } = await supabase.storage
          .from('onboarding-fotos')
          .upload(bestandsnaam, buffer, {
            contentType: foto.type,
            upsert: false,
          })

        if (!error) {
          const { data } = supabase.storage
            .from('onboarding-fotos')
            .getPublicUrl(bestandsnaam)
          foto_urls.push(data.publicUrl)
        }
      }
    }

    // Sla op in Supabase
    const { error: dbError } = await supabase
      .from('onboarding_leads')
      .insert({
        naam, email, telefoon, adres, type_pand,
        oppervlakte, slaapkamers, badkamers, regio,
        eigenaar_of_beheerder, hoe_lang_verhuurd,
        huidig_platform, beschikbaarheid,
        verwachte_inkomsten, opmerkingen,
        foto_urls,
      })

    if (dbError) throw dbError

    const firstName = naam.split(' ')[0]

    // Bevestigingsmail naar eigenaar
    await resend.emails.send({
      from: 'moroww <info@moroww.com>',
      to: email,
      subject: 'We hebben je aanvraag ontvangen - moroww',
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
          <img src="https://www.moroww.com/icon.png" alt="moroww" style="height: 40px; margin-bottom: 32px;" />
          <h1 style="font-size: 28px; color: #1A1A1A; margin-bottom: 16px;">Ontvangen, ${firstName}.</h1>
          <p style="color: #555; font-size: 16px; line-height: 1.6;">
            We hebben je onboardingaanvraag goed ontvangen.
            Ons team bekijkt je pand op <strong>${adres}</strong>
            en neemt binnen 48 uur contact met je op via
            <strong>${email}</strong> of <strong>${telefoon}</strong>.
          </p>
          <p style="color: #555; font-size: 16px; line-height: 1.6; margin-top: 16px;">
            Heb je in de tussentijd vragen? Stuur een mail naar
            <a href="mailto:info@moroww.com" style="color: #FEA05E;">info@moroww.com</a>.
          </p>
          <div style="margin-top: 40px; padding-top: 24px; border-top: 1px solid #eee;">
            <p style="color: #999; font-size: 14px;">moroww - Een kwaliteitslabel voor vakantiewoningen</p>
          </div>
        </div>
      `,
    })

    // Notificatiemail naar moroww
    await resend.emails.send({
      from: 'moroww onboarding <info@moroww.com>',
      to: 'info@moroww.com',
      subject: `Nieuwe onboarding aanvraag - ${naam} - ${adres}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
          <h1 style="font-size: 24px; color: #1A1A1A;">Nieuwe onboarding aanvraag</h1>
          <table style="width: 100%; border-collapse: collapse; margin-top: 24px;">
            <tr><td style="padding: 8px 0; color: #999; width: 200px;">Naam</td><td style="padding: 8px 0; color: #1A1A1A;"><strong>${naam}</strong></td></tr>
            <tr><td style="padding: 8px 0; color: #999;">Email</td><td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #FEA05E;">${email}</a></td></tr>
            <tr><td style="padding: 8px 0; color: #999;">Telefoon</td><td style="padding: 8px 0; color: #1A1A1A;">${telefoon}</td></tr>
            <tr><td style="padding: 8px 0; color: #999;">Adres</td><td style="padding: 8px 0; color: #1A1A1A;">${adres}</td></tr>
            <tr><td style="padding: 8px 0; color: #999;">Type pand</td><td style="padding: 8px 0; color: #1A1A1A;">${type_pand}</td></tr>
            <tr><td style="padding: 8px 0; color: #999;">Oppervlakte</td><td style="padding: 8px 0; color: #1A1A1A;">${oppervlakte ? oppervlakte + ' m²' : '-'}</td></tr>
            <tr><td style="padding: 8px 0; color: #999;">Slaapkamers</td><td style="padding: 8px 0; color: #1A1A1A;">${slaapkamers}</td></tr>
            <tr><td style="padding: 8px 0; color: #999;">Badkamers</td><td style="padding: 8px 0; color: #1A1A1A;">${badkamers}</td></tr>
            <tr><td style="padding: 8px 0; color: #999;">Regio</td><td style="padding: 8px 0; color: #1A1A1A;">${regio}</td></tr>
            <tr><td style="padding: 8px 0; color: #999;">Eigenaar/beheerder</td><td style="padding: 8px 0; color: #1A1A1A;">${eigenaar_of_beheerder}</td></tr>
            <tr><td style="padding: 8px 0; color: #999;">Hoe lang verhuurd</td><td style="padding: 8px 0; color: #1A1A1A;">${hoe_lang_verhuurd || '-'}</td></tr>
            <tr><td style="padding: 8px 0; color: #999;">Huidig platform</td><td style="padding: 8px 0; color: #1A1A1A;">${huidig_platform || '-'}</td></tr>
            <tr><td style="padding: 8px 0; color: #999;">Beschikbaarheid</td><td style="padding: 8px 0; color: #1A1A1A;">${beschikbaarheid || '-'}</td></tr>
            <tr><td style="padding: 8px 0; color: #999;">Verwachte inkomsten</td><td style="padding: 8px 0; color: #1A1A1A;">${verwachte_inkomsten || '-'}</td></tr>
            <tr><td style="padding: 8px 0; color: #999;">Opmerkingen</td><td style="padding: 8px 0; color: #1A1A1A;">${opmerkingen || '-'}</td></tr>
          </table>
          ${foto_urls.length > 0 ? `
            <h2 style="margin-top: 32px; font-size: 18px;">Foto's (${foto_urls.length})</h2>
            <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-top: 16px;">
              ${foto_urls.map(url => `<a href="${url}" target="_blank"><img src="${url}" style="width: 150px; height: 100px; object-fit: cover; border-radius: 4px;" /></a>`).join('')}
            </div>
          ` : ''}
          <div style="margin-top: 40px; padding-top: 24px; border-top: 1px solid #eee;">
            <a href="https://supabase.com" style="color: #FEA05E; font-size: 14px;">Bekijk in Supabase</a>
          </div>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[onboarding] error:', error)
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 })
  }
}
