'use client';

import { useState } from 'react';
import { ChevronDown, X } from 'lucide-react';
import { Category } from '@/types/product';

interface FiltersDesktopProps {
  categories: Category[];
  selectedCategory: string;
  selectedGender: string;
  selectedStyle: string;
  priceRange: [number, number];
  maxPrice: number;
  onCategoryChange: (category: string) => void;
  onGenderChange: (gender: string) => void;
  onStyleChange: (style: string) => void;
  onPriceChange: (range: [number, number]) => void;
  onReset: () => void;
}

export default function FiltersDesktop({
  categories,
  selectedCategory,
  selectedGender,
  selectedStyle,
  priceRange,
  maxPrice,
  onCategoryChange,
  onGenderChange,
  onStyleChange,
  onPriceChange,
  onReset,
}: FiltersDesktopProps) {
  const [openFilter, setOpenFilter] = useState<string | null>(null);

  const genders = [
    { value: '', label: 'Tous' },
    { value: 'homme', label: 'Homme' },
    { value: 'femme', label: 'Femme' },
    { value: 'enfant', label: 'Enfant' },
  ];

  const styles = [
    { value: '', label: 'Tous' },
    { value: 'africaine', label: 'Tenue Africaine' },
    { value: 'mariage', label: 'Mariage' },
    { value: 'decontracte', label: 'Décontracté' },
    { value: 'professionnel', label: 'Professionnel' },
    { value: 'soiree', label: 'Soirée' },
  ];

  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  const colors = ['Noir', 'Blanc', 'Beige', 'Bleu', 'Rouge', 'Vert'];

  return (
    <div className="border-b border-stone/20 pb-6 mb-8">
      <div className="flex flex-wrap items-center gap-6">
        {/* Filtre Catégorie */}
        <div className="relative">
          <button
            onClick={() => setOpenFilter(openFilter === 'category' ? null : 'category')}
            className="flex items-center gap-2 text-sm text-stone hover:text-charcoal transition-colors"
          >
            Catégorie
            <ChevronDown className="h-4 w-4" />
          </button>
          {openFilter === 'category' && (
            <div className="absolute top-full left-0 mt-2 bg-white shadow-lg border border-stone/10 rounded-lg p-4 min-w-[200px] z-20">
              <div className="space-y-2">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      onCategoryChange(cat.slug);
                      setOpenFilter(null);
                    }}
                    className={`block w-full text-left px-3 py-2 text-sm rounded-lg transition-colors ${
                      selectedCategory === cat.slug
                        ? 'bg-charcoal text-white'
                        : 'text-stone hover:bg-stone/10'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Filtre Genre */}
        <div className="relative">
          <button
            onClick={() => setOpenFilter(openFilter === 'gender' ? null : 'gender')}
            className="flex items-center gap-2 text-sm text-stone hover:text-charcoal transition-colors"
          >
            Genre
            <ChevronDown className="h-4 w-4" />
          </button>
          {openFilter === 'gender' && (
            <div className="absolute top-full left-0 mt-2 bg-white shadow-lg border border-stone/10 rounded-lg p-4 min-w-[150px] z-20">
              <div className="space-y-2">
                {genders.map((gender) => (
                  <button
                    key={gender.value}
                    onClick={() => {
                      onGenderChange(gender.value);
                      setOpenFilter(null);
                    }}
                    className={`block w-full text-left px-3 py-2 text-sm rounded-lg transition-colors ${
                      selectedGender === gender.value
                        ? 'bg-charcoal text-white'
                        : 'text-stone hover:bg-stone/10'
                    }`}
                  >
                    {gender.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Filtre Style */}
        <div className="relative">
          <button
            onClick={() => setOpenFilter(openFilter === 'style' ? null : 'style')}
            className="flex items-center gap-2 text-sm text-stone hover:text-charcoal transition-colors"
          >
            Style
            <ChevronDown className="h-4 w-4" />
          </button>
          {openFilter === 'style' && (
            <div className="absolute top-full left-0 mt-2 bg-white shadow-lg border border-stone/10 rounded-lg p-4 min-w-[180px] z-20">
              <div className="space-y-2">
                {styles.map((style) => (
                  <button
                    key={style.value}
                    onClick={() => {
                      onStyleChange(style.value);
                      setOpenFilter(null);
                    }}
                    className={`block w-full text-left px-3 py-2 text-sm rounded-lg transition-colors ${
                      selectedStyle === style.value
                        ? 'bg-charcoal text-white'
                        : 'text-stone hover:bg-stone/10'
                    }`}
                  >
                    {style.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Filtre Prix */}
        <div className="relative">
          <button
            onClick={() => setOpenFilter(openFilter === 'price' ? null : 'price')}
            className="flex items-center gap-2 text-sm text-stone hover:text-charcoal transition-colors"
          >
            Prix
            <ChevronDown className="h-4 w-4" />
          </button>
          {openFilter === 'price' && (
            <div className="absolute top-full left-0 mt-2 bg-white shadow-lg border border-stone/10 rounded-lg p-6 min-w-[280px] z-20">
              <div className="space-y-4">
                <input
                  type="range"
                  min={0}
                  max={maxPrice}
                  value={priceRange[1]}
                  onChange={(e) => onPriceChange([0, parseInt(e.target.value)])}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-stone">
                  <span>0 FCFA</span>
                  <span>{priceRange[1].toLocaleString()} FCFA</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Filtre Taille */}
        <div className="relative">
          <button
            onClick={() => setOpenFilter(openFilter === 'size' ? null : 'size')}
            className="flex items-center gap-2 text-sm text-stone hover:text-charcoal transition-colors"
          >
            Taille
            <ChevronDown className="h-4 w-4" />
          </button>
          {openFilter === 'size' && (
            <div className="absolute top-full left-0 mt-2 bg-white shadow-lg border border-stone/10 rounded-lg p-4 min-w-[200px] z-20">
              <div className="grid grid-cols-3 gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    className="px-3 py-2 text-sm border border-stone/20 rounded-lg hover:border-charcoal transition-colors"
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Filtre Couleur */}
        <div className="relative">
          <button
            onClick={() => setOpenFilter(openFilter === 'color' ? null : 'color')}
            className="flex items-center gap-2 text-sm text-stone hover:text-charcoal transition-colors"
          >
            Couleur
            <ChevronDown className="h-4 w-4" />
          </button>
          {openFilter === 'color' && (
            <div className="absolute top-full left-0 mt-2 bg-white shadow-lg border border-stone/10 rounded-lg p-4 min-w-[240px] z-20">
              <div className="flex flex-wrap gap-2">
                {colors.map((color) => (
                  <button
                    key={color}
                    className="px-3 py-2 text-sm border border-stone/20 rounded-lg hover:border-charcoal transition-colors"
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Reset */}
        {(selectedCategory || selectedGender || selectedStyle || priceRange[1] < maxPrice) && (
          <button
            onClick={onReset}
            className="flex items-center gap-1 text-xs text-stone hover:text-charcoal transition-colors"
          >
            <X className="h-3 w-3" />
            Réinitialiser
          </button>
        )}
      </div>
    </div>
  );
}