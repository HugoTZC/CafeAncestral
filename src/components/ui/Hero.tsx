"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getHeroBanners } from '@/lib/database';
import type { HeroBanner } from '@/types/database';

export function Hero() {
    const [current, setCurrent] = useState(0);
    const [banners, setBanners] = useState<HeroBanner[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadBanners() {
            const data = await getHeroBanners();
            setBanners(data);
            setLoading(false);
        }

        loadBanners();
    }, []);

    useEffect(() => {
        if (banners.length === 0) return;

        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % banners.length);
        }, 6000);
        return () => clearInterval(timer);
    }, [banners.length]);

    const next = () => setCurrent((prev) => (prev + 1) % banners.length);
    const prev = () => setCurrent((prev) => (prev - 1 + banners.length) % banners.length);

    if (loading) {
        return (
            <section className="relative h-[70vh] min-h-[600px] w-full overflow-hidden bg-olive-900 flex items-center justify-center">
                <p className="text-sepia-50 text-lg">Cargando...</p>
            </section>
        );
    }

    if (banners.length === 0) {
        return (
            <section className="relative h-[70vh] min-h-[600px] w-full overflow-hidden bg-gradient-to-br from-olive-900 via-olive-800 to-olive-900">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(253,251,247,0.1)_0%,_transparent_50%)]"></div>
                </div>
                <div className="relative h-full container mx-auto px-6 flex flex-col justify-center items-center z-10 text-center">
                    <div className="w-24 h-24 mb-6 rounded-full bg-sepia-50/10 flex items-center justify-center">
                        <span className="text-6xl">☕</span>
                    </div>
                    <h2 className="font-serif text-4xl md:text-6xl font-bold text-sepia-50 mb-4 leading-tight">
                        Bienvenido a Cafe Ancestral
                    </h2>
                    <p className="text-lg md:text-xl text-sepia-100/80 max-w-2xl mb-8 font-light">
                        Estamos preparando algo especial para ti. Mientras tanto, explora nuestro menú artesanal.
                    </p>
                    <Link
                        href="/menu"
                        className="bg-sepia-50 text-olive-900 px-8 py-4 rounded-full font-sans font-bold text-sm tracking-wider hover:bg-sepia-100 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                    >
                        Ver Menú
                    </Link>
                </div>
            </section>
        );
    }

    return (
        <section className="relative h-[70vh] min-h-[600px] w-full overflow-hidden bg-olive-900">
            {banners.map((banner, index) => (
                <div
                    key={banner.id}
                    className={`absolute inset-0 transition-all duration-1000 ease-in-out ${index === current ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
                        }`}
                >
                    {/* Background Image */}
                    <div className="absolute inset-0">
                        <Image
                            src={banner.image_url || 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=2070&auto=format&fit=crop'}
                            alt={banner.title}
                            fill
                            className="object-cover opacity-70"
                            priority={index === 0}
                        />
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-r from-olive-900/90 via-olive-900/40 to-transparent" />
                    </div>

                    {/* Content - Left Aligned for Modern Look */}
                    <div className="relative h-full container mx-auto px-6 flex flex-col justify-center items-start z-10 max-w-4xl">
                        {banner.subtitle && (
                            <span className="text-sepia-300 font-sans font-bold tracking-[0.2em] mb-4 text-sm md:text-base animate-fade-in-up">
                                {banner.subtitle}
                            </span>
                        )}
                        <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold text-sepia-50 mb-6 leading-tight drop-shadow-lg transform transition-all duration-700 delay-100">
                            {banner.title}
                        </h2>
                        {banner.description && (
                            <p className="text-lg md:text-xl text-sepia-100/90 max-w-xl mb-10 font-light leading-relaxed">
                                {banner.description}
                            </p>
                        )}
                        <Link
                            href={banner.link_url}
                            className="group bg-sepia-50 text-olive-900 px-8 py-4 rounded-full font-sans font-bold text-sm tracking-wider hover:bg-sepia-100 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center gap-2"
                        >
                            {banner.cta_text}
                            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>
            ))}

            {/* Modern Controls */}
            {banners.length > 1 && (
                <>
                    <div className="absolute bottom-10 right-10 flex gap-4 z-20">
                        <button
                            onClick={prev}
                            className="p-3 rounded-full border border-sepia-50/30 text-sepia-50 hover:bg-sepia-50/10 transition-colors backdrop-blur-sm"
                            aria-label="Previous slide"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>
                        <button
                            onClick={next}
                            className="p-3 rounded-full border border-sepia-50/30 text-sepia-50 hover:bg-sepia-50/10 transition-colors backdrop-blur-sm"
                            aria-label="Next slide"
                        >
                            <ChevronRight className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Progress Indicators */}
                    <div className="absolute bottom-10 left-10 flex gap-3 z-20">
                        {banners.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrent(index)}
                                className={`h-1 transition-all duration-300 rounded-full ${index === current ? 'bg-sepia-50 w-12' : 'bg-sepia-50/30 w-6 hover:bg-sepia-50/50'
                                    }`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </>
            )}
        </section>
    );
}
