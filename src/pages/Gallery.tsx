import { useState, useEffect, useCallback } from "react";
import { galleryImages, galleryCategories } from "@/data/gallery";
import { Button } from "@/components/ui/button";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSEO } from "@/hooks/useSEO";
import { siteConfig } from "@/data/site";

export default function Gallery() {
  useSEO({
    title: "Gallery",
    description: `Take a look around ${siteConfig.name}. Browse photos of our rooms, dining, facilities, and exterior.`,
  });
  const [activeCategory, setActiveCategory] = useState("all");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const filteredImages =
    activeCategory === "all"
      ? galleryImages
      : galleryImages.filter((img) => img.category === activeCategory);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const nextImage = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % filteredImages.length);
  }, [filteredImages.length]);

  const prevImage = useCallback(() => {
    setCurrentIndex((prev) =>
      prev === 0 ? filteredImages.length - 1 : prev - 1
    );
  }, [filteredImages.length]);

  useEffect(() => {
    if (!lightboxOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen, nextImage, prevImage]);

  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      nextImage();
    }
    if (touchStart - touchEnd < -75) {
      prevImage();
    }
  };

  return (
    <div className="section-padding">
      <div className="container-hotel">
        {/* Heading */}
        <div className="mb-10">
          <h1 className="text-[40px] md:text-[56px] font-[Fraunces] font-semibold text-[#0F3D3E] leading-[1.15] mb-3">
            Gallery
          </h1>
          <p className="text-[18px] text-[#4A5553] max-w-prose-hotel">
            Take a look around The Calabash Hotel. From our comfortable rooms to
            our peaceful outdoor spaces.
          </p>
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {galleryCategories.map((category) => (
            <button
              key={category.value}
              onClick={() => setActiveCategory(category.value)}
              className={cn(
                "px-4 py-2 rounded-[10px] text-[14px] font-medium transition-colors",
                activeCategory === category.value
                  ? "bg-[#0F3D3E] text-[#FAF8F3]"
                  : "bg-[#EDE8DC] text-[#0F3D3E] hover:bg-[#E2DBC9]"
              )}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Masonry grid */}
        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {filteredImages.map((image, index) => (
            <button
              key={image.id}
              onClick={() => openLightbox(index)}
              className="block w-full overflow-hidden rounded-[14px] cursor-pointer group break-inside-avoid"
            >
              <img
                src={image.url}
                alt={image.alt}
                loading="lazy"
                className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </button>
          ))}
        </div>

        {filteredImages.length === 0 && (
          <div className="text-center py-16">
            <p className="text-[18px] text-[#4A5553]">
              No images in this category yet.
            </p>
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10"
            aria-label="Close lightbox"
          >
            <X size={24} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
            className="absolute left-4 md:left-8 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10"
            aria-label="Previous image"
          >
            <ChevronLeft size={24} />
          </button>

          <div
            className="max-w-[90vw] max-h-[85vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <img
              src={filteredImages[currentIndex].url}
              alt={filteredImages[currentIndex].alt}
              className="max-w-full max-h-[75vh] object-contain rounded-[14px]"
            />
            <p className="mt-4 text-white/90 text-[14px] md:text-[16px] text-center">
              {filteredImages[currentIndex].caption}
            </p>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
            className="absolute right-4 md:right-8 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10"
            aria-label="Next image"
          >
            <ChevronRight size={24} />
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/80 text-[14px]">
            {currentIndex + 1} / {filteredImages.length}
          </div>
        </div>
      )}
    </div>
  );
}
