"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getCurrentUser, checkAdminStatus } from "@/lib/auth";
import { createFeaturedItem, getCategories, getProducts, getPublishedBlogPosts, getAllFeaturedItems } from "@/lib/database";
import { uploadImage } from "@/lib/storage";
import type { Category, Product, BlogPost } from "@/types/database";
import { ArrowLeft, Save, Loader2, Upload, X } from 'lucide-react';

export default function NewFeaturedItemPage() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [imagePreview, setImagePreview] = useState<string>('');
    const [categories, setCategories] = useState<Category[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
    const [itemCount, setItemCount] = useState(0);
    const router = useRouter();

    const [formData, setFormData] = useState({
        title: '',
        subtitle: '',
        description: '',
        image_url: '',
        link_url: '',
        link_type: 'custom' as 'custom' | 'category' | 'product' | 'blog',
        order: 0,
        is_active: true
    });

    useEffect(() => {
        async function init() {
            try {
                const currentUser = await getCurrentUser();
                if (!currentUser || !(await checkAdminStatus())) {
                    router.push('/admin');
                    return;
                }

                const [categoriesData, productsData, blogData, items] = await Promise.all([
                    getCategories(),
                    getProducts(),
                    getPublishedBlogPosts(),
                    getAllFeaturedItems()
                ]);

                setCategories(categoriesData);
                setProducts(productsData);
                setBlogPosts(blogData);
                setItemCount(items.length);

                // Check if already at limit
                if (items.length >= 3) {
                    alert('Ya tienes 3 items destacados (máximo). Elimina uno para agregar otro.');
                    router.push('/admin/featured-items');
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

    const handleLinkTypeChange = (type: typeof formData.link_type) => {
        setFormData({ ...formData, link_type: type, link_url: '' });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        try {
            await createFeaturedItem({
                title: formData.title,
                subtitle: formData.subtitle || null,
                description: formData.description || null,
                image_url: formData.image_url || null,
                link_url: formData.link_url,
                order: formData.order,
                is_active: formData.is_active
            } as any);

            router.push('/admin/featured-items');
        } catch (error) {
            alert('Error al crear el item');
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
                    <Link href="/admin/featured-items" className="text-olive-600 hover:text-olive-800 flex items-center gap-2">
                        <ArrowLeft className="w-5 h-5" />
                        Volver a Items Destacados
                    </Link>
                </div>
            </header>

            <main className="container mx-auto px-6 py-8 max-w-3xl">
                <div className="bg-white rounded-2xl shadow-sm border border-sepia-200 p-8">
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-3xl font-serif font-bold text-olive-900">Nuevo Item Destacado</h1>
                        <span className="text-sm text-olive-600">
                            {itemCount}/3 items creados
                        </span>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Image Upload */}
                        <div>
                            <label className="block text-sm font-bold text-olive-800 mb-2">
                                Imagen
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
                                    <div>
                                        <Upload className="w-12 h-12 text-olive-300 mx-auto mb-4" />
                                        <label className="cursor-pointer">
                                            <span className="text-olive-700 font-medium hover:text-olive-900">
                                                {uploading ? 'Subiendo...' : 'Click para subir imagen'}
                                            </span>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageUpload}
                                                className="hidden"
                                                disabled={uploading}
                                            />
                                        </label>
                                        <p className="text-xs text-olive-600 mt-2">PNG, JPG, WEBP hasta 5MB</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="md:col-span-2">
                                <label className="block text-sm font-bold text-olive-800 mb-2">
                                    Título *
                                </label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full px-4 py-3 border border-sepia-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-olive-500 text-olive-900"
                                    required
                                />
                            </div>



                            <div>
                                <label className="block text-sm font-bold text-olive-800 mb-2">
                                    Orden
                                </label>
                                <input
                                    type="number"
                                    value={formData.order}
                                    onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                                    className="w-full px-4 py-3 border border-sepia-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-olive-500 text-olive-900"
                                    min="0"
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-bold text-olive-800 mb-2">
                                    Tipo de Enlace *
                                </label>
                                <select
                                    value={formData.link_type}
                                    onChange={(e) => handleLinkTypeChange(e.target.value as any)}
                                    className="w-full px-4 py-3 border border-sepia-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-olive-500 text-olive-900"
                                >
                                    <option value="custom">URL Personalizada</option>
                                    <option value="category">Categoría</option>
                                    <option value="product">Producto</option>
                                    <option value="blog">Blog Post</option>
                                </select>
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-bold text-olive-800 mb-2">
                                    Enlace *
                                </label>
                                {formData.link_type === 'custom' ? (
                                    <input
                                        type="text"
                                        value={formData.link_url}
                                        onChange={(e) => setFormData({ ...formData, link_url: e.target.value })}
                                        className="w-full px-4 py-3 border border-sepia-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-olive-500 text-olive-900"
                                        placeholder="/menu"
                                        required
                                    />
                                ) : formData.link_type === 'category' ? (
                                    <select
                                        value={formData.link_url}
                                        onChange={(e) => {
                                            const category = categories.find(c => `/menu?category=${c.slug}` === e.target.value);
                                            setFormData({
                                                ...formData,
                                                link_url: e.target.value,
                                                title: category ? category.name : formData.title
                                            });
                                        }}
                                        className="w-full px-4 py-3 border border-sepia-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-olive-500 text-olive-900"
                                        required
                                    >
                                        <option value="">Seleccionar categoría</option>
                                        {categories.map((cat) => (
                                            <option key={cat.id} value={`/menu?category=${cat.slug}`}>
                                                {cat.name}
                                            </option>
                                        ))}
                                    </select>
                                ) : formData.link_type === 'product' ? (
                                    <select
                                        value={formData.link_url}
                                        onChange={(e) => {
                                            const product = products.find(p => `/menu#${p.id}` === e.target.value);
                                            setFormData({
                                                ...formData,
                                                link_url: e.target.value,
                                                title: product ? product.name : formData.title,
                                                image_url: product?.image_url || formData.image_url
                                            });
                                            if (product?.image_url) {
                                                setImagePreview(product.image_url);
                                            }
                                        }}
                                        className="w-full px-4 py-3 border border-sepia-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-olive-500 text-olive-900"
                                        required
                                    >
                                        <option value="">Seleccionar producto</option>
                                        {products.map((product) => (
                                            <option key={product.id} value={`/menu#${product.id}`}>
                                                {product.name}
                                            </option>
                                        ))}
                                    </select>
                                ) : (
                                    <select
                                        value={formData.link_url}
                                        onChange={(e) => {
                                            const post = blogPosts.find(p => `/blog/${p.id}` === e.target.value);
                                            setFormData({
                                                ...formData,
                                                link_url: e.target.value,
                                                title: post ? post.title : formData.title,
                                                image_url: post?.image_url || formData.image_url
                                            });
                                            if (post?.image_url) {
                                                setImagePreview(post.image_url);
                                            }
                                        }}
                                        className="w-full px-4 py-3 border border-sepia-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-olive-500 text-olive-900"
                                        required
                                    >
                                        <option value="">Seleccionar blog post</option>
                                        {blogPosts.map((post) => (
                                            <option key={post.id} value={`/blog/${post.id}`}>
                                                {post.title}
                                            </option>
                                        ))}
                                    </select>
                                )}
                            </div>

                            <div className="md:col-span-2">
                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={formData.is_active}
                                        onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                                        className="w-5 h-5 text-olive-700 border-sepia-300 rounded focus:ring-olive-500"
                                    />
                                    <span className="text-sm font-bold text-olive-800">Item activo</span>
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
                                        Guardar Item
                                    </>
                                )}
                            </button>
                            <Link
                                href="/admin/featured-items"
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
