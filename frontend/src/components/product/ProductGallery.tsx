'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import ProductImage from '@/components/ui/ProductImage';
import { Product } from '@/types/product';

interface ProductGalleryProps {
  product: Product;
}

export default function ProductGallery({ product }: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  
  const images = [
    product.image_main,
    product.image_secondary_1,
    product.image_secondary_2,
    product.image_secondary_3,
  ].filter(Boolean);

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="relative">
      {/* Image principale */}
      <div className="relative aspect-[3/4] rounded-3xl overflow-hidden bg-sand/30 shadow-lg">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedImage}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="relative w-full h-full"
          >
            <ProductImage
              src={images[selectedImage]}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
          </motion.div>
        </AnimatePresence>
        
        {/* Badge */}
        {product.best_seller && (
          <div className="absolute top-4 left-4 z-10">
            <span className="bg-charcoal text-white text-xs px-3 py-1 rounded-full">
              BEST SELLER
            </span>
          </div>
        )}
        
        {/* Cœur favori */}
        <button
          onClick={() => setIsWishlisted(!isWishlisted)}
          className="absolute top-4 right-4 z-10 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-md hover:bg-white transition-all duration-300"
        >
          <Heart
            className={`h-5 w-5 transition-colors ${
              isWishlisted ? 'fill-red-500 text-red-500' : 'text-charcoal'
            }`}
          />
        </button>
        
        {/* Navigation flèches */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-md hover:bg-white transition-all duration-300"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-md hover:bg-white transition-all duration-300"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}
      </div>
      
      {/* Miniatures */}
      {images.length > 1 && (
        <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedImage(idx)}
              className={`relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 transition-all duration-300 ${
                selectedImage === idx
                  ? 'ring-2 ring-charcoal ring-offset-2'
                  : 'opacity-60 hover:opacity-100'
              }`}
            >
              <ProductImage
                src={img}
                alt={`Vue ${idx + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}