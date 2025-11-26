export type Category = {
    id: string;
    name: string;
    slug: string;
    type: 'food' | 'drink';
    order: number;
    created_at: string;
};

export type Product = {
    id: string;
    category_id: string;
    name: string;
    description: string;
    price: number;
    image_url: string;
    ingredients?: string;
    allergens?: string;
    is_available: boolean;
    created_at: string;
};

export type Offer = {
    id: string;
    title: string;
    description: string;
    price: number;
    image_url: string;
    is_active: boolean;
    start_date: string;
    end_date: string;
    created_at: string;
};

export type BlogPost = {
    id: string;
    title: string;
    excerpt: string;
    content: string;
    image_url: string;
    published_at: string;
    is_published: boolean;
    created_at: string;
};

export type FeaturedItem = {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    image_url: string;
    link_url: string;
    order: number;
    is_active: boolean;
    created_at: string;
};

export type HeroBanner = {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    image_url: string;
    cta_text: string;
    link_url: string;
    order: number;
    is_active: boolean;
    created_at: string;
};
