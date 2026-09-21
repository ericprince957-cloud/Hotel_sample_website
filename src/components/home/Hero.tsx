import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/data/site";
import { images } from "@/data/images";
import { Calendar, Users } from "lucide-react";

export function Hero() {
  const navigate = useNavigate();
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("2");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (checkIn) params.set("checkIn", checkIn);
    if (checkOut) params.set("checkOut", checkOut);
    if (guests) params.set("guests", guests);
    navigate(`/rooms?${params.toString()}`);
  };

  return (
    <section className="relative w-full min-h-[600px] md:min-h-[700px] overflow-hidden">
      {/* Hero image */}
      <img
        src={images.hero}
        alt={`${siteConfig.name} exterior`}
        width={1400}
        height={700}
        className="absolute inset-0 w-full h-full object-cover"
        loading="eager"
        fetchPriority="high"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0F3D3E]/70 via-[#0F3D3E]/50 to-[#0F3D3E]/80" />

      {/* Content */}
      <div className="relative z-10 container-hotel py-20 md:py-32">
        <div className="max-w-[600px]">
          {/* Headline */}
          <h1 className="text-[40px] md:text-[56px] font-[Fraunces] font-semibold text-[#FAF8F3] leading-[1.15] mb-4 animate-fade-rise">
            A quiet place to rest in the heart of {siteConfig.city}
          </h1>

          {/* Supporting sentence */}
          <p className="text-[18px] md:text-[22px] text-[#FAF8F3]/90 mb-8 animate-fade-rise-delay-1">
            Comfortable rooms, warm service, and everything you need for a restful stay.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mb-10 animate-fade-rise-delay-2">
            <Button size="lg" onClick={() => navigate("/rooms")}>
              Check availability
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-[#FAF8F3] text-[#FAF8F3] hover:bg-[#FAF8F3] hover:text-[#0F3D3E]"
              onClick={() => navigate("/rooms")}
            >
              View rooms
            </Button>
          </div>

          {/* Enquiry bar */}
          <form
            onSubmit={handleSubmit}
            className="bg-[#FAF8F3] rounded-[14px] p-4 md:p-6 shadow-lg animate-fade-rise-delay-3"
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              {/* Check-in */}
              <div className="space-y-1">
                <label className="text-[14px] font-medium text-[#0F3D3E]">
                  Check-in
                </label>
                <div className="relative">
                  <Calendar
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#4A5553]"
                  />
                  <input
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="w-full h-11 pl-10 pr-3 rounded-[10px] border border-[#E2DBC9] text-[16px] text-[#14211F] focus:outline-none focus:ring-2 focus:ring-[#B8893B]"
                  />
                </div>
              </div>

              {/* Check-out */}
              <div className="space-y-1">
                <label className="text-[14px] font-medium text-[#0F3D3E]">
                  Check-out
                </label>
                <div className="relative">
                  <Calendar
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#4A5553]"
                  />
                  <input
                    type="date"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="w-full h-11 pl-10 pr-3 rounded-[10px] border border-[#E2DBC9] text-[16px] text-[#14211F] focus:outline-none focus:ring-2 focus:ring-[#B8893B]"
                  />
                </div>
              </div>

              {/* Guests */}
              <div className="space-y-1">
                <label className="text-[14px] font-medium text-[#0F3D3E]">
                  Guests
                </label>
                <div className="relative">
                  <Users
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#4A5553]"
                  />
                  <select
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className="w-full h-11 pl-10 pr-3 rounded-[10px] border border-[#E2DBC9] text-[16px] text-[#14211F] focus:outline-none focus:ring-2 focus:ring-[#B8893B] bg-white appearance-none cursor-pointer"
                  >
                    <option value="1">1 guest</option>
                    <option value="2">2 guests</option>
                    <option value="3">3 guests</option>
                    <option value="4">4 guests</option>
                  </select>
                </div>
              </div>

              {/* Submit button */}
              <div className="flex items-end">
                <Button type="submit" size="lg" className="w-full">
                  Check availability
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
