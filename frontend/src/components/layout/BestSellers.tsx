'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import ProductCard from '@/components/ui/ProductCard';
import { Product } from '@/types/product';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface BestSellersProps {
  products: Product[];
}

export default function BestSellers({ products }: BestSellersProps) {
  return (
    <section className="relative py-24 px-4 bg-gradient-to-b from-white via-gray-50 to-beige/30 overflow-hidden">
      
      <div className="container mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="inline-block text-gold-500 text-xs tracking-[0.3em] uppercase mb-4"
          >
            Nos incontournables
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-light text-charcoal"
          >
            Meilleures ventes
          </motion.h2>

          <div className="w-16 h-[1px] bg-stone/40 mx-auto my-6" />

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-gray-500 text-sm md:text-base max-w-2xl mx-auto"
          >
            Les pièces les plus prisées de la saison, adoptées par notre communauté
          </motion.p>
        </div>
        
        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-14">
          {products.map((product, index) => (
            
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="group"
            >
              
              {/* 🔥 Image container (plus haut, sans arrondi) */}
              <div className="relative h-[420px] md:h-[460px] lg:h-[500px] overflow-hidden border border-stone/20 bg-white shadow-sm hover:shadow-xl transition-all duration-500">
                
                {/* ProductCard (image + contenu interne) */}
                <div className="absolute inset-0">
                  <ProductCard product={product} index={index} />
                </div>

                {/* Overlay hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-500" />

                {/* Bouton hover */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-400">
                  <button className="bg-white text-charcoal text-xs px-4 py-2 shadow-md hover:bg-charcoal hover:text-white transition">
                    Voir produit
                  </button>
                </div>

              </div>

            </motion.div>

          ))}
        </div>
        
        {/* CTA */}
        <div className="text-center mt-20">
          <Button
            variant="outline"
            size="lg"
            asChild
            className="group border-stone/40 text-charcoal hover:bg-charcoal hover:text-white hover:border-charcoal transition-all duration-300 px-8 py-6"
          >
            <Link href="/boutique">
              <span className="tracking-wide">
                Voir toute la collection
              </span>
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>

      </div>
    </section>
  );
}