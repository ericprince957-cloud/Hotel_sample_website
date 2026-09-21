import { useState, useMemo, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { rooms } from "@/data/rooms";
import { RoomCard } from "@/components/rooms/RoomCard";
import { RoomFilters } from "@/components/rooms/RoomFilters";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Users, X } from "lucide-react";

export default function Rooms() {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);

  // Filters
  const [selectedType, setSelectedType] = useState("All");
  const [maxPrice, setMaxPrice] = useState(0);
  const [guests, setGuests] = useState(0);
  const [sortBy, setSortBy] = useState("recommended");

  // Read query params
  const checkIn = searchParams.get("checkIn");
  const checkOut = searchParams.get("checkOut");
  const queryGuests = searchParams.get("guests");

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  // Filter and sort rooms
  const filteredRooms = useMemo(() => {
    let filtered = [...rooms];

    // Filter by type
    if (selectedType !== "All") {
      filtered = filtered.filter(
        (room) => room.type.toLowerCase() === selectedType.toLowerCase()
      );
    }

    // Filter by max price
    if (maxPrice > 0) {
      filtered = filtered.filter((room) => room.pricePerNight <= maxPrice);
    }

    // Filter by guests
    if (guests > 0) {
      filtered = filtered.filter((room) => room.maxGuests >= guests);
    }

    // Sort
    if (sortBy === "price-asc") {
      filtered.sort((a, b) => a.pricePerNight - b.pricePerNight);
    } else if (sortBy === "price-desc") {
      filtered.sort((a, b) => b.pricePerNight - a.pricePerNight);
    }

    return filtered;
  }, [selectedType, maxPrice, guests, sortBy]);

  const clearFilters = () => {
    setSelectedType("All");
    setMaxPrice(0);
    setGuests(0);
  };

  const hasActiveFilters = selectedType !== "All" || maxPrice > 0 || guests > 0;

  return (
    <div className="section-padding">
      <div className="container-hotel">
        {/* Heading */}
        <div className="mb-8">
          <h1 className="text-[40px] md:text-[56px] font-[Fraunces] font-semibold text-[#0F3D3E] leading-[1.15] mb-3">
            Rooms and rates
          </h1>
          <p className="text-[18px] text-[#4A5553] max-w-prose-hotel">
            Find the right room for your stay. From comfortable Standard rooms to
            our signature Calabash Suite.
          </p>
        </div>

        {/* Query params summary */}
        {(checkIn || checkOut || queryGuests) && (
          <div className="flex flex-wrap gap-2 mb-6">
            {checkIn && (
              <Badge variant="outline" className="gap-1.5">
                <Calendar size={12} />
                Check-in: {checkIn}
              </Badge>
            )}
            {checkOut && (
              <Badge variant="outline" className="gap-1.5">
                <Calendar size={12} />
                Check-out: {checkOut}
              </Badge>
            )}
            {queryGuests && (
              <Badge variant="outline" className="gap-1.5">
                <Users size={12} />
                {queryGuests} guest{Number(queryGuests) !== 1 ? "s" : ""}
              </Badge>
            )}
            <Link to="/rooms">
              <button className="text-[12px] text-[#B3372F] hover:underline ml-2">
                Clear
              </button>
            </Link>
          </div>
        )}

        {/* Filters */}
        <RoomFilters
          selectedType={selectedType}
          setSelectedType={setSelectedType}
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
          guests={guests}
          setGuests={setGuests}
          sortBy={sortBy}
          setSortBy={setSortBy}
          onClearFilters={clearFilters}
        />

        {/* Results count */}
        {!loading && (
          <div className="mb-6 flex items-center justify-between">
            <p className="text-[14px] text-[#4A5553]">
              {filteredRooms.length} room{filteredRooms.length !== 1 ? "s" : ""}{" "}
              found
            </p>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="text-[14px] text-[#B3372F] hover:underline flex items-center gap-1"
              >
                <X size={14} />
                Clear filters
              </button>
            )}
          </div>
        )}

        {/* Loading state */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-[14px] overflow-hidden">
                <Skeleton className="aspect-[4/3] rounded-none" />
                <div className="p-5 space-y-3">
                  <Skeleton className="h-5 w-16" />
                  <Skeleton className="h-7 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                  <div className="flex gap-2 pt-4">
                    <Skeleton className="h-9 flex-1" />
                    <Skeleton className="h-9 flex-1" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && filteredRooms.length === 0 && (
          <div className="text-center py-16">
            <p className="text-[22px] font-[Fraunces] font-semibold text-[#0F3D3E] mb-2">
              No rooms match your filters
            </p>
            <p className="text-[16px] text-[#4A5553] mb-6">
              Try adjusting your filters or clearing them to see all available
              rooms.
            </p>
            <Button onClick={clearFilters} variant="outline">
              Clear filters
            </Button>
          </div>
        )}

        {/* Rooms grid */}
        {!loading && filteredRooms.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRooms.map((room) => (
              <RoomCard key={room.id} room={room} showAmenities={true} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
