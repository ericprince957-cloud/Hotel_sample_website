import { Button } from "@/components/ui/button";
import { siteConfig } from "@/data/site";
import { MapPin, Phone, MessageCircle } from "lucide-react";

export function Location() {
  const mapQuery = encodeURIComponent(siteConfig.address);
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`;
  const embedUrl = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${mapQuery}&zoom=15`;
  const whatsappUrl = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
    `Hello ${siteConfig.name}, I would like to make an enquiry.`
  )}`;

  return (
    <section className="section-padding" style={{ backgroundColor: "#EDE8DC" }}>
      <div className="container-hotel">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-start">
          {/* Map */}
          <div className="order-2 lg:order-1">
            <iframe
              title="The Calabash Hotel location"
              src={embedUrl}
              width="100%"
              height="400"
              style={{ border: 0, borderRadius: "14px" }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-[300px] md:h-[400px] rounded-[14px]"
            />
          </div>

          {/* Details */}
          <div className="order-1 lg:order-2">
            <h2 className="text-[28px] md:text-[40px] font-[Fraunces] font-semibold text-[#0F3D3E] leading-[1.15] mb-4">
              Find us
            </h2>
            <p className="text-[16px] md:text-[18px] text-[#4A5553] mb-8 max-w-prose-hotel">
              We're easy to find and easy to reach. Come see us or give us a call.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <MapPin size={20} className="mt-0.5 text-[#B8893B] shrink-0" />
                <p className="text-[16px] text-[#14211F]">{siteConfig.address}</p>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={20} className="text-[#B8893B] shrink-0" />
                <a
                  href={`tel:${siteConfig.phone}`}
                  className="text-[16px] text-[#14211F] hover:text-[#0F3D3E] transition-colors"
                >
                  {siteConfig.phone}
                </a>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <a href={mapsUrl} target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="w-full sm:w-auto">
                  Get directions
                </Button>
              </a>
              <a href={`tel:${siteConfig.phone}`}>
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  <Phone size={16} />
                  Call us
                </Button>
              </a>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  <MessageCircle size={16} />
                  WhatsApp
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
