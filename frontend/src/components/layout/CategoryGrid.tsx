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
    <section className="py-16 sm:py-20 md:py-24 lg:py-28 bg-gradient-to-b from-white to-beige/20">
      <div className="container-luxury px-4 sm:px-6 md:px-8">
        {/* En-tête de section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16 md:mb-20"
        >
          <span className="inline-block text-stone text-xs sm:text-sm tracking-[0.2em] uppercase mb-3 sm:mb-4 font-light">
            Par catégorie
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-charcoal mb-4">
            Explorez nos collections
          </h2>
          <div className="w-12 sm:w-16 h-px bg-stone/30 mx-auto mt-4 sm:mt-6" />
        </motion.div>
        
        {/* Grille des catégories */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10">
          {mainCategories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <Link href={`/categorie/${category.slug}`}>
                <div className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500">
                  {/* Image */}
                  <div className="relative aspect-[4/3] sm:aspect-[3/2] md:aspect-[16/9] overflow-hidden">
                    {category.image ? (
                      <ProductImage
                        src={category.image}
                        alt={category.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-sand to-beige" />
                    )}
                    
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/30 to-transparent" />
                  </div>
                  
                  {/* Contenu texte */}
                  <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 md:p-10">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                    >
                      <h3 className="text-white text-2xl sm:text-3xl md:text-4xl font-light mb-2">
                        {category.name}
                      </h3>
                      {category.description && (
                        <p className="text-white/80 text-sm sm:text-base mb-4 max-w-md line-clamp-2">
                          {category.description}
                        </p>
                      )}
                      <div className="inline-flex items-center gap-2 text-white/80 text-sm border-b border-white/40 pb-1 group-hover:border-white group-hover:text-white transition-all duration-300">
                        <span>Découvrir</span>
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </motion.div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
        
        {/* Bouton "Voir toutes les catégories" */}
        {categories.length > 4 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center mt-12 sm:mt-16 md:mt-20"
          >
            <Link href="/collections">
              <button className="group inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-transparent border border-stone/30 text-charcoal hover:border-charcoal hover:bg-charcoal hover:text-white rounded-full transition-all duration-300">
                <span className="text-sm sm:text-base tracking-wide">
                  Découvrir toutes nos collections
                </span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}