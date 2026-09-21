import { images } from "./images";

export interface Room {
  id: string;
  slug: string;
  name: string;
  type: "standard" | "deluxe" | "executive" | "suite";
  pricePerNight: number;
  maxGuests: number;
  bedType: string;
  sizeSqm: number;
  shortDescription: string;
  description: string;
  amenities: readonly string[];
  images: readonly string[];
  isAvailable: boolean;
  isFeatured: boolean;
}

export const rooms: Room[] = [
  {
    id: "room-standard-001",
    slug: "standard",
    name: "Standard Room",
    type: "standard",
    pricePerNight: 45000,
    maxGuests: 2,
    bedType: "Queen-size bed",
    sizeSqm: 22,
    shortDescription:
      "A clean, comfortable room with everything you need for a good night's rest.",
    description:
      "Our Standard Room is perfect for solo travellers or couples who want a restful stay without paying for extras they won't use. You get a quality queen-size bed, fast Wi-Fi, a clean bathroom with hot water, and a calm space to unwind after a busy day in Lagos. Simple, warm, and well taken care of.",
    amenities: [
      "Air conditioning",
      "Free Wi-Fi",
      "Flat-screen TV",
      "Hot water",
      "Complimentary water",
      "Daily housekeeping",
      "In-room safe",
      "Tea & coffee maker",
    ],
    images: images.rooms.standard,
    isAvailable: true,
    isFeatured: false,
  },
  {
    id: "room-deluxe-002",
    slug: "deluxe",
    name: "Deluxe Room",
    type: "deluxe",
    pricePerNight: 75000,
    maxGuests: 2,
    bedType: "King-size bed",
    sizeSqm: 30,
    shortDescription:
      "More space, better finishes, and a king-size bed for a restful stay.",
    description:
      "The Deluxe Room gives you extra room to breathe. A king-size bed, a work desk by the window, and finishes that feel considered — not flashy, just well done. Whether you're in town for business or a weekend away, this room keeps you comfortable from morning to night.",
    amenities: [
      "Air conditioning",
      "Free Wi-Fi",
      "55-inch Smart TV",
      "Hot & cold water",
      "Work desk",
      "Mini fridge",
      "Complimentary water & snacks",
      "Daily housekeeping",
      "In-room safe",
      "Premium toiletries",
      "Bathrobe & slippers",
    ],
    images: images.rooms.deluxe,
    isAvailable: true,
    isFeatured: true,
  },
  {
    id: "room-executive-003",
    slug: "executive",
    name: "Executive Room",
    type: "executive",
    pricePerNight: 120000,
    maxGuests: 3,
    bedType: "King-size bed + sofa bed",
    sizeSqm: 40,
    shortDescription:
      "A spacious room with a separate sitting area — ideal for work or relaxing.",
    description:
      "The Executive Room is built for people who need space and quiet. A separate sitting area lets you work or host a small meeting without disturbing the bedroom. Premium bedding, a rainfall shower, and thoughtful touches throughout. It's the room you choose when comfort is the priority.",
    amenities: [
      "Air conditioning",
      "High-speed Wi-Fi",
      "65-inch Smart TV",
      "Rainfall shower",
      "Separate sitting area",
      "Work desk with ergonomic chair",
      "Mini bar",
      "Nespresso machine",
      "Complimentary breakfast",
      "Daily housekeeping",
      "In-room safe",
      "Premium toiletries",
      "Bathrobe & slippers",
      "Laptop-sized safe",
    ],
    images: images.rooms.executive,
    isAvailable: true,
    isFeatured: true,
  },
  {
    id: "room-suite-004",
    slug: "suite",
    name: "The Calabash Suite",
    type: "suite",
    pricePerNight: 220000,
    maxGuests: 4,
    bedType: "King-size bed + living area",
    sizeSqm: 65,
    shortDescription:
      "Our finest room — a full suite with living area, dining space, and premium finishes.",
    description:
      "The Calabash Suite is the best room in the house. A generous living area, a separate bedroom with premium linens, a dining space for two, and a bathroom that feels like a private spa. Floor-to-ceiling windows bring in natural light and a view of the city. This is the room for celebrations, long weekends, or whenever you want to treat yourself properly.",
    amenities: [
      "Climate control",
      "High-speed Wi-Fi",
      "75-inch Smart TV in living area",
      "55-inch Smart TV in bedroom",
      "Rainfall shower & separate bathtub",
      "Full living area with sofa",
      "Dining table for two",
      "Fully stocked mini bar",
      "Nespresso machine & kettle",
      "Complimentary breakfast for two",
      "Evening turndown service",
      "Daily housekeeping",
      "Premium toiletries",
      "Bathrobes & slippers",
      "Welcome fruit basket",
      "Priority restaurant reservation",
      "Airport transfer (one way)",
    ],
    images: images.rooms.suite,
    isAvailable: true,
    isFeatured: true,
  },
];
