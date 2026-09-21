import { useState, useEffect, useMemo } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/data/site";
import { rooms as localRooms } from "@/data/rooms";
import { submitEnquiry, type EnquiryData } from "@/lib/api";
import { formatNaira } from "@/lib/utils";

const enquirySchema = z
  .object({
    roomId: z.string().optional(),
    checkIn: z.string().min(1, "Check-in date is required"),
    checkOut: z.string().min(1, "Check-out date is required"),
    guests: z.number().min(1, "At least 1 guest is required"),
    guestName: z.string().min(2, "Name must be at least 2 characters"),
    guestPhone: z
      .string()
      .regex(
        /^(0[789][01]\d{8}|\+234[789][01]\d{8}|234[789][01]\d{8})$/,
        "Please enter a valid Nigerian phone number"
      ),
    guestEmail: z
      .string()
      .email("Please enter a valid email")
      .optional()
      .or(z.literal("")),
    message: z.string().max(500, "Message must be 500 characters or less").optional(),
    // Honeypot
    website: z.string().max(0, "Bot detected"),
  })
  .refine((data) => {
    if (data.checkIn && data.checkOut) {
      return new Date(data.checkOut) > new Date(data.checkIn);
    }
    return true;
  }, {
    message: "Check-out must be after check-in",
    path: ["checkOut"],
  });

type EnquiryFormData = z.infer<typeof enquirySchema>;

interface EnquiryDialogProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedRoomSlug?: string;
}

export function EnquiryDialog({ isOpen, onClose, preselectedRoomSlug }: EnquiryDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{
    success: boolean;
    data?: EnquiryFormData;
    error?: string;
  } | null>(null);

  const selectedRoom = useMemo(() => {
    if (!preselectedRoomSlug) return null;
    return localRooms.find((r) => r.slug === preselectedRoomSlug) || null;
  }, [preselectedRoomSlug]);

  const maxGuests = selectedRoom?.maxGuests || 4;

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<EnquiryFormData>({
    resolver: zodResolver(enquirySchema),
    defaultValues: {
      roomId: preselectedRoomSlug || "",
      guests: 1,
      website: "",
    },
  });

  const checkIn = watch("checkIn");
  const checkOut = watch("checkOut");
  const roomId = watch("roomId");

  // Calculate nights
  const nights = useMemo(() => {
    if (checkIn && checkOut) {
      const diff = new Date(checkOut).getTime() - new Date(checkIn).getTime();
      const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
      return days > 0 ? days : 0;
    }
    return 0;
  }, [checkIn, checkOut]);

  // Get today's date for min date
  const today = new Date().toISOString().split("T")[0];

  // Update max guests when room changes
  useEffect(() => {
    const room = localRooms.find((r) => r.slug === roomId);
    if (room) {
      const currentGuests = watch("guests");
      if (currentGuests > room.maxGuests) {
        setValue("guests", room.maxGuests);
      }
    }
  }, [roomId, watch, setValue]);

  // Reset form when dialog opens/closes
  useEffect(() => {
    if (isOpen) {
      reset({
        roomId: preselectedRoomSlug || "",
        checkIn: "",
        checkOut: "",
        guests: 1,
        guestName: "",
        guestPhone: "",
        guestEmail: "",
        message: "",
        website: "",
      });
      setSubmitResult(null);
    }
  }, [isOpen, preselectedRoomSlug, reset]);

  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const onSubmit = async (data: EnquiryFormData) => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    const enquiryData: EnquiryData = {
      roomId: data.roomId || null,
      guestName: data.guestName,
      guestPhone: data.guestPhone,
      guestEmail: data.guestEmail || null,
      checkIn: data.checkIn,
      checkOut: data.checkOut,
      guests: data.guests,
      message: data.message || null,
    };

    const result = await submitEnquiry(enquiryData);

    setSubmitResult({
      success: result.success,
      data,
      error: result.error,
    });

    setIsSubmitting(false);
  };

  const getWhatsAppUrl = (data: EnquiryFormData) => {
    const room = localRooms.find((r) => r.slug === data.roomId);
    const roomName = room?.name || "a room";

    const message = `Hello ${siteConfig.name}, my name is ${data.guestName}. I would like to book ${roomName} from ${data.checkIn} to ${data.checkOut} (${nights} nights) for ${data.guests} guest(s). My phone number is ${data.guestPhone}.`;

    return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      {/* Dialog */}
      <div className="relative bg-white w-full md:max-w-lg md:rounded-[14px] rounded-t-[14px] max-h-[90vh] overflow-y-auto">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 rounded-full hover:bg-[#EDE8DC] flex items-center justify-center z-10"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        <div className="p-6 md:p-8">
          {!submitResult ? (
            <>
              <h2 className="text-[22px] md:text-[28px] font-[Fraunces] font-semibold text-[#0F3D3E] mb-2">
                Make an enquiry
              </h2>
              <p className="text-[16px] text-[#4A5553] mb-6">
                Fill out the form below and we'll get back to you shortly.
              </p>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Honeypot */}
                <input
                  type="text"
                  {...register("website")}
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                />

                {/* Room selection */}
                <div>
                  <label className="block text-[14px] font-medium text-[#0F3D3E] mb-2">
                    Room
                  </label>
                  <div className="relative">
                    <select
                      {...register("roomId")}
                      className="w-full h-11 px-3 pr-10 rounded-[10px] border border-[#E2DBC9] text-[16px] text-[#14211F] focus:outline-none focus:ring-2 focus:ring-[#B8893B] bg-white appearance-none cursor-pointer"
                    >
                      <option value="">Not sure yet</option>
                      {localRooms.map((room) => (
                        <option key={room.id} value={room.slug}>
                          {room.name} — {formatNaira(room.pricePerNight)}/night
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      size={16}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#4A5553] pointer-events-none"
                    />
                  </div>
                </div>

                {/* Dates */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[14px] font-medium text-[#0F3D3E] mb-2">
                      Check-in
                    </label>
                    <input
                      type="date"
                      {...register("checkIn")}
                      min={today}
                      className="w-full h-11 px-3 rounded-[10px] border border-[#E2DBC9] text-[16px] text-[#14211F] focus:outline-none focus:ring-2 focus:ring-[#B8893B]"
                    />
                    {errors.checkIn && (
                      <p className="mt-1 text-[12px] text-[#B3372F]">
                        {errors.checkIn.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-[14px] font-medium text-[#0F3D3E] mb-2">
                      Check-out
                    </label>
                    <input
                      type="date"
                      {...register("checkOut")}
                      min={checkIn || today}
                      className="w-full h-11 px-3 rounded-[10px] border border-[#E2DBC9] text-[16px] text-[#14211F] focus:outline-none focus:ring-2 focus:ring-[#B8893B]"
                    />
                    {errors.checkOut && (
                      <p className="mt-1 text-[12px] text-[#B3372F]">
                        {errors.checkOut.message}
                      </p>
                    )}
                  </div>
                </div>

                {nights > 0 && (
                  <p className="text-[14px] text-[#4A5553]">
                    {nights} night{nights !== 1 ? "s" : ""}
                  </p>
                )}

                {/* Guests */}
                <div>
                  <label className="block text-[14px] font-medium text-[#0F3D3E] mb-2">
                    Guests
                  </label>
                  <input
                    type="number"
                    {...register("guests", { valueAsNumber: true })}
                    min={1}
                    max={maxGuests}
                    className="w-full h-11 px-3 rounded-[10px] border border-[#E2DBC9] text-[16px] text-[#14211F] focus:outline-none focus:ring-2 focus:ring-[#B8893B]"
                  />
                  {errors.guests && (
                    <p className="mt-1 text-[12px] text-[#B3372F]">
                      {errors.guests.message}
                    </p>
                  )}
                  <p className="mt-1 text-[12px] text-[#4A5553]">
                    Maximum {maxGuests} guests
                  </p>
                </div>

                {/* Name */}
                <div>
                  <label className="block text-[14px] font-medium text-[#0F3D3E] mb-2">
                    Full name *
                  </label>
                  <input
                    type="text"
                    {...register("guestName")}
                    className="w-full h-11 px-3 rounded-[10px] border border-[#E2DBC9] text-[16px] text-[#14211F] focus:outline-none focus:ring-2 focus:ring-[#B8893B]"
                    placeholder="Your name"
                  />
                  {errors.guestName && (
                    <p className="mt-1 text-[12px] text-[#B3372F]">
                      {errors.guestName.message}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-[14px] font-medium text-[#0F3D3E] mb-2">
                    Phone number *
                  </label>
                  <input
                    type="tel"
                    {...register("guestPhone")}
                    className="w-full h-11 px-3 rounded-[10px] border border-[#E2DBC9] text-[16px] text-[#14211F] focus:outline-none focus:ring-2 focus:ring-[#B8893B]"
                    placeholder="08012345678"
                  />
                  {errors.guestPhone && (
                    <p className="mt-1 text-[12px] text-[#B3372F]">
                      {errors.guestPhone.message}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-[14px] font-medium text-[#0F3D3E] mb-2">
                    Email (optional)
                  </label>
                  <input
                    type="email"
                    {...register("guestEmail")}
                    className="w-full h-11 px-3 rounded-[10px] border border-[#E2DBC9] text-[16px] text-[#14211F] focus:outline-none focus:ring-2 focus:ring-[#B8893B]"
                    placeholder="your@email.com"
                  />
                  {errors.guestEmail && (
                    <p className="mt-1 text-[12px] text-[#B3372F]">
                      {errors.guestEmail.message}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label className="block text-[14px] font-medium text-[#0F3D3E] mb-2">
                    Message (optional)
                  </label>
                  <textarea
                    {...register("message")}
                    rows={3}
                    maxLength={500}
                    className="w-full px-3 py-2 rounded-[10px] border border-[#E2DBC9] text-[16px] text-[#14211F] focus:outline-none focus:ring-2 focus:ring-[#B8893B] resize-none"
                    placeholder="Any special requests?"
                  />
                  {errors.message && (
                    <p className="mt-1 text-[12px] text-[#B3372F]">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Submit enquiry"}
                </Button>
              </form>
            </>
          ) : (
            /* Success state */
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full bg-[#2F7D5B]/10 flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-[#2F7D5B]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>

              <h2 className="text-[22px] font-[Fraunces] font-semibold text-[#0F3D3E] mb-2">
                Thank you, {submitResult.data?.guestName}.
              </h2>
              <p className="text-[16px] text-[#4A5553] mb-6">
                We received your enquiry{!submitResult.success && " (we're having a small technical issue, but don't worry)"}.
              </p>

              <a
                href={getWhatsAppUrl(submitResult.data!)}
                target="_blank"
                rel="noopener noreferrer"
                className="block mb-3"
              >
                <Button size="lg" variant="accent" className="w-full">
                  Continue on WhatsApp
                </Button>
              </a>

              <Button
                variant="outline"
                onClick={onClose}
                className="w-full"
              >
                Close
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
