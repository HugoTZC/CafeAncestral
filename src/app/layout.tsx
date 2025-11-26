import localFont from "next/font/local";
import "./globals.css";
import { Playfair_Display, Lato } from 'next/font/google'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
})

const lato = Lato({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

export const metadata = {
  title: "Cafe Ancestral",
  description: "Cafetería artesanal y pizzas de masa madre",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${playfair.variable} ${lato.variable} antialiased font-sans`}
      >
        {children}
      </body>
    </html>
  );
}
