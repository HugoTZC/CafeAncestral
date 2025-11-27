import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, Menu as MenuIcon, User } from 'lucide-react';

export function Header() {
    return (
        <header className="bg-sepia-50/90 backdrop-blur-md border-b border-sepia-200 sticky top-0 z-50 shadow-sm">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                {/* Logo and Name */}
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="relative w-12 h-12 group-hover:scale-105 transition-transform rounded-2xl overflow-hidden">
                        <Image
                            src="/logoGreen.jpg"
                            alt="Cafe Ancestral"
                            fill
                            className="object-contain"
                        />
                    </div>
                    <span className="font-serif text-2xl font-bold text-olive-900 tracking-wide group-hover:text-olive-700 transition-colors">
                        Cafe Ancestral
                    </span>
                </Link>

                {/* Desktop Navigation - Clean & Spacious */}
                <nav className="hidden md:flex items-center gap-8 font-medium text-olive-800/90">
                    <Link href="/menu" className="hover:text-olive-600 transition-colors uppercase text-sm tracking-widest font-bold">Menú</Link>
                    <Link href="/blog" className="hover:text-olive-600 transition-colors uppercase text-sm tracking-widest font-bold">Blog</Link>
                    <Link href="/nosotros" className="hover:text-olive-600 transition-colors uppercase text-sm tracking-widest font-bold">Nosotros</Link>
                </nav>

                {/* Actions */}
                <div className="flex items-center gap-5">
                    <Link href="/admin" className="text-olive-800 hover:text-olive-600 transition-colors" aria-label="Login">
                        <User className="w-5 h-5" />
                    </Link>

                    <Link href="/pedidos" className="relative p-2 text-olive-800 hover:text-olive-600 transition-colors group" aria-label="Ver pedidos">
                        <ShoppingCart className="w-6 h-6 group-hover:scale-110 transition-transform" />
                    </Link>

                    <Link
                        href="/menu"
                        className="hidden sm:flex bg-olive-700 text-sepia-50 px-6 py-2.5 rounded-full font-sans font-bold text-sm tracking-wide hover:bg-olive-800 transition-all shadow-md hover:shadow-lg items-center gap-2"
                    >
                        <span>ORDENAR</span>
                    </Link>

                    {/* Mobile Menu Button */}
                    <button className="md:hidden text-olive-800 hover:text-olive-600">
                        <MenuIcon className="w-7 h-7" />
                    </button>
                </div>
            </div>
        </header>
    );
}
