import { Hero } from "@/components/home/Hero";
import { TrustStrip } from "@/components/home/TrustStrip";
import { FeaturedRooms } from "@/components/home/FeaturedRooms";
import { WhyStayHere } from "@/components/home/WhyStayHere";
import { Amenities } from "@/components/home/Amenities";
import { GalleryPreview } from "@/components/home/GalleryPreview";
import { GuestReviews } from "@/components/home/GuestReviews";
import { Location } from "@/components/home/Location";
import { FinalCTA } from "@/components/home/FinalCTA";
import { useSEO, useJsonLd } from "@/hooks/useSEO";
import { siteConfig } from "@/data/site";
import { images } from "@/data/images";

export default function Home() {
  useSEO({
    title: "Home",
    description: `${siteConfig.name} in ${siteConfig.city}, ${siteConfig.state}. ${siteConfig.tagline} Comfortable rooms, warm service, and everything you need for a restful stay.`,
    image: images.hero,
    url: "https://thecalabashhotel.ng",
  });

  useJsonLd({
    "@context": "https://schema.org",
    "@type": "Hotel",
    name: siteConfig.name,
    description: siteConfig.tagline,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address,
      addressLocality: siteConfig.city,
      addressRegion: siteConfig.state,
      addressCountry: "NG",
    },
    telephone: siteConfig.phone,
    priceRange: "₦45,000 - ₦220,000",
    image: images.hero,
    url: "https://thecalabashhotel.ng",
    checkinTime: siteConfig.checkIn,
    checkoutTime: siteConfig.checkOut,
  });

  return (
    <>
      <Hero />
      <TrustStrip />
      <FeaturedRooms />
      <WhyStayHere />
      <Amenities />
      <GalleryPreview />
      <GuestReviews />
      <Location />
      <FinalCTA />
    </>
  );
}
