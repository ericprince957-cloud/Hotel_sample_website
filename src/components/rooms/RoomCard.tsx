import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatNaira } from "@/lib/utils";
import { getAmenityIcon } from "@/lib/amenityIcons";
import { Users, BedDouble, Maximize } from "lucide-react";
import type { Room } from "@/data/rooms";

interface RoomCardProps {
  room: Room;
  showAmenities?: boolean;
}

export function RoomCard({ room, showAmenities = false }: RoomCardProps) {
  const isUnavailable = !room.isAvailable;

  return (
    <div className="bg-white rounded-[14px] overflow-hidden card-lift flex flex-col">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={room.images[0]}
          alt={room.name}
          width={400}
          height={300}
          loading="lazy"
          className="w-full h-full object-cover"
        />
        {isUnavailable && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <Badge variant="muted" className="text-[14px] px-4 py-2">
              Currently unavailable
            </Badge>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col">
        {/* Type badge */}
        <Badge variant="secondary" className="mb-2 w-fit">
          {room.type}
        </Badge>

        {/* Name */}
        <h3 className="text-[22px] font-[Fraunces] font-semibold text-[#0F3D3E] mb-2">
          {room.name}
        </h3>

        {/* Quick facts */}
        <div className="flex flex-wrap items-center gap-3 mb-3 text-[14px] text-[#4A5553]">
          <span className="flex items-center gap-1.5">
            <BedDouble size={14} className="text-[#B8893B]" />
            {room.bedType}
          </span>
          <span className="flex items-center gap-1.5">
            <Users size={14} className="text-[#B8893B]" />
            {room.maxGuests} guests
          </span>
          <span className="flex items-center gap-1.5">
            <Maximize size={14} className="text-[#B8893B]" />
            {room.sizeSqm} sqm
          </span>
        </div>

        {/* Amenities (optional) */}
        {showAmenities && (
          <div className="flex items-center gap-2 mb-4">
            {room.amenities.slice(0, 4).map((amenity) => {
              const Icon = getAmenityIcon(amenity);
              return (
                <div
                  key={amenity}
                  className="w-8 h-8 rounded-[8px] bg-[#EDE8DC] flex items-center justify-center"
                  title={amenity}
                >
                  <Icon size={14} className="text-[#0F3D3E]" />
                </div>
              );
            })}
            {room.amenities.length > 4 && (
              <span className="text-[12px] text-[#4A5553]">
                +{room.amenities.length - 4}
              </span>
            )}
          </div>
        )}

        {/* Price */}
        <div className="mt-auto pt-4 border-t border-[#E2DBC9]">
          <p className="text-[18px] font-medium text-[#B8893B] mb-4">
            {formatNaira(room.pricePerNight)}
            <span className="text-[14px] text-[#4A5553] font-normal">
              {" "}
              / night
            </span>
          </p>

          {/* Buttons */}
          <div className="flex gap-2">
            <Link to={`/rooms/${room.slug}`} className="flex-1">
              <Button variant="outline" size="sm" className="w-full">
                View details
              </Button>
            </Link>
            <Link
              to={`/contact?room=${room.slug}`}
              className="flex-1"
              onClick={(e) => isUnavailable && e.preventDefault()}
            >
              <Button
                size="sm"
                className="w-full"
                disabled={isUnavailable}
              >
                Enquire
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
