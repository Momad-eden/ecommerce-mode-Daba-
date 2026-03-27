'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShoppingBag, Eye } from 'lucide-react';
import ProductImage from '@/components/ui/ProductImage';
import { Product } from '@/types/product';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [currentImage, setCurrentImage] = useState(product.image_main);

  const hasPromotion = product.promotions && product.promotions.length > 0;
  const discountedPrice = hasPromotion 
    ? product.price * (1 - product.promotions[0].value / 100)
    : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      viewport={{ once: true }}
      className="group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/produit/${product.slug}`}>
        <div className="relative aspect-[3/4] overflow-hidden bg-sand mb-4 rounded-lg">
          {/* Image principale */}
          <ProductImage
            src={currentImage}
            alt={product.name}
            fill
            className={`object-cover transition-all duration-700 ${
              isHovered ? 'scale-110' : 'scale-100'
            }`}
          />
          
          {/* Deuxième image au hover */}
          {product.image_secondary_1 && isHovered && (
            <ProductImage
              src={product.image_secondary_1}
              alt={`${product.name} - vue 2`}
              fill
              className="object-cover transition-opacity duration-500 opacity-100"
            />
          )}
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1">
            {hasPromotion && (
              <span className="bg-gold-500 text-white text-[10px] px-2 py-1 rounded-full">
                -{product.promotions[0].value}%
              </span>
            )}
            {product.new_arrival && (
              <span className="bg-charcoal text-white text-[10px] px-2 py-1 rounded-full">
                Nouveau
              </span>
            )}
          </div>
          
          {/* Actions au hover (desktop) */}
          <div className={`absolute bottom-3 left-3 right-3 flex gap-2 transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0 md:opacity-0'
          }`}>
            <button className="flex-1 bg-white/90 backdrop-blur-sm text-charcoal text-xs py-2 rounded-full flex items-center justify-center gap-1 hover:bg-white transition">
              <ShoppingBag className="h-3 w-3" />
              <span className="hidden sm:inline">Ajouter</span>
            </button>
            <button className="bg-white/90 backdrop-blur-sm text-charcoal p-2 rounded-full hover:bg-white transition">
              <Eye className="h-3 w-3" />
            </button>
          </div>
        </div>
        
        {/* Infos produit */}
        <div className="text-center">
          <h3 className="text-sm font-light text-charcoal mb-1 line-clamp-1">
            {product.name}
          </h3>
          <div className="flex items-center justify-center gap-2">
            {hasPromotion ? (
              <>
                <span className="text-sm text-stone line-through">
                  {product.price.toLocaleString()} FCFA
                </span>
                <span className="text-sm font-medium text-gold-600">
                  {Math.floor(discountedPrice!).toLocaleString()} FCFA
                </span>
              </>
            ) : (
              <span className="text-sm font-medium text-charcoal">
                {product.price.toLocaleString()} FCFA
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}