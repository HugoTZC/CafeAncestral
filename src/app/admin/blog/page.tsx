"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getCurrentUser, checkAdminStatus } from "@/lib/auth";
import { getAllBlogPosts, deleteBlogPost } from "@/lib/database";
import type { BlogPost } from "@/types/database";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { LogOut, Plus, Edit, Trash2, Loader2, FileText } from 'lucide-react';

export default function AdminBlogPage() {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        async function init() {
            try {
                const currentUser = await getCurrentUser();
                if (!currentUser || !(await checkAdminStatus())) {
                    router.push('/admin');
                    return;
                }

                const data = await getAllBlogPosts();
                setPosts(data);
            } catch (error) {
                router.push('/admin');
            } finally {
                setLoading(false);
            }
        }

        init();
    }, [router]);

    const handleDelete = async (id: string) => {
        if (!confirm('¿Estás seguro de eliminar este post?')) return;

        try {
            await deleteBlogPost(id);
            setPosts(posts.filter(p => p.id !== id));
        } catch (error) {
            alert('Error al eliminar el post');
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
        <div className="min-h-screen flex flex-col bg-sepia-50/50">
            <Header />

            <main className="flex-1 container mx-auto px-6 py-12">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-serif font-bold text-olive-900 mb-2">
                            Blog & Eventos
                        </h1>
                        <p className="text-olive-800/60">
                            Gestiona tus artículos y noticias
                        </p>
                    </div>
                    <div className="flex gap-4">
                        <Link
                            href="/admin/dashboard"
                            className="px-4 py-2 text-olive-700 font-bold hover:text-olive-900 transition-colors"
                        >
                            Volver al Dashboard
                        </Link>
                        <Link
                            href="/admin/blog/new"
                            className="bg-olive-700 text-sepia-50 px-6 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-olive-800 transition-all shadow-md hover:shadow-lg"
                        >
                            <Plus className="w-5 h-5" />
                            Nuevo Post
                        </Link>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-sepia-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-sepia-50 border-b border-sepia-200">
                                <tr>
                                    <th className="px-6 py-4 font-serif font-bold text-olive-900">Imagen</th>
                                    <th className="px-6 py-4 font-serif font-bold text-olive-900">Título</th>
                                    <th className="px-6 py-4 font-serif font-bold text-olive-900">Estado</th>
                                    <th className="px-6 py-4 font-serif font-bold text-olive-900">Fecha</th>
                                    <th className="px-6 py-4 font-serif font-bold text-olive-900 text-right">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-sepia-100">
                                {posts.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-12 text-center text-olive-800/60">
                                            <FileText className="w-12 h-12 mx-auto mb-3 text-olive-300" />
                                            <p>No hay posts creados aún.</p>
                                        </td>
                                    </tr>
                                ) : (
                                    posts.map((post) => (
                                        <tr key={post.id} className="hover:bg-sepia-50/50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="w-16 h-16 rounded-lg overflow-hidden bg-sepia-100 relative">
                                                    {post.image_url ? (
                                                        <img
                                                            src={post.image_url}
                                                            alt={post.title}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-olive-300">
                                                            <FileText className="w-6 h-6" />
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="font-bold text-olive-900">{post.title}</div>
                                                <div className="text-sm text-olive-800/60 line-clamp-1">{post.excerpt}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-3 py-1 rounded-full text-xs font-bold ${post.is_published
                                                        ? 'bg-green-100 text-green-700 border border-green-200'
                                                        : 'bg-yellow-100 text-yellow-700 border border-yellow-200'
                                                    }`}>
                                                    {post.is_published ? 'Publicado' : 'Borrador'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-olive-800/80">
                                                {new Date(post.published_at).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex justify-end gap-2">
                                                    <button
                                                        className="p-2 text-olive-600 hover:bg-olive-50 rounded-lg transition-colors"
                                                        title="Editar (Próximamente)"
                                                        disabled
                                                    >
                                                        <Edit className="w-5 h-5 opacity-50" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(post.id)}
                                                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                                        title="Eliminar"
                                                    >
                                                        <Trash2 className="w-5 h-5" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
