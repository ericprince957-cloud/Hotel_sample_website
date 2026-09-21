import { Link } from "react-router-dom";
import { Instagram, Facebook, MapPin, Phone, Mail, Clock } from "lucide-react";
import { siteConfig } from "@/data/site";

export function Footer() {
  return (
    <footer
      className="border-t border-[#E2DBC9]"
      style={{ backgroundColor: "#EDE8DC" }}
    >
      <div className="container-hotel section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="font-[Fraunces] text-[22px] font-semibold text-[#0F3D3E]">
              {siteConfig.name}
            </h3>
            <p className="text-[16px] text-[#4A5553] max-w-prose-hotel">
              {siteConfig.tagline}
            </p>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-[Manrope] text-[14px] font-semibold uppercase tracking-wider text-[#0F3D3E]">
              Contact
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-[14px] text-[#4A5553]">
                <MapPin size={16} className="mt-0.5 shrink-0 text-[#B8893B]" />
                <span>{siteConfig.address}</span>
              </li>
              <li className="flex items-center gap-2 text-[14px] text-[#4A5553]">
                <Phone size={16} className="shrink-0 text-[#B8893B]" />
                <a href={`tel:${siteConfig.phone}`} className="hover:text-[#0F3D3E] transition-colors">
                  {siteConfig.phone}
                </a>
              </li>
              <li className="flex items-center gap-2 text-[14px] text-[#4A5553]">
                <Mail size={16} className="shrink-0 text-[#B8893B]" />
                <a href={`mailto:${siteConfig.email}`} className="hover:text-[#0F3D3E] transition-colors">
                  {siteConfig.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Check-in times & Quick links */}
          <div className="space-y-4">
            <h4 className="font-[Manrope] text-[14px] font-semibold uppercase tracking-wider text-[#0F3D3E]">
              Stay Info
            </h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-[14px] text-[#4A5553]">
                <Clock size={16} className="shrink-0 text-[#B8893B]" />
                <span>Check-in: {siteConfig.checkIn}</span>
              </li>
              <li className="flex items-center gap-2 text-[14px] text-[#4A5553]">
                <Clock size={16} className="shrink-0 text-[#B8893B]" />
                <span>Check-out: {siteConfig.checkOut}</span>
              </li>
            </ul>

            <h4 className="font-[Manrope] text-[14px] font-semibold uppercase tracking-wider text-[#0F3D3E] pt-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {siteConfig.nav.map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className="text-[14px] text-[#4A5553] hover:text-[#0F3D3E] transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div className="space-y-4">
            <h4 className="font-[Manrope] text-[14px] font-semibold uppercase tracking-wider text-[#0F3D3E]">
              Follow Us
            </h4>
            <div className="flex items-center gap-3">
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex items-center justify-center w-10 h-10 rounded-[10px] bg-[#FAF8F3] text-[#0F3D3E] hover:bg-[#0F3D3E] hover:text-[#FAF8F3] transition-colors"
              >
                <Instagram size={18} />
              </a>
              <a
                href={siteConfig.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex items-center justify-center w-10 h-10 rounded-[10px] bg-[#FAF8F3] text-[#0F3D3E] hover:bg-[#0F3D3E] hover:text-[#FAF8F3] transition-colors"
              >
                <Facebook size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-[#E2DBC9] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[14px] text-[#4A5553]">
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <a
            href="https://vectorcodes.ng"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[14px] text-[#4A5553] hover:text-[#0F3D3E] transition-colors"
          >
            Website by Vector Codes
          </a>
        </div>
      </div>
    </footer>
  );
}
