import { useState, useEffect } from "react";
import { fetchAllGalleryImages, deleteGalleryImage } from "@/lib/adminApi";
import { useToast } from "@/lib/toast";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

export default function AdminGallery() {
  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToast } = useToast();

  useEffect(() => {
    loadImages();
  }, []);

  const loadImages = async () => {
    try {
      const data = await fetchAllGalleryImages();
      setImages(data);
    } catch (error) {
      console.error("Error loading gallery:", error);
      addToast("error", "Failed to load gallery");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this image?")) return;

    try {
      const result = await deleteGalleryImage(id);
      if (result.success) {
        addToast("success", "Image deleted");
        loadImages();
      } else {
        addToast("error", result.error || "Failed to delete");
      }
    } catch (error) {
      addToast("error", "Failed to delete image");
    }
  };

  return (
    <div className="p-6 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-[28px] font-[Fraunces] font-semibold text-[#0F3D3E]">
          Gallery
        </h1>
        <Button>Upload images</Button>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <Skeleton key={i} className="aspect-square rounded-[10px]" />
          ))}
        </div>
      ) : images.length === 0 ? (
        <div className="text-center py-12 bg-[#EDE8DC] rounded-[14px]">
          <p className="text-[16px] text-[#4A5553]">No images yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image: any) => (
            <div key={image.id} className="relative group">
              <img
                src={image.url}
                alt={image.alt_text}
                className="w-full aspect-square object-cover rounded-[10px]"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-[10px] flex items-center justify-center">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(image.id)}
                  className="text-white hover:bg-white/20"
                >
                  <Trash2 size={20} />
                </Button>
              </div>
              <div className="mt-2">
                <p className="text-[12px] text-[#4A5553] capitalize">{image.category}</p>
                <p className="text-[14px] text-[#0F3D3E] truncate">{image.caption}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
