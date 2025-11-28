"use client";

import Link from 'next/link';
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ArrowLeft, BarChart3, TrendingUp, Users, Eye } from 'lucide-react';

export default function AdminStatsPage() {
    return (
        <div className="min-h-screen flex flex-col bg-sepia-50/50">
            <Header />

            <main className="flex-1 container mx-auto px-6 py-12">
                <div className="flex items-center gap-4 mb-8">
                    <Link href="/admin/dashboard" className="text-olive-600 hover:text-olive-800 transition-colors">
                        <ArrowLeft className="w-6 h-6" />
                    </Link>
                    <div>
                        <h1 className="text-3xl font-serif font-bold text-olive-900">
                            Estadísticas
                        </h1>
                        <p className="text-olive-800/60">
                            Métricas y rendimiento del sitio
                        </p>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-sepia-200 p-12 text-center">
                    <div className="w-20 h-20 bg-olive-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <BarChart3 className="w-10 h-10 text-olive-700" />
                    </div>
                    <h2 className="text-2xl font-serif font-bold text-olive-900 mb-4">
                        Próximamente
                    </h2>
                    <p className="text-olive-800/70 max-w-md mx-auto mb-8">
                        Estamos trabajando en un panel de estadísticas detallado para que puedas ver el rendimiento de tu negocio en tiempo real.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto opacity-50 pointer-events-none select-none">
                        <div className="bg-sepia-50 p-6 rounded-xl border border-sepia-100">
                            <TrendingUp className="w-8 h-8 text-olive-600 mb-3" />
                            <div className="text-3xl font-bold text-olive-900 mb-1">1,234</div>
                            <div className="text-sm text-olive-800/60">Ventas del Mes</div>
                        </div>
                        <div className="bg-sepia-50 p-6 rounded-xl border border-sepia-100">
                            <Users className="w-8 h-8 text-olive-600 mb-3" />
                            <div className="text-3xl font-bold text-olive-900 mb-1">856</div>
                            <div className="text-sm text-olive-800/60">Visitantes Únicos</div>
                        </div>
                        <div className="bg-sepia-50 p-6 rounded-xl border border-sepia-100">
                            <Eye className="w-8 h-8 text-olive-600 mb-3" />
                            <div className="text-3xl font-bold text-olive-900 mb-1">5.2k</div>
                            <div className="text-sm text-olive-800/60">Vistas de Página</div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
