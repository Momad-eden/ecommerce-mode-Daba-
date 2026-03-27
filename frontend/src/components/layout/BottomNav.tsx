'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, ShoppingBag, Heart, User } from 'lucide-react';

const BottomNav = () => {
  const pathname = usePathname();

  const navItems = [
    { href: '/', icon: Home, label: 'Accueil', center: true },
    { href: '/boutique', icon: ShoppingBag, label: 'Boutique', center: false },
    { href: '/favoris', icon: Heart, label: 'Favoris', center: false },
    { href: '/profil', icon: User, label: 'Profil', center: false },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-cream border-t border-stone/10 py-3 md:hidden z-50">
      <div className="flex justify-around items-center">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const isCenter = item.center;
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-1 transition-all ${
                isActive ? 'text-charcoal' : 'text-stone/60'
              } ${isCenter ? 'relative -top-2' : ''}`}
            >
              {isCenter ? (
                <div className="bg-charcoal text-cream p-3 rounded-full shadow-lg">
                  <item.icon className="h-6 w-6" />
                </div>
              ) : (
                <item.icon className="h-5 w-5" />
              )}
              <span className={`text-xs ${isCenter ? 'hidden' : 'block'}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNav;