'use client';

import Link from 'next/link';
import { 
  Instagram, 
  Linkedin, 
  Twitter,
  // Si ces icônes n'existent pas, on utilisera des emojis ou on crée des SVG
} from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-beige border-t border-stone/10 py-16">
      <div className="container-luxury">
        <div className="grid md:grid-cols-4 gap-12">
          <div>
            <h3 className="text-xl font-serif mb-4">ÉLÉGANCE</h3>
            <p className="text-sm text-stone">
              Des pièces uniques pour une élégance intemporelle.
            </p>
          </div>
          
          <div>
            <h4 className="text-sm uppercase tracking-wider mb-4">Liens</h4>
            <ul className="space-y-2 text-sm text-stone">
              <li><Link href="/boutique" className="hover:text-charcoal transition-colors">Boutique</Link></li>
              <li><Link href="/collections" className="hover:text-charcoal transition-colors">Collections</Link></li>
              <li><Link href="/a-propos" className="hover:text-charcoal transition-colors">À propos</Link></li>
              <li><Link href="/contact" className="hover:text-charcoal transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm uppercase tracking-wider mb-4">Informations</h4>
            <ul className="space-y-2 text-sm text-stone">
              <li><Link href="/livraison" className="hover:text-charcoal transition-colors">Livraison</Link></li>
              <li><Link href="/retours" className="hover:text-charcoal transition-colors">Retours</Link></li>
              <li><Link href="/faq" className="hover:text-charcoal transition-colors">FAQ</Link></li>
              <li><Link href="/politique" className="hover:text-charcoal transition-colors">Politique de confidentialité</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm uppercase tracking-wider mb-4">Suivez-nous</h4>
            <div className="flex gap-4">
              <Link href="#" className="text-stone hover:text-charcoal transition-colors" aria-label="Instagram">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </Link>
              <Link href="#" className="text-stone hover:text-charcoal transition-colors" aria-label="Facebook">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </Link>
              <Link href="#" className="text-stone hover:text-charcoal transition-colors" aria-label="Twitter">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </Link>
            </div>
            <p className="text-xs text-stone mt-4">
              © 2025 ÉLÉGANCE. Tous droits réservés.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}