import { useParams, Link } from "react-router-dom";
import { rooms } from "@/data/rooms";
import { formatNaira } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Users, Maximize, BedDouble } from "lucide-react";

export default function RoomDetail() {
  const { slug } = useParams<{ slug: string }>();
  const room = rooms.find((r) => r.slug === slug);

  if (!room) {
    return (
      <div className="section-padding">
        <div className="container-hotel text-center">
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
    <div className="section-padding">
      <div className="container-hotel">
        {/* Breadcrumb */}
        <nav className="mb-8 text-[14px] text-[#4A5553]">
          <Link to="/rooms" className="hover:text-[#0F3D3E] transition-colors">
            Rooms
          </Link>
          <span className="mx-2">/</span>
          <span className="text-[#0F3D3E] font-medium">{room.name}</span>
        </nav>

        {/* Room header */}
        <div className="mb-8">
          <h1 className="text-[40px] md:text-[56px] font-[Fraunces] font-semibold text-[#0F3D3E] leading-[1.15] mb-2">
            {room.name}
          </h1>
          <p className="text-[22px] text-[#B8893B] font-medium">
            {formatNaira(room.pricePerNight)}
            <span className="text-[16px] text-[#4A5553] font-normal"> / night</span>
          </p>
        </div>

        {/* Quick facts */}
        <div className="flex flex-wrap gap-6 mb-8 pb-8 border-b border-[#E2DBC9]">
          <div className="flex items-center gap-2 text-[16px] text-[#4A5553]">
            <Users size={18} className="text-[#B8893B]" />
            <span>Up to {room.maxGuests} guests</span>
          </div>
          <div className="flex items-center gap-2 text-[16px] text-[#4A5553]">
            <BedDouble size={18} className="text-[#B8893B]" />
            <span>{room.bedType}</span>
          </div>
          <div className="flex items-center gap-2 text-[16px] text-[#4A5553]">
            <Maximize size={18} className="text-[#B8893B]" />
            <span>{room.sizeSqm} sqm</span>
          </div>
        </div>

        {/* Description */}
        <div className="max-w-prose-hotel mb-8">
          <p className="text-[18px] text-[#4A5553] leading-[1.6]">
            {room.description}
          </p>
        </div>

        {/* Image placeholder */}
        <div className="mb-8">
          <div
            className="w-full aspect-[16/9] rounded-[14px] bg-[#EDE8DC] flex items-center justify-center"
          >
            <img
              src={room.images[0]}
              alt={room.name}
              className="w-full h-full object-cover rounded-[14px]"
            />
          </div>
        </div>

        {/* Amenities */}
        <div className="mb-8">
          <h2 className="text-[22px] font-[Fraunces] font-semibold text-[#0F3D3E] mb-4">
            What's included
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {room.amenities.map((amenity) => (
              <li
                key={amenity}
                className="flex items-center gap-2 text-[16px] text-[#4A5553]"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#B8893B] shrink-0" />
                {amenity}
              </li>
            ))}
          </ul>
        </div>

        {/* CTA */}
        <div className="pt-8 border-t border-[#E2DBC9]">
          <Link to="/contact">
            <Button size="lg">Enquire about this room</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
