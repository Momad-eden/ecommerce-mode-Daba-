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
    <section className="py-24 px-4 bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-gold-500 text-sm tracking-[0.2em] uppercase"
          >
            Nos incontournables
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-light mt-4"
          >
            Meilleures ventes
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-500 mt-4 max-w-2xl mx-auto"
          >
            Les pièces les plus prisées de la saison, adoptées par notre communauté
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
        
        <div className="text-center mt-16">
          <Button variant="outline" size="lg" asChild className="border-black hover:bg-black hover:text-white">
            <Link href="/boutique">
              Voir toute la collection
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}