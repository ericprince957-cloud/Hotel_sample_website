import { supabase } from "@/lib/supabase";
import type { Database } from "@/lib/database.types";

type Room = Database["public"]["Tables"]["rooms"]["Row"];
type GalleryImage = Database["public"]["Tables"]["gallery_images"]["Row"];
type EnquiryInsert = Database["public"]["Tables"]["enquiries"]["Insert"];
type ContactMessageInsert = Database["public"]["Tables"]["contact_messages"]["Insert"];
type SiteSettings = Database["public"]["Tables"]["site_settings"]["Row"];

// ============ ROOMS ============

export async function fetchRooms(): Promise<Room[]> {
  const { data, error } = await supabase
    .from("rooms")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) throw error;
  return data || [];
}

export async function fetchRoomBySlug(slug: string): Promise<Room | null> {
  const { data, error } = await supabase
    .from("rooms")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    if (error.code === "PGRST116") return null; // not found
    throw error;
  }
  return data;
}

export async function fetchFeaturedRooms(): Promise<Room[]> {
  const { data, error } = await supabase
    .from("rooms")
    .select("*")
    .eq("is_featured", true)
    .eq("is_available", true)
    .order("sort_order", { ascending: true });

  if (error) throw error;
  return data || [];
}

// ============ GALLERY ============

export async function fetchGalleryImages(
  category?: string
): Promise<GalleryImage[]> {
  let query = supabase
    .from("gallery_images")
    .select("*")
    .order("sort_order", { ascending: true });

  if (category && category !== "all") {
    query = query.eq("category", category);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data || [];
}

// ============ SITE SETTINGS ============

export async function fetchSiteSettings(): Promise<SiteSettings | null> {
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

// ============ ENQUIRIES ============

export interface EnquiryData {
  roomId?: string | null;
  guestName: string;
  guestPhone: string;
  guestEmail?: string | null;
  checkIn: string;
  checkOut: string;
  guests: number;
  message?: string | null;
}

export async function submitEnquiry(
  enquiryData: EnquiryData
): Promise<{ success: boolean; error?: string }> {
  const insertData: EnquiryInsert = {
    room_id: enquiryData.roomId || null,
    guest_name: enquiryData.guestName,
    guest_phone: enquiryData.guestPhone,
    guest_email: enquiryData.guestEmail || null,
    check_in: enquiryData.checkIn,
    check_out: enquiryData.checkOut,
    guests: enquiryData.guests,
    message: enquiryData.message || null,
    status: "new",
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { error } = await (supabase.from("enquiries") as any).insert([insertData]);

  if (error) {
    console.error("Failed to save enquiry:", error);
    return { success: false, error: error.message };
  }

  return { success: true };
}

// ============ CONTACT MESSAGES ============

export interface ContactMessageData {
  name: string;
  phone: string;
  email?: string | null;
  message: string;
}

export async function submitContactMessage(
  messageData: ContactMessageData
): Promise<{ success: boolean; error?: string }> {
  const insertData: ContactMessageInsert = {
    name: messageData.name,
    phone: messageData.phone,
    email: messageData.email || null,
    message: messageData.message,
    status: "new",
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { error } = await (supabase.from("contact_messages") as any).insert([insertData]);

  if (error) {
    console.error("Failed to save contact message:", error);
    return { success: false, error: error.message };
  }

  return { success: true };
}
