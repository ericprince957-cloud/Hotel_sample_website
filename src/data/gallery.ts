export interface GalleryImage {
  id: string;
  url: string;
  category: "rooms" | "dining" | "facilities" | "exterior";
  caption: string;
  alt: string;
}

export const galleryImages: GalleryImage[] = [
  {
    id: "1",
    url: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80",
    category: "rooms",
    caption: "Standard Room - Comfortable and clean",
    alt: "Standard room with queen bed",
  },
  {
    id: "2",
    url: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80",
    category: "rooms",
    caption: "Deluxe Room - More space to relax",
    alt: "Deluxe room with king bed",
  },
  {
    id: "3",
    url: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80",
    category: "rooms",
    caption: "Executive Room - Perfect for business",
    alt: "Executive room with sitting area",
  },
  {
    id: "4",
    url: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80",
    category: "rooms",
    caption: "The Calabash Suite - Our finest room",
    alt: "Luxury suite with living area",
  },
  {
    id: "5",
    url: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
    category: "dining",
    caption: "Restaurant - Nigerian and international cuisine",
    alt: "Hotel restaurant interior",
  },
  {
    id: "6",
    url: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80",
    category: "dining",
    caption: "Bar - Relax with a drink",
    alt: "Hotel bar with seating",
  },
  {
    id: "7",
    url: "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800&q=80",
    category: "facilities",
    caption: "Swimming Pool - Cool off in the afternoon",
    alt: "Hotel swimming pool",
  },
  {
    id: "8",
    url: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80",
    category: "facilities",
    caption: "Fitness Center - Stay active",
    alt: "Hotel gym with equipment",
  },
  {
    id: "9",
    url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
    category: "exterior",
    caption: "Hotel Exterior - Welcome to The Calabash",
    alt: "Hotel building exterior",
  },
  {
    id: "10",
    url: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80",
    category: "exterior",
    caption: "Entrance - Your stay begins here",
    alt: "Hotel entrance",
  },
  {
    id: "11",
    url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80",
    category: "exterior",
    caption: "Garden - A peaceful outdoor space",
    alt: "Hotel garden area",
  },
  {
    id: "12",
    url: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800&q=80",
    category: "facilities",
    caption: "Conference Room - For your business needs",
    alt: "Hotel conference room",
  },
];

export const galleryCategories = [
  { value: "all", label: "All" },
  { value: "rooms", label: "Rooms" },
  { value: "dining", label: "Dining" },
  { value: "facilities", label: "Facilities" },
  { value: "exterior", label: "Exterior" },
] as const;
