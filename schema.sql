-- Create Categories Table
CREATE TABLE categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  type TEXT NOT NULL CHECK (type IN ('food', 'drink')),
  "order" INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create Products Table
CREATE TABLE products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  image_url TEXT,
  ingredients TEXT,
  allergens TEXT,
  is_available BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create Offers Table
CREATE TABLE offers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  image_url TEXT,
  is_active BOOLEAN DEFAULT true,
  start_date TIMESTAMP WITH TIME ZONE,
  end_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create Blog Posts Table
CREATE TABLE blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT,
  image_url TEXT,
  published_at TIMESTAMP WITH TIME ZONE,
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create Featured Items Table (for homepage discover section, max 3 items)
CREATE TABLE featured_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  subtitle TEXT,
  description TEXT,
  image_url TEXT,
  link_url TEXT NOT NULL,
  "order" INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create Hero Banners Table (for homepage carousel)
CREATE TABLE hero_banners (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  subtitle TEXT,
  description TEXT,
  image_url TEXT,
  cta_text TEXT NOT NULL,
  link_url TEXT NOT NULL,
  "order" INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create Admin Users Table (to track admin roles)
CREATE TABLE admin_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE offers ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE featured_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE hero_banners ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Public Read Policies
CREATE POLICY "Public categories are viewable by everyone" ON categories FOR SELECT USING (true);
CREATE POLICY "Public products are viewable by everyone" ON products FOR SELECT USING (true);
CREATE POLICY "Public offers are viewable by everyone" ON offers FOR SELECT USING (true);
CREATE POLICY "Public blog_posts are viewable by everyone" ON blog_posts FOR SELECT USING (is_published = true);
CREATE POLICY "Public featured_items are viewable by everyone" ON featured_items FOR SELECT USING (is_active = true);
CREATE POLICY "Public hero_banners are viewable by everyone" ON hero_banners FOR SELECT USING (is_active = true);

-- Admin Write Policies (only authenticated admins can modify)
CREATE POLICY "Admins can insert categories" ON categories FOR INSERT 
  WITH CHECK (auth.uid() IN (SELECT user_id FROM admin_users));

CREATE POLICY "Admins can update categories" ON categories FOR UPDATE 
  USING (auth.uid() IN (SELECT user_id FROM admin_users));

CREATE POLICY "Admins can delete categories" ON categories FOR DELETE 
  USING (auth.uid() IN (SELECT user_id FROM admin_users));

CREATE POLICY "Admins can insert products" ON products FOR INSERT 
  WITH CHECK (auth.uid() IN (SELECT user_id FROM admin_users));

CREATE POLICY "Admins can update products" ON products FOR UPDATE 
  USING (auth.uid() IN (SELECT user_id FROM admin_users));

CREATE POLICY "Admins can delete products" ON products FOR DELETE 
  USING (auth.uid() IN (SELECT user_id FROM admin_users));

CREATE POLICY "Admins can insert offers" ON offers FOR INSERT 
  WITH CHECK (auth.uid() IN (SELECT user_id FROM admin_users));

CREATE POLICY "Admins can update offers" ON offers FOR UPDATE 
  USING (auth.uid() IN (SELECT user_id FROM admin_users));

CREATE POLICY "Admins can delete offers" ON offers FOR DELETE 
  USING (auth.uid() IN (SELECT user_id FROM admin_users));

CREATE POLICY "Admins can insert blog_posts" ON blog_posts FOR INSERT 
  WITH CHECK (auth.uid() IN (SELECT user_id FROM admin_users));

CREATE POLICY "Admins can update blog_posts" ON blog_posts FOR UPDATE 
  USING (auth.uid() IN (SELECT user_id FROM admin_users));

CREATE POLICY "Admins can delete blog_posts" ON blog_posts FOR DELETE 
  USING (auth.uid() IN (SELECT user_id FROM admin_users));

CREATE POLICY "Admins can view all blog_posts" ON blog_posts FOR SELECT 
  USING (auth.uid() IN (SELECT user_id FROM admin_users) OR is_published = true);

CREATE POLICY "Admins can insert featured_items" ON featured_items FOR INSERT 
  WITH CHECK (auth.uid() IN (SELECT user_id FROM admin_users));

CREATE POLICY "Admins can update featured_items" ON featured_items FOR UPDATE 
  USING (auth.uid() IN (SELECT user_id FROM admin_users));

CREATE POLICY "Admins can delete featured_items" ON featured_items FOR DELETE 
  USING (auth.uid() IN (SELECT user_id FROM admin_users));

CREATE POLICY "Admins can view all featured_items" ON featured_items FOR SELECT 
  USING (auth.uid() IN (SELECT user_id FROM admin_users) OR is_active = true);

CREATE POLICY "Admins can insert hero_banners" ON hero_banners FOR INSERT 
  WITH CHECK (auth.uid() IN (SELECT user_id FROM admin_users));

CREATE POLICY "Admins can update hero_banners" ON hero_banners FOR UPDATE 
  USING (auth.uid() IN (SELECT user_id FROM admin_users));

CREATE POLICY "Admins can delete hero_banners" ON hero_banners FOR DELETE 
  USING (auth.uid() IN (SELECT user_id FROM admin_users));

CREATE POLICY "Admins can view all hero_banners" ON hero_banners FOR SELECT 
  USING (auth.uid() IN (SELECT user_id FROM admin_users) OR is_active = true);

-- Authenticated users can check if they are admins (needed to verify admin status)
CREATE POLICY "Authenticated users can view admin_users" ON admin_users FOR SELECT 
  USING (auth.uid() IS NOT NULL);

-- Insert Mock Data (Optional)
INSERT INTO categories (name, slug, type, "order") VALUES
('Café Caliente', 'cafe-caliente', 'drink', 1),
('Bebidas Frías', 'bebidas-frias', 'drink', 2),
('Pizzas', 'pizzas', 'food', 3),
('Postres', 'postres', 'food', 4);

-- IMPORTANT: After running this schema, create an admin user via Supabase Auth UI
-- Then run this query to make them an admin (replace the email):
-- INSERT INTO admin_users (user_id, email) 
-- SELECT id, email FROM auth.users WHERE email = 'admin@cafeancestral.com';
