'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Heart, ShoppingBag, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getProductBySlug } from '@/services/api';
import { Product } from '@/types/product';
import { toast } from 'sonner';
import { useCartStore } from '@/store/cartStore';

export default function ProductPage() {
  const { slug } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const addToCart = useCartStore((state) => state.addItem);

  useEffect(() => {
    if (slug) {
      getProductBySlug(slug as string)
        .then(setProduct)
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [slug]);

  const images = product ? [
    product.image_main,
    product.image_secondary_1,
    product.image_secondary_2,
    product.image_secondary_3,
  ].filter(Boolean) : [];

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + images.length) % images.length);
  };

  const sizes = product?.variants ? [...new Map(product.variants.map(v => [v.size, v])).values()] : [];
  const colors = product?.variants ? [...new Map(product.variants.map(v => [v.color, v])).values()] : [];

  const getColorClass = (color: string) => {
    const colorMap: Record<string, string> = {
      'Noir': 'bg-black',
      'Blanc': 'bg-white border border-gray-200',
      'Beige': 'bg-[#f5f0e8]',
      'Bleu': 'bg-blue-600',
      'Rouge': 'bg-red-600',
      'Vert': 'bg-green-600',
      'Gris': 'bg-gray-500',
    };
    return colorMap[color] || 'bg-gray-300';
  };

  const hasPromotion = product?.promotions && product.promotions.length > 0;
  const discountedPrice = hasPromotion && product
    ? product.price * (1 - product.promotions[0].value / 100)
    : null;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-cream">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-charcoal border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-stone text-sm">Chargement...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-cream">
        <div className="text-center">
          <p className="text-stone mb-4">Produit non trouvé</p>
          <button
            onClick={() => router.back()}
            className="text-charcoal underline"
          >
            Retour
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream">

      {/* Contenu */}
      <div className="max-w-6xl mx-auto my-6 px-4 py-6 md:py-8">
        {/* Layout Desktop: 2 colonnes */}
        <div className="lg:grid lg:grid-cols-2 lg:gap-10 lg:items-start">

          {/* Colonne gauche - Image */}
          <div className="relative mb-6 lg:mb-0">
            <div className="relative aspect-[4/4] bg-sand/20 rounded-2xl overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.img
                  key={selectedImage}
                  src={images[selectedImage] || product.image_main}
                  alt={product.name}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>

              {/* Badges */}
              {product.best_seller && (
                <div className="absolute top-3 left-3">
                  <span className="bg-charcoal text-white text-[10px] px-2 py-1 rounded-full">
                    BEST SELLER
                  </span>
                </div>
              )}
              {hasPromotion && (
                <div className="absolute top-3 right-3">
                  <span className="bg-gold-500 text-white text-[10px] px-2 py-1 rounded-full">
                    -{product.promotions![0].value}%
                  </span>
                </div>
              )}

              {/* Indicateur images */}
              {images.length > 1 && (
                <div className="absolute bottom-3 right-3 bg-black/50 backdrop-blur-sm px-2 py-1 rounded-full text-white text-[10px]">
                  {selectedImage + 1}/{images.length}
                </div>
              )}

              {/* Navigation mobile */}
              {images.length > 1 && (
                <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-3 pointer-events-none lg:hidden">
                  <button
                    onClick={prevImage}
                    className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm pointer-events-auto hover:bg-white transition-all"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm pointer-events-auto hover:bg-white transition-all"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>

            {/* Thumbnails Desktop */}
            {images.length > 1 && (
              <div className="hidden lg:flex gap-2 mt-3">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`relative w-16 h-16 rounded-lg overflow-hidden transition-all duration-200 ${selectedImage === idx
                      ? 'ring-2 ring-charcoal ring-offset-1'
                      : 'opacity-60 hover:opacity-100'
                      }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Colonne droite - Détails premium */}
          <div className="flex flex-col h-full lg:pl-8">
            <div className="flex-1 space-y-6">

              {/* Marque */}
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-stone uppercase tracking-[0.2em]">
                  ÉLÉGANCE
                </span>
                <div className="w-1 h-1 bg-gold-500 rounded-full" />
                <span className="text-[10px] text-gold-500 font-medium">
                  Vérifié
                </span>
              </div>

              {/* Nom */}
              <h1 className="text-2xl md:text-3xl font-medium text-charcoal leading-tight">
                {product.name}
              </h1>

              {/* Prix */}
              <div className="flex items-center gap-3">
                {hasPromotion ? (
                  <>
                    <span className="text-2xl font-semibold text-gold-600">
                      {Math.floor(discountedPrice!).toLocaleString()} FCFA
                    </span>
                    <span className="text-sm text-stone line-through">
                      {product.price.toLocaleString()} FCFA
                    </span>
                  </>
                ) : (
                  <span className="text-2xl font-semibold text-charcoal">
                    {product.price.toLocaleString()} FCFA
                  </span>
                )}
              </div>

              {/* Stock */}
              <div className="flex items-center gap-2 text-xs text-green-600 bg-green-50 px-3 py-1 rounded-full w-fit">
                <Check className="h-3 w-3" />
                En stock
              </div>

              {/* Taille */}
              {sizes.length > 0 && (
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-charcoal">Taille</span>
                    <button className="text-[11px] text-stone underline hover:text-charcoal">
                      Guide
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {sizes.map((variant) => (
                      <button
                        key={variant.size}
                        onClick={() => setSelectedSize(variant.size)}
                        className={`px-4 py-2 text-sm rounded-full border transition-all duration-200 ${selectedSize === variant.size
                          ? 'bg-charcoal text-white border-charcoal scale-105'
                          : 'border-stone/30 text-stone hover:border-charcoal hover:text-charcoal hover:scale-105'
                          }`}
                      >
                        {variant.size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Couleur */}
              {colors.length > 0 && (
                <div className="space-y-3">
                  <span className="text-sm font-medium text-charcoal">Couleur</span>

                  <div className="flex gap-3">
                    {colors.map((variant) => (
                      <button
                        key={variant.color}
                        onClick={() => setSelectedColor(variant.color)}
                        className={`w-9 h-9 rounded-full ${getColorClass(variant.color)} transition-all duration-200 ${selectedColor === variant.color
                          ? 'ring-2 ring-charcoal ring-offset-2 scale-110'
                          : 'hover:scale-110'
                          }`}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Description */}
              <div className="space-y-2 border-t border-stone/20 pt-4">
                <span className="text-sm font-medium text-charcoal">Description</span>

                <p className="text-stone text-sm leading-relaxed">
                  {showFullDescription
                    ? product.description
                    : `${product.description.slice(0, 110)}${product.description.length > 110 ? '...' : ''}`}
                </p>

                {product.description.length > 100 && (
                  <button
                    onClick={() => setShowFullDescription(!showFullDescription)}
                    className="text-xs text-charcoal underline hover:opacity-70"
                  >
                    {showFullDescription ? 'Voir moins' : 'Lire plus'}
                  </button>
                )}
              </div>

              {/* Quantité */}
              <div className="space-y-2">
                <span className="text-sm font-medium text-charcoal">Quantité</span>

                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-9 h-9 rounded-full border border-stone/30 flex items-center justify-center hover:bg-charcoal hover:text-white transition-all"
                  >
                    -
                  </button>

                  <span className="text-base font-medium w-6 text-center">
                    {quantity}
                  </span>

                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-9 h-9 rounded-full border border-stone/30 flex items-center justify-center hover:bg-charcoal hover:text-white transition-all"
                  >
                    +
                  </button>
                </div>
              </div>

            </div>

            {/* Boutons premium */}
            <div className="sticky bottom-0 bg-white/80 backdrop-blur-md pt-4 mt-6 space-y-3 border-t border-stone/20">

              <Button className="w-full bg-charcoal text-white hover:bg-black rounded-full py-6 text-sm font-medium transition-all">
                <ShoppingBag className="h-4 w-4 mr-2" />
                Acheter — {(discountedPrice || product.price).toLocaleString()} FCFA
              </Button>

              <Button
                variant="outline"
                onClick={() => {
                  const selectedVariant = product.variants?.find(v =>
                    v.size === selectedSize && v.color === selectedColor
                  );
                  addToCart(product, selectedVariant || null, quantity);
                  
                  // Afficher le toast de confirmation
                  toast.success('Ajouté au panier', {
                    description: `${product.name} × ${quantity}`,
                    duration: 2000,
                  });
                }}
                className="w-full border-charcoal text-charcoal hover:bg-charcoal hover:text-white rounded-full py-5 transition-all bg-white/90 backdrop-blur-sm"
              >
                Ajouter au panier
              </Button>

            </div>
          </div>
        </div>
      </div>

      {/* Espace en bas pour éviter que le contenu soit collé */}
      <div className="h-8 lg:h-4" />
    </div>
  );
}