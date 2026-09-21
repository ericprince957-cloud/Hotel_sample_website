import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/data/site";

export function WhatsAppButton() {
  const message = encodeURIComponent(
    `Hello ${siteConfig.name}, I would like to make an enquiry.`
  );
  const url = `https://wa.me/${siteConfig.whatsappNumber}?text=${message}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-6 right-6 z-40 flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg hover:bg-[#20bd5a] active:bg-[#1aad52] transition-colors md:bottom-8 md:right-8"
      style={{
        boxShadow: "0 4px 14px rgba(37, 211, 102, 0.35)",
      }}
    >
      <MessageCircle size={26} fill="white" />
    </a>
  );
}
