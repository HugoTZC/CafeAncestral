"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getCurrentUser, checkAdminStatus } from "@/lib/auth";
import { createProduct, getCategories } from "@/lib/database";
import { uploadImage } from "@/lib/storage";
import type { Category } from "@/types/database";
import { ArrowLeft, Save, Loader2, Upload, X } from 'lucide-react';

export default function NewProductPage() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [imagePreview, setImagePreview] = useState<string>('');
    const [categories, setCategories] = useState<Category[]>([]);
    const router = useRouter();

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        category_id: '',
        image_url: '',
        ingredients: '',
        allergens: '',
        is_available: true
    });

    useEffect(() => {
        async function init() {
            try {
                const currentUser = await getCurrentUser();
                if (!currentUser || !(await checkAdminStatus())) {
                    router.push('/admin');
                    return;
                }

                const categoriesData = await getCategories();
                setCategories(categoriesData);
            } catch (error) {
                router.push('/admin');
            } finally {
                setLoading(false);
            }
        }

        init();
    }, [router]);

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        try {
            const url = await uploadImage(file);
            if (url) {
                setFormData({ ...formData, image_url: url });
                setImagePreview(URL.createObjectURL(file));
            } else {
                alert('Error al subir la imagen');
            }
        } catch (error) {
            alert('Error al subir la imagen');
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        try {
            await createProduct({
                name: formData.name,
                description: formData.description,
                price: parseFloat(formData.price),
                category_id: formData.category_id,
                image_url: formData.image_url || null,
                ingredients: formData.ingredients || null,
                allergens: formData.allergens || null,
                is_available: formData.is_available
            } as any);

            router.push('/admin/products');
        } catch (error) {
            alert('Error al crear el producto');
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
                    <Link href="/admin/products" className="text-olive-600 hover:text-olive-800 flex items-center gap-2">
                        <ArrowLeft className="w-5 h-5" />
                        Volver a Productos
                    </Link>
                </div>
            </header>

            <main className="container mx-auto px-6 py-8 max-w-3xl">
                <div className="bg-white rounded-2xl shadow-sm border border-sepia-200 p-8">
                    <h1 className="text-3xl font-serif font-bold text-olive-900 mb-8">Nuevo Producto</h1>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="md:col-span-2">
                                <label className="block text-sm font-bold text-olive-800 mb-2">
                                    Nombre del Producto *
                                </label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-4 py-3 border border-sepia-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-olive-500 text-olive-900"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-olive-800 mb-2">
                                    Categoría *
                                </label>
                                <select
                                    value={formData.category_id}
                                    onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                                    className="w-full px-4 py-3 border border-sepia-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-olive-500 text-olive-900"
                                    required
                                >
                                    <option value="">Seleccionar categoría</option>
                                    {categories.map((cat) => (
                                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-olive-800 mb-2">
                                    Precio *
                                </label>
                                <input
                                    type="number"
                                    step="0.01"
                                    value={formData.price}
                                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                    className="w-full px-4 py-3 border border-sepia-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-olive-500 text-olive-900"
                                    required
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-bold text-olive-800 mb-2">
                                    Descripción
                                </label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    rows={3}
                                    className="w-full px-4 py-3 border border-sepia-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-olive-500 text-olive-900"
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-bold text-olive-800 mb-2">
                                    Imagen del Producto
                                </label>
                                <div className="border-2 border-dashed border-sepia-300 rounded-lg p-6 text-center">
                                    {imagePreview ? (
                                        <div className="relative">
                                            <img src={imagePreview} alt="Preview" className="w-full h-64 object-cover rounded-lg" />
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setImagePreview('');
                                                    setFormData({ ...formData, image_url: '' });
                                                }}
                                                className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ) : (
                                        <label className="cursor-pointer block">
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageUpload}
                                                className="hidden"
                                                disabled={uploading}
                                            />
                                            <div>
                                                <Upload className="w-12 h-12 text-olive-300 mx-auto mb-4" />
                                                <span className="text-olive-700 font-medium hover:text-olive-900 block">
                                                    {uploading ? 'Subiendo...' : 'Click para subir imagen'}
                                                </span>
                                                <p className="text-xs text-olive-600 mt-2">PNG, JPG, WEBP hasta 5MB</p>
                                            </div>
                                        </label>
                                    )}
                                </div>
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-bold text-olive-800 mb-2">
                                    Ingredientes
                                </label>
                                <textarea
                                    value={formData.ingredients}
                                    onChange={(e) => setFormData({ ...formData, ingredients: e.target.value })}
                                    rows={2}
                                    className="w-full px-4 py-3 border border-sepia-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-olive-500 text-olive-900"
                                    placeholder="Harina, agua, sal, levadura..."
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-bold text-olive-800 mb-2">
                                    Alérgenos
                                </label>
                                <input
                                    type="text"
                                    value={formData.allergens}
                                    onChange={(e) => setFormData({ ...formData, allergens: e.target.value })}
                                    className="w-full px-4 py-3 border border-sepia-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-olive-500 text-olive-900"
                                    placeholder="Gluten, lácteos, frutos secos..."
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={formData.is_available}
                                        onChange={(e) => setFormData({ ...formData, is_available: e.target.checked })}
                                        className="w-5 h-5 text-olive-700 border-sepia-300 rounded focus:ring-olive-500"
                                    />
                                    <span className="text-sm font-bold text-olive-800">Producto disponible</span>
                                </label>
                            </div>
                        </div>

                        <div className="flex gap-4 pt-6 border-t border-sepia-200">
                            <button
                                type="submit"
                                disabled={saving || uploading}
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
                                        Guardar Producto
                                    </>
                                )}
                            </button>
                            <Link
                                href="/admin/products"
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
