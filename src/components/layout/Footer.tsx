import Link from 'next/link';
import { Facebook, Instagram, MapPin, Phone, Mail } from 'lucide-react';

export function Footer() {
    return (
        <footer className="bg-olive-900 text-sepia-100 pt-20 pb-10 relative overflow-hidden">
            {/* Texture Overlay */}
            <div className="absolute inset-0 opacity-10 bg-[url('/textures/paper.png')] mix-blend-overlay pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    {/* Brand */}
                    <div className="md:col-span-1">
                        <Link href="/" className="inline-block mb-6">
                            <div className="w-16 h-16 bg-sepia-100 rounded-full flex items-center justify-center text-olive-900 font-serif font-bold text-2xl">
                                CA
                            </div>
                        </Link>
                        <p className="text-sepia-200/70 leading-relaxed mb-6">
                            Café de especialidad y cocina de autor. Un homenaje a los sabores auténticos y el tiempo bien vivido.
                        </p>
                        <div className="flex gap-4">
                            <Link href="#" className="w-10 h-10 rounded-full bg-olive-800 flex items-center justify-center hover:bg-sepia-500 hover:text-white transition-all">
                                <Instagram className="w-5 h-5" />
                            </Link>
                            <Link href="#" className="w-10 h-10 rounded-full bg-olive-800 flex items-center justify-center hover:bg-sepia-500 hover:text-white transition-all">
                                <Facebook className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-serif text-lg font-bold mb-6 text-sepia-50">Explorar</h4>
                        <ul className="space-y-4 text-sepia-200/70">
                            <li><Link href="/menu" className="hover:text-sepia-50 transition-colors">Menú</Link></li>
                            <li><Link href="/blog" className="hover:text-sepia-50 transition-colors">Blog & Eventos</Link></li>
                            <li><Link href="/nosotros" className="hover:text-sepia-50 transition-colors">Nuestra Historia</Link></li>
                            <li><Link href="/pedidos" className="hover:text-sepia-50 transition-colors">Pedidos</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="font-serif text-lg font-bold mb-6 text-sepia-50">Contacto</h4>
                        <ul className="space-y-4 text-sepia-200/70">
                            <li className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 mt-1 shrink-0 text-sepia-400" />
                                <span>Calle Principal #123,<br />Centro Histórico</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="w-5 h-5 shrink-0 text-sepia-400" />
                                <span>+52 123 456 7890</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="w-5 h-5 shrink-0 text-sepia-400" />
                                <span>hola@cafeancestral.com</span>
                            </li>
                        </ul>
                    </div>

                    {/* Hours */}
                    <div>
                        <h4 className="font-serif text-lg font-bold mb-6 text-sepia-50">Horario</h4>
                        <ul className="space-y-2 text-sepia-200/70">
                            <li className="flex justify-between">
                                <span>Martes - Jueves</span>
                                <span>8:00 - 22:00</span>
                            </li>
                            <li className="flex justify-between">
                                <span>Viernes - Sábado</span>
                                <span>9:00 - 23:00</span>
                            </li>
                            <li className="flex justify-between">
                                <span>Domingo</span>
                                <span>9:00 - 21:00</span>
                            </li>
                            <li className="flex justify-between text-sepia-400">
                                <span>Lunes</span>
                                <span>Cerrado</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-olive-800 pt-8 text-center text-sm text-sepia-200/40 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p>&copy; {new Date().getFullYear()} Cafe Ancestral. Todos los derechos reservados.</p>
                    <div className="flex gap-6">
                        <Link href="#" className="hover:text-sepia-100 transition-colors">Privacidad</Link>
                        <Link href="#" className="hover:text-sepia-100 transition-colors">Términos</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
