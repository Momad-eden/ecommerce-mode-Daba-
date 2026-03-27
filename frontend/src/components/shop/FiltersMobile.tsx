'use client';

import { useState } from 'react';
import { X, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Category } from '@/types/product';

interface FiltersMobileProps {
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

export default function FiltersMobile({
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
}: FiltersMobileProps) {
  const [open, setOpen] = useState(false);

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

  const handleApply = () => {
    setOpen(false);
  };

  const handleReset = () => {
    onReset();
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="gap-2 rounded-full border-stone/30">
          <SlidersHorizontal className="h-4 w-4" />
          Filtrer
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-full max-w-sm bg-white p-0">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-stone/20">
            <h3 className="text-lg font-light">Filtrer</h3>
            <button onClick={() => setOpen(false)} className="p-2">
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Contenu des filtres */}
          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            {/* Catégories */}
            <div>
              <h4 className="text-sm font-medium mb-3">Catégories</h4>
              <div className="space-y-2">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => onCategoryChange(cat.slug)}
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

            {/* Genre */}
            <div>
              <h4 className="text-sm font-medium mb-3">Genre</h4>
              <div className="flex flex-wrap gap-2">
                {genders.map((gender) => (
                  <button
                    key={gender.value}
                    onClick={() => onGenderChange(gender.value)}
                    className={`px-4 py-2 text-sm rounded-full border transition-colors ${
                      selectedGender === gender.value
                        ? 'bg-charcoal text-white border-charcoal'
                        : 'border-stone/30 text-stone hover:border-charcoal'
                    }`}
                  >
                    {gender.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Style */}
            <div>
              <h4 className="text-sm font-medium mb-3">Style</h4>
              <div className="flex flex-wrap gap-2">
                {styles.map((style) => (
                  <button
                    key={style.value}
                    onClick={() => onStyleChange(style.value)}
                    className={`px-4 py-2 text-sm rounded-full border transition-colors ${
                      selectedStyle === style.value
                        ? 'bg-charcoal text-white border-charcoal'
                        : 'border-stone/30 text-stone hover:border-charcoal'
                    }`}
                  >
                    {style.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Prix */}
            <div>
              <h4 className="text-sm font-medium mb-3">Prix maximum</h4>
              <div className="space-y-3">
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
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-stone/20 flex gap-3">
            <Button onClick={handleReset} variant="outline" className="flex-1 rounded-full">
              Réinitialiser
            </Button>
            <Button onClick={handleApply} className="flex-1 rounded-full bg-charcoal text-white hover:bg-stone">
              Appliquer
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}