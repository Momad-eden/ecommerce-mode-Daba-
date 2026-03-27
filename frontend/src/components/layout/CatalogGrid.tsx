'use client';

import { motion } from 'framer-motion';
import ProductCard from '@/components/ui/ProductCard';
import { Product } from '@/types/product';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface CatalogGridProps {
  products: Product[];
  title?: string;
  subtitle?: string;
}

export default function CatalogGrid({ 
  products, 
  title = "Pièces intemporelles",
  subtitle = "Les incontournables de notre collection"
}: CatalogGridProps) {
  // Filtrer pour n'afficher que les produits mis à la une (featured)
  const featuredProducts = products.filter(product => product.featured === true);
  
  // Si pas de produits mis à la une, afficher tous les produits
  const displayProducts = featuredProducts.length > 0 ? featuredProducts : products;

  if (displayProducts.length === 0) {
    return null;
  }

  return (
    <section className="py-24 bg-cream">
      <div className="container-luxury">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-stone text-sm tracking-[0.2em] uppercase block mb-4">
            Sélection
          </span>
          <h2 className="text-3xl md:text-4xl font-light text-charcoal mb-4">
            {title}
          </h2>
          <p className="text-stone max-w-2xl mx-auto">
            {subtitle}
          </p>
          <div className="w-12 h-px bg-stone/30 mx-auto mt-6" />
        </motion.div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {displayProducts.slice(0, 8).map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Link href="/boutique">
            <Button 
              variant="outline" 
              className="border-charcoal text-charcoal hover:bg-charcoal hover:text-cream rounded-none px-8 py-5 transition-all duration-300 group"
            >
              Découvrir la Boutique
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="ml-2 group-hover:translate-x-1 transition-transform"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}