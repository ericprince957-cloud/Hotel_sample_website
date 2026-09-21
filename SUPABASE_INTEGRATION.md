# Supabase Integration - Complete

## What Was Built

### 1. Database Schema (supabase/migrations/)

**001_initial_schema.sql** - Creates all tables with RLS:
- `rooms` - Hotel room data with pricing, amenities, images
- `gallery_images` - Gallery photos with categories
- `enquiries` - Room booking enquiries
- `contact_messages` - Contact form submissions
- `site_settings` - Single-row config table
- `user_roles` - Admin role management
- `has_role()` function - Security definer for role checks
- RLS policies on all tables
- Indexes for performance

**002_seed_data.sql** - Seeds sample data:
- 4 rooms (Standard, Deluxe, Executive, Suite)
- 12 gallery images across 4 categories
- Site settings with hotel info

### 2. Supabase Client (src/lib/)

**database.types.ts** - TypeScript types for all tables
**supabase.ts** - Supabase client initialization
**api.ts** - API service layer with functions:
- `fetchRooms()` - Get all rooms
- `fetchRoomBySlug()` - Get single room
- `fetchFeaturedRooms()` - Get featured rooms
- `fetchGalleryImages()` - Get gallery with optional category filter
- `fetchSiteSettings()` - Get site config
- `submitEnquiry()` - Save enquiry to database
- `submitContactMessage()` - Save contact message

### 3. Enquiry Dialog (src/components/)

**EnquiryDialog.tsx** - Reusable enquiry form:
- Bottom sheet on mobile, centered dialog on desktop
- Room selection dropdown (preselectable)
- Date pickers with validation (no past dates, check-out after check-in)
- Guest count (1 to max guests of selected room)
- Name, phone (Nigerian format), email (optional), message (optional)
- Zod validation with inline error messages
- Honeypot field for bot protection
- Double submission prevention
- Success state with WhatsApp redirect
- Graceful fallback if database fails

**EnquiryDialogContext.tsx** - Context provider:
- `useEnquiryDialog()` hook
- `openEnquiryDialog(roomSlug?)` function
- Manages dialog state globally

### 4. Integration Points

Updated components to use enquiry dialog:
- **Header** - "Book now" button opens dialog
- **Hero** - Enquiry bar opens dialog
- **RoomCard** - "Enquire" button opens dialog with room preselected
- **EnquiryCard** - "Enquire now" buttons on room detail page
- **Contact** - Form submits to database via `submitContactMessage()`

### 5. Configuration Files

**.env.example** - Environment variable template
**src/vite-env.d.ts** - Vite environment types
**README.md** - Complete project documentation
**SUPABASE_SETUP.md** - Step-by-step Supabase setup guide

## Security Features

### Row Level Security (RLS)

All tables have RLS enabled with these policies:

**Public read tables** (rooms, gallery_images, site_settings):
- Anyone can SELECT
- Only admins can INSERT/UPDATE/DELETE

**Insert-only tables** (enquiries, contact_messages):
- Anyone can INSERT (anonymous users)
- Only admins can SELECT/UPDATE/DELETE
- Guests cannot read other guests' enquiries

**Admin-only table** (user_roles):
- Only admins can manage roles

### Role Management

- Roles stored in `user_roles` table (not in profile or client storage)
- `has_role()` function is SECURITY DEFINER (runs with table owner permissions)
- Prevents privilege escalation attacks

### Form Security

- Honeypot field to block bots
- Zod validation on all inputs
- Nigerian phone number regex validation
- Date validation (no past dates, logical check-out)
- Double submission prevention
- Max character limits on message fields

## Database Operations

### Reading Data

```typescript
import { fetchRooms, fetchRoomBySlug } from '@/lib/api';

// Get all rooms
const rooms = await fetchRooms();

// Get single room
const room = await fetchRoomBySlug('deluxe');
```

### Writing Data

```typescript
import { submitEnquiry, submitContactMessage } from '@/lib/api';

// Submit enquiry
const result = await submitEnquiry({
  roomId: 'uuid-here',
  guestName: 'John Doe',
  guestPhone: '08012345678',
  guestEmail: 'john@example.com',
  checkIn: '2024-01-15',
  checkOut: '2024-01-17',
  guests: 2,
  message: 'Need early check-in',
});

// Submit contact message
const result = await submitContactMessage({
  name: 'John Doe',
  phone: '08012345678',
  email: 'john@example.com',
  message: 'I have a question...',
});
```

## Fallback Strategy

The site uses a **dual data source** approach:

1. **Primary**: Supabase database (when configured)
2. **Fallback**: Local data files in `src/data/` (always available)

This means:
- Site works even without Supabase configured
- No broken experience if database is down
- Easy to test without backend
- Gradual migration path

## Environment Variables

Required in `.env`:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

Get these from: Supabase Dashboard > Settings > API

## Testing Checklist

- [ ] Create Supabase project
- [ ] Add environment variables to `.env`
- [ ] Run migration 001 (schema)
- [ ] Run migration 002 (seed data)
- [ ] Verify tables exist in Table Editor
- [ ] Create storage bucket `hotel-images`
- [ ] Start dev server (`npm run dev`)
- [ ] Test enquiry form submission
- [ ] Verify enquiry appears in `enquiries` table
- [ ] Test contact form submission
- [ ] Verify message appears in `contact_messages` table
- [ ] Test "Book now" button in header
- [ ] Test "Enquire" buttons on room cards
- [ ] Test enquiry dialog on room detail page
- [ ] Verify WhatsApp redirect works
- [ ] Test form validation (invalid phone, past dates, etc.)
- [ ] Test honeypot field (should block bots)

## Next Steps (Optional Enhancements)

1. **Admin Dashboard** - Build admin interface to view enquiries
2. **Email Notifications** - Send emails when new enquiries arrive
3. **Image Upload** - Allow admins to upload images to storage
4. **Authentication** - Add login for admin users
5. **Booking System** - Full booking with payment integration
6. **Reviews System** - Allow guests to leave reviews
7. **Multi-language** - Add support for other languages

## Files Created/Modified

### New Files
- `supabase/migrations/001_initial_schema.sql`
- `supabase/migrations/002_seed_data.sql`
- `src/lib/database.types.ts`
- `src/lib/supabase.ts`
- `src/lib/api.ts`
- `src/vite-env.d.ts`
- `src/components/EnquiryDialog.tsx`
- `src/components/EnquiryDialogContext.tsx`
- `.env.example`
- `README.md`
- `SUPABASE_SETUP.md`

### Modified Files
- `src/App.tsx` - Added EnquiryDialogProvider
- `src/components/layout/Header.tsx` - Book now button uses dialog
- `src/components/home/Hero.tsx` - Enquiry bar uses dialog
- `src/components/rooms/RoomCard.tsx` - Enquire button uses dialog
- `src/components/rooms/EnquiryCard.tsx` - Enquire buttons use dialog
- `src/pages/Contact.tsx` - Form submits to database

## Build Status

✅ Build successful
✅ No TypeScript errors
✅ All components integrated
✅ RLS policies configured
✅ Seed data included
✅ Documentation complete

## Support

For issues or questions:
1. Check `SUPABASE_SETUP.md` for detailed setup instructions
2. Check browser console for frontend errors
3. Check Supabase logs for backend errors
4. Verify environment variables are set correctly
5. Ensure migrations have been run
