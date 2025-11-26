

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
};

export type Category = {
    id: string;
    name: string;
    slug: string;
    type: 'food' | 'drink';
};

// Mock data for development when Supabase is not connected or empty
export const MOCK_CATEGORIES: Category[] = [
    { id: '1', name: 'Café Caliente', slug: 'cafe-caliente', type: 'drink' },
    { id: '2', name: 'Bebidas Frías', slug: 'bebidas-frias', type: 'drink' },
    { id: '3', name: 'Pizzas', slug: 'pizzas', type: 'food' },
    { id: '4', name: 'Entremeses', slug: 'entremeses', type: 'food' },
    { id: '5', name: 'Postres', slug: 'postres', type: 'food' },
];

export const MOCK_PRODUCTS: Product[] = [
    {
        id: '1',
        category_id: '1',
        name: 'Espresso Doble',
        description: 'Intenso y aromático, la base de todo buen café.',
        price: 45,
        image_url: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?q=80&w=2070&auto=format&fit=crop',
        is_available: true,
    },
    {
        id: '2',
        category_id: '3',
        name: 'Pizza Margarita',
        description: 'Clásica italiana con salsa de tomate casera, mozzarella fresca y albahaca.',
        price: 180,
        image_url: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?q=80&w=2069&auto=format&fit=crop',
        is_available: true,
    },
    {
        id: '3',
        category_id: '2',
        name: 'Cold Brew',
        description: 'Macerado en frío por 18 horas, suave y refrescante.',
        price: 65,
        image_url: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?q=80&w=1887&auto=format&fit=crop',
        is_available: true,
    },
];
