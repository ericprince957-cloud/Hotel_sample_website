import { Link } from "react-router-dom";
import { rooms } from "@/data/rooms";
import { formatNaira } from "@/lib/utils";
import { Users, BedDouble } from "lucide-react";

const featuredRooms = rooms.filter((r) => r.isFeatured);

export function FeaturedRooms() {
  return (
    <section className="section-padding">
      <div className="container-hotel">
        {/* Heading */}
        <div className="mb-10">
          <h2 className="text-[28px] md:text-[40px] font-[Fraunces] font-semibold text-[#0F3D3E] leading-[1.15] mb-3">
            Our rooms
          </h2>
          <p className="text-[16px] md:text-[18px] text-[#4A5553] max-w-prose-hotel">
            From a comfortable standard room to our signature suite, we have a space
            that fits your stay.
          </p>
        </div>

        {/* Mobile: horizontal carousel */}
        <div className="md:hidden flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-2 -mx-5 px-5">
          {featuredRooms.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>

        {/* Desktop: 3 columns */}
        <div className="hidden md:grid md:grid-cols-3 gap-6">
          {featuredRooms.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>

        {/* See all rooms */}
        <div className="mt-10 text-center">
          <Link
            to="/rooms"
            className="text-[16px] font-medium text-[#0F3D3E] hover:text-[#B8893B] transition-colors underline underline-offset-4"
          >
            See all rooms →
          </Link>
        </div>
      </div>
    </section>
  );
}

function RoomCard({ room }: { room: typeof rooms[0] }) {
  return (
    <Link
      to={`/rooms/${room.slug}`}
      className="block snap-start min-w-[280px] md:min-w-0 card-lift rounded-[14px] overflow-hidden bg-white"
    >
      {/* Image 4:3 */}
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

      {/* Content */}
      <div className="p-5">
        <h3 className="text-[22px] font-[Fraunces] font-semibold text-[#0F3D3E] mb-2">
          {room.name}
        </h3>

        <div className="flex flex-wrap items-center gap-4 mb-3 text-[14px] text-[#4A5553]">
          <span className="flex items-center gap-1.5">
            <BedDouble size={14} className="text-[#B8893B]" />
            {room.bedType}
          </span>
          <span className="flex items-center gap-1.5">
            <Users size={14} className="text-[#B8893B]" />
            {room.maxGuests} guests
          </span>
        </div>

        <p className="text-[18px] font-medium text-[#B8893B]">
          from {formatNaira(room.pricePerNight)}
          <span className="text-[14px] text-[#4A5553] font-normal"> / night</span>
        </p>

        <span className="inline-block mt-4 text-[14px] font-medium text-[#0F3D3E] hover:text-[#B8893B] transition-colors">
          View room →
        </span>
      </div>
    </Link>
  );
}
