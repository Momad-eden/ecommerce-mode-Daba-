'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Category } from '@/types/product';
import ProductImage from '@/components/ui/ProductImage';

interface CategoryGridProps {
  categories: Category[];
}

export default function CategoryGrid({ categories }: CategoryGridProps) {
  const mainCategories = categories.slice(0, 4);
  
  if (mainCategories.length === 0) {
    return null;
  }

  return (
    <section className="py-20 sm:py-24 md:py-28 bg-gradient-to-b from-white via-cream/40 to-beige/30">
      <div className="container-luxury px-4 sm:px-6 md:px-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-16 md:mb-20"
        >
          <span className="inline-block text-stone text-xs tracking-[0.3em] uppercase mb-4 font-light">
            Par catégorie
          </span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-charcoal mb-6 leading-tight">
            Explorez nos collections
          </h2>

          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-stone/40 to-transparent mx-auto" />
        </motion.div>
        
        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {mainCategories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <Link href={`/categorie/${category.slug}`}>
                
                <div className="relative rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500">
                  
                  {/* Image */}
                  <div className="relative aspect-[4/3] md:aspect-[16/10] overflow-hidden">
                    {category.image ? (
                      <ProductImage
                        src={category.image}
                        alt={category.name}
                        fill
                        className="object-cover scale-100 group-hover:scale-110 transition-transform duration-700 ease-out"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-sand via-beige to-cream" />
                    )}

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Subtle light effect */}
                    <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition duration-500" />
                  </div>
                  
                  {/* Content */}
                  <div className="absolute bottom-0 inset-x-0 p-6 md:p-8">
                    
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                    >
                      <h3 className="text-white text-2xl sm:text-3xl md:text-4xl font-light mb-3 tracking-wide">
                        {category.name}
                      </h3>

                      {category.description && (
                        <p className="text-white/70 text-sm md:text-base mb-5 max-w-md leading-relaxed line-clamp-2">
                          {category.description}
                        </p>
                      )}

                      {/* CTA */}
                      <div className="inline-flex items-center gap-2 text-white/80 text-sm group-hover:text-white transition-all duration-300">
                        <span className="relative">
                          Découvrir
                          <span className="absolute left-0 -bottom-1 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full" />
                        </span>

                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </motion.div>
                  </div>

                </div>
              </Link>
            </motion.div>
          ))}
        </div>
        
        {/* CTA Bottom */}
        {categories.length > 4 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-center mt-16 md:mt-20"
          >
            <Link href="/collections">
              <button className="group inline-flex items-center gap-3 px-8 py-4 border border-stone/30 text-charcoal rounded-full hover:bg-charcoal hover:text-white hover:border-charcoal transition-all duration-300 backdrop-blur-sm">
                
                <span className="text-sm tracking-wide">
                  Découvrir toutes nos collections
                </span>

                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}