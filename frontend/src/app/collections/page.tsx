'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import ProductImage from '@/components/ui/ProductImage';
import { getCategories } from '@/services/api';
import { Category } from '@/types/product';

export default function CollectionsPage() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    getCategories().then(setCategories).catch(console.error);
  }, []);

  return (
    <div className="min-h-screen">
      <div className="container-luxury py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-light mb-4">Nos Collections</h1>
          <p className="text-stone">Découvrez nos univers inspirés par l'élégance intemporelle</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={`/categorie/${category.slug}`}>
                <div className="group relative overflow-hidden aspect-[3/4] rounded-lg">
                  {category.image ? (
                    <ProductImage
                      src={category.image}
                      alt={category.name}
                      fill
                      className="group-hover:scale-110 transition duration-700"
                    />
                  ) : (
                    <div className="w-full h-full bg-sand" />
                  )}
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-6">
                    <h2 className="text-2xl font-light mb-2">{category.name}</h2>
                    <p className="text-sm opacity-90">{category.style}</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}