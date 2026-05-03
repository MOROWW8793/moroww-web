import Link from "next/link";
import Image from "next/image";

export function HostTeaser() {
  return (
    <section className="bg-white py-0 overflow-hidden">
      <div className="grid md:grid-cols-2 min-h-[600px]">
        {/* Image */}
        <div className="relative min-h-[400px] md:min-h-full">
          <Image
            src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=80"
            alt="moroww eigenaar"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        {/* Text */}
        <div className="flex items-center px-10 py-20 md:px-16 lg:px-24 bg-moroww-blush">
          <div className="max-w-md">
            <p className="text-xs font-semibold uppercase tracking-widest text-moroww-orange mb-4">Voor eigenaars</p>
            <h2 className="font-bold text-moroww-black text-4xl md:text-5xl leading-tight mb-6">
              Jouw asset.<br />Ons protocol.
            </h2>
            <p className="text-moroww-black/60 text-base leading-relaxed mb-10">
              Je hebt een woning aangekocht als investering, niet als bijbaan.
              moroww beheert je eigendom met slimme technologie, een eigen
              schoonmaakprotocol en een sensor die bewaakt wat jij niet kan zien.
              Jij bent stille investeerder. Wij zijn het systeem.
            </p>
            <Link
              href="/eigenaar-worden"
              className="inline-flex items-center rounded-full bg-moroww-orange hover:bg-moroww-orange-dark text-white font-semibold px-8 py-4 transition-colors duration-200"
            >
              Bekijk het Founding Partner-programma
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
