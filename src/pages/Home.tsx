import { siteConfig } from "@/data/site";

export default function Home() {
  return (
    <div>
      {/* Hero section placeholder */}
      <section className="section-padding">
        <div className="container-hotel">
          <div className="max-w-prose-hotel">
            <h1 className="text-[40px] md:text-[56px] font-[Fraunces] font-semibold text-[#0F3D3E] leading-[1.15] mb-4">
              {siteConfig.tagline}
            </h1>
            <p className="text-[18px] text-[#4A5553] mb-8">
              Welcome to {siteConfig.name}. A warm, modern hotel in {siteConfig.city},{" "}
              {siteConfig.state}.
            </p>
            <p className="text-[16px] text-[#4A5553]">
              Page content coming soon.
            </p>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="container-hotel">
        <hr className="border-[#E2DBC9]" />
      </div>

      {/* Placeholder content section */}
      <section className="section-padding">
        <div className="container-hotel">
          <h2 className="text-[28px] md:text-[40px] font-[Fraunces] font-semibold text-[#0F3D3E] mb-4">
            Our Rooms
          </h2>
          <p className="text-[16px] text-[#4A5553] max-w-prose-hotel">
            Room listings and booking will appear here.
          </p>
        </div>
      </section>
    </div>
  );
}
