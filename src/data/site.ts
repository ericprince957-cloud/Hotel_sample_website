// All hotel settings in one place — change values here to update everywhere.

export const siteConfig = {
  name: "The Calabash Hotel",
  tagline: "Rest well. Wake up ready.",
  city: "Lagos",
  state: "Lagos State",
  address: "14 Adeola Odeku Street, Victoria Island, Lagos",
  phone: "+234 801 234 5678",
  whatsappNumber: "2348012345678",
  email: "hello@thecalabashhotel.ng",
  checkIn: "2:00 PM",
  checkOut: "12:00 PM",
  social: {
    instagram: "https://instagram.com/thecalabashhotel",
    facebook: "https://facebook.com/thecalabashhotel",
  },
  nav: [
    { label: "Home", href: "/" },
    { label: "Rooms", href: "/rooms" },
    { label: "Gallery", href: "/gallery" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
