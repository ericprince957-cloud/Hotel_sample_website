# Supabase Setup Guide

This guide walks you through setting up Supabase for The Calabash Hotel website.

## Step 1: Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign in
2. Click "New Project"
3. Fill in:
   - **Name**: The Calabash Hotel (or your preferred name)
   - **Database Password**: Choose a strong password (save it!)
   - **Region**: Choose the closest region to your users
   - **Pricing Plan**: Free tier is fine to start
4. Click "Create new project"
5. Wait for the project to be provisioned (about 2 minutes)

## Step 2: Get Your API Keys

1. In your Supabase dashboard, go to **Project Settings** > **API**
2. Copy these values:
   - **Project URL** (e.g., `https://abcdefghijk.supabase.co`)
   - **anon public key** (starts with `eyJ...`)

## Step 3: Configure Environment Variables

Create a file named `.env` in the root of your project:

```env
VITE_SUPABASE_URL=https://abcdefghijk.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

Replace the values with your actual Project URL and anon key.

## Step 4: Run Database Migrations

### Option A: Using Supabase SQL Editor (Recommended)

1. In your Supabase dashboard, go to **SQL Editor** (left sidebar)
2. Click "New query"
3. Copy the contents of `supabase/migrations/001_initial_schema.sql`
4. Paste it into the SQL Editor
5. Click "Run" (or press Ctrl+Enter)
6. Wait for it to complete (should take a few seconds)
7. Repeat steps 2-6 for `supabase/migrations/002_seed_data.sql`

### Option B: Using Supabase CLI (Advanced)

If you have the Supabase CLI installed:

```bash
supabase link --project-ref your-project-ref
supabase db push
```

## Step 5: Verify Tables Were Created

1. Go to **Table Editor** in the left sidebar
2. You should see these tables:
   - `rooms`
   - `gallery_images`
   - `enquiries`
   - `contact_messages`
   - `site_settings`
   - `user_roles`
3. Click on `rooms` to verify it has 4 rows (Standard, Deluxe, Executive, Suite)

## Step 6: Create Storage Bucket

1. Go to **Storage** in the left sidebar
2. Click "New bucket"
3. Name it: `hotel-images`
4. Toggle **Public bucket** to ON
5. Click "Create bucket"

### Set Storage Policies

1. Click on the `hotel-images` bucket
2. Go to the **Policies** tab
3. Click "New policy" > "For full customization"
4. Create these policies:

#### Policy 1: Allow public read
- **Policy name**: Public read access
- **Allowed operation**: SELECT
- **Target roles**: `anon`
- **Policy definition for SELECT**:
  ```sql
  true
  ```

#### Policy 2: Allow admin uploads (optional, for future use)
- **Policy name**: Admin write access
- **Allowed operation**: INSERT
- **Target roles**: `authenticated`
- **Policy definition for INSERT**:
  ```sql
  EXISTS (
    SELECT 1 FROM user_roles
    WHERE user_id = auth.uid() AND role = 'admin'
  )
  ```

5. Click "Save" for each policy

## Step 7: Test the Connection

1. Start your development server: `npm run dev`
2. Open the site in your browser
3. Check the browser console for any errors
4. Try submitting the contact form
5. Go back to Supabase > Table Editor > `contact_messages`
6. You should see your test message there

## Step 8: Create an Admin User (Optional)

If you want to build the admin dashboard later:

1. Go to **Authentication** > **Users**
2. Click "Add user" > "Create new user"
3. Fill in email and password
4. Copy the **UID** (UUID) from the user list
5. Go to **SQL Editor** and run:

```sql
INSERT INTO user_roles (user_id, role)
VALUES ('paste-the-uid-here', 'admin');
```

## Troubleshooting

### "Missing Supabase environment variables"

- Make sure you created the `.env` file
- Verify the variable names are exactly `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`
- Restart your dev server after creating `.env`

### "relation does not exist"

- The migrations haven't been run yet
- Go back to Step 4 and run the SQL files

### "new row violates row-level security policy"

- RLS is working correctly
- Make sure you're using the anon key (not the service_role key)
- Check that the policies were created correctly

### Tables are empty

- The seed migration didn't run
- Run `supabase/migrations/002_seed_data.sql` again

### Can't upload images to storage

- Check that the bucket is set to public
- Verify the storage policies allow uploads
- For now, the site uses external image URLs (Unsplash), so this isn't critical

## Next Steps

Once Supabase is set up:

1. ✅ Test the enquiry form
2. ✅ Test the contact form
3. ✅ Verify data appears in Supabase Table Editor
4. 🔄 (Optional) Build the admin dashboard
5. 🔄 (Optional) Set up email notifications for new enquiries
6. 🔄 (Optional) Add image upload functionality

## Security Notes

- **Never commit `.env` to Git** - it's already in `.gitignore`
- **Never use the service_role key** in the frontend - it bypasses all security
- **RLS is enabled** on all tables - this protects your data even if someone gets the anon key
- **Admin role** is stored in the database, not in client-side storage
- **Honeypot field** is included in forms to block bots

## Support

If you run into issues:
1. Check the Supabase logs: Dashboard > Logs
2. Check browser console for frontend errors
3. Verify all environment variables are set correctly
4. Make sure migrations ran successfully
