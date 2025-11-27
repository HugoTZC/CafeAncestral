"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getCurrentUser, signOut, checkAdminStatus } from "@/lib/auth";
import { getAllHeroBanners, deleteHeroBanner } from "@/lib/database";
import type { HeroBanner } from "@/types/database";
import { LogOut, Plus, Edit, Trash2, Loader2, Image as ImageIcon } from 'lucide-react';

export default function HeroBannersPage() {
    const [loading, setLoading] = useState(true);
    const [banners, setBanners] = useState<HeroBanner[]>([]);
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
        const data = await getAllHeroBanners();
        setBanners(data);
    }

    const handleSignOut = async () => {
        await signOut();
        router.push('/admin');
    };

    const handleDelete = async (id: string) => {
        if (!confirm('¿Estás seguro de eliminar este banner?')) return;

        try {
            await deleteHeroBanner(id);
            await loadData();
        } catch (error) {
            alert('Error al eliminar el banner');
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
                            <ImageIcon className="w-6 h-6 text-olive-700" />
                            <h1 className="font-serif text-xl font-bold text-olive-900">Hero Banners</h1>
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
                        <h2 className="text-2xl font-serif font-bold text-olive-900">Carrusel Principal</h2>
                        <p className="text-olive-800/60">Gestiona los banners del hero carousel</p>
                    </div>
                    <Link
                        href="/admin/hero-banners/new"
                        className="bg-olive-700 text-sepia-50 px-6 py-3 rounded-lg font-bold flex items-center gap-2 hover:bg-olive-800 transition-all shadow-md hover:shadow-lg"
                    >
                        <Plus className="w-5 h-5" />
                        Nuevo Banner
                    </Link>
                </div>

                {banners.length === 0 ? (
                    <div className="bg-white rounded-2xl p-12 text-center border border-sepia-200">
                        <ImageIcon className="w-16 h-16 text-olive-300 mx-auto mb-4" />
                        <h3 className="text-xl font-serif font-bold text-olive-900 mb-2">No hay banners</h3>
                        <p className="text-olive-800/60 mb-6">Crea tu primer banner para el carousel principal</p>
                        <Link
                            href="/admin/hero-banners/new"
                            className="inline-flex items-center gap-2 bg-olive-700 text-sepia-50 px-6 py-3 rounded-lg font-bold hover:bg-olive-800 transition-all"
                        >
                            <Plus className="w-5 h-5" />
                            Crear Banner
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {banners.map((banner) => (
                            <div key={banner.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-sepia-200 hover:shadow-lg transition-all">
                                <div className="relative h-48 bg-gradient-to-br from-olive-900 to-olive-700">
                                    {banner.image_url && (
                                        <img
                                            src={banner.image_url}
                                            alt={banner.title}
                                            className="w-full h-full object-cover opacity-70"
                                        />
                                    )}
                                    <div className="absolute top-4 right-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${banner.is_active
                                                ? 'bg-green-100 text-green-700'
                                                : 'bg-gray-100 text-gray-700'
                                            }`}>
                                            {banner.is_active ? 'Activo' : 'Inactivo'}
                                        </span>
                                    </div>
                                </div>

                                <div className="p-6">
                                    {banner.subtitle && (
                                        <p className="text-xs text-olive-600 font-bold tracking-widest uppercase mb-2">{banner.subtitle}</p>
                                    )}
                                    <h3 className="text-xl font-serif font-bold text-olive-900 mb-2">{banner.title}</h3>
                                    {banner.description && (
                                        <p className="text-sm text-olive-800/60 mb-4 line-clamp-2">{banner.description}</p>
                                    )}
                                    <div className="flex items-center gap-2 text-sm text-olive-600 mb-4">
                                        <span className="font-medium">CTA:</span>
                                        <span>{banner.cta_text}</span>
                                    </div>

                                    <div className="flex gap-2 pt-4 border-t border-sepia-100">
                                        <Link
                                            href={`/admin/hero-banners/${banner.id}`}
                                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 text-olive-600 hover:bg-olive-100 rounded-lg transition-colors font-medium"
                                        >
                                            <Edit className="w-4 h-4" />
                                            Editar
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(banner.id)}
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
