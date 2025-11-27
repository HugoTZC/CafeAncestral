"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getCurrentUser, signOut, checkAdminStatus } from "@/lib/auth";
import { getAllFeaturedItems, deleteFeaturedItem } from "@/lib/database";
import type { FeaturedItem } from "@/types/database";
import { LogOut, Plus, Edit, Trash2, Loader2, Star } from 'lucide-react';

export default function FeaturedItemsPage() {
    const [loading, setLoading] = useState(true);
    const [items, setItems] = useState<FeaturedItem[]>([]);
    const router = useRouter();

    useEffect(() => {
        async function init() {
            try {
                const currentUser = await getCurrentUser();
                if (!currentUser || !(await checkAdminStatus())) {
                    router.push('/admin');
                    return;
                }

                await loadData();
            } catch (error) {
                router.push('/admin');
            } finally {
                setLoading(false);
            }
        }

        init();
    }, [router]);

    async function loadData() {
        const data = await getAllFeaturedItems();
        setItems(data);
    }

    const handleSignOut = async () => {
        await signOut();
        router.push('/admin');
    };

    const handleDelete = async (id: string) => {
        if (!confirm('¿Estás seguro de eliminar este item destacado?')) return;

        try {
            await deleteFeaturedItem(id);
            await loadData();
        } catch (error) {
            alert('Error al eliminar el item');
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-sepia-50/50 flex items-center justify-center">
                <Loader2 className="w-12 h-12 text-olive-700 animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-sepia-50/50">
            <header className="bg-white border-b border-sepia-200 sticky top-0 z-50 shadow-sm">
                <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <Link href="/admin/dashboard" className="text-olive-600 hover:text-olive-800">
                            ← Dashboard
                        </Link>
                        <div className="flex items-center gap-3">
                            <Star className="w-6 h-6 text-olive-700" />
                            <h1 className="font-serif text-xl font-bold text-olive-900">Items Destacados</h1>
                        </div>
                    </div>
                    <button
                        onClick={handleSignOut}
                        className="flex items-center gap-2 text-olive-700 hover:text-olive-900 transition-colors font-medium"
                    >
                        <LogOut className="w-5 h-5" />
                        Cerrar Sesión
                    </button>
                </div>
            </header>

            <main className="container mx-auto px-6 py-8">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h2 className="text-2xl font-serif font-bold text-olive-900">Sección Descubre</h2>
                        <p className="text-olive-800/60">Máximo 3 items destacados en la página principal</p>
                    </div>
                    {items.length < 3 && (
                        <Link
                            href="/admin/featured-items/new"
                            className="bg-olive-700 text-sepia-50 px-6 py-3 rounded-lg font-bold flex items-center gap-2 hover:bg-olive-800 transition-all shadow-md hover:shadow-lg"
                        >
                            <Plus className="w-5 h-5" />
                            Nuevo Item
                        </Link>
                    )}
                </div>

                {items.length >= 3 && (
                    <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <p className="text-sm text-blue-800">
                            <strong>Límite alcanzado:</strong> Ya tienes 3 items destacados (máximo permitido). Elimina uno para agregar otro.
                        </p>
                    </div>
                )}

                {items.length === 0 ? (
                    <div className="bg-white rounded-2xl p-12 text-center border border-sepia-200">
                        <Star className="w-16 h-16 text-olive-300 mx-auto mb-4" />
                        <h3 className="text-xl font-serif font-bold text-olive-900 mb-2">No hay items destacados</h3>
                        <p className="text-olive-800/60 mb-6">Crea hasta 3 items para la sección "Descubre"</p>
                        <Link
                            href="/admin/featured-items/new"
                            className="inline-flex items-center gap-2 bg-olive-700 text-sepia-50 px-6 py-3 rounded-lg font-bold hover:bg-olive-800 transition-all"
                        >
                            <Plus className="w-5 h-5" />
                            Crear Item
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {items.map((item) => (
                            <div key={item.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-sepia-200 hover:shadow-lg transition-all">
                                <div className="relative h-48 bg-gradient-to-br from-sepia-400 to-sepia-600">
                                    {item.image_url && (
                                        <img
                                            src={item.image_url}
                                            alt={item.title}
                                            className="w-full h-full object-cover"
                                        />
                                    )}
                                    <div className="absolute top-4 right-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${item.is_active
                                                ? 'bg-green-100 text-green-700'
                                                : 'bg-gray-100 text-gray-700'
                                            }`}>
                                            {item.is_active ? 'Activo' : 'Inactivo'}
                                        </span>
                                    </div>
                                </div>

                                <div className="p-6">
                                    {item.subtitle && (
                                        <p className="text-xs text-olive-600 font-bold tracking-widest uppercase mb-2">{item.subtitle}</p>
                                    )}
                                    <h3 className="text-xl font-serif font-bold text-olive-900 mb-2">{item.title}</h3>
                                    {item.description && (
                                        <p className="text-sm text-olive-800/60 mb-4 line-clamp-2">{item.description}</p>
                                    )}

                                    <div className="flex gap-2 pt-4 border-t border-sepia-100">
                                        <Link
                                            href={`/admin/featured-items/${item.id}`}
                                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 text-olive-600 hover:bg-olive-100 rounded-lg transition-colors font-medium"
                                        >
                                            <Edit className="w-4 h-4" />
                                            Editar
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(item.id)}
                                            className="flex items-center justify-center gap-2 px-4 py-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors font-medium"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                            Eliminar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}
