"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getCurrentUser, signOut, checkAdminStatus } from "@/lib/auth";
import { getProducts, getCategories, deleteProduct } from "@/lib/database";
import type { Product, Category } from "@/types/database";
import { LogOut, Plus, Edit, Trash2, Loader2, Package } from 'lucide-react';

export default function ProductsPage() {
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [user, setUser] = useState<any>(null);
    const router = useRouter();

    useEffect(() => {
        async function init() {
            try {
                const currentUser = await getCurrentUser();
                if (!currentUser) {
                    router.push('/admin');
                    return;
                }

                const isAdminUser = await checkAdminStatus();
                if (!isAdminUser) {
                    router.push('/admin');
                    return;
                }

                setUser(currentUser);
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
        const [productsData, categoriesData] = await Promise.all([
            getProducts(),
            getCategories()
        ]);
        setProducts(productsData);
        setCategories(categoriesData);
    }

    const handleSignOut = async () => {
        await signOut();
        router.push('/admin');
    };

    const handleDelete = async (id: string) => {
        if (!confirm('¿Estás seguro de eliminar este producto?')) return;

        try {
            await deleteProduct(id);
            await loadData();
        } catch (error) {
            alert('Error al eliminar el producto');
        }
    };

    const getCategoryName = (categoryId: string) => {
        return categories.find(c => c.id === categoryId)?.name || 'Sin categoría';
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
                            <Package className="w-6 h-6 text-olive-700" />
                            <h1 className="font-serif text-xl font-bold text-olive-900">Gestión de Productos</h1>
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
                        <h2 className="text-2xl font-serif font-bold text-olive-900">Productos</h2>
                        <p className="text-olive-800/60">Gestiona el menú de tu cafetería</p>
                    </div>
                    <Link
                        href="/admin/products/new"
                        className="bg-olive-700 text-sepia-50 px-6 py-3 rounded-lg font-bold flex items-center gap-2 hover:bg-olive-800 transition-all shadow-md hover:shadow-lg"
                    >
                        <Plus className="w-5 h-5" />
                        Nuevo Producto
                    </Link>
                </div>

                {products.length === 0 ? (
                    <div className="bg-white rounded-2xl p-12 text-center border border-sepia-200">
                        <Package className="w-16 h-16 text-olive-300 mx-auto mb-4" />
                        <h3 className="text-xl font-serif font-bold text-olive-900 mb-2">No hay productos</h3>
                        <p className="text-olive-800/60 mb-6">Comienza agregando tu primer producto al menú</p>
                        <Link
                            href="/admin/products/new"
                            className="inline-flex items-center gap-2 bg-olive-700 text-sepia-50 px-6 py-3 rounded-lg font-bold hover:bg-olive-800 transition-all"
                        >
                            <Plus className="w-5 h-5" />
                            Crear Producto
                        </Link>
                    </div>
                ) : (
                    <div className="bg-white rounded-2xl shadow-sm border border-sepia-200 overflow-hidden">
                        <table className="w-full">
                            <thead className="bg-sepia-100 border-b border-sepia-200">
                                <tr>
                                    <th className="text-left px-6 py-4 font-bold text-olive-900">Producto</th>
                                    <th className="text-left px-6 py-4 font-bold text-olive-900">Categoría</th>
                                    <th className="text-left px-6 py-4 font-bold text-olive-900">Precio</th>
                                    <th className="text-left px-6 py-4 font-bold text-olive-900">Estado</th>
                                    <th className="text-right px-6 py-4 font-bold text-olive-900">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product) => (
                                    <tr key={product.id} className="border-b border-sepia-100 hover:bg-sepia-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-olive-900">{product.name}</div>
                                            <div className="text-sm text-olive-800/60 line-clamp-1">{product.description}</div>
                                        </td>
                                        <td className="px-6 py-4 text-olive-800">{getCategoryName(product.category_id)}</td>
                                        <td className="px-6 py-4 font-bold text-olive-700">${product.price}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${product.is_available
                                                    ? 'bg-green-100 text-green-700'
                                                    : 'bg-red-100 text-red-700'
                                                }`}>
                                                {product.is_available ? 'Disponible' : 'Agotado'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end gap-2">
                                                <Link
                                                    href={`/admin/products/${product.id}`}
                                                    className="p-2 text-olive-600 hover:bg-olive-100 rounded-lg transition-colors"
                                                    title="Editar"
                                                >
                                                    <Edit className="w-5 h-5" />
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(product.id)}
                                                    className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                                                    title="Eliminar"
                                                >
                                                    <Trash2 className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </main>
        </div>
    );
}
