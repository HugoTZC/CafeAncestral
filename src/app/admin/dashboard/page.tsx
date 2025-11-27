"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getCurrentUser, signOut, checkAdminStatus } from "@/lib/auth";
import { LayoutDashboard, Package, Tag, FileText, LogOut, Loader2 } from 'lucide-react';

export default function AdminDashboard() {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<any>(null);
    const router = useRouter();

    useEffect(() => {
        async function checkAuth() {
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
            } catch (error) {
                router.push('/admin');
            } finally {
                setLoading(false);
            }
        }

        checkAuth();
    }, [router]);

    const handleSignOut = async () => {
        await signOut();
        router.push('/admin');
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-sepia-50/50 flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="w-12 h-12 text-olive-700 animate-spin mx-auto mb-4" />
                    <p className="text-olive-800/60">Verificando acceso...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-sepia-50/50">
            {/* Header */}
            <header className="bg-white border-b border-sepia-200 sticky top-0 z-50 shadow-sm">
                <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-olive-700 rounded-full flex items-center justify-center text-sepia-50 font-serif font-bold text-xl">
                            CA
                        </div>
                        <div>
                            <h1 className="font-serif text-xl font-bold text-olive-900">Panel Administrativo</h1>
                            <p className="text-xs text-olive-600">{user?.email}</p>
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
            <main className="container mx-auto px-6 py-12">
                <div className="mb-8">
                    <h2 className="text-3xl font-serif font-bold text-olive-900 mb-2">Bienvenido</h2>
                    <p className="text-olive-800/60">Gestiona el contenido de Cafe Ancestral</p>
                </div>

                {/* Dashboard Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <Link href="/admin/products" className="bg-white p-6 rounded-2xl shadow-sm border border-sepia-100 hover:shadow-lg transition-all cursor-pointer group">
                        <div className="w-12 h-12 bg-olive-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-olive-200 transition-colors">
                            <Package className="w-6 h-6 text-olive-700" />
                        </div>
                        <h3 className="font-serif text-xl font-bold text-olive-900 mb-1">Productos</h3>
                        <p className="text-sm text-olive-800/60">Gestionar productos del menú</p>
                    </Link>

                    <Link href="/admin/categories" className="bg-white p-6 rounded-2xl shadow-sm border border-sepia-100 hover:shadow-lg transition-all cursor-pointer group">
                        <div className="w-12 h-12 bg-sepia-200 rounded-lg flex items-center justify-center mb-4 group-hover:bg-sepia-300 transition-colors">
                            <LayoutDashboard className="w-6 h-6 text-sepia-700" />
                        </div>
                        <h3 className="font-serif text-xl font-bold text-olive-900 mb-1">Categorías</h3>
                        <p className="text-sm text-olive-800/60">Organizar el menú</p>
                    </Link>

                    <Link href="/admin/hero-banners" className="bg-white p-6 rounded-2xl shadow-sm border border-sepia-100 hover:shadow-lg transition-all cursor-pointer group">
                        <div className="w-12 h-12 bg-olive-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-olive-200 transition-colors">
                            <FileText className="w-6 h-6 text-olive-700" />
                        </div>
                        <h3 className="font-serif text-xl font-bold text-olive-900 mb-1">Hero Banners</h3>
                        <p className="text-sm text-olive-800/60">Carrusel principal</p>
                    </Link>

                    <Link href="/admin/featured-items" className="bg-white p-6 rounded-2xl shadow-sm border border-sepia-100 hover:shadow-lg transition-all cursor-pointer group">
                        <div className="w-12 h-12 bg-sepia-200 rounded-lg flex items-center justify-center mb-4 group-hover:bg-sepia-300 transition-colors">
                            <Tag className="w-6 h-6 text-sepia-700" />
                        </div>
                        <h3 className="font-serif text-xl font-bold text-olive-900 mb-1">Items Destacados</h3>
                        <p className="text-sm text-olive-800/60">Sección "Descubre"</p>
                    </Link>

                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-sepia-100 hover:shadow-lg transition-all cursor-pointer group">
                        <div className="w-12 h-12 bg-olive-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-olive-200 transition-colors">
                            <FileText className="w-6 h-6 text-olive-700" />
                        </div>
                        <h3 className="font-serif text-xl font-bold text-olive-900 mb-1">Blog</h3>
                        <p className="text-sm text-olive-800/60">Publicar historias y eventos</p>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-sepia-100 hover:shadow-lg transition-all cursor-pointer group">
                        <div className="w-12 h-12 bg-sepia-200 rounded-lg flex items-center justify-center mb-4 group-hover:bg-sepia-300 transition-colors">
                            <LayoutDashboard className="w-6 h-6 text-sepia-700" />
                        </div>
                        <h3 className="font-serif text-xl font-bold text-olive-900 mb-1">Estadísticas</h3>
                        <p className="text-sm text-olive-800/60">Ver métricas del sitio</p>
                    </div>
                </div>

                {/* Coming Soon Notice */}
                <div className="mt-12 bg-olive-50 border border-olive-200 rounded-2xl p-8 text-center">
                    <h3 className="text-2xl font-serif font-bold text-olive-900 mb-2">Funcionalidades en Desarrollo</h3>
                    <p className="text-olive-800/70">
                        Las herramientas de gestión de contenido estarán disponibles próximamente.
                    </p>
                </div>
            </main>
        </div>
    );
}
