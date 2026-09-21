import { MapPin, ShieldCheck, Sparkles } from "lucide-react";
import { images } from "@/data/images";

const points = [
  {
    icon: MapPin,
    title: "Right in the centre of things",
    description:
      "We're on Adeola Odeku Street in Victoria Island — close to offices, restaurants, and the Third Mainland Bridge. You spend less time in traffic and more time doing what matters.",
  },
  {
    icon: ShieldCheck,
    title: "Safe and well managed",
    description:
      "CCTV at every entrance, 24-hour security, and a front desk team that knows every guest by name. Your peace of mind is not something we leave to chance.",
  },
  {
    icon: Sparkles,
    title: "Comfort that just works",
    description:
      "Strong Wi-Fi, hot water that stays hot, beds you actually sleep well in, and 24/7 power so you never have to think about it. We handle the small things so you don't have to.",
  },
];

export function WhyStayHere() {
  return (
    <section className="section-padding" style={{ backgroundColor: "#EDE8DC" }}>
      <div className="container-hotel">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Image */}
          <div className="order-2 lg:order-1">
            <img
              src={images.about}
              alt="The Calabash Hotel interior"
              width={600}
              height={450}
              loading="lazy"
              className="w-full aspect-[4/3] object-cover rounded-[14px]"
            />
          </div>

          {/* Text */}
          <div className="order-1 lg:order-2">
            <h2 className="text-[28px] md:text-[40px] font-[Fraunces] font-semibold text-[#0F3D3E] leading-[1.15] mb-6">
              Why guests choose to stay with us
            </h2>

            <div className="space-y-6">
              {points.map((point) => (
                <div key={point.title} className="flex gap-4">
                  <div className="shrink-0 w-10 h-10 rounded-[10px] bg-[#0F3D3E] flex items-center justify-center">
                    <point.icon size={18} className="text-[#B8893B]" />
                  </div>
                  <div>
                    <h3 className="text-[18px] font-semibold text-[#0F3D3E] mb-1">
                      {point.title}
                    </h3>
                    <p className="text-[16px] text-[#4A5553] leading-[1.6]">
                      {point.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
