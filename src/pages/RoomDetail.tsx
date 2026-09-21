import { useParams, Link } from "react-router-dom";
import { rooms } from "@/data/rooms";
import { siteConfig } from "@/data/site";
import { formatNaira } from "@/lib/utils";
import { getAmenityIcon } from "@/lib/amenityIcons";
import { useSEO } from "@/hooks/useSEO";
import { RoomGallery } from "@/components/rooms/RoomGallery";
import { SimilarRooms } from "@/components/rooms/SimilarRooms";
import { EnquiryCard } from "@/components/rooms/EnquiryCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Users,
  Maximize,
  BedDouble,
  Clock,
  CreditCard,
  UserCheck,
} from "lucide-react";

export default function RoomDetail() {
  const { slug } = useParams<{ slug: string }>();
  const room = rooms.find((r) => r.slug === slug);

  useSEO({
    title: room ? room.name : "Room not found",
    description: room
      ? `${room.name} at ${siteConfig.name}. ${room.shortDescription}`
      : "Room not found",
    image: room?.images[0],
    url: room ? `https://thecalabashhotel.ng/rooms/${room.slug}` : undefined,
  });

  if (!room) {
    return (
      <div className="section-padding">
        <div className="container-hotel text-center py-16">
          <p className="text-[56px] md:text-[80px] font-[Fraunces] font-semibold text-[#B8893B] leading-[1.15] mb-4">
            404
          </p>
          <h1 className="text-[28px] font-[Fraunces] font-semibold text-[#0F3D3E] mb-4">
            Room not found
          </h1>
          <p className="text-[16px] text-[#4A5553] mb-6">
            We couldn't find that room. It may have been removed or the link is
            incorrect.
          </p>
          <Link to="/rooms">
            <Button variant="outline">View all rooms</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="section-padding pb-24 lg:pb-0">
      <div className="container-hotel">
        {/* Breadcrumb */}
        <nav className="mb-6 text-[14px] text-[#4A5553]">
          <Link to="/" className="hover:text-[#0F3D3E] transition-colors">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link to="/rooms" className="hover:text-[#0F3D3E] transition-colors">
            Rooms
          </Link>
          <span className="mx-2">/</span>
          <span className="text-[#0F3D3E] font-medium">{room.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Main content */}
          <div className="lg:col-span-2">
            {/* Gallery */}
            <RoomGallery images={room.images} roomName={room.name} />

            {/* Room header */}
            <div className="mb-6">
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <Badge variant="secondary">{room.type}</Badge>
                {!room.isAvailable && (
                  <Badge variant="muted">Currently unavailable</Badge>
                )}
              </div>
              <h1 className="text-[40px] md:text-[56px] font-[Fraunces] font-semibold text-[#0F3D3E] leading-[1.15] mb-2">
                {room.name}
              </h1>
              <p className="text-[28px] font-[Fraunces] font-semibold text-[#B8893B]">
                {formatNaira(room.pricePerNight)}
                <span className="text-[16px] text-[#4A5553] font-[Manrope] font-normal">
                  {" "}
                  per night
                </span>
              </p>
              <p className="text-[14px] text-[#4A5553] mt-1">
                Taxes and fees confirmed at booking
              </p>
            </div>

            {/* Quick facts */}
            <div className="flex flex-wrap gap-6 mb-8 pb-8 border-b border-[#E2DBC9]">
              <div className="flex items-center gap-2 text-[16px] text-[#4A5553]">
                <BedDouble size={18} className="text-[#B8893B]" />
                <span>{room.bedType}</span>
              </div>
              <div className="flex items-center gap-2 text-[16px] text-[#4A5553]">
                <Users size={18} className="text-[#B8893B]" />
                <span>Up to {room.maxGuests} guests</span>
              </div>
              <div className="flex items-center gap-2 text-[16px] text-[#4A5553]">
                <Maximize size={18} className="text-[#B8893B]" />
                <span>{room.sizeSqm} sqm</span>
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="text-[22px] font-[Fraunces] font-semibold text-[#0F3D3E] mb-4">
                About this room
              </h2>
              <div className="max-w-prose-hotel space-y-4">
                <p className="text-[16px] text-[#4A5553] leading-[1.6]">
                  {room.shortDescription}
                </p>
                <p className="text-[16px] text-[#4A5553] leading-[1.6]">
                  {room.description}
                </p>
              </div>
            </div>

            {/* Amenities */}
            <div className="mb-8">
              <h2 className="text-[22px] font-[Fraunces] font-semibold text-[#0F3D3E] mb-4">
                What's included
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {room.amenities.map((amenity) => {
                  const Icon = getAmenityIcon(amenity);
                  return (
                    <div
                      key={amenity}
                      className="flex items-center gap-3 text-[16px] text-[#4A5553]"
                    >
                      <div className="w-8 h-8 rounded-[8px] bg-[#EDE8DC] flex items-center justify-center shrink-0">
                        <Icon size={14} className="text-[#0F3D3E]" />
                      </div>
                      <span>{amenity}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* House rules */}
            <div className="mb-8">
              <h2 className="text-[22px] font-[Fraunces] font-semibold text-[#0F3D3E] mb-4">
                House rules
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Clock size={18} className="mt-0.5 text-[#B8893B] shrink-0" />
                  <div>
                    <p className="text-[16px] font-medium text-[#0F3D3E]">
                      Check-in & check-out
                    </p>
                    <p className="text-[14px] text-[#4A5553]">
                      Check-in: {siteConfig.checkIn} · Check-out:{" "}
                      {siteConfig.checkOut}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CreditCard
                    size={18}
                    className="mt-0.5 text-[#B8893B] shrink-0"
                  />
                  <div>
                    <p className="text-[16px] font-medium text-[#0F3D3E]">
                      Cancellation
                    </p>
                    <p className="text-[14px] text-[#4A5553]">
                      Free cancellation up to 24 hours before check-in.
                      Cancellations within 24 hours may incur a charge.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <UserCheck size={18} className="mt-0.5 text-[#B8893B] shrink-0" />
                  <div>
                    <p className="text-[16px] font-medium text-[#0F3D3E]">
                      ID required
                    </p>
                    <p className="text-[14px] text-[#4A5553]">
                      A valid government-issued ID is required at check-in for
                      all guests.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Similar rooms */}
            <SimilarRooms rooms={rooms} currentRoomSlug={room.slug} />
          </div>

          {/* Desktop: sticky enquiry card */}
          <div className="hidden lg:block">
            <EnquiryCard
              roomName={room.name}
              roomSlug={room.slug}
              pricePerNight={room.pricePerNight}
            />
          </div>
        </div>
      </div>

      {/* Mobile: sticky bottom bar */}
      <div className="lg:hidden">
        <EnquiryCard
          roomName={room.name}
          roomSlug={room.slug}
          pricePerNight={room.pricePerNight}
        />
      </div>
    </div>
  );
}
