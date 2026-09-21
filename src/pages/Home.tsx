import { Hero } from "@/components/home/Hero";
import { TrustStrip } from "@/components/home/TrustStrip";
import { FeaturedRooms } from "@/components/home/FeaturedRooms";
import { WhyStayHere } from "@/components/home/WhyStayHere";
import { Amenities } from "@/components/home/Amenities";
import { GalleryPreview } from "@/components/home/GalleryPreview";
import { GuestReviews } from "@/components/home/GuestReviews";
import { Location } from "@/components/home/Location";
import { FinalCTA } from "@/components/home/FinalCTA";

export default function Home() {
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
