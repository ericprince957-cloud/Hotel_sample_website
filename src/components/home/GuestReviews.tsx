import { Quote } from "lucide-react";

// SAMPLE REVIEWS — Replace with real reviews before launch
// TODO: Replace with real reviews before launch

const reviews = [
  {
    quote:
      "I've stayed at hotels in Victoria Island before, but The Calabash is different. The room was clean, the bed was comfortable, and the staff actually remembered my name. I'll be back.",
    name: "Chidinma O.",
    city: "Lagos",
  },
  {
    quote:
      "I was in town for a conference and needed a place that was quiet and close to everything. The Calabash delivered. The Wi-Fi was strong, the power never went off, and breakfast was good.",
    name: "Emeka A.",
    city: "Port Harcourt",
  },
  {
    quote:
      "My wife and I booked the suite for our anniversary. It was worth every naira. The room was spacious, the view was lovely, and the team made us feel special. Thank you, Calabash.",
    name: "Tunde & Kemi B.",
    city: "Abuja",
  },
];

export function GuestReviews() {
  return (
    <section className="section-padding">
      <div className="container-hotel">
        {/* Heading */}
        <div className="mb-10 text-center">
          <h2 className="text-[28px] md:text-[40px] font-[Fraunces] font-semibold text-[#0F3D3E] leading-[1.15] mb-3">
            What our guests say
          </h2>
          <p className="text-[16px] md:text-[18px] text-[#4A5553] max-w-prose-hotel mx-auto">
            Real words from people who've stayed with us.
          </p>
        </div>

        {/* Reviews grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-[#EDE8DC] rounded-[14px] p-6 md:p-8 flex flex-col"
            >
              <Quote size={24} className="text-[#B8893B] mb-4" />
              <p className="text-[16px] text-[#14211F] leading-[1.6] mb-6 flex-1">
                "{review.quote}"
              </p>
              <div>
                <p className="text-[14px] font-semibold text-[#0F3D3E]">
                  {review.name}
                </p>
                <p className="text-[14px] text-[#4A5553]">{review.city}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
