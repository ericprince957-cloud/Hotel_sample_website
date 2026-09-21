import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { fetchSiteSettings, updateSiteSettings } from "@/lib/adminApi";
import { useToast } from "@/lib/toast";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

const settingsSchema = z.object({
  id: z.string(),
  hotel_name: z.string().min(1, "Hotel name is required"),
  tagline: z.string().min(1, "Tagline is required"),
  phone: z.string().regex(/^\+?[0-9\s-]+$/, "Invalid phone format"),
  whatsapp: z.string().regex(/^[0-9]+$/, "WhatsApp must be numbers only"),
  email: z.string().email("Invalid email"),
  address: z.string().min(1, "Address is required"),
  check_in_time: z.string().min(1, "Check-in time is required"),
  check_out_time: z.string().min(1, "Check-out time is required"),
  instagram_url: z.string().url("Invalid URL").optional().or(z.literal("")),
  facebook_url: z.string().url("Invalid URL").optional().or(z.literal("")),
  hero_headline: z.string().optional(),
  hero_subtext: z.string().optional(),
  hero_image_url: z.string().optional(),
}).passthrough(); // Allow additional fields like updated_at

type SettingsFormData = z.infer<typeof settingsSchema>;

export default function AdminSettings() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { addToast } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<SettingsFormData>({
    resolver: zodResolver(settingsSchema),
  });

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const data = await fetchSiteSettings();
      if (data) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        reset(data as any);
      }
    } catch (error) {
      console.error("Error loading settings:", error);
      addToast("error", "Failed to load settings");
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: any) => {
    setSaving(true);
    try {
      // Remove id and updated_at from the update payload
      const { id, updated_at, ...updates } = data;
      const result = await updateSiteSettings(id, updates);
      if (result.success) {
        addToast("success", "Settings saved");
      } else {
        addToast("error", result.error || "Failed to save");
      }
    } catch (error) {
      addToast("error", "Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6 md:p-8">
        <Skeleton className="h-8 w-48 mb-6" />
        <div className="space-y-4">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8">
      <h1 className="text-[28px] font-[Fraunces] font-semibold text-[#0F3D3E] mb-6">
        Settings
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl space-y-6">
        <input type="hidden" {...register("id")} />

        {/* Basic info */}
        <div className="bg-[#EDE8DC] rounded-[14px] p-6 space-y-4">
          <h2 className="text-[18px] font-semibold text-[#0F3D3E]">Basic information</h2>

          <div>
            <label className="block text-[14px] font-medium text-[#0F3D3E] mb-2">
              Hotel name
            </label>
            <input
              type="text"
              {...register("hotel_name")}
              className="w-full h-11 px-3 rounded-[10px] border border-[#E2DBC9] text-[16px] focus:outline-none focus:ring-2 focus:ring-[#B8893B] bg-white"
            />
            {errors.hotel_name && (
              <p className="mt-1 text-[12px] text-[#B3372F]">{errors.hotel_name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-[14px] font-medium text-[#0F3D3E] mb-2">
              Tagline
            </label>
            <input
              type="text"
              {...register("tagline")}
              className="w-full h-11 px-3 rounded-[10px] border border-[#E2DBC9] text-[16px] focus:outline-none focus:ring-2 focus:ring-[#B8893B] bg-white"
            />
            {errors.tagline && (
              <p className="mt-1 text-[12px] text-[#B3372F]">{errors.tagline.message}</p>
            )}
          </div>

          <div>
            <label className="block text-[14px] font-medium text-[#0F3D3E] mb-2">
              Address
            </label>
            <textarea
              {...register("address")}
              rows={2}
              className="w-full px-3 py-2 rounded-[10px] border border-[#E2DBC9] text-[16px] focus:outline-none focus:ring-2 focus:ring-[#B8893B] resize-none bg-white"
            />
            {errors.address && (
              <p className="mt-1 text-[12px] text-[#B3372F]">{errors.address.message}</p>
            )}
          </div>
        </div>

        {/* Contact */}
        <div className="bg-[#EDE8DC] rounded-[14px] p-6 space-y-4">
          <h2 className="text-[18px] font-semibold text-[#0F3D3E]">Contact information</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[14px] font-medium text-[#0F3D3E] mb-2">
                Phone
              </label>
              <input
                type="tel"
                {...register("phone")}
                className="w-full h-11 px-3 rounded-[10px] border border-[#E2DBC9] text-[16px] focus:outline-none focus:ring-2 focus:ring-[#B8893B] bg-white"
              />
              {errors.phone && (
                <p className="mt-1 text-[12px] text-[#B3372F]">{errors.phone.message}</p>
              )}
            </div>

            <div>
              <label className="block text-[14px] font-medium text-[#0F3D3E] mb-2">
                WhatsApp (numbers only)
              </label>
              <input
                type="text"
                {...register("whatsapp")}
                className="w-full h-11 px-3 rounded-[10px] border border-[#E2DBC9] text-[16px] focus:outline-none focus:ring-2 focus:ring-[#B8893B] bg-white"
              />
              {errors.whatsapp && (
                <p className="mt-1 text-[12px] text-[#B3372F]">{errors.whatsapp.message}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-[14px] font-medium text-[#0F3D3E] mb-2">
              Email
            </label>
            <input
              type="email"
              {...register("email")}
              className="w-full h-11 px-3 rounded-[10px] border border-[#E2DBC9] text-[16px] focus:outline-none focus:ring-2 focus:ring-[#B8893B] bg-white"
            />
            {errors.email && (
              <p className="mt-1 text-[12px] text-[#B3372F]">{errors.email.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[14px] font-medium text-[#0F3D3E] mb-2">
                Instagram URL
              </label>
              <input
                type="url"
                {...register("instagram_url")}
                className="w-full h-11 px-3 rounded-[10px] border border-[#E2DBC9] text-[16px] focus:outline-none focus:ring-2 focus:ring-[#B8893B] bg-white"
              />
              {errors.instagram_url && (
                <p className="mt-1 text-[12px] text-[#B3372F]">{errors.instagram_url.message}</p>
              )}
            </div>

            <div>
              <label className="block text-[14px] font-medium text-[#0F3D3E] mb-2">
                Facebook URL
              </label>
              <input
                type="url"
                {...register("facebook_url")}
                className="w-full h-11 px-3 rounded-[10px] border border-[#E2DBC9] text-[16px] focus:outline-none focus:ring-2 focus:ring-[#B8893B] bg-white"
              />
              {errors.facebook_url && (
                <p className="mt-1 text-[12px] text-[#B3372F]">{errors.facebook_url.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Check-in/out */}
        <div className="bg-[#EDE8DC] rounded-[14px] p-6 space-y-4">
          <h2 className="text-[18px] font-semibold text-[#0F3D3E]">Check-in / Check-out</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[14px] font-medium text-[#0F3D3E] mb-2">
                Check-in time
              </label>
              <input
                type="text"
                {...register("check_in_time")}
                placeholder="2:00 PM"
                className="w-full h-11 px-3 rounded-[10px] border border-[#E2DBC9] text-[16px] focus:outline-none focus:ring-2 focus:ring-[#B8893B] bg-white"
              />
              {errors.check_in_time && (
                <p className="mt-1 text-[12px] text-[#B3372F]">{errors.check_in_time.message}</p>
              )}
            </div>

            <div>
              <label className="block text-[14px] font-medium text-[#0F3D3E] mb-2">
                Check-out time
              </label>
              <input
                type="text"
                {...register("check_out_time")}
                placeholder="12:00 PM"
                className="w-full h-11 px-3 rounded-[10px] border border-[#E2DBC9] text-[16px] focus:outline-none focus:ring-2 focus:ring-[#B8893B] bg-white"
              />
              {errors.check_out_time && (
                <p className="mt-1 text-[12px] text-[#B3372F]">{errors.check_out_time.message}</p>
              )}
            </div>
          </div>
        </div>

        <Button type="submit" size="lg" disabled={saving || !isDirty}>
          {saving ? "Saving..." : "Save settings"}
        </Button>
      </form>
    </div>
  );
}
