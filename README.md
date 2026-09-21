# The Calabash Hotel - Website

A modern, mobile-first hotel website built with React, TypeScript, Tailwind CSS, and Supabase.

## Features

- **Multi-page website** with responsive design (390px mobile to 1280px desktop)
- **Room browsing** with filters, sorting, and detailed room pages
- **Enquiry system** with form validation and WhatsApp integration
- **Gallery** with masonry grid and lightbox
- **Contact page** with form validation and FAQ accordion
- **Supabase backend** for database, authentication, and storage
- **Type-safe** with TypeScript and Zod validation

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui-style components
- **Backend**: Supabase (PostgreSQL, Auth, Storage)
- **Forms**: React Hook Form + Zod
- **Routing**: React Router v6
- **Icons**: Lucide React

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to Project Settings > API and copy your:
   - Project URL
   - Anon/Public key

### 3. Configure Environment Variables

Create a `.env` file in the root directory:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### 4. Run Database Migrations

1. Go to your Supabase project dashboard
2. Navigate to SQL Editor
3. Run the migrations in order:
   - `supabase/migrations/001_initial_schema.sql`
   - `supabase/migrations/002_seed_data.sql`

These migrations will:
- Create all necessary tables (rooms, gallery_images, enquiries, contact_messages, site_settings, user_roles)
- Set up Row Level Security (RLS) policies
- Create indexes for performance
- Seed sample data

### 5. Create Storage Bucket

1. Go to Storage in your Supabase dashboard
2. Create a new public bucket named `hotel-images`
3. Set the following policies:
   - **Public read**: Allow anyone to read files
   - **Admin write**: Only authenticated users with admin role can upload

### 6. Set Up Admin User (Optional)

To create an admin user:

1. Create a user in Supabase Auth
2. Run this SQL in the SQL Editor:

```sql
INSERT INTO user_roles (user_id, role)
VALUES ('your-user-uuid-here', 'admin');
```

### 7. Run Development Server

```bash
npm run dev
```

The site will be available at `http://localhost:3000`

### 8. Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## Database Schema

### Tables

- **rooms**: Hotel room information with pricing and amenities
- **gallery_images**: Gallery photos with categories
- **enquiries**: Room booking enquiries from guests
- **contact_messages**: General contact form submissions
- **site_settings**: Single-row table for site configuration
- **user_roles**: Admin role assignments

### Security

All tables have Row Level Security (RLS) enabled:
- Public tables (rooms, gallery_images, site_settings): Anyone can read, only admins can write
- Enquiries/contact_messages: Anyone can insert, only admins can read/update/delete
- User roles: Only admins can manage

## Project Structure

```
src/
├── components/
│   ├── home/          # Home page sections
│   ├── layout/        # Header, Footer, Layout
│   ├── rooms/         # Room-related components
│   └── ui/            # Reusable UI components
├── data/              # Static data files (fallback)
├── lib/               # Utilities, API, Supabase client
├── pages/             # Page components
└── styles/            # Global styles and animations
```

## Key Features

### Enquiry System

The enquiry dialog can be opened from:
- Header "Book now" button
- Hero enquiry bar
- Room card "Enquire" buttons
- Room detail page sticky bar

Features:
- Form validation with Zod
- Nigerian phone number validation
- Date validation (no past dates, check-out after check-in)
- Honeypot field for bot protection
- Double submission prevention
- Success state with WhatsApp redirect
- Graceful fallback if database fails

### Responsive Design

- Mobile-first approach (390px base)
- Hamburger menu on mobile
- Sticky bottom bar on room detail pages (mobile)
- Collapsible filters on rooms page (mobile)
- Touch-friendly lightbox with swipe support

### Performance

- Lazy loading for images
- Skeleton loading states
- Optimistic UI updates
- Minimal animations (respects prefers-reduced-motion)

## Customization

### Update Hotel Information

Edit `src/data/site.ts` to change:
- Hotel name, tagline, contact details
- Address, phone, email, WhatsApp
- Social media links
- Check-in/check-out times

### Update Room Data

Edit `src/data/rooms.ts` or update the database directly via Supabase dashboard.

### Update Gallery

Edit `src/data/gallery.ts` or upload images to Supabase Storage and update the database.

## Deployment

### Vercel

1. Connect your GitHub repository
2. Add environment variables in Vercel dashboard
3. Deploy

### Netlify

1. Connect your GitHub repository
2. Add environment variables in Netlify dashboard
3. Deploy

### Manual

```bash
npm run build
# Upload dist/ folder to your hosting provider
```

## Troubleshooting

### Build Errors

If you see TypeScript errors about missing environment variables, make sure you created the `.env` file with the correct Supabase credentials.

### Database Connection Issues

1. Verify your Supabase URL and anon key in `.env`
2. Check that migrations have been run successfully
3. Verify RLS policies are enabled on all tables

### Images Not Loading

1. Check that image URLs are accessible
2. If using Supabase Storage, verify bucket permissions
3. Clear browser cache and reload

## License

This project is proprietary software created for The Calabash Hotel.

## Support

For technical support, contact Vector Codes at [your-contact-info].
