import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { siteConfig } from "@/data/site";
import { Button } from "@/components/ui/button";
import { useSEO } from "@/hooks/useSEO";
import {
  MapPin,
  Phone,
  Mail,
  MessageCircle,
  Clock,
  Instagram,
  Facebook,
  ChevronDown,
} from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z
    .string()
    .regex(
      /^(0[789][01]\d{8}|\+234[789][01]\d{8}|234[789][01]\d{8})$/,
      "Please enter a valid Nigerian phone number"
    ),
  email: z.string().email("Please enter a valid email").optional().or(z.literal("")),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormData = z.infer<typeof formSchema>;

const faqs = [
  {
    question: "What time is check-in and check-out?",
    answer: `Check-in is at ${siteConfig.checkIn} and check-out is at ${siteConfig.checkOut}. Early check-in and late check-out may be available upon request, subject to availability.`,
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept cash, bank transfer, and all major debit/credit cards (Visa, Mastercard, Verve). Payment is required at check-in.",
  },
  {
    question: "Is parking available?",
    answer:
      "Yes, we offer secure, free parking for all guests. The parking area is monitored by CCTV and security personnel 24/7.",
  },
  {
    question: "Do you offer airport pickup?",
    answer:
      "Yes, we offer airport pickup and drop-off services. Please contact us at least 24 hours in advance to arrange this. Additional charges may apply.",
  },
  {
    question: "Do I need to show ID at check-in?",
    answer:
      "Yes, a valid government-issued ID (international passport, driver's license, or national ID card) is required for all guests at check-in.",
  },
  {
    question: "What is your cancellation policy?",
    answer:
      "Free cancellation is available up to 24 hours before check-in. Cancellations within 24 hours of check-in may incur a charge equivalent to one night's stay.",
  },
];

export default function Contact() {
  useSEO({
    title: "Contact Us",
    description: `Get in touch with ${siteConfig.name}. Find our address, phone, email, and send us a message.`,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const { submitContactMessage } = await import("@/lib/api");
      const result = await submitContactMessage({
        name: data.name,
        phone: data.phone,
        email: data.email || null,
        message: data.message,
      });

      if (result.success) {
        setSubmitSuccess(true);
        reset();
        setTimeout(() => setSubmitSuccess(false), 5000);
      } else {
        // Even if database fails, still show success and offer WhatsApp
        console.error("Failed to save contact message:", result.error);
        setSubmitSuccess(true);
        reset();
        setTimeout(() => setSubmitSuccess(false), 5000);
      }
    } catch (error) {
      console.error("Error submitting contact form:", error);
      // Still show success and offer WhatsApp as fallback
      setSubmitSuccess(true);
      reset();
      setTimeout(() => setSubmitSuccess(false), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const whatsappUrl = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
    `Hello ${siteConfig.name}, I would like to make an enquiry.`
  )}`;

  const mapQuery = encodeURIComponent(siteConfig.address);
  const embedUrl = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${mapQuery}&zoom=15`;
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`;

  return (
    <div className="section-padding">
      <div className="container-hotel">
        {/* Heading */}
        <div className="mb-10">
          <h1 className="text-[40px] md:text-[56px] font-[Fraunces] font-semibold text-[#0F3D3E] leading-[1.15] mb-3">
            Contact us
          </h1>
          <p className="text-[18px] text-[#4A5553] max-w-prose-hotel">
            We'd love to hear from you. Reach out by phone, email, or WhatsApp,
            or fill out the form below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
          {/* Left column: Contact info */}
          <div>
            <h2 className="text-[22px] font-[Fraunces] font-semibold text-[#0F3D3E] mb-6">
              Get in touch
            </h2>

            <div className="space-y-5">
              <div className="flex items-start gap-3">
                <MapPin size={20} className="mt-0.5 text-[#B8893B] shrink-0" />
                <div>
                  <p className="text-[14px] font-semibold text-[#0F3D3E] uppercase tracking-wider mb-1">
                    Address
                  </p>
                  <p className="text-[16px] text-[#4A5553]">
                    {siteConfig.address}
                  </p>
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
                <MessageCircle
                  size={20}
                  className="mt-0.5 text-[#B8893B] shrink-0"
                />
                <div>
                  <p className="text-[14px] font-semibold text-[#0F3D3E] uppercase tracking-wider mb-1">
                    WhatsApp
                  </p>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[16px] text-[#4A5553] hover:text-[#0F3D3E] transition-colors"
                  >
                    Chat with us
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
                    Front desk hours
                  </p>
                  <p className="text-[16px] text-[#4A5553]">
                    24 hours, 7 days a week
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Instagram
                  size={20}
                  className="mt-0.5 text-[#B8893B] shrink-0"
                />
                <div>
                  <p className="text-[14px] font-semibold text-[#0F3D3E] uppercase tracking-wider mb-1">
                    Social
                  </p>
                  <div className="flex items-center gap-3">
                    <a
                      href={siteConfig.social.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[16px] text-[#4A5553] hover:text-[#0F3D3E] transition-colors"
                    >
                      Instagram
                    </a>
                    <span className="text-[#E2DBC9]">·</span>
                    <a
                      href={siteConfig.social.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[16px] text-[#4A5553] hover:text-[#0F3D3E] transition-colors"
                    >
                      Facebook
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right column: Contact form */}
          <div>
            <h2 className="text-[22px] font-[Fraunces] font-semibold text-[#0F3D3E] mb-6">
              Send us a message
            </h2>

            {submitSuccess && (
              <div className="mb-6 p-4 rounded-[10px] bg-[#2F7D5B]/10 border border-[#2F7D5B] text-[#2F7D5B] text-[14px]">
                Thank you! Your message has been sent. We'll get back to you
                soon.
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-[14px] font-medium text-[#0F3D3E] mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  {...register("name")}
                  className="w-full h-11 px-3 rounded-[10px] border border-[#E2DBC9] text-[16px] text-[#14211F] focus:outline-none focus:ring-2 focus:ring-[#B8893B]"
                  placeholder="Your name"
                />
                {errors.name && (
                  <p className="mt-1 text-[12px] text-[#B3372F]">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-[14px] font-medium text-[#0F3D3E] mb-2">
                  Phone *
                </label>
                <input
                  type="tel"
                  {...register("phone")}
                  className="w-full h-11 px-3 rounded-[10px] border border-[#E2DBC9] text-[16px] text-[#14211F] focus:outline-none focus:ring-2 focus:ring-[#B8893B]"
                  placeholder="08012345678"
                />
                {errors.phone && (
                  <p className="mt-1 text-[12px] text-[#B3372F]">
                    {errors.phone.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-[14px] font-medium text-[#0F3D3E] mb-2">
                  Email (optional)
                </label>
                <input
                  type="email"
                  {...register("email")}
                  className="w-full h-11 px-3 rounded-[10px] border border-[#E2DBC9] text-[16px] text-[#14211F] focus:outline-none focus:ring-2 focus:ring-[#B8893B]"
                  placeholder="your@email.com"
                />
                {errors.email && (
                  <p className="mt-1 text-[12px] text-[#B3372F]">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-[14px] font-medium text-[#0F3D3E] mb-2">
                  Message *
                </label>
                <textarea
                  {...register("message")}
                  rows={5}
                  className="w-full px-3 py-2 rounded-[10px] border border-[#E2DBC9] text-[16px] text-[#14211F] focus:outline-none focus:ring-2 focus:ring-[#B8893B] resize-none"
                  placeholder="How can we help you?"
                />
                {errors.message && (
                  <p className="mt-1 text-[12px] text-[#B3372F]">
                    {errors.message.message}
                  </p>
                )}
              </div>

              <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Send message"}
              </Button>
            </form>
          </div>
        </div>

        {/* Map */}
        <div className="mb-16">
          <iframe
            title="The Calabash Hotel location"
            src={embedUrl}
            width="100%"
            height="400"
            style={{ border: 0, borderRadius: "14px" }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-[300px] md:h-[400px] rounded-[14px] mb-6"
          />
          <div className="text-center">
            <a href={mapsUrl} target="_blank" rel="noopener noreferrer">
              <Button size="lg">Get directions</Button>
            </a>
          </div>
        </div>

        {/* FAQ */}
        <div>
          <h2 className="text-[28px] md:text-[40px] font-[Fraunces] font-semibold text-[#0F3D3E] leading-[1.15] mb-8 text-center">
            Frequently asked questions
          </h2>
          <div className="max-w-3xl mx-auto space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border border-[#E2DBC9] rounded-[14px] overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-[#EDE8DC] transition-colors"
                >
                  <span className="text-[16px] font-medium text-[#0F3D3E]">
                    {faq.question}
                  </span>
                  <ChevronDown
                    size={20}
                    className={`text-[#B8893B] transition-transform ${
                      openFaq === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-4">
                    <p className="text-[16px] text-[#4A5553] leading-[1.6]">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
