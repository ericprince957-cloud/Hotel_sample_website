import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { formatNaira } from "@/lib/utils";
import { Users, BedDouble } from "lucide-react";
import type { Room } from "@/data/rooms";

interface SimilarRoomsProps {
  rooms: readonly Room[];
  currentRoomSlug: string;
}

export function SimilarRooms({ rooms, currentRoomSlug }: SimilarRoomsProps) {
  const similar = rooms
    .filter((r) => r.slug !== currentRoomSlug)
    .slice(0, 3);

  if (similar.length === 0) return null;

  return (
    <section className="mt-16 pt-12 border-t border-[#E2DBC9]">
      <h2 className="text-[22px] md:text-[28px] font-[Fraunces] font-semibold text-[#0F3D3E] mb-6">
        You might also like
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {similar.map((room) => (
          <Link
            key={room.id}
            to={`/rooms/${room.slug}`}
            className="block bg-white rounded-[14px] overflow-hidden card-lift"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <img
                src={room.images[0]}
                alt={room.name}
                width={400}
                height={300}
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-5">
              <Badge variant="secondary" className="mb-2">
                {room.type}
              </Badge>
              <h3 className="text-[18px] font-[Fraunces] font-semibold text-[#0F3D3E] mb-2">
                {room.name}
              </h3>
              <div className="flex flex-wrap items-center gap-3 mb-3 text-[14px] text-[#4A5553]">
                <span className="flex items-center gap-1.5">
                  <BedDouble size={14} className="text-[#B8893B]" />
                  {room.bedType}
                </span>
                <span className="flex items-center gap-1.5">
                  <Users size={14} className="text-[#B8893B]" />
                  {room.maxGuests} guests
                </span>
              </div>
              <p className="text-[16px] font-medium text-[#B8893B]">
                {formatNaira(room.pricePerNight)}
                <span className="text-[14px] text-[#4A5553] font-normal">
                  {" "}
                  / night
                </span>
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
