'use client';
import { useState } from 'react';

export function Kopieer({ tekst, label = 'kopieer bericht' }: { tekst: string; label?: string }) {
  const [ok, setOk] = useState(false);
  return (
    <button
      type="button"
      className="hub-knopklein"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(tekst);
          setOk(true);
          setTimeout(() => setOk(false), 2000);
        } catch {
          setOk(false);
        }
      }}
    >
      {ok ? 'gekopieerd' : label}
    </button>
  );
}
