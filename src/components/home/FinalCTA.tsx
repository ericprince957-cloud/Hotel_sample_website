import { Button } from "@/components/ui/button";
import { siteConfig } from "@/data/site";
import { MessageCircle, Phone } from "lucide-react";

export function FinalCTA() {
  const whatsappUrl = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
    `Hello ${siteConfig.name}, I would like to make an enquiry.`
  )}`;

  return (
    <section className="py-16 md:py-24" style={{ backgroundColor: "#0F3D3E" }}>
      <div className="container-hotel text-center">
        <h2 className="text-[28px] md:text-[40px] font-[Fraunces] font-semibold text-[#FAF8F3] leading-[1.15] mb-4">
          Ready to book your stay?
        </h2>
        <p className="text-[16px] md:text-[18px] text-[#FAF8F3]/90 max-w-prose-hotel mx-auto mb-8">
          Reach out on WhatsApp or give us a call. We'll help you find the right
          room and sort out the details.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
            <Button
              size="lg"
              variant="accent"
              className="w-full sm:w-auto"
            >
              <MessageCircle size={16} />
              Enquire on WhatsApp
            </Button>
          </a>
          <a href={`tel:${siteConfig.phone}`}>
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto border-[#FAF8F3] text-[#FAF8F3] hover:bg-[#FAF8F3] hover:text-[#0F3D3E]"
            >
              <Phone size={16} />
              Call us
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
