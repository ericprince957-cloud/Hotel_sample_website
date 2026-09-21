import { supabase } from "@/lib/supabase";
import type { Database } from "@/lib/database.types";

type Enquiry = Database["public"]["Tables"]["enquiries"]["Row"];
type Room = Database["public"]["Tables"]["rooms"]["Row"];
type RoomInsert = Database["public"]["Tables"]["rooms"]["Insert"];
type RoomUpdate = Database["public"]["Tables"]["rooms"]["Update"];
type GalleryImage = Database["public"]["Tables"]["gallery_images"]["Row"];
type GalleryImageInsert = Database["public"]["Tables"]["gallery_images"]["Insert"];
type SiteSettingsUpdate = Database["public"]["Tables"]["site_settings"]["Update"];

// ============ ENQUIRIES ============

export async function fetchEnquiries(filters?: {
  status?: string;
  search?: string;
}): Promise<Enquiry[]> {
  let query = supabase
    .from("enquiries")
    .select("*, rooms(name, slug)")
    .order("created_at", { ascending: false });

  if (filters?.status && filters.status !== "all") {
    query = query.eq("status", filters.status);
  }

  const { data, error } = await query;

  if (error) throw error;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let results = (data || []) as any[];

  if (filters?.search) {
    const searchLower = filters.search.toLowerCase();
    results = results.filter(
      (e: any) =>
        e.guest_name.toLowerCase().includes(searchLower) ||
        e.guest_phone.includes(searchLower)
    );
  }

  return results as Enquiry[];
}

export async function fetchRecentEnquiries(limit = 5): Promise<Enquiry[]> {
  const { data, error } = await supabase
    .from("enquiries")
    .select("*, rooms(name, slug)")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) throw error;
  return (data || []) as Enquiry[];
}

export async function fetchEnquiryById(id: string): Promise<Enquiry | null> {
  const { data, error } = await supabase
    .from("enquiries")
    .select("*, rooms(name, slug)")
    .eq("id", id)
    .single();

  if (error) {
    if (error.code === "PGRST116") return null;
    throw error;
  }
  return data as Enquiry;
}

export async function updateEnquiry(
  id: string,
  updates: { status?: string; admin_notes?: string }
): Promise<{ success: boolean; error?: string }> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { error } = await (supabase.from("enquiries") as any).update(updates).eq("id", id);

  if (error) {
    return { success: false, error: error.message };
  }
  return { success: true };
}

export async function countNewEnquiries(): Promise<number> {
  const { count, error } = await supabase
    .from("enquiries")
    .select("*", { count: "exact", head: true })
    .eq("status", "new")
    .gte("created_at", new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString());

  if (error) throw error;
  return count || 0;
}

// ============ ROOMS ============

export async function fetchAllRooms(): Promise<Room[]> {
  const { data, error } = await supabase
    .from("rooms")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) throw error;
  return (data || []) as Room[];
}

export async function createRoom(roomData: RoomInsert): Promise<{ success: boolean; error?: string }> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { error } = await (supabase.from("rooms") as any).insert([roomData]);

  if (error) {
    return { success: false, error: error.message };
  }
  return { success: true };
}

export async function updateRoom(
  id: string,
  updates: RoomUpdate
): Promise<{ success: boolean; error?: string }> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { error } = await (supabase.from("rooms") as any).update(updates).eq("id", id);

  if (error) {
    return { success: false, error: error.message };
  }
  return { success: true };
}

export async function deleteRoom(id: string): Promise<{ success: boolean; error?: string }> {
  const { error } = await supabase.from("rooms").delete().eq("id", id);

  if (error) {
    return { success: false, error: error.message };
  }
  return { success: true };
}

// ============ GALLERY ============

export async function fetchAllGalleryImages(): Promise<GalleryImage[]> {
  const { data, error } = await supabase
    .from("gallery_images")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) throw error;
  return (data || []) as GalleryImage[];
}

export async function createGalleryImage(
  imageData: GalleryImageInsert
): Promise<{ success: boolean; error?: string }> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { error } = await (supabase.from("gallery_images") as any).insert([imageData]);

  if (error) {
    return { success: false, error: error.message };
  }
  return { success: true };
}

export async function updateGalleryImage(
  id: string,
  updates: Partial<GalleryImageInsert>
): Promise<{ success: boolean; error?: string }> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { error } = await (supabase.from("gallery_images") as any).update(updates).eq("id", id);

  if (error) {
    return { success: false, error: error.message };
  }
  return { success: true };
}

export async function deleteGalleryImage(id: string): Promise<{ success: boolean; error?: string }> {
  const { error } = await supabase.from("gallery_images").delete().eq("id", id);

  if (error) {
    return { success: false, error: error.message };
  }
  return { success: true };
}

// ============ SETTINGS ============

export async function fetchSiteSettings(): Promise<Database["public"]["Tables"]["site_settings"]["Row"] | null> {
  const { data, error } = await supabase
    .from("site_settings")
    .select("*")
    .limit(1)
    .single();

  if (error) {
    if (error.code === "PGRST116") return null;
    throw error;
  }
  return data;
}

export async function updateSiteSettings(
  id: string,
  updates: SiteSettingsUpdate
): Promise<{ success: boolean; error?: string }> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { error } = await (supabase.from("site_settings") as any).update(updates).eq("id", id);

  if (error) {
    return { success: false, error: error.message };
  }
  return { success: true };
}

// ============ STATS ============

export async function fetchStats(): Promise<{
  totalRooms: number;
  availableRooms: number;
  newEnquiries: number;
}> {
  const [roomsResult, enquiriesResult] = await Promise.all([
    supabase.from("rooms").select("id, is_available"),
    supabase
      .from("enquiries")
      .select("id", { count: "exact", head: true })
      .eq("status", "new")
      .gte("created_at", new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()),
  ]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const rooms = (roomsResult.data || []) as any[];
  const availableRooms = rooms.filter((r: any) => r.is_available).length;

  return {
    totalRooms: rooms.length,
    availableRooms,
    newEnquiries: enquiriesResult.count || 0,
  };
}
