import { Sparkles, ShieldCheck, Heart } from "lucide-react";

// SAMPLE DATA - Replace with real data before launch
// TODO: Replace with real data before launch
const hotelFacts = [
  { label: "Year opened", value: "2018" },
  { label: "Number of rooms", value: "24" },
  { label: "Staff members", value: "35+" },
];

const values = [
  {
    icon: Sparkles,
    title: "Cleanliness",
    description:
      "Every room is cleaned to a high standard. We check twice so you don't have to worry.",
  },
  {
    icon: ShieldCheck,
    title: "Security",
    description:
      "CCTV at every entrance, 24-hour security, and a team that knows every guest by name.",
  },
  {
    icon: Heart,
    title: "Warm service",
    description:
      "We treat every guest like family. Friendly, helpful, and always ready to go the extra mile.",
  },
];

// Optional team section - hidden if no data
// TODO: Add team data when available
const teamMembers: Array<{ name: string; role: string; image: string }> = [];

export default function About() {
  return (
    <div className="section-padding">
      <div className="container-hotel">
        {/* Hero story */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-[40px] md:text-[56px] font-[Fraunces] font-semibold text-[#0F3D3E] leading-[1.15] mb-6">
            Our story
          </h1>
          <div className="space-y-4 text-[16px] md:text-[18px] text-[#4A5553] leading-[1.6]">
            <p>
              The Calabash Hotel started with a simple idea: create a place where
              travellers feel genuinely welcome. Not just another hotel, but a
              space that combines comfort with warmth, where every detail is
              thought through and every guest is treated like family.
            </p>
            <p>
              We opened our doors in 2018 with 24 rooms and a commitment to doing
              things differently. Strong Wi-Fi, reliable power, clean rooms, and
              staff who actually care. It sounds simple, but in a city like Lagos,
              it makes all the difference. Today, we're proud to be one of
              Victoria Island's most trusted hotels.
            </p>
          </div>
        </div>

        {/* Values section */}
        <div className="mb-16">
          <h2 className="text-[28px] md:text-[40px] font-[Fraunces] font-semibold text-[#0F3D3E] leading-[1.15] mb-8 text-center">
            What we stand for
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((value) => (
              <div
                key={value.title}
                className="bg-[#EDE8DC] rounded-[14px] p-6 text-center"
              >
                <div className="w-14 h-14 rounded-[14px] bg-[#0F3D3E] flex items-center justify-center mx-auto mb-4">
                  <value.icon size={24} className="text-[#B8893B]" />
                </div>
                <h3 className="text-[22px] font-[Fraunces] font-semibold text-[#0F3D3E] mb-2">
                  {value.title}
                </h3>
                <p className="text-[16px] text-[#4A5553] leading-[1.6]">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline / facts block */}
        <div className="mb-16">
          <h2 className="text-[28px] md:text-[40px] font-[Fraunces] font-semibold text-[#0F3D3E] leading-[1.15] mb-8 text-center">
            By the numbers
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {hotelFacts.map((fact) => (
              <div
                key={fact.label}
                className="text-center p-6 border border-[#E2DBC9] rounded-[14px]"
              >
                <p className="text-[40px] md:text-[56px] font-[Fraunces] font-semibold text-[#B8893B] leading-[1.15] mb-2">
                  {fact.value}
                </p>
                <p className="text-[16px] text-[#4A5553]">{fact.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team section - only shown if teamMembers has data */}
        {teamMembers.length > 0 && (
          <div>
            <h2 className="text-[28px] md:text-[40px] font-[Fraunces] font-semibold text-[#0F3D3E] leading-[1.15] mb-8 text-center">
              Meet the team
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {teamMembers.map((member) => (
                <div key={member.name} className="text-center">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="text-[18px] font-semibold text-[#0F3D3E] mb-1">
                    {member.name}
                  </h3>
                  <p className="text-[14px] text-[#4A5553]">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
