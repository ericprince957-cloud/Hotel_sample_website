import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Filter, X } from "lucide-react";

interface RoomFiltersProps {
  selectedType: string;
  setSelectedType: (type: string) => void;
  maxPrice: number;
  setMaxPrice: (price: number) => void;
  guests: number;
  setGuests: (guests: number) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  onClearFilters: () => void;
}

const roomTypes = ["All", "Standard", "Deluxe", "Executive", "Suite"];
const priceOptions = [
  { label: "Any price", value: 0 },
  { label: "Up to ₦50,000", value: 50000 },
  { label: "Up to ₦100,000", value: 100000 },
  { label: "Up to ₦150,000", value: 150000 },
  { label: "Up to ₦250,000", value: 250000 },
];
const guestOptions = [
  { label: "Any guests", value: 0 },
  { label: "1 guest", value: 1 },
  { label: "2 guests", value: 2 },
  { label: "3 guests", value: 3 },
  { label: "4+ guests", value: 4 },
];
const sortOptions = [
  { label: "Recommended", value: "recommended" },
  { label: "Price: low to high", value: "price-asc" },
  { label: "Price: high to low", value: "price-desc" },
];

export function RoomFilters({
  selectedType,
  setSelectedType,
  maxPrice,
  setMaxPrice,
  guests,
  setGuests,
  sortBy,
  setSortBy,
  onClearFilters,
}: RoomFiltersProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const hasActiveFilters =
    selectedType !== "All" || maxPrice > 0 || guests > 0;

  const filterContent = (
    <div className="space-y-4">
      {/* Room type */}
      <div>
        <label className="block text-[14px] font-medium text-[#0F3D3E] mb-2">
          Room type
        </label>
        <div className="flex flex-wrap gap-2">
          {roomTypes.map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-4 py-2 rounded-[10px] text-[14px] font-medium transition-colors ${
                selectedType === type
                  ? "bg-[#0F3D3E] text-[#FAF8F3]"
                  : "bg-[#EDE8DC] text-[#0F3D3E] hover:bg-[#E2DBC9]"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Max price */}
      <div>
        <label className="block text-[14px] font-medium text-[#0F3D3E] mb-2">
          Max price
        </label>
        <select
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full h-11 px-3 rounded-[10px] border border-[#E2DBC9] text-[16px] text-[#14211F] focus:outline-none focus:ring-2 focus:ring-[#B8893B] bg-white appearance-none cursor-pointer"
        >
          {priceOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Guests */}
      <div>
        <label className="block text-[14px] font-medium text-[#0F3D3E] mb-2">
          Guests
        </label>
        <select
          value={guests}
          onChange={(e) => setGuests(Number(e.target.value))}
          className="w-full h-11 px-3 rounded-[10px] border border-[#E2DBC9] text-[16px] text-[#14211F] focus:outline-none focus:ring-2 focus:ring-[#B8893B] bg-white appearance-none cursor-pointer"
        >
          {guestOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Clear filters */}
      {hasActiveFilters && (
        <button
          onClick={onClearFilters}
          className="text-[14px] text-[#B3372F] hover:underline"
        >
          Clear all filters
        </button>
      )}
    </div>
  );

  return (
    <>
      {/* Desktop filters */}
      <div className="hidden md:block">
        <div className="flex items-start gap-6 mb-6">
          <div className="flex-1">{filterContent}</div>
          <div className="w-48">
            <label className="block text-[14px] font-medium text-[#0F3D3E] mb-2">
              Sort by
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full h-11 px-3 rounded-[10px] border border-[#E2DBC9] text-[16px] text-[#14211F] focus:outline-none focus:ring-2 focus:ring-[#B8893B] bg-white appearance-none cursor-pointer"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Mobile filter button */}
      <div className="md:hidden mb-4">
        <Button
          variant="outline"
          onClick={() => setMobileOpen(true)}
          className="w-full"
        >
          <Filter size={16} />
          Filters
          {hasActiveFilters && (
            <span className="ml-2 w-2 h-2 rounded-full bg-[#B8893B]" />
          )}
        </Button>
      </div>

      {/* Mobile filter panel */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-[14px] p-6 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-[22px] font-[Fraunces] font-semibold text-[#0F3D3E]">
                Filters
              </h3>
              <button
                onClick={() => setMobileOpen(false)}
                className="w-10 h-10 rounded-full hover:bg-[#EDE8DC] flex items-center justify-center"
              >
                <X size={20} />
              </button>
            </div>

            {filterContent}

            <div className="mt-6 pt-6 border-t border-[#E2DBC9]">
              <label className="block text-[14px] font-medium text-[#0F3D3E] mb-2">
                Sort by
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full h-11 px-3 rounded-[10px] border border-[#E2DBC9] text-[16px] text-[#14211F] focus:outline-none focus:ring-2 focus:ring-[#B8893B] bg-white appearance-none cursor-pointer"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <Button
              onClick={() => setMobileOpen(false)}
              size="lg"
              className="w-full mt-6"
            >
              Apply filters
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
