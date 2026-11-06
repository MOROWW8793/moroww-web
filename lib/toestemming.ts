// Optionele doelen waarvoor de cookiebanner toestemming vraagt. Een nieuw doel
// (bv. een advertentiepixel) komt hier bij; de banner toont het als aparte keuze.
export const DOELEN = ['partner'] as const
export type Doel = (typeof DOELEN)[number]

export const TOESTEMMING_COOKIE = 'moroww_toestemming'

// De GBA vindt het redelijk om een cookiekeuze ongeveer 6 maanden te
// onthouden. Daarna verloopt de cookie en verschijnt de banner opnieuw.
export const TOESTEMMING_DAGEN = 182

export type Toestemming = { gegevenOp: Date; doelen: Doel[] }

export function isDoel(s: unknown): s is Doel {
  return typeof s === 'string' && (DOELEN as readonly string[]).includes(s)
}

// Waarde: "<tijdstip in ms>.<doel>~<doel>". Niets na de punt = alles geweigerd.
export function maakToestemming(doelen: Doel[], nu = Date.now()) {
  return `${nu}.${doelen.join('~')}`
}

export function leesToestemming(waarde: string | undefined): Toestemming | null {
  if (!waarde) return null
  const [ms, lijst = ''] = waarde.split('.')
  const gegevenOp = Number(ms)
  if (!Number.isFinite(gegevenOp)) return null
  return { gegevenOp: new Date(gegevenOp), doelen: lijst.split('~').filter(isDoel) }
}
