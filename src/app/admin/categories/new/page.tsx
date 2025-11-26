"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getCurrentUser, checkAdminStatus } from "@/lib/auth";
import { createCategory } from "@/lib/database";
import { ArrowLeft, Save, Loader2 } from 'lucide-react';

export default function NewCategoryPage() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const router = useRouter();

    const [formData, setFormData] = useState({
        name: '',
        slug: '',
        type: 'food' as 'food' | 'drink',
        order: 0
    });

    useEffect(() => {
        async function init() {
            try {
                const currentUser = await getCurrentUser();
                if (!currentUser || !(await checkAdminStatus())) {
                    router.push('/admin');
                    return;
                }
            } catch (error) {
                router.push('/admin');
            } finally {
                setLoading(false);
            }
        }

        init();
    }, [router]);

    // Auto-generate slug from name
    const handleNameChange = (name: string) => {
        setFormData({
            ...formData,
            name,
            slug: name.toLowerCase()
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '') // Remove accents
                .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric with hyphens
                .replace(/^-+|-+$/g, '') // Remove leading/trailing hyphens
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        try {
            await createCategory(formData);
            router.push('/admin/categories');
        } catch (error) {
            alert('Error al crear la categoría');
            setSaving(false);
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
                <div className="container mx-auto px-6 py-4">
                    <Link href="/admin/categories" className="text-olive-600 hover:text-olive-800 flex items-center gap-2">
                        <ArrowLeft className="w-5 h-5" />
                        Volver a Categorías
                    </Link>
                </div>
            </header>

            <main className="container mx-auto px-6 py-8 max-w-2xl">
                <div className="bg-white rounded-2xl shadow-sm border border-sepia-200 p-8">
                    <h1 className="text-3xl font-serif font-bold text-olive-900 mb-8">Nueva Categoría</h1>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-bold text-olive-800 mb-2">
                                Nombre de la Categoría *
                            </label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => handleNameChange(e.target.value)}
                                className="w-full px-4 py-3 border border-sepia-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-olive-500 text-olive-900"
                                placeholder="Ej: Café Caliente"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-olive-800 mb-2">
                                Slug (URL amigable)
                            </label>
                            <input
                                type="text"
                                value={formData.slug}
                                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                className="w-full px-4 py-3 border border-sepia-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-olive-500 text-olive-900 bg-sepia-50"
                                placeholder="cafe-caliente"
                                required
                            />
                            <p className="text-xs text-olive-600 mt-1">Se genera automáticamente del nombre</p>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-olive-800 mb-2">
                                Tipo *
                            </label>
                            <select
                                value={formData.type}
                                onChange={(e) => setFormData({ ...formData, type: e.target.value as 'food' | 'drink' })}
                                className="w-full px-4 py-3 border border-sepia-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-olive-500 text-olive-900"
                                required
                            >
                                <option value="food">Comida</option>
                                <option value="drink">Bebida</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-olive-800 mb-2">
                                Orden de visualización
                            </label>
                            <input
                                type="number"
                                value={formData.order}
                                onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                                className="w-full px-4 py-3 border border-sepia-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-olive-500 text-olive-900"
                                min="0"
                            />
                            <p className="text-xs text-olive-600 mt-1">Número menor aparece primero en el menú</p>
                        </div>

                        <div className="flex gap-4 pt-6 border-t border-sepia-200">
                            <button
                                type="submit"
                                disabled={saving}
                                className="flex-1 bg-olive-700 text-sepia-50 py-3 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-olive-800 transition-all shadow-md hover:shadow-lg disabled:opacity-50"
                            >
                                {saving ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        Guardando...
                                    </>
                                ) : (
                                    <>
                                        <Save className="w-5 h-5" />
                                        Guardar Categoría
                                    </>
                                )}
                            </button>
                            <Link
                                href="/admin/categories"
                                className="px-6 py-3 border-2 border-sepia-300 text-olive-800 rounded-lg font-bold hover:bg-sepia-50 transition-colors"
                            >
                                Cancelar
                            </Link>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
}
