import {
  Wind,
  Wifi,
  Zap,
  Car,
  UtensilsCrossed,
  ConciergeBell,
  ShieldCheck,
  Plane,
  Bath,
  Tv,
  Coffee,
  Lock,
  Snowflake,
  Droplets,
  type LucideIcon,
} from "lucide-react";

const amenityIconMap: Record<string, LucideIcon> = {
  "Air conditioning": Wind,
  "Free Wi-Fi": Wifi,
  "24/7 power backup": Zap,
  "Secure parking": Car,
  "Restaurant & bar": UtensilsCrossed,
  "Restaurant and bar": UtensilsCrossed,
  "Room service": ConciergeBell,
  "CCTV & security": ShieldCheck,
  "CCTV and security": ShieldCheck,
  "Airport pickup": Plane,
  "Hot water": Droplets,
  "Hot & cold water": Droplets,
  "Rainfall shower": Bath,
  "Flat-screen TV": Tv,
  "Smart TV": Tv,
  "Tea & coffee maker": Coffee,
  "Nespresso machine": Coffee,
  "In-room safe": Lock,
  "Laptop-sized safe": Lock,
  "Complimentary water": Droplets,
  "Mini fridge": Snowflake,
  "Mini bar": Snowflake,
  "Bathrobe & slippers": Bath,
  "Bathrobes & slippers": Bath,
  "Premium toiletries": Bath,
};

export function getAmenityIcon(amenity: string): LucideIcon {
  return amenityIconMap[amenity] || ShieldCheck;
}
