"use client";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useCartStore } from "@/store/cart";
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import Link from "next/link";
import Image from "next/image";

export default function CartPage() {
    const { items, removeItem, updateQuantity, total } = useCartStore();

    const handleWhatsAppOrder = () => {
        const message = `Hola! Me gustaría hacer un pedido:\n\n${items.map(item => `- ${item.quantity}x ${item.name} ($${item.price * item.quantity})`).join('\n')}\n\nTotal: $${total()}`;
        const encodedMessage = encodeURIComponent(message);
        window.open(`https://wa.me/521234567890?text=${encodedMessage}`, '_blank');
    };

    return (
        <div className="min-h-screen flex flex-col bg-sepia-50/50">
            <Header />

            <main className="flex-1 container mx-auto px-6 py-12">
                <div className="max-w-5xl mx-auto">
                    <h1 className="text-3xl md:text-4xl font-serif font-bold text-olive-900 mb-8 flex items-center gap-3">
                        <ShoppingBag className="w-8 h-8 text-olive-600" />
                        Tu Pedido
                    </h1>

                    {items.length === 0 ? (
                        <div className="text-center py-24 bg-white rounded-2xl shadow-sm border border-sepia-100">
                            <div className="w-20 h-20 bg-sepia-100 rounded-full flex items-center justify-center mx-auto mb-6 text-olive-400">
                                <ShoppingBag className="w-10 h-10" />
                            </div>
                            <p className="text-xl text-olive-800/60 mb-8 font-light">Tu carrito está esperando por algo delicioso.</p>
                            <Link
                                href="/menu"
                                className="inline-block bg-olive-700 text-sepia-50 px-8 py-3 rounded-full font-bold tracking-wide hover:bg-olive-800 transition-all shadow-lg hover:shadow-xl"
                            >
                                EXPLORAR MENÚ
                            </Link>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Cart Items */}
                            <div className="lg:col-span-2 space-y-6">
                                {items.map((item) => (
                                    <div key={item.id} className="bg-white p-4 rounded-xl shadow-sm border border-sepia-100 flex gap-6 items-center group hover:border-olive-200 transition-colors">
                                        <div className="relative w-24 h-24 shrink-0 rounded-lg overflow-hidden shadow-inner">
                                            <Image
                                                src={item.image_url}
                                                alt={item.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>

                                        <div className="flex-1 flex flex-col md:flex-row justify-between md:items-center gap-4">
                                            <div>
                                                <h3 className="font-serif font-bold text-olive-900 text-lg">{item.name}</h3>
                                                <p className="text-sm text-olive-800/50 font-medium">${item.price} c/u</p>
                                            </div>

                                            <div className="flex items-center gap-6">
                                                <div className="flex items-center gap-3 bg-sepia-50 rounded-full p-1 border border-sepia-200">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                        className="w-8 h-8 flex items-center justify-center hover:bg-white rounded-full transition-colors text-olive-700"
                                                    >
                                                        <Minus className="w-4 h-4" />
                                                    </button>
                                                    <span className="font-bold text-olive-900 w-6 text-center">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        className="w-8 h-8 flex items-center justify-center hover:bg-white rounded-full transition-colors text-olive-700"
                                                    >
                                                        <Plus className="w-4 h-4" />
                                                    </button>
                                                </div>

                                                <span className="font-bold text-olive-900 text-lg w-20 text-right">${item.price * item.quantity}</span>

                                                <button
                                                    onClick={() => removeItem(item.id)}
                                                    className="text-sepia-400 hover:text-red-500 transition-colors p-2"
                                                    title="Eliminar"
                                                >
                                                    <Trash2 className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Summary */}
                            <div className="lg:col-span-1">
                                <div className="bg-white p-8 rounded-2xl shadow-lg border border-sepia-100 sticky top-28">
                                    <h3 className="font-serif text-xl font-bold text-olive-900 mb-6 pb-4 border-b border-sepia-100">Resumen del Pedido</h3>

                                    <div className="space-y-4 mb-8">
                                        <div className="flex justify-between text-olive-800/70">
                                            <span>Subtotal</span>
                                            <span>${total()}</span>
                                        </div>
                                        <div className="flex justify-between text-olive-800/70">
                                            <span>Impuestos</span>
                                            <span>$0.00</span>
                                        </div>
                                        <div className="border-t border-sepia-100 pt-4 flex justify-between font-serif font-bold text-2xl text-olive-900">
                                            <span>Total</span>
                                            <span>${total()}</span>
                                        </div>
                                    </div>

                                    <button
                                        onClick={handleWhatsAppOrder}
                                        className="w-full bg-olive-700 text-sepia-50 py-4 rounded-full font-bold tracking-wide hover:bg-olive-800 transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 mb-4 transform active:scale-95"
                                    >
                                        <span>ORDENAR POR WHATSAPP</span>
                                        <ArrowRight className="w-5 h-5" />
                                    </button>

                                    <p className="text-xs text-center text-olive-800/40 leading-relaxed">
                                        Al confirmar, serás redirigido a WhatsApp para enviar los detalles de tu pedido directamente a nuestro equipo.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
}
