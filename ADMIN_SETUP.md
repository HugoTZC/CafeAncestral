# Admin User Setup Guide

## Step 1: Enable Email Auth in Supabase

1. Go to your Supabase project dashboard
2. Navigate to **Authentication** → **Providers**
3. Enable **Email** provider
4. (Optional) Disable email confirmation for testing: **Authentication** → **Settings** → Disable "Enable email confirmations"

## Step 2: Create Admin User

### Option A: Via Supabase Dashboard (Recommended)
1. Go to **Authentication** → **Users**
2. Click **Add user** → **Create new user**
3. Enter:
   - Email: `admin@cafeancestral.com`
   - Password: `Admin123!` (or your preferred password)
   - Auto Confirm User: **Yes**
4. Click **Create user**

### Option B: Via SQL
```sql
-- This will be the user's ID after creation
-- You'll need to get it from the auth.users table
```

## Step 3: Grant Admin Access

After creating the user, run this SQL in the Supabase SQL Editor:

```sql
-- Replace 'admin@cafeancestral.com' with your admin email
INSERT INTO admin_users (user_id, email) 
SELECT id, email FROM auth.users WHERE email = 'admin@cafeancestral.com';
```

## Step 4: Test Login

1. Go to `http://localhost:3000/admin`
2. Login with:
   - Email: `admin@cafeancestral.com`
   - Password: `Admin123!` (or whatever you set)
3. You should be redirected to `/admin/dashboard`

## Troubleshooting

### "Invalid login credentials"
- Check that the user exists in **Authentication** → **Users**
- Verify the password is correct
- Make sure email confirmation is disabled (for testing)

### "Access denied" after login
- Verify the user is in the `admin_users` table:
  ```sql
  SELECT * FROM admin_users;
  ```
- If not, run the INSERT query from Step 3

### Can't access dashboard
- Check browser console for errors
- Verify Supabase credentials in `.env.local`
