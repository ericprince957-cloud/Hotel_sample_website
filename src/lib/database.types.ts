export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      rooms: {
        Row: {
          id: string
          slug: string
          name: string
          type: string
          price_per_night: number
          max_guests: number
          bed_type: string
          size_sqm: number
          short_description: string
          description: string
          amenities: string[]
          images: string[]
          is_available: boolean
          is_featured: boolean
          sort_order: number
          created_at: string
        }
        Insert: {
          id?: string
          slug: string
          name: string
          type: string
          price_per_night: number
          max_guests: number
          bed_type: string
          size_sqm: number
          short_description: string
          description: string
          amenities?: string[]
          images?: string[]
          is_available?: boolean
          is_featured?: boolean
          sort_order?: number
          created_at?: string
        }
        Update: {
          id?: string
          slug?: string
          name?: string
          type?: string
          price_per_night?: number
          max_guests?: number
          bed_type?: string
          size_sqm?: number
          short_description?: string
          description?: string
          amenities?: string[]
          images?: string[]
          is_available?: boolean
          is_featured?: boolean
          sort_order?: number
          created_at?: string
        }
      }
      gallery_images: {
        Row: {
          id: string
          url: string
          category: string
          caption: string
          alt_text: string
          sort_order: number
          created_at: string
        }
        Insert: {
          id?: string
          url: string
          category: string
          caption: string
          alt_text: string
          sort_order?: number
          created_at?: string
        }
        Update: {
          id?: string
          url?: string
          category?: string
          caption?: string
          alt_text?: string
          sort_order?: number
          created_at?: string
        }
      }
      enquiries: {
        Row: {
          id: string
          room_id: string | null
          guest_name: string
          guest_phone: string
          guest_email: string | null
          check_in: string
          check_out: string
          guests: number
          message: string | null
          status: 'new' | 'contacted' | 'confirmed' | 'cancelled'
          admin_notes: string | null
          created_at: string
        }
        Insert: {
          id?: string
          room_id?: string | null
          guest_name: string
          guest_phone: string
          guest_email?: string | null
          check_in: string
          check_out: string
          guests: number
          message?: string | null
          status?: 'new' | 'contacted' | 'confirmed' | 'cancelled'
          admin_notes?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          room_id?: string | null
          guest_name?: string
          guest_phone?: string
          guest_email?: string | null
          check_in?: string
          check_out?: string
          guests?: number
          message?: string | null
          status?: 'new' | 'contacted' | 'confirmed' | 'cancelled'
          admin_notes?: string | null
          created_at?: string
        }
      }
      contact_messages: {
        Row: {
          id: string
          name: string
          phone: string
          email: string | null
          message: string
          status: 'new' | 'read' | 'replied'
          admin_notes: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          phone: string
          email?: string | null
          message: string
          status?: 'new' | 'read' | 'replied'
          admin_notes?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          phone?: string
          email?: string | null
          message?: string
          status?: 'new' | 'read' | 'replied'
          admin_notes?: string | null
          created_at?: string
        }
      }
      site_settings: {
        Row: {
          id: string
          hotel_name: string
          tagline: string
          phone: string
          whatsapp: string
          email: string
          address: string
          check_in_time: string
          check_out_time: string
          instagram_url: string | null
          facebook_url: string | null
          hero_headline: string | null
          hero_subtext: string | null
          hero_image_url: string | null
          updated_at: string
        }
        Insert: {
          id?: string
          hotel_name: string
          tagline: string
          phone: string
          whatsapp: string
          email: string
          address: string
          check_in_time: string
          check_out_time: string
          instagram_url?: string | null
          facebook_url?: string | null
          hero_headline?: string | null
          hero_subtext?: string | null
          hero_image_url?: string | null
          updated_at?: string
        }
        Update: {
          id?: string
          hotel_name?: string
          tagline?: string
          phone?: string
          whatsapp?: string
          email?: string
          address?: string
          check_in_time?: string
          check_out_time?: string
          instagram_url?: string | null
          facebook_url?: string | null
          hero_headline?: string | null
          hero_subtext?: string | null
          hero_image_url?: string | null
          updated_at?: string
        }
      }
      user_roles: {
        Row: {
          id: string
          user_id: string
          role: 'admin'
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          role: 'admin'
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          role?: 'admin'
          created_at?: string
        }
      }
    }
  }
}
