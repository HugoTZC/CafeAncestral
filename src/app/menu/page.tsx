"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { getCategories, getProducts, getActiveOffers } from "@/lib/database";
import type { Category, Product, Offer } from "@/types/database";
import { useCartStore } from "@/store/cart";
import { useToastStore } from "@/store/toast";
import { ToastContainer } from "@/components/ui/Toast";
import { Plus, Sparkles } from 'lucide-react';
import { clsx } from 'clsx';

export default function MenuPage() {
    const [activeCategory, setActiveCategory] = useState<string>('all');
    const [categories, setCategories] = useState<Category[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [offers, setOffers] = useState<Offer[]>([]);
    const [loading, setLoading] = useState(true);
    const addItem = useCartStore((state) => state.addItem);
    const { toasts, addToast, removeToast } = useToastStore();

    const handleAddToCart = (product: Product) => {
        addItem(product as any);
        addToast(`${product.name} agregado al carrito`, 'success');
    };

    useEffect(() => {
        async function loadData() {
            setLoading(true);
            const [categoriesData, productsData, offersData] = await Promise.all([
                getCategories(),
                getProducts(),
                getActiveOffers()
            ]);

            setCategories(categoriesData);
            setProducts(productsData);
            setOffers(offersData);
            setLoading(false);
        }

        loadData();
    }, []);

    const filteredProducts = activeCategory === 'all'
        ? products
        : products.filter(p => {
            const category = categories.find(c => c.id === p.category_id);
            return category?.slug === activeCategory;
        });

    const allCategories = [
        { id: 'all', name: 'Todos', slug: 'all' },
        ...categories
    ];

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col bg-sepia-50/50">
                <Header />
                <main className="flex-1 container mx-auto px-6 py-12 flex items-center justify-center">
                    <div className="text-center">
                        <div className="w-16 h-16 border-4 border-olive-200 border-t-olive-700 rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-olive-800/60">Cargando menú...</p>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col bg-sepia-50/50">
            <Header />
            <ToastContainer toasts={toasts} onClose={removeToast} />

            <main className="flex-1 container mx-auto px-6 py-12">
                <div className="text-center mb-12">
                    <span className="text-olive-600 font-bold tracking-widest text-sm uppercase mb-2 block">Nuestra Carta</span>
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-olive-900">
                        Menú Artesanal
                    </h1>
                </div>

                {/* Offers Section */}
                {offers.length > 0 && (
                    <div className="mb-16">
                        <div className="flex items-center gap-2 mb-6">
                            <Sparkles className="w-6 h-6 text-sepia-500" />
                            <h2 className="text-2xl font-serif font-bold text-olive-900">Ofertas Especiales</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {offers.map((offer) => (
                                <div key={offer.id} className="relative bg-gradient-to-br from-sepia-400 to-sepia-600 rounded-2xl overflow-hidden shadow-lg border-2 border-sepia-500">
                                    <div className="absolute top-4 right-4 bg-white text-olive-900 px-3 py-1 rounded-full text-sm font-bold shadow-md">
                                        OFERTA
                                    </div>
                                    <div className="relative h-48">
                                        <Image
                                            src={offer.image_url || 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=2070&auto=format&fit=crop'}
                                            alt={offer.title}
                                            fill
                                            className="object-cover opacity-90"
                                        />
                                    </div>
                                    <div className="p-6 text-white">
                                        <h3 className="text-xl font-serif font-bold mb-2">{offer.title}</h3>
                                        <p className="text-sepia-100 text-sm mb-4">{offer.description}</p>
                                        <div className="flex justify-between items-center">
                                            <span className="text-3xl font-bold">${offer.price}</span>
                                            <button className="bg-white text-olive-900 px-4 py-2 rounded-full font-bold text-sm hover:bg-sepia-50 transition-colors">
                                                Ordenar
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Categories Filter - Modern Pills */}
                <div className="flex flex-wrap justify-center gap-3 mb-16">
                    {allCategories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => setActiveCategory(category.slug)}
                            className={clsx(
                                "px-6 py-2.5 rounded-full font-sans font-bold text-sm tracking-wide transition-all duration-300 border",
                                activeCategory === category.slug
                                    ? "bg-olive-700 text-sepia-50 border-olive-700 shadow-lg transform scale-105"
                                    : "bg-white text-olive-800 border-sepia-200 hover:border-olive-400 hover:text-olive-600"
                            )}
                        >
                            {category.name}
                        </button>
                    ))}
                </div>

                {/* Products Grid */}
                {filteredProducts.length === 0 ? (
                    <div className="text-center py-16">
                        <p className="text-olive-800/60 text-lg">No hay productos disponibles en esta categoría.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredProducts.map((product) => (
                            <div key={product.id} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-sepia-100 flex flex-col">
                                <div className="relative h-64 overflow-hidden">
                                    <Image
                                        src={product.image_url || 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=2070&auto=format&fit=crop'}
                                        alt={product.name}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    {!product.is_available && (
                                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center backdrop-blur-sm">
                                            <span className="text-white font-bold text-lg tracking-widest uppercase border-2 border-white px-4 py-2">Agotado</span>
                                        </div>
                                    )}
                                    {product.allergens && (
                                        <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                                            Alérgenos
                                        </div>
                                    )}
                                    {/* Overlay gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                </div>

                                <div className="p-6 flex-1 flex flex-col">
                                    <div className="flex justify-between items-start mb-3">
                                        <h3 className="text-xl font-serif font-bold text-olive-900 group-hover:text-olive-700 transition-colors">{product.name}</h3>
                                        <span className="text-lg font-bold text-olive-600 bg-sepia-50 px-3 py-1 rounded-full">${product.price}</span>
                                    </div>

                                    <p className="text-olive-800/60 text-sm mb-4 line-clamp-2 flex-1 leading-relaxed">
                                        {product.description}
                                    </p>

                                    {product.ingredients && (
                                        <p className="text-xs text-olive-800/40 mb-4 italic">
                                            {product.ingredients}
                                        </p>
                                    )}

                                    <div className="flex justify-between items-center pt-4 border-t border-sepia-100">
                                        {product.allergens ? (
                                            <span className="text-xs text-amber-700 font-medium bg-amber-50 px-2 py-1 rounded-md border border-amber-100 max-w-[50%] leading-tight">
                                                Puede contener: {product.allergens}
                                            </span>
                                        ) : (
                                            <span />
                                        )}

                                        <button
                                            onClick={() => handleAddToCart(product)}
                                            disabled={!product.is_available}
                                            className="bg-olive-700 text-sepia-50 px-6 py-2.5 rounded-full font-bold text-sm flex items-center gap-2 hover:bg-olive-800 transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none transform active:scale-95"
                                        >
                                            <Plus className="w-4 h-4" />
                                            AGREGAR
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
}
