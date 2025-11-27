"use client";

import { useState } from 'react';
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import Image from "next/image";
import { Calendar, MapPin, Heart, Coffee } from "lucide-react";

export default function AboutPage() {
    const timelineEvents = [
        {
            date: "Enero 2020",
            title: "El Sueño Comienza",
            description: "Todo empezó con una pasión por el café de especialidad y el deseo de crear un espacio donde la comunidad pudiera reunirse. Después de meses de planificación, encontramos el lugar perfecto en el corazón de la ciudad.",
            image: "/cafe.jpg",
            icon: Coffee
        },
        {
            date: "Marzo 2020",
            title: "Renovación del Espacio",
            description: "Transformamos un antiguo edificio en un acogedor café. Cada detalle fue cuidadosamente seleccionado para crear una atmósfera cálida y acogedora que honra nuestras raíces.",
            image: "/place.jpg",
            icon: MapPin
        },
        {
            date: "Junio 2020",
            title: "Gran Apertura",
            description: "Abrimos nuestras puertas por primera vez. La respuesta de la comunidad fue abrumadora. Desde el primer día, supimos que habíamos creado algo especial.",
            image: "/bread.jpg",
            icon: Heart
        },
        {
            date: "Septiembre 2021",
            title: "Expansión del Menú",
            description: "Incorporamos pizzas de masa madre artesanal a nuestro menú. Cada pizza es elaborada con ingredientes locales y fermentada durante 48 horas para lograr la textura perfecta.",
            image: "/pizza.jpg",
            icon: Coffee
        },
        {
            date: "Enero 2023",
            title: "Reconocimiento Nacional",
            description: "Fuimos reconocidos como uno de los mejores cafés de especialidad del país. Este logro es el resultado del trabajo en equipo y la dedicación de cada miembro de nuestra familia Cafe Ancestral.",
            image: "/cappu.jpg",
            icon: Heart
        },
        {
            date: "Presente",
            title: "Nuestra Historia Continúa",
            description: "Hoy seguimos comprometidos con la excelencia, la comunidad y la pasión por lo que hacemos. Cada taza de café, cada pizza, cada sonrisa es parte de nuestra historia compartida contigo.",
            image: "/brownie.jpg",
            icon: Coffee
        }
    ];

    return (
        <div className="min-h-screen flex flex-col bg-sepia-50/50">
            <Header />

            <main className="flex-1">
                {/* Hero Section */}
                <section className="relative h-[50vh] min-h-[400px] bg-gradient-to-br from-olive-900 via-olive-800 to-olive-900 flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 opacity-20">
                        <Image
                            src="/place.jpg"
                            alt="Cafe Ancestral"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-olive-900/80 to-transparent" />

                    <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
                        <span className="text-sepia-300 font-bold tracking-[0.3em] text-sm uppercase mb-4 block">
                            Nuestra Historia
                        </span>
                        <h1 className="text-5xl md:text-7xl font-serif font-bold text-sepia-50 mb-6 leading-tight">
                            Un Viaje de Pasión y Tradición
                        </h1>
                        <p className="text-xl text-sepia-100/90 max-w-2xl mx-auto font-light">
                            Desde nuestros humildes comienzos hasta convertirnos en un referente de café de especialidad
                        </p>
                    </div>
                </section>

                {/* Mission Statement */}
                <section className="py-20 px-6 bg-white">
                    <div className="container mx-auto max-w-4xl text-center">
                        <h2 className="text-4xl font-serif font-bold text-olive-900 mb-6">
                            Nuestra Misión
                        </h2>
                        <p className="text-lg text-olive-800/70 leading-relaxed mb-8">
                            En Cafe Ancestral, creemos que cada taza de café cuenta una historia. Nos dedicamos a honrar las tradiciones ancestrales mientras innovamos con técnicas modernas. Nuestro compromiso es ofrecer experiencias auténticas que conecten a las personas con el origen de cada ingrediente.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                            <div className="p-6">
                                <div className="w-16 h-16 bg-olive-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Coffee className="w-8 h-8 text-olive-700" />
                                </div>
                                <h3 className="font-serif text-xl font-bold text-olive-900 mb-2">Calidad</h3>
                                <p className="text-olive-800/60 text-sm">
                                    Seleccionamos los mejores granos y ingredientes para garantizar excelencia en cada producto
                                </p>
                            </div>
                            <div className="p-6">
                                <div className="w-16 h-16 bg-olive-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Heart className="w-8 h-8 text-olive-700" />
                                </div>
                                <h3 className="font-serif text-xl font-bold text-olive-900 mb-2">Comunidad</h3>
                                <p className="text-olive-800/60 text-sm">
                                    Creamos un espacio donde las personas se conectan y comparten momentos especiales
                                </p>
                            </div>
                            <div className="p-6">
                                <div className="w-16 h-16 bg-olive-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <MapPin className="w-8 h-8 text-olive-700" />
                                </div>
                                <h3 className="font-serif text-xl font-bold text-olive-900 mb-2">Origen</h3>
                                <p className="text-olive-800/60 text-sm">
                                    Trabajamos directamente con productores locales para apoyar la economía y la sostenibilidad
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Timeline Section */}
                <section className="py-20 px-6 bg-sepia-50/50">
                    <div className="container mx-auto max-w-5xl">
                        <div className="text-center mb-16">
                            <span className="text-olive-600 font-bold tracking-widest text-sm uppercase mb-2 block">
                                Nuestro Camino
                            </span>
                            <h2 className="text-4xl md:text-5xl font-serif font-bold text-olive-900">
                                Línea de Tiempo
                            </h2>
                        </div>

                        <div className="relative">
                            {/* Timeline Line */}
                            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-olive-300 transform md:-translate-x-1/2" />

                            {/* Timeline Events */}
                            <div className="space-y-16">
                                {timelineEvents.map((event, index) => {
                                    const Icon = event.icon;
                                    const isEven = index % 2 === 0;

                                    return (
                                        <div key={index} className={`relative flex items-center ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                                            {/* Timeline Dot */}
                                            <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-olive-700 rounded-full border-4 border-sepia-50 transform md:-translate-x-1/2 z-10" />

                                            {/* Content */}
                                            <div className={`w-full md:w-5/12 ml-20 md:ml-0 ${isEven ? 'md:pr-12' : 'md:pl-12'}`}>
                                                <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all group">
                                                    <div className="relative h-64">
                                                        <Image
                                                            src={event.image}
                                                            alt={event.title}
                                                            fill
                                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                                        />
                                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                                        <div className="absolute bottom-4 left-4 flex items-center gap-2 text-sepia-100">
                                                            <Calendar className="w-4 h-4" />
                                                            <span className="text-sm font-bold">{event.date}</span>
                                                        </div>
                                                    </div>
                                                    <div className="p-6">
                                                        <div className="flex items-center gap-3 mb-3">
                                                            <div className="w-10 h-10 bg-olive-100 rounded-full flex items-center justify-center">
                                                                <Icon className="w-5 h-5 text-olive-700" />
                                                            </div>
                                                            <h3 className="text-2xl font-serif font-bold text-olive-900">
                                                                {event.title}
                                                            </h3>
                                                        </div>
                                                        <p className="text-olive-800/70 leading-relaxed">
                                                            {event.description}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Spacer for desktop */}
                                            <div className="hidden md:block w-5/12" />
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Call to Action */}
                <section className="py-20 px-6 bg-olive-900 text-sepia-50">
                    <div className="container mx-auto max-w-3xl text-center">
                        <h2 className="text-4xl font-serif font-bold mb-6">
                            Sé Parte de Nuestra Historia
                        </h2>
                        <p className="text-xl text-sepia-100/80 mb-8 font-light">
                            Cada visita, cada taza, cada momento compartido se convierte en parte de nuestra historia colectiva. Te invitamos a ser parte de esta familia.
                        </p>
                        <a
                            href="/menu"
                            className="inline-block bg-sepia-50 text-olive-900 px-8 py-4 rounded-full font-bold text-sm tracking-wider hover:bg-sepia-100 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                        >
                            Visítanos Hoy
                        </a>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
