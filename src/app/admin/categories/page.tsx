"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getCurrentUser, signOut, checkAdminStatus } from "@/lib/auth";
import { getCategories, deleteCategory } from "@/lib/database";
import type { Category } from "@/types/database";
import { LogOut, Plus, Edit, Trash2, Loader2, FolderTree } from 'lucide-react';

export default function CategoriesPage() {
    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState<Category[]>([]);
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
        const data = await getCategories();
        setCategories(data);
    }

    const handleSignOut = async () => {
        await signOut();
        router.push('/admin');
    };

    const handleDelete = async (id: string) => {
        if (!confirm('¿Estás seguro de eliminar esta categoría? Los productos asociados quedarán sin categoría.')) return;

        try {
            await deleteCategory(id);
            await loadData();
        } catch (error) {
            alert('Error al eliminar la categoría');
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
            {/* Header */}
            <header className="bg-white border-b border-sepia-200 sticky top-0 z-50 shadow-sm">
                <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <Link href="/admin/dashboard" className="text-olive-600 hover:text-olive-800">
                            ← Dashboard
                        </Link>
                        <div className="flex items-center gap-3">
                            <FolderTree className="w-6 h-6 text-olive-700" />
                            <h1 className="font-serif text-xl font-bold text-olive-900">Gestión de Categorías</h1>
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

            {/* Main Content */}
            <main className="container mx-auto px-6 py-8">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h2 className="text-2xl font-serif font-bold text-olive-900">Categorías</h2>
                        <p className="text-olive-800/60">Organiza tu menú por categorías</p>
                    </div>
                    <Link
                        href="/admin/categories/new"
                        className="bg-olive-700 text-sepia-50 px-6 py-3 rounded-lg font-bold flex items-center gap-2 hover:bg-olive-800 transition-all shadow-md hover:shadow-lg"
                    >
                        <Plus className="w-5 h-5" />
                        Nueva Categoría
                    </Link>
                </div>

                {categories.length === 0 ? (
                    <div className="bg-white rounded-2xl p-12 text-center border border-sepia-200">
                        <FolderTree className="w-16 h-16 text-olive-300 mx-auto mb-4" />
                        <h3 className="text-xl font-serif font-bold text-olive-900 mb-2">No hay categorías</h3>
                        <p className="text-olive-800/60 mb-6">Crea categorías para organizar tu menú</p>
                        <Link
                            href="/admin/categories/new"
                            className="inline-flex items-center gap-2 bg-olive-700 text-sepia-50 px-6 py-3 rounded-lg font-bold hover:bg-olive-800 transition-all"
                        >
                            <Plus className="w-5 h-5" />
                            Crear Categoría
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {categories.map((category) => (
                            <div key={category.id} className="bg-white rounded-2xl p-6 shadow-sm border border-sepia-200 hover:shadow-lg transition-all">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex-1">
                                        <h3 className="text-xl font-serif font-bold text-olive-900 mb-1">{category.name}</h3>
                                        <p className="text-sm text-olive-600">{category.slug}</p>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${category.type === 'drink'
                                            ? 'bg-blue-100 text-blue-700'
                                            : 'bg-orange-100 text-orange-700'
                                        }`}>
                                        {category.type === 'drink' ? 'Bebida' : 'Comida'}
                                    </span>
                                </div>

                                <div className="flex gap-2 pt-4 border-t border-sepia-100">
                                    <Link
                                        href={`/admin/categories/${category.id}`}
                                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 text-olive-600 hover:bg-olive-100 rounded-lg transition-colors font-medium"
                                    >
                                        <Edit className="w-4 h-4" />
                                        Editar
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(category.id)}
                                        className="flex items-center justify-center gap-2 px-4 py-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors font-medium"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                        Eliminar
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}
