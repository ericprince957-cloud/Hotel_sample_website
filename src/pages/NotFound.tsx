import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="section-padding">
      <div className="container-hotel text-center py-16">
        <p className="text-[56px] md:text-[80px] font-[Fraunces] font-semibold text-[#B8893B] leading-[1.15] mb-4">
          404
        </p>
        <h1 className="text-[28px] md:text-[40px] font-[Fraunces] font-semibold text-[#0F3D3E] leading-[1.15] mb-4">
          Page not found
        </h1>
        <p className="text-[18px] text-[#4A5553] max-w-prose-hotel mx-auto mb-8">
          Sorry, we couldn't find the page you're looking for. It may have been
          moved or doesn't exist.
        </p>
        <Link to="/">
          <Button size="lg">Go back home</Button>
        </Link>
      </div>
    </div>
  );
}
