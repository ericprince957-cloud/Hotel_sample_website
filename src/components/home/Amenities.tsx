import {
  Wind,
  Wifi,
  Zap,
  Car,
  UtensilsCrossed,
  ConciergeBell,
  ShieldCheck,
  Plane,
} from "lucide-react";

const amenities = [
  { icon: Wind, label: "Air conditioning" },
  { icon: Wifi, label: "Free Wi-Fi" },
  { icon: Zap, label: "24/7 power backup" },
  { icon: Car, label: "Secure parking" },
  { icon: UtensilsCrossed, label: "Restaurant & bar" },
  { icon: ConciergeBell, label: "Room service" },
  { icon: ShieldCheck, label: "CCTV & security" },
  { icon: Plane, label: "Airport pickup" },
];

export function Amenities() {
  return (
    <section className="section-padding">
      <div className="container-hotel">
        {/* Heading */}
        <div className="mb-10 text-center">
          <h2 className="text-[28px] md:text-[40px] font-[Fraunces] font-semibold text-[#0F3D3E] leading-[1.15] mb-3">
            Everything you need, taken care of
          </h2>
          <p className="text-[16px] md:text-[18px] text-[#4A5553] max-w-prose-hotel mx-auto">
            We've put together the services that make a stay comfortable — so you
            can focus on what brought you here.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6">
          {amenities.map((amenity) => (
            <div key={amenity.label} className="flex flex-col items-center text-center gap-3">
              <div className="w-14 h-14 rounded-[14px] bg-[#EDE8DC] flex items-center justify-center">
                <amenity.icon size={24} className="text-[#0F3D3E]" />
              </div>
              <span className="text-[14px] md:text-[16px] font-medium text-[#14211F]">
                {amenity.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
