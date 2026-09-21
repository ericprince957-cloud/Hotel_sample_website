import { siteConfig } from "@/data/site";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function Contact() {
  return (
    <div className="section-padding">
      <div className="container-hotel">
        <h1 className="text-[40px] md:text-[56px] font-[Fraunces] font-semibold text-[#0F3D3E] leading-[1.15] mb-4">
          Contact Us
        </h1>
        <p className="text-[18px] text-[#4A5553] max-w-prose-hotel mb-10">
          We'd love to hear from you. Reach out by phone, email, or WhatsApp.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Contact details */}
          <div className="space-y-6">
            <div className="flex items-start gap-3">
              <MapPin size={20} className="mt-0.5 text-[#B8893B] shrink-0" />
              <div>
                <p className="text-[14px] font-semibold text-[#0F3D3E] uppercase tracking-wider mb-1">
                  Address
                </p>
                <p className="text-[16px] text-[#4A5553]">{siteConfig.address}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone size={20} className="mt-0.5 text-[#B8893B] shrink-0" />
              <div>
                <p className="text-[14px] font-semibold text-[#0F3D3E] uppercase tracking-wider mb-1">
                  Phone
                </p>
                <a
                  href={`tel:${siteConfig.phone}`}
                  className="text-[16px] text-[#4A5553] hover:text-[#0F3D3E] transition-colors"
                >
                  {siteConfig.phone}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail size={20} className="mt-0.5 text-[#B8893B] shrink-0" />
              <div>
                <p className="text-[14px] font-semibold text-[#0F3D3E] uppercase tracking-wider mb-1">
                  Email
                </p>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-[16px] text-[#4A5553] hover:text-[#0F3D3E] transition-colors"
                >
                  {siteConfig.email}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock size={20} className="mt-0.5 text-[#B8893B] shrink-0" />
              <div>
                <p className="text-[14px] font-semibold text-[#0F3D3E] uppercase tracking-wider mb-1">
                  Check-in / Check-out
                </p>
                <p className="text-[16px] text-[#4A5553]">
                  Check-in: {siteConfig.checkIn} · Check-out: {siteConfig.checkOut}
                </p>
              </div>
            </div>
          </div>

          {/* Form placeholder */}
          <div className="bg-[#EDE8DC] rounded-[14px] p-6 md:p-8">
            <h2 className="text-[22px] font-[Fraunces] font-semibold text-[#0F3D3E] mb-4">
              Send us a message
            </h2>
            <p className="text-[16px] text-[#4A5553]">
              Contact form will appear here.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
