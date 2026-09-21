import { Zap, Wifi, ShieldCheck, Bed } from "lucide-react";

const facts = [
  { icon: Zap, label: "24/7 power backup" },
  { icon: Wifi, label: "Free Wi-Fi" },
  { icon: ShieldCheck, label: "Secure parking" },
  { icon: Bed, label: "24 comfortable rooms" },
];

export function TrustStrip() {
  return (
    <section className="border-b border-[#E2DBC9]" style={{ backgroundColor: "#EDE8DC" }}>
      <div className="container-hotel py-6 md:py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4">
          {facts.map((fact) => (
            <div
              key={fact.label}
              className="flex items-center gap-3 text-[#0F3D3E]"
            >
              <fact.icon size={20} className="shrink-0 text-[#B8893B]" />
              <span className="text-[14px] md:text-[16px] font-medium">
                {fact.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
