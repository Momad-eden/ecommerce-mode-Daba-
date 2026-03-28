'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, Search, ShoppingBag, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import CartDrawer from '@/components/cart/CartDrawer';
import { useCartStore } from '@/store/cartStore';

const Navbar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const totalItems = useCartStore((state) => state.getTotalItems());

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-cream/90 backdrop-blur-sm border-b border-stone/10">
        <div className="container-luxury py-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="text-2xl font-serif tracking-wider text-charcoal hover:opacity-70 transition">
              ÉLÉGANCE
            </Link>

            {/* Navigation Desktop */}
            <nav className="hidden md:flex items-center gap-12">
              <Link href="/" className="text-sm uppercase tracking-wider hover:text-stone">Accueil</Link>
              <Link href="/boutique" className="text-sm uppercase tracking-wider hover:text-stone">Boutique</Link>
              <Link href="/collections" className="text-sm uppercase tracking-wider hover:text-stone">Collections</Link>
              <Link href="/a-propos" className="text-sm uppercase tracking-wider hover:text-stone">À propos</Link>
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="hover:bg-transparent" onClick={() => setIsSearchOpen(!isSearchOpen)}>
                <Search className="h-5 w-5" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="hover:bg-transparent relative"
                onClick={() => setIsCartOpen(true)}
              >
                <ShoppingBag className="h-5 w-5" />
                {mounted && totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-charcoal text-cream text-xs w-4 h-4 rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Button>
              
              {/* Mobile Menu */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="md:hidden hover:bg-transparent">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] bg-cream border-l border-stone/10">
                  <div className="flex flex-col gap-8 mt-12">
                    <Link href="/" className="text-lg tracking-wide hover:text-stone">Accueil</Link>
                    <Link href="/boutique" className="text-lg tracking-wide hover:text-stone">Boutique</Link>
                    <Link href="/collections" className="text-lg tracking-wide hover:text-stone">Collections</Link>
                    <Link href="/a-propos" className="text-lg tracking-wide hover:text-stone">À propos</Link>
                    <div className="border-t border-stone/10 pt-6 mt-4">
                      <Link href="/contact" className="block text-sm text-stone mb-3">Contact</Link>
                      <Link href="/faq" className="block text-sm text-stone mb-3">FAQ</Link>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        {isSearchOpen && (
          <div className="absolute top-full left-0 right-0 bg-cream border-b border-stone/10 py-6">
            <div className="container-luxury">
              <div className="relative">
                <Search className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-5 text-stone" />
                <input
                  type="text"
                  placeholder="Rechercher un produit..."
                  className="w-full pl-10 pr-4 py-3 bg-transparent border-b border-stone/20 focus:outline-none focus:border-charcoal text-charcoal placeholder:text-stone/50"
                  autoFocus
                />
                <button
                  onClick={() => setIsSearchOpen(false)}
                  className="absolute right-0 top-1/2 -translate-y-1/2"
                >
                  <X className="h-5 w-5 text-stone" />
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Spacer */}
      <div className="h-[88px]" />

      {/* Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default Navbar;