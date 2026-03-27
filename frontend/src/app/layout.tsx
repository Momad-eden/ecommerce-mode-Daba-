import type { Metadata } from 'next';
import { Inter, Cormorant_Garamond } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import BottomNav from '@/components/layout/BottomNav';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['300', '400', '500', '600'],
  display: 'swap',
});

const cormorant = Cormorant_Garamond({ 
  subsets: ['latin'],
  variable: '--font-serif',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'ÉLÉGANCE - Boutique de Mode',
  description: 'Collection de vêtements haut de gamme',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${inter.variable} ${cormorant.variable}`}>
      <body className="font-sans">
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <BottomNav />
      </body>
    </html>
  );
}