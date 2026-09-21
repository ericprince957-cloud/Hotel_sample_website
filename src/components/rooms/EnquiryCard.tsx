import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { formatNaira } from "@/lib/utils";
import { siteConfig } from "@/data/site";
import { MessageCircle, Phone } from "lucide-react";

interface EnquiryCardProps {
  roomName: string;
  roomSlug: string;
  pricePerNight: number;
}

export function EnquiryCard({ roomName, roomSlug, pricePerNight }: EnquiryCardProps) {
  const whatsappUrl = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
    `Hello ${siteConfig.name}, I would like to enquire about the ${roomName}.`
  )}`;

  return (
    <>
      {/* Desktop: sticky card on right side */}
      <div className="hidden lg:block">
        <div className="sticky top-24 bg-white rounded-[14px] border border-[#E2DBC9] p-6">
          <div className="mb-4">
            <p className="text-[14px] text-[#4A5553] mb-1">Starting from</p>
            <p className="text-[28px] font-[Fraunces] font-semibold text-[#B8893B]">
              {formatNaira(pricePerNight)}
              <span className="text-[14px] text-[#4A5553] font-[Manrope] font-normal">
                {" "}
                / night
              </span>
            </p>
          </div>

          <div className="space-y-3">
            <Link to={`/contact?room=${roomSlug}`}>
              <Button size="lg" className="w-full">
                Enquire now
              </Button>
            </Link>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="lg" className="w-full">
                <MessageCircle size={16} />
                WhatsApp
              </Button>
            </a>
            <a href={`tel:${siteConfig.phone}`}>
              <Button variant="ghost" size="lg" className="w-full">
                <Phone size={16} />
                {siteConfig.phone}
              </Button>
            </a>
          </div>

          <p className="mt-4 text-[12px] text-[#4A5553] text-center">
            Taxes and fees confirmed at booking
          </p>
        </div>
      </div>

      {/* Mobile: sticky bottom bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-[#E2DBC9] px-4 py-3 shadow-lg">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-[12px] text-[#4A5553]">From</p>
            <p className="text-[18px] font-semibold text-[#B8893B]">
              {formatNaira(pricePerNight)}
              <span className="text-[12px] text-[#4A5553] font-normal">
                {" "}
                / night
              </span>
            </p>
          </div>
          <Link to={`/contact?room=${roomSlug}`}>
            <Button size="default">Enquire now</Button>
          </Link>
        </div>
      </div>
    </>
  );
}
