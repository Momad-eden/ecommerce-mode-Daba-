'use client';

import { useState } from 'react';
import { ProductVariant } from '@/types/product';

interface ProductVariantsProps {
  variants: ProductVariant[];
}

export default function ProductVariants({ variants }: ProductVariantsProps) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  
  // Extraire les tailles et couleurs uniques
  const sizes = [...new Map(variants.map(v => [v.size, v])).values()];
  const colors = [...new Map(variants.map(v => [v.color, v])).values()];
  
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

  return (
    <div className="space-y-6">
      {/* Tailles */}
      {sizes.length > 0 && (
        <div>
          <div className="flex justify-between mb-3">
            <span className="text-sm font-medium text-charcoal">Taille</span>
            <button className="text-xs text-stone underline hover:text-charcoal">
              Guide des tailles
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {sizes.map((variant) => (
              <button
                key={variant.size}
                onClick={() => setSelectedSize(variant.size)}
                className={`min-w-[48px] px-4 py-2 text-sm rounded-full border transition-all duration-300 ${
                  selectedSize === variant.size
                    ? 'bg-charcoal text-white border-charcoal'
                    : 'border-stone/30 text-stone hover:border-charcoal hover:text-charcoal'
                } ${variant.stock === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={variant.stock === 0}
              >
                {variant.size}
              </button>
            ))}
          </div>
        </div>
      )}
      
      {/* Couleurs */}
      {colors.length > 0 && (
        <div>
          <span className="text-sm font-medium text-charcoal mb-3 block">Couleur</span>
          <div className="flex flex-wrap gap-3">
            {colors.map((variant) => (
              <button
                key={variant.color}
                onClick={() => setSelectedColor(variant.color)}
                className="group relative"
              >
                <div
                  className={`w-10 h-10 rounded-full ${getColorClass(variant.color)} shadow-sm transition-all duration-300 ${
                    selectedColor === variant.color
                      ? 'ring-2 ring-charcoal ring-offset-2'
                      : 'hover:scale-110'
                  }`}
                />
                <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-stone opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {variant.color}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}