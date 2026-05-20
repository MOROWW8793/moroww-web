// app/admin/prospects/page.tsx
//
// moroww OS - Prospects sourcing dashboard
//
// Past dit aan jullie bestaande admin auth-patroon aan
// (huidige /admin gebruikt password-protection - hergebruik die wrapper).

'use client';

import { useEffect, useMemo, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// ─── TYPES ─────────────────────────────────────────────────────────────────

type Prospect = {
  id: string;
  source_url: string;
  name: string;
  type: string | null;
  province: string | null;
  city: string | null;
  guests: number | null;
  bedrooms: number | null;
  beds: number | null;
  bathrooms: number | null;
  price_from: number | null;
  description: string | null;
  owner_website: string | null;
  owner_email: string | null;
  owner_phone: string | null;
  owner_name: string | null;
  sensory_signals: string[] | null;
  has_pool: boolean;
  has_sauna: boolean;
  score: number;
  score_breakdown: string[] | null;
  is_passing_filters: boolean;
  reject_reason: string | null;
  portfolio_size: number;
  status: string;
  notes: string | null;
  last_contacted_at: string | null;
  follow_up_date: string | null;
  first_seen_at: string;
  last_scraped_at: string;
};

const STATUS_OPTIONS = [
  { value: 'new', label: 'Nieuw' },
  { value: 'shortlisted', label: 'Shortlist' },
  { value: 'research', label: 'Research' },
  { value: 'contacted', label: 'Gecontacteerd' },
  { value: 'meeting_scheduled', label: 'Afspraak gepland' },
  { value: 'in_audit', label: 'In audit' },
  { value: 'in_collection', label: 'In collectie' },
  { value: 'rejected_by_us', label: 'Afgewezen door ons' },
  { value: 'rejected_by_them', label: 'Geen reactie / geweigerd' },
  { value: 'follow_up_later', label: 'Later opvolgen' },
];

const PROVINCES = ['Alle', 'West-Vlaanderen', 'Namen', 'Luik', 'Luxemburg'];

// ─── HELPERS ───────────────────────────────────────────────────────────────

function scoreColor(score: number): string {
  if (score >= 20) return 'text-[#1A1A1A] bg-[#FAE4D6]';
  if (score >= 15) return 'text-white bg-[#C08D6E]';
  if (score >= 10) return 'text-[#1A1A1A] bg-[#FEA05E]';
  return 'text-[#1A1A1A] bg-gray-100';
}

function relativeTime(iso: string | null): string {
  if (!iso) return '-';
  const days = Math.floor((Date.now() - new Date(iso).getTime()) / 86400000);
  if (days === 0) return 'vandaag';
  if (days === 1) return 'gisteren';
  if (days < 7) return `${days} dagen geleden`;
  if (days < 30) return `${Math.floor(days / 7)} weken geleden`;
  return `${Math.floor(days / 30)} maanden geleden`;
}

// ─── COMPONENT ─────────────────────────────────────────────────────────────

export default function ProspectsPage() {
  const [prospects, setProspects] = useState<Prospect[]>([]);
  const [loading, setLoading] = useState(true);

  const [statusFilter, setStatusFilter] = useState<string[]>(['new', 'shortlisted']);
  const [provinceFilter, setProvinceFilter] = useState<string>('Alle');
  const [minScore, setMinScore] = useState<number>(0);
  const [showRejected, setShowRejected] = useState(false);
  const [search, setSearch] = useState('');

  const [selected, setSelected] = useState<Prospect | null>(null);

  // Load prospects
  useEffect(() => {
    (async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('prospects')
        .select('*')
        .order('score', { ascending: false })
        .limit(500);
      if (error) console.error(error);
      else setProspects(data || []);
      setLoading(false);
    })();
  }, []);

  // Filtering
  const filtered = useMemo(() => {
    return prospects.filter((p) => {
      if (!showRejected && !p.is_passing_filters) return false;
      if (statusFilter.length && !statusFilter.includes(p.status)) return false;
      if (provinceFilter !== 'Alle' && p.province !== provinceFilter) return false;
      if (p.score < minScore) return false;
      if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [prospects, statusFilter, provinceFilter, minScore, showRejected, search]);

  // Update status (inline)
  async function updateStatus(id: string, status: string) {
    const updates: Partial<Prospect> = { status };
    if (status === 'contacted') updates.last_contacted_at = new Date().toISOString();
    const { error } = await supabase.from('prospects').update(updates).eq('id', id);
    if (error) console.error(error);
    else {
      setProspects((prev) => prev.map((p) => (p.id === id ? { ...p, ...updates } : p)));
      if (selected?.id === id) setSelected({ ...selected, ...updates } as Prospect);
    }
  }

  // Update notes / owner info (from detail panel)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async function updateField(id: string, field: keyof Prospect, value: any) {
    const { error } = await supabase
      .from('prospects')
      .update({ [field]: value })
      .eq('id', id);
    if (error) console.error(error);
    else {
      setProspects((prev) => prev.map((p) => (p.id === id ? { ...p, [field]: value } : p)));
      if (selected?.id === id) setSelected({ ...selected, [field]: value } as Prospect);
    }
  }

  // ─── RENDER ──────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-[#FAE4D6]/30 p-6 font-['Overused_Grotesk',sans-serif]">
      <div className="max-w-[1600px] mx-auto">
        {/* Header */}
        <div className="mb-6 flex items-baseline justify-between">
          <h1 className="text-2xl font-light tracking-tight text-[#1A1A1A]">
            prospects sourcing
          </h1>
          <div className="text-sm text-[#1A1A1A]/60">
            {filtered.length} van {prospects.length} panden
          </div>
        </div>

        {/* Filters */}
        <div className="mb-4 flex flex-wrap items-center gap-3 rounded-lg bg-white p-4 shadow-sm">
          <input
            type="text"
            placeholder="Zoek op naam..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="rounded border border-[#1A1A1A]/20 px-3 py-1.5 text-sm w-48"
          />
          <select
            value={provinceFilter}
            onChange={(e) => setProvinceFilter(e.target.value)}
            className="rounded border border-[#1A1A1A]/20 px-3 py-1.5 text-sm"
          >
            {PROVINCES.map((p) => (
              <option key={p}>{p}</option>
            ))}
          </select>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-[#1A1A1A]/60">Score ≥</span>
            <input
              type="number"
              min={0}
              max={25}
              value={minScore}
              onChange={(e) => setMinScore(parseInt(e.target.value) || 0)}
              className="w-16 rounded border border-[#1A1A1A]/20 px-2 py-1 text-sm"
            />
          </div>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={showRejected}
              onChange={(e) => setShowRejected(e.target.checked)}
            />
            Toon afgewezen
          </label>
          <div className="ml-auto flex flex-wrap gap-1">
            {STATUS_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() =>
                  setStatusFilter((prev) =>
                    prev.includes(opt.value)
                      ? prev.filter((s) => s !== opt.value)
                      : [...prev, opt.value]
                  )
                }
                className={`rounded-full px-3 py-1 text-xs ${
                  statusFilter.includes(opt.value)
                    ? 'bg-[#1A1A1A] text-white'
                    : 'bg-[#1A1A1A]/10 text-[#1A1A1A]/60'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-lg bg-white shadow-sm">
          {loading ? (
            <div className="p-8 text-center text-[#1A1A1A]/60">laden...</div>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-[#1A1A1A] text-white">
                <tr>
                  <th className="px-3 py-2 text-left">Score</th>
                  <th className="px-3 py-2 text-left">Naam</th>
                  <th className="px-3 py-2 text-left">Provincie</th>
                  <th className="px-3 py-2 text-left">G/Slk</th>
                  <th className="px-3 py-2 text-left">€/n</th>
                  <th className="px-3 py-2 text-left">Sensorisch</th>
                  <th className="px-3 py-2 text-left">Email</th>
                  <th className="px-3 py-2 text-left">Status</th>
                  <th className="px-3 py-2 text-left">Laatste contact</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((p) => (
                  <tr
                    key={p.id}
                    onClick={() => setSelected(p)}
                    className="border-b border-[#1A1A1A]/5 cursor-pointer hover:bg-[#FAE4D6]/40"
                  >
                    <td className="px-3 py-2">
                      <span className={`rounded px-2 py-0.5 text-xs font-bold ${scoreColor(p.score)}`}>
                        {p.score}
                      </span>
                    </td>
                    <td className="px-3 py-2 font-medium">{p.name}</td>
                    <td className="px-3 py-2 text-[#1A1A1A]/70">{p.province}</td>
                    <td className="px-3 py-2 text-[#1A1A1A]/70">
                      {p.guests}/{p.bedrooms}
                    </td>
                    <td className="px-3 py-2 text-[#1A1A1A]/70">
                      {p.price_from ? `€${p.price_from}` : '-'}
                    </td>
                    <td className="px-3 py-2 text-xs text-[#1A1A1A]/60">
                      {p.sensory_signals?.slice(0, 3).join(', ')}
                    </td>
                    <td className="px-3 py-2 text-xs">
                      {p.owner_email ? (
                        <a
                          href={`mailto:${p.owner_email}`}
                          onClick={(e) => e.stopPropagation()}
                          className="text-blue-600 underline"
                        >
                          {p.owner_email}
                        </a>
                      ) : (
                        '-'
                      )}
                    </td>
                    <td className="px-3 py-2" onClick={(e) => e.stopPropagation()}>
                      <select
                        value={p.status}
                        onChange={(e) => updateStatus(p.id, e.target.value)}
                        className="rounded border border-[#1A1A1A]/20 px-2 py-0.5 text-xs"
                      >
                        {STATUS_OPTIONS.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-3 py-2 text-xs text-[#1A1A1A]/60">
                      {relativeTime(p.last_contacted_at)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Detail drawer */}
        {selected && (
          <div
            className="fixed inset-0 z-50 bg-black/40"
            onClick={() => setSelected(null)}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="fixed right-0 top-0 h-full w-[640px] overflow-y-auto bg-white p-6"
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute right-4 top-4 text-[#1A1A1A]/40 hover:text-[#1A1A1A]"
              >
                sluiten
              </button>

              <div className="mb-2 flex items-center gap-3">
                <span className={`rounded px-2 py-0.5 text-xs font-bold ${scoreColor(selected.score)}`}>
                  {selected.score}
                </span>
                <span className="text-xs text-[#1A1A1A]/60">{selected.province}</span>
              </div>
              <h2 className="mb-4 text-xl font-light">{selected.name}</h2>

              <div className="mb-6 text-sm text-[#1A1A1A]/80">
                <div>
                  {selected.type} · {selected.guests} gasten · {selected.bedrooms} slpk · {selected.bathrooms} badk
                </div>
                <div>{selected.price_from ? `€${selected.price_from}/nacht` : 'prijs onbekend'}</div>
              </div>

              <section className="mb-6">
                <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-[#1A1A1A]/60">
                  Beschrijving
                </h3>
                <p className="text-sm leading-relaxed">{selected.description}</p>
              </section>

              {selected.sensory_signals?.length ? (
                <section className="mb-6">
                  <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-[#1A1A1A]/60">
                    Sensorische signalen
                  </h3>
                  <div className="flex flex-wrap gap-1">
                    {selected.sensory_signals.map((s) => (
                      <span key={s} className="rounded-full bg-[#FAE4D6] px-2 py-0.5 text-xs">
                        {s}
                      </span>
                    ))}
                  </div>
                </section>
              ) : null}

              {selected.score_breakdown?.length ? (
                <section className="mb-6">
                  <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-[#1A1A1A]/60">
                    Score-detail
                  </h3>
                  <ul className="space-y-0.5 text-sm">
                    {selected.score_breakdown.map((b, i) => (
                      <li key={i} className="text-[#1A1A1A]/80">• {b}</li>
                    ))}
                  </ul>
                </section>
              ) : null}

              <section className="mb-6">
                <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-[#1A1A1A]/60">
                  Contact
                </h3>
                <div className="space-y-2 text-sm">
                  <a href={selected.source_url} target="_blank" rel="noopener noreferrer" className="block text-blue-600 underline">
                    Club Belgium listing →
                  </a>
                  {selected.owner_website && (
                    <a href={selected.owner_website} target="_blank" rel="noopener noreferrer" className="block text-blue-600 underline">
                      Eigen website →
                    </a>
                  )}
                  {selected.owner_email && (
                    <a href={`mailto:${selected.owner_email}`} className="block text-blue-600 underline">
                      {selected.owner_email}
                    </a>
                  )}
                  <input
                    type="text"
                    placeholder="Eigenaarsnaam (vul handmatig in)"
                    defaultValue={selected.owner_name || ''}
                    onBlur={(e) => updateField(selected.id, 'owner_name', e.target.value)}
                    className="w-full rounded border border-[#1A1A1A]/20 px-3 py-1.5 text-sm"
                  />
                  <input
                    type="text"
                    placeholder="Telefoon"
                    defaultValue={selected.owner_phone || ''}
                    onBlur={(e) => updateField(selected.id, 'owner_phone', e.target.value)}
                    className="w-full rounded border border-[#1A1A1A]/20 px-3 py-1.5 text-sm"
                  />
                </div>
              </section>

              <section className="mb-6">
                <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-[#1A1A1A]/60">
                  Status & notities
                </h3>
                <select
                  value={selected.status}
                  onChange={(e) => updateStatus(selected.id, e.target.value)}
                  className="mb-2 w-full rounded border border-[#1A1A1A]/20 px-3 py-1.5 text-sm"
                >
                  {STATUS_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>

                {selected.status === 'follow_up_later' && (
                  <input
                    type="date"
                    defaultValue={selected.follow_up_date || ''}
                    onBlur={(e) => updateField(selected.id, 'follow_up_date', e.target.value)}
                    className="mb-2 w-full rounded border border-[#1A1A1A]/20 px-3 py-1.5 text-sm"
                  />
                )}

                <textarea
                  placeholder="Notities (Noam / Brent)..."
                  defaultValue={selected.notes || ''}
                  onBlur={(e) => updateField(selected.id, 'notes', e.target.value)}
                  rows={4}
                  className="w-full rounded border border-[#1A1A1A]/20 px-3 py-2 text-sm"
                />
              </section>

              {!selected.is_passing_filters && selected.reject_reason && (
                <div className="rounded bg-[#C08D6E]/10 px-3 py-2 text-xs text-[#C08D6E]">
                  Afgewezen op harde filter: {selected.reject_reason}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
