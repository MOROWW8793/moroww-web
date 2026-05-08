"use client";

import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  fotos: string[];
  naam: string;
}

export function WoningGalerij({ fotos, naam }: Props) {
  const [lightbox, setLightbox] = useState<number | null>(null);

  const open = (i: number) => setLightbox(i);
  const close = () => setLightbox(null);
  const prev = () => setLightbox((i) => (i! > 0 ? i! - 1 : fotos.length - 1));
  const next = () => setLightbox((i) => (i! < fotos.length - 1 ? i! + 1 : 0));

  const main = fotos[0];
  const grid = fotos.slice(1, 5);

  return (
    <>
      {/* ── Galerij ── */}
      <div className="flex flex-col md:flex-row gap-2 h-[380px] md:h-[480px]">
        {/* Hoofdfoto links (60%) */}
        <button
          className="relative w-full md:w-[60%] h-48 md:h-full overflow-hidden rounded-2xl md:rounded-l-2xl md:rounded-r-none cursor-zoom-in"
          onClick={() => open(0)}
        >
          <img
            src={main}
            alt={naam}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </button>

        {/* Grid 2x2 rechts (40%) */}
        {grid.length > 0 && (
          <div className="hidden md:grid grid-cols-2 gap-2 w-[40%] h-full">
            {grid.map((foto, i) => (
              <button
                key={i}
                className={`relative overflow-hidden cursor-zoom-in ${
                  i === 0 ? "rounded-tr-2xl" : i === 1 ? "" : i === 2 ? "" : "rounded-br-2xl"
                }`}
                onClick={() => open(i + 1)}
              >
                <img
                  src={foto}
                  alt={`${naam} foto ${i + 2}`}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                {/* "Alle foto's" overlay op de laatste */}
                {i === 3 && fotos.length > 5 && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">
                      +{fotos.length - 5} foto&apos;s
                    </span>
                  </div>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ── Thumbnail strip ── */}
      {fotos.length > 1 && (
        <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
          {fotos.map((foto, i) => (
            <button
              key={i}
              onClick={() => open(i)}
              className={`shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                lightbox === i ? "border-moroww-orange" : "border-transparent"
              }`}
            >
              <img
                src={foto}
                alt={`${naam} ${i + 1}`}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </button>
          ))}
        </div>
      )}

      {/* ── Lightbox ── */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
          onClick={close}
        >
          {/* Sluiten */}
          <button
            className="absolute top-4 right-4 text-white p-2 hover:bg-white/10 rounded-full transition-colors"
            onClick={close}
          >
            <X size={24} />
          </button>

          {/* Vorige */}
          <button
            className="absolute left-4 text-white p-2 hover:bg-white/10 rounded-full transition-colors"
            onClick={(e) => { e.stopPropagation(); prev(); }}
          >
            <ChevronLeft size={32} />
          </button>

          {/* Foto */}
          <div
            className="max-w-5xl max-h-[85vh] mx-16"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={fotos[lightbox]}
              alt={`${naam} ${lightbox + 1}`}
              style={{ maxWidth: "100%", maxHeight: "85vh", objectFit: "contain" }}
            />
            <p className="text-white/50 text-center text-sm mt-2">
              {lightbox + 1} / {fotos.length}
            </p>
          </div>

          {/* Volgende */}
          <button
            className="absolute right-4 text-white p-2 hover:bg-white/10 rounded-full transition-colors"
            onClick={(e) => { e.stopPropagation(); next(); }}
          >
            <ChevronRight size={32} />
          </button>
        </div>
      )}
    </>
  );
}
