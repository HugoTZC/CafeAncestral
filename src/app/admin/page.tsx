"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { signIn } from "@/lib/auth";
import { Lock, Mail, AlertCircle } from 'lucide-react';

export default function AdminPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await signIn(email, password);
            // Use window.location for a hard redirect to ensure auth state is fresh
            window.location.href = '/admin/dashboard';
        } catch (err: any) {
            setError(err.message || 'Error al iniciar sesión. Verifica tus credenciales.');
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-sepia-50/50">
            <Header />

            <main className="flex-1 container mx-auto px-6 py-12 flex flex-col items-center justify-center">
                <div className="bg-white p-10 rounded-2xl shadow-xl border border-sepia-100 max-w-md w-full">
                    <div className="text-center mb-8">
                        <div className="relative w-20 h-20 mx-auto mb-4 rounded-2xl overflow-hidden">
                            <Image
                                src="/logoBrown.jpg"
                                alt="Cafe Ancestral Admin"
                                fill
                                className="object-contain"
                            />
                        </div>
                        <h1 className="text-3xl font-serif font-bold text-olive-900 mb-2">
                            Acceso Administrativo
                        </h1>
                        <p className="text-olive-800/60 text-sm">
                            Ingresa tus credenciales para continuar
                        </p>
                    </div>

                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                            <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                            <p className="text-sm text-red-700">{error}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-bold text-olive-800 mb-2">
                                Correo Electrónico
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-olive-400" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-11 pr-4 py-3 border border-sepia-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-olive-500 focus:border-transparent transition-all text-olive-900"
                                    placeholder="admin@cafeancestral.com"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-olive-800 mb-2">
                                Contraseña
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-olive-400" />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-11 pr-4 py-3 border border-sepia-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-olive-500 focus:border-transparent transition-all text-olive-900"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-olive-700 text-sepia-50 py-3 rounded-lg font-bold tracking-wide hover:bg-olive-800 transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-95"
                        >
                            {loading ? 'Ingresando...' : 'Ingresar'}
                        </button>
                    </form>

                    <p className="mt-6 text-center text-sm text-olive-800/40">
                        Área restringida para personal autorizado.
                    </p>
                </div>
            </main>

            <Footer />
        </div>
    );
}
