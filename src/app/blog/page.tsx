"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { getPublishedBlogPosts } from "@/lib/database";
import type { BlogPost } from "@/types/database";
import { Calendar } from 'lucide-react';

export default function BlogPage() {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadPosts() {
            const data = await getPublishedBlogPosts();
            setPosts(data);
            setLoading(false);
        }
        loadPosts();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col bg-sepia-50/50">
                <Header />
                <main className="flex-1 container mx-auto px-6 py-12 flex items-center justify-center">
                    <div className="text-center">
                        <div className="w-16 h-16 border-4 border-olive-200 border-t-olive-700 rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-olive-800/60">Cargando publicaciones...</p>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col bg-sepia-50/50">
            <Header />

            <main className="flex-1 container mx-auto px-6 py-12">
                <div className="text-center mb-12">
                    <span className="text-olive-600 font-bold tracking-widest text-sm uppercase mb-2 block">Nuestro Blog</span>
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-olive-900">
                        Historias y Eventos
                    </h1>
                </div>

                {posts.length === 0 ? (
                    <div className="text-center py-24 bg-white rounded-2xl shadow-sm border border-sepia-100">
                        <p className="text-xl text-olive-800/60 mb-4">No hay publicaciones disponibles.</p>
                        <p className="text-sm text-olive-800/40">Vuelve pronto para leer nuestras historias.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts.map((post) => (
                            <Link href={`/blog/${post.id}`} key={post.id} className="block group">
                                <article className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-sepia-100 h-full flex flex-col">
                                    <div className="relative h-56 overflow-hidden">
                                        <Image
                                            src={post.image_url || 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=2070&auto=format&fit=crop'}
                                            alt={post.title}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </div>
                                    <div className="p-6 flex-1 flex flex-col">
                                        <div className="flex items-center gap-2 text-sm text-olive-600 mb-3">
                                            <Calendar className="w-4 h-4" />
                                            <time>{new Date(post.published_at).toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
                                        </div>
                                        <h2 className="text-2xl font-serif font-bold text-olive-900 mb-3 group-hover:text-olive-700 transition-colors">
                                            {post.title}
                                        </h2>
                                        <p className="text-olive-800/70 mb-4 line-clamp-3 flex-1">
                                            {post.excerpt || post.content.substring(0, 150) + '...'}
                                        </p>
                                        <div className="text-olive-700 font-bold group-hover:text-olive-900 transition-colors flex items-center gap-2 mt-auto">
                                            Leer más
                                            <span className="group-hover:translate-x-1 transition-transform">→</span>
                                        </div>
                                    </div>
                                </article>
                            </Link>
                        ))}
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
}
