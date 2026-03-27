'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import ProductImage from './ProductImage';
import { Product } from '@/types/product';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      viewport={{ once: true }}
      className="group"
    >
      <Link href={`/produit/${product.slug}`}>
        <div className="relative aspect-[3/4] overflow-hidden bg-sand mb-4">
          <ProductImage
            src={product.image_main}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition duration-700"
          />
          
          {/* Wishlist button */}
          <button className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white">
            <Heart className="h-4 w-4 text-stone" />
          </button>
          
          {/* Badge */}
          {product.new_arrival && (
            <span className="absolute top-4 left-4 text-xs tracking-wider text-stone bg-white/80 px-3 py-1">
              Nouveau
            </span>
          )}
        </div>
        
        <div className="text-center">
          <h3 className="text-sm font-light tracking-wide mb-1">{product.name}</h3>
          <p className="text-xs text-stone mb-2">{product.categories[0]?.name}</p>
          <p className="text-sm font-medium">{product.price.toLocaleString()} FCFA</p>
        </div>
      </Link>
    </motion.div>
  );
}