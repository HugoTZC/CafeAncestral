"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { getBlogPostById } from "@/lib/database";
import type { BlogPost } from "@/types/database";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Calendar, ArrowLeft, Loader2 } from 'lucide-react';

export default function BlogPostPage() {
    const { id } = useParams();
    const [post, setPost] = useState<BlogPost | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadPost() {
            if (typeof id === 'string') {
                const data = await getBlogPostById(id);
                setPost(data);
            }
            setLoading(false);
        }
        loadPost();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col bg-sepia-50/50">
                <Header />
                <main className="flex-1 flex items-center justify-center">
                    <Loader2 className="w-12 h-12 text-olive-700 animate-spin" />
                </main>
                <Footer />
            </div>
        );
    }

    if (!post) {
        return (
            <div className="min-h-screen flex flex-col bg-sepia-50/50">
                <Header />
                <main className="flex-1 container mx-auto px-6 py-12 text-center">
                    <h1 className="text-3xl font-serif font-bold text-olive-900 mb-4">Post no encontrado</h1>
                    <Link href="/blog" className="text-olive-700 hover:text-olive-900 font-bold">
                        &larr; Volver al Blog
                    </Link>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col bg-sepia-50/50">
            <Header />

            <main className="flex-1">
                {/* Hero Image */}
                <div className="relative h-[50vh] min-h-[400px]">
                    <Image
                        src={post.image_url || 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=2070&auto=format&fit=crop'}
                        alt={post.title}
                        fill
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="container mx-auto px-6 text-center text-white">
                            <div className="flex items-center justify-center gap-2 text-sepia-100 mb-4">
                                <Calendar className="w-5 h-5" />
                                <time className="font-medium">
                                    {new Date(post.published_at).toLocaleDateString('es-MX', {
                                        weekday: 'long',
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </time>
                            </div>
                            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 max-w-4xl mx-auto leading-tight">
                                {post.title}
                            </h1>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <article className="container mx-auto px-6 py-16 max-w-3xl">
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 text-olive-600 hover:text-olive-800 font-bold mb-8 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Volver al Blog
                    </Link>

                    <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-sepia-100">
                        {post.excerpt && (
                            <p className="text-xl text-olive-800/80 font-serif italic mb-8 leading-relaxed border-l-4 border-olive-500 pl-6">
                                {post.excerpt}
                            </p>
                        )}

                        <div className="prose prose-olive prose-lg max-w-none text-olive-900/80">
                            {post.content.split('\n').map((paragraph, index) => (
                                paragraph.trim() && <p key={index} className="mb-4">{paragraph}</p>
                            ))}
                        </div>
                    </div>
                </article>
            </main>

            <Footer />
        </div>
    );
}
