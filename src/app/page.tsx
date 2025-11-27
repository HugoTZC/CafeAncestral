"use client";

import { useEffect, useState } from 'react';
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/ui/Hero";
import { getFeaturedItems } from "@/lib/database";
import type { FeaturedItem } from "@/types/database";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Home() {
  const [featuredItems, setFeaturedItems] = useState<FeaturedItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFeaturedItems() {
      const items = await getFeaturedItems();
      setFeaturedItems(items);
      setLoading(false);
    }

    loadFeaturedItems();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-sepia-50/50">
      <Header />

      <main className="flex-1">
        <Hero />

        {/* Welcome Section - Minimal & Elegant */}
        <section className="py-24 px-6 container mx-auto text-center relative overflow-hidden">
          <div className="max-w-3xl mx-auto relative z-10">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-olive-900 mb-8 leading-tight">
              Tradición y Pasión <br />
              <span className="text-olive-600 italic">en cada detalle</span>
            </h1>
            <p className="text-lg md:text-xl text-olive-800/70 leading-relaxed mb-10 font-light">
              Somos un espacio donde el tiempo se detiene. Desde nuestro café de especialidad hasta nuestras pizzas de masa madre, cada producto cuenta una historia de origen, paciencia y amor por lo auténtico.
            </p>
            <Link href="/nosotros" className="inline-flex items-center gap-2 text-olive-700 font-bold hover:text-olive-900 transition-colors group">
              <span>Conoce nuestra historia</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Decorative background elements */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-olive-100/50 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-sepia-200/30 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />
        </section>

        {/* Featured Items - Dynamic from Database */}
        <section className="py-20 bg-white/50 backdrop-blur-sm">
          <div className="container mx-auto px-6">
            <div className="flex justify-between items-end mb-12">
              <div>
                <span className="text-olive-600 font-bold tracking-widest text-sm uppercase mb-2 block">Descubre</span>
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-olive-900">
                  Nuestras Especialidades
                </h2>
              </div>
              <Link href="/menu" className="hidden md:flex items-center gap-2 text-olive-700 font-bold hover:text-olive-900 transition-colors">
                Ver todo el menú <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <p className="text-olive-600">Cargando...</p>
              </div>
            ) : featuredItems.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-olive-600">No hay items destacados disponibles</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {featuredItems.map((item) => (
                  <Link key={item.id} href={item.link_url} className="group relative h-[400px] overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all">
                    {item.image_url && (
                      <Image
                        src={item.image_url}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                    <div className="absolute bottom-0 left-0 p-8 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      <h3 className="text-2xl font-serif font-bold text-white mb-2">
                        {item.title}
                      </h3>
                      <span className="text-sepia-200 font-medium flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                        Explorar <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            <div className="mt-8 text-center md:hidden">
              <Link href="/menu" className="inline-flex items-center gap-2 text-olive-700 font-bold hover:text-olive-900 transition-colors">
                Ver todo el menú <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
