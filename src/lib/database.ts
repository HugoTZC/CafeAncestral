import { supabase } from './supabase';
import type { Category, Product, Offer, BlogPost, FeaturedItem, HeroBanner } from '@/types/database';

// Categories
export async function getCategories(): Promise<Category[]> {
    const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('order', { ascending: true });

    if (error) {
        console.error('Error fetching categories:', error);
        return [];
    }

    return data || [];
}

export async function createCategory(category: Omit<Category, 'id' | 'created_at'>): Promise<Category | null> {
    const { data, error } = await supabase
        .from('categories')
        .insert(category)
        .select()
        .single();

    if (error) {
        console.error('Error creating category:', error);
        throw error;
    }

    return data;
}

export async function updateCategory(id: string, updates: Partial<Category>): Promise<Category | null> {
    const { data, error } = await supabase
        .from('categories')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

    if (error) {
        console.error('Error updating category:', error);
        throw error;
    }

    return data;
}

export async function deleteCategory(id: string): Promise<void> {
    const { error } = await supabase
        .from('categories')
        .delete()
        .eq('id', id);

    if (error) {
        console.error('Error deleting category:', error);
        throw error;
    }
}

// Products
export async function getProducts(): Promise<Product[]> {
    const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching products:', error);
        return [];
    }

    return data || [];
}

export async function getProductsByCategory(categoryId: string): Promise<Product[]> {
    const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('category_id', categoryId)
        .eq('is_available', true);

    if (error) {
        console.error('Error fetching products by category:', error);
        return [];
    }

    return data || [];
}

export async function createProduct(product: Omit<Product, 'id' | 'created_at'>): Promise<Product | null> {
    const { data, error } = await supabase
        .from('products')
        .insert(product)
        .select()
        .single();

    if (error) {
        console.error('Error creating product:', error);
        throw error;
    }

    return data;
}

export async function updateProduct(id: string, updates: Partial<Product>): Promise<Product | null> {
    const { data, error } = await supabase
        .from('products')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

    if (error) {
        console.error('Error updating product:', error);
        throw error;
    }

    return data;
}

export async function deleteProduct(id: string): Promise<void> {
    const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

    if (error) {
        console.error('Error deleting product:', error);
        throw error;
    }
}

// Offers
export async function getActiveOffers(): Promise<Offer[]> {
    const now = new Date().toISOString();
    const { data, error } = await supabase
        .from('offers')
        .select('*')
        .eq('is_active', true)
        .lte('start_date', now)
        .gte('end_date', now);

    if (error) {
        console.error('Error fetching offers:', error);
        return [];
    }

    return data || [];
}

// Blog Posts
export async function getPublishedBlogPosts(limit?: number): Promise<BlogPost[]> {
    let query = supabase
        .from('blog_posts')
        .select('*')
        .eq('is_published', true)
        .order('published_at', { ascending: false });

    if (limit) {
        query = query.limit(limit);
    }

    const { data, error } = await query;

    if (error) {
        console.error('Error fetching blog posts:', error);
        return [];
    }

    return data || [];
}

export async function getBlogPostById(id: string): Promise<BlogPost | null> {
    const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        console.error('Error fetching blog post:', error);
        return null;
    }

    return data;
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
    const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('published_at', { ascending: false });

    if (error) {
        console.error('Error fetching all blog posts:', error);
        return [];
    }

    return data || [];
}

export async function createBlogPost(post: Omit<BlogPost, 'id' | 'created_at'>): Promise<BlogPost | null> {
    const { data, error } = await supabase
        .from('blog_posts')
        .insert(post)
        .select()
        .single();

    if (error) {
        console.error('Error creating blog post:', error);
        throw error;
    }

    return data;
}

export async function updateBlogPost(id: string, updates: Partial<BlogPost>): Promise<BlogPost | null> {
    const { data, error } = await supabase
        .from('blog_posts')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

    if (error) {
        console.error('Error updating blog post:', error);
        throw error;
    }

    return data;
}

export async function deleteBlogPost(id: string): Promise<void> {
    const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', id);

    if (error) {
        console.error('Error deleting blog post:', error);
        throw error;
    }
}

// Featured Items
export async function getFeaturedItems(): Promise<FeaturedItem[]> {
    const { data, error } = await supabase
        .from('featured_items')
        .select('*')
        .eq('is_active', true)
        .order('order', { ascending: true })
        .limit(3);

    if (error) {
        console.error('Error fetching featured items:', error);
        return [];
    }

    return data || [];
}

export async function getAllFeaturedItems(): Promise<FeaturedItem[]> {
    const { data, error } = await supabase
        .from('featured_items')
        .select('*')
        .order('order', { ascending: true });

    if (error) {
        console.error('Error fetching all featured items:', error);
        return [];
    }

    return data || [];
}

export async function createFeaturedItem(item: Omit<FeaturedItem, 'id' | 'created_at'>): Promise<FeaturedItem | null> {
    const { data, error } = await supabase
        .from('featured_items')
        .insert(item)
        .select()
        .single();

    if (error) {
        console.error('Error creating featured item:', error);
        throw error;
    }

    return data;
}

export async function updateFeaturedItem(id: string, updates: Partial<FeaturedItem>): Promise<FeaturedItem | null> {
    const { data, error } = await supabase
        .from('featured_items')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

    if (error) {
        console.error('Error updating featured item:', error);
        throw error;
    }

    return data;
}

export async function deleteFeaturedItem(id: string): Promise<void> {
    const { error } = await supabase
        .from('featured_items')
        .delete()
        .eq('id', id);

    if (error) {
        console.error('Error deleting featured item:', error);
        throw error;
    }
}

// Hero Banners
export async function getHeroBanners(): Promise<HeroBanner[]> {
    const { data, error } = await supabase
        .from('hero_banners')
        .select('*')
        .eq('is_active', true)
        .order('order', { ascending: true });

    if (error) {
        console.error('Error fetching hero banners:', error);
        return [];
    }

    return data || [];
}

export async function getAllHeroBanners(): Promise<HeroBanner[]> {
    const { data, error } = await supabase
        .from('hero_banners')
        .select('*')
        .order('order', { ascending: true });

    if (error) {
        console.error('Error fetching all hero banners:', error);
        return [];
    }

    return data || [];
}

export async function createHeroBanner(banner: Omit<HeroBanner, 'id' | 'created_at'>): Promise<HeroBanner | null> {
    const { data, error } = await supabase
        .from('hero_banners')
        .insert(banner)
        .select()
        .single();

    if (error) {
        console.error('Error creating hero banner:', error);
        throw error;
    }

    return data;
}

export async function updateHeroBanner(id: string, updates: Partial<HeroBanner>): Promise<HeroBanner | null> {
    const { data, error } = await supabase
        .from('hero_banners')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

    if (error) {
        console.error('Error updating hero banner:', error);
        throw error;
    }

    return data;
}

export async function deleteHeroBanner(id: string): Promise<void> {
    const { error } = await supabase
        .from('hero_banners')
        .delete()
        .eq('id', id);

    if (error) {
        console.error('Error deleting hero banner:', error);
        throw error;
    }
}
