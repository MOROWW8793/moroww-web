import { CheckCircle, Hotel, Cpu } from "lucide-react";

const pillars = [
  {
    icon: CheckCircle,
    label: "Elk huis fysiek geïnspecteerd",
    body: "Voordat het in de collectie komt",
  },
  {
    icon: Hotel,
    label: "Hotelkwaliteit, privacycomfort",
    body: "Geen receptie, geen gedoe",
  },
  {
    icon: Cpu,
    label: "Technologie die voor je werkt",
    body: "Van sleutel tot sfeer, al geregeld",
  },
];

export function TrustBar() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-5xl px-6">
        <div className="grid gap-10 md:grid-cols-3">
          {pillars.map(({ icon: Icon, label, body }) => (
            <div key={label} className="flex flex-col gap-3">
              <div className="w-10 h-10 rounded-full bg-moroww-blush flex items-center justify-center">
                <Icon size={18} className="text-moroww-orange" />
              </div>
              <h3 className="font-semibold text-moroww-black text-base">{label}</h3>
              <p className="text-sm text-moroww-black/55 leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
