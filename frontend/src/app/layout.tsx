import type { Metadata } from 'next';
import { Inter, Cormorant_Garamond } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import BottomNav from '@/components/layout/BottomNav';
import { Toaster } from 'sonner';

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
        <Toaster 
          position="top-center" 
          richColors 
          toastOptions={{
            style: {
              background: '#1a1a1a',
              color: '#fff',
              borderRadius: '100px',
              padding: '12px 20px',
              fontSize: '14px',
              border: '1px solid rgba(255,255,255,0.1)',
            },
            duration: 2000,
            className: 'font-sans',
          }}
        />
      </body>
    </html>
  );
}