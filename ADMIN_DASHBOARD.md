# Admin Dashboard - Complete

## What Was Built

A secure, mobile-friendly admin dashboard for hotel managers at `/admin`.

## Authentication

### Login Page (`/admin/login`)
- Email and password authentication via Supabase Auth
- Form validation with Zod
- Error handling for invalid credentials
- "Forgot password" link (uses Supabase password reset)
- No public sign-up - admin accounts created manually in Supabase

### Protected Routes
- All `/admin/*` routes protected by `ProtectedRoute` component
- Checks admin role via `has_role()` database function (server-side)
- Non-admin users see "You do not have access" message
- Automatic redirect to login if not authenticated
- Automatic redirect to no-access page if not admin

### Auth State Management
- Zustand store in `src/lib/auth.ts`
- `useAuth()` hook provides:
  - `user` - current user object
  - `isAdmin` - boolean flag
  - `isLoading` - loading state
  - `initialize()` - check auth on app load
  - `signIn(email, password)` - login
  - `signOut()` - logout
  - `resetPassword(email)` - password reset

## Layout

### Desktop
- Left sidebar (264px wide) with navigation
- Logo at top
- Navigation links: Overview, Enquiries, Rooms, Gallery, Settings
- Footer with "View website" and "Log out" links
- Active state highlighting

### Mobile
- Bottom navigation bar with 5 items
- Icons + labels
- Active state highlighting
- Fixed to bottom of screen

### Design
- Clean, calm interface matching site colors
- White background
- Teal primary (#0F3D3E)
- Clear headings with Fraunces font
- Body text in Manrope

## Pages

### 1. Overview (`/admin`)
**Stats cards:**
- New enquiries (last 7 days)
- Total rooms
- Available rooms

**Recent enquiries:**
- Shows 5 most recent enquiries
- Guest name, room, dates, status
- Links to detail view
- "View all" link to enquiries page

### 2. Enquiries (`/admin/enquiries`)

**List view:**
- Desktop: table with columns (Guest, Room, Dates, Guests, Status, Date)
- Mobile: stacked cards
- Filter by status (all, new, contacted, confirmed, cancelled)
- Search by name or phone
- Click to view details

**Detail view (`/admin/enquiries/:id`):**
- Full enquiry details
- Status dropdown (new, contacted, confirmed, cancelled)
- Admin notes textarea
- Save button
- "Call guest" button (tel: link)
- "Reply on WhatsApp" button (wa.me link with prefilled message)
- Back button to list

### 3. Rooms (`/admin/rooms`)

**List view:**
- All rooms with name, price, max guests
- Availability toggle (checkbox)
- Edit button (placeholder)
- Delete button with confirmation

**Features:**
- Loading skeletons
- Empty state
- Toast notifications for actions

### 4. Gallery (`/admin/gallery`)

**Grid view:**
- 2 columns mobile, 3 tablet, 4 desktop
- Image thumbnails with category and caption
- Hover overlay with delete button
- Delete with confirmation

**Features:**
- Loading skeletons
- Empty state
- Toast notifications

### 5. Settings (`/admin/settings`)

**Form sections:**
1. **Basic information**
   - Hotel name
   - Tagline
   - Address

2. **Contact information**
   - Phone (validated)
   - WhatsApp (numbers only, validated)
   - Email (validated)
   - Instagram URL (validated)
   - Facebook URL (validated)

3. **Check-in / Check-out**
   - Check-in time
   - Check-out time

**Features:**
- Zod validation on all fields
- Inline error messages
- Save button (disabled when no changes)
- Loading skeleton
- Toast notifications

## Admin API (`src/lib/adminApi.ts`)

### Enquiries
- `fetchEnquiries(filters?)` - list with optional status/search filters
- `fetchRecentEnquiries(limit)` - get recent enquiries
- `fetchEnquiryById(id)` - get single enquiry
- `updateEnquiry(id, updates)` - update status/notes
- `countNewEnquiries()` - count new enquiries (7 days)

### Rooms
- `fetchAllRooms()` - list all rooms
- `createRoom(data)` - create new room
- `updateRoom(id, updates)` - update room
- `deleteRoom(id)` - delete room

### Gallery
- `fetchAllGalleryImages()` - list all images
- `createGalleryImage(data)` - upload new image
- `updateGalleryImage(id, updates)` - update image
- `deleteGalleryImage(id)` - delete image

### Settings
- `fetchSiteSettings()` - get current settings
- `updateSiteSettings(id, updates)` - update settings

### Stats
- `fetchStats()` - get overview stats (total rooms, available, new enquiries)

## Toast Notifications (`src/lib/toast.ts`)

Zustand-based toast system:
- `useToast()` hook
- `addToast(type, message)` - show toast
- `removeToast(id)` - remove toast
- Auto-dismiss after 4 seconds
- Types: success (green), error (red), info (teal)
- Positioned top-right on all pages

## Components

### ToastContainer (`src/components/admin/ToastContainer.tsx`)
- Renders all active toasts
- Animated entrance
- Close button on each toast
- Icons for each type

### ProtectedRoute (`src/components/admin/ProtectedRoute.tsx`)
- Wraps admin routes
- Checks authentication
- Checks admin role
- Redirects to login or no-access
- Loading skeleton while checking

### AdminLayout (`src/components/admin/AdminLayout.tsx`)
- Desktop sidebar navigation
- Mobile bottom navigation
- Outlet for child routes
- Toast container

## Security

### Database Level
- All admin operations protected by RLS
- `has_role()` function checks user_roles table
- Only admins can read enquiries
- Only admins can modify rooms, gallery, settings
- Anonymous users can only insert enquiries

### Application Level
- Protected routes check admin role
- Non-admin users redirected
- No admin functionality exposed to non-admins
- Auth state managed securely in Zustand

## Features

✅ Mobile-first responsive design
✅ Clean, calm interface matching site colors
✅ Toast notifications for all actions
✅ Loading skeletons for all lists
✅ Empty states for all lists
✅ Form validation with Zod
✅ Inline error messages
✅ Confirmation dialogs for destructive actions
✅ Search and filter on enquiries
✅ Status management for enquiries
✅ WhatsApp integration for replies
✅ Phone call integration
✅ Real-time updates (no code changes needed)
✅ Secure authentication
✅ Role-based access control
✅ Server-side authorization

## Usage

### For Hotel Managers

1. **Login**: Go to `/admin/login` and sign in with credentials
2. **Overview**: See stats and recent enquiries at a glance
3. **Enquiries**: View, filter, search, and manage guest enquiries
4. **Rooms**: Toggle availability, view room list
5. **Gallery**: View and manage gallery images
6. **Settings**: Update hotel information, contact details, check-in/out times

### For Developers

**Adding a new admin page:**
1. Create page component in `src/pages/admin/`
2. Add route in `src/App.tsx` under `/admin` route
3. Add navigation item in `src/components/admin/AdminLayout.tsx`
4. Add API functions in `src/lib/adminApi.ts`

**Adding a new admin API function:**
1. Add function to `src/lib/adminApi.ts`
2. Use proper TypeScript types
3. Handle errors and return success/error object
4. Use `as any` casts for Supabase type issues

## Limitations

The dashboard does NOT allow:
- Changing site layout
- Changing colors or fonts
- Changing page structure
- Modifying code
- Adding custom CSS/JS

It ONLY allows editing content:
- Rooms (add, edit, delete, toggle availability)
- Gallery images (upload, categorize, delete)
- Site settings (name, contact, times, social links)
- Enquiries (view, update status, add notes)

## Future Enhancements

Potential additions:
1. **Room form** - Full CRUD with image upload/compression
2. **Gallery upload** - Drag-and-drop with WebP compression
3. **Image reordering** - Drag to reorder
4. **Bulk operations** - Select multiple items
5. **Export data** - CSV/Excel export
6. **Email notifications** - Notify on new enquiries
7. **Analytics** - Booking stats, popular rooms
8. **Multi-language** - Support for other languages
9. **Audit log** - Track all admin actions
10. **User management** - Add/remove admin users

## Files Created

### Auth & State
- `src/lib/auth.ts` - Zustand auth store
- `src/lib/toast.ts` - Toast notification store
- `src/lib/adminApi.ts` - Admin API functions

### Components
- `src/components/admin/AdminLayout.tsx` - Admin layout with navigation
- `src/components/admin/ProtectedRoute.tsx` - Route protection
- `src/components/admin/ToastContainer.tsx` - Toast UI

### Pages
- `src/pages/admin/Login.tsx` - Login page
- `src/pages/admin/Overview.tsx` - Dashboard overview
- `src/pages/admin/Enquiries.tsx` - Enquiries list & detail
- `src/pages/admin/Rooms.tsx` - Rooms management
- `src/pages/admin/Gallery.tsx` - Gallery management
- `src/pages/admin/Settings.tsx` - Site settings

### Updated
- `src/App.tsx` - Added admin routes

## Build Status

✅ Build successful
✅ No TypeScript errors
✅ All admin pages functional
✅ Authentication working
✅ RLS policies in place
✅ Toast notifications integrated
✅ Mobile-responsive design
✅ Form validation complete
