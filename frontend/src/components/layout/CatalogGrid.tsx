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

  // Produits mis en avant
  const featuredProducts = products.filter(product => product.featured === true);
  const displayProducts = featuredProducts.length > 0 ? featuredProducts : products;

  if (displayProducts.length === 0) return null;

  return (
    <section className="py-24 bg-gradient-to-b from-cream via-white to-cream/60">
      <div className="container-luxury px-4 sm:px-6 md:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16 md:mb-20"
        >
          <span className="text-stone text-xs tracking-[0.3em] uppercase block mb-4">
            Sélection
          </span>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-charcoal mb-5 leading-tight">
            {title}
          </h2>

          <p className="text-stone text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>

          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-stone/40 to-transparent mx-auto mt-6" />
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12 md:gap-y-14">
          {displayProducts.slice(0, 8).map((product, index) => (

            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="group"
            >
              {/* 🔥 Wrapper avec bordure */}
              <div className="relative border border-stone/20 hover:border-charcoal/40 transition-all duration-300 p-2 bg-white">

                {/* Effet interne (différence avec bouton) */}
                <div className="border border-transparent group-hover:border-stone/30 transition-all duration-300">

                  <ProductCard product={product} index={index} />

                </div>

              </div>
            </motion.div>

          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <Link href="/boutique">
            <Button
              variant="outline"
              className="group border-charcoal/70 text-charcoal hover:bg-charcoal hover:text-white hover:border-charcoal px-10 py-6 rounded-none transition-all duration-300"
            >
              <span className="tracking-wide">
                Découvrir la Boutique
              </span>

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
                className="ml-3 transition-transform duration-300 group-hover:translate-x-1"
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