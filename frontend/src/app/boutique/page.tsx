'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import ProductCard from '@/components/shop/ProductCard';
import FiltersDesktop from '@/components/shop/FiltersDesktop';
import FiltersMobile from '@/components/shop/FiltersMobile';
import { getProducts, getCategories } from '@/services/api';
import { Product, Category } from '@/types/product';

export default function BoutiquePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500000]);
  const [maxPrice, setMaxPrice] = useState(500000);

  const [visibleCount, setVisibleCount] = useState(12);

  // FETCH DATA
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [allProducts, allCategories] = await Promise.all([
          getProducts(),
          getCategories()
        ]);

        const safeProducts = allProducts || [];

        setProducts(safeProducts);
        setCategories(allCategories || []);

        const max = Math.max(...safeProducts.map(p => p.price || 0), 500000);
        setMaxPrice(max);
        setPriceRange([0, max]);
      } catch (error) {
        console.error('Erreur:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // FILTER LOGIC (OPTIMISÉ avec useMemo)
  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(term) ||
        p.description?.toLowerCase().includes(term)
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter(p =>
        p.categories?.some(c => c.slug === selectedCategory)
      );
    }

    if (selectedGender) {
      filtered = filtered.filter(p =>
        p.categories?.some(c => c.gender === selectedGender)
      );
    }

    if (selectedStyle) {
      filtered = filtered.filter(p =>
        p.categories?.some(c => c.style === selectedStyle)
      );
    }

    filtered = filtered.filter(
      p => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    return filtered;
  }, [products, searchTerm, selectedCategory, selectedGender, selectedStyle, priceRange]);

  const displayedProducts = filteredProducts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProducts.length;

  const handleResetFilters = () => {
    setSelectedCategory('');
    setSelectedGender('');
    setSelectedStyle('');
    setPriceRange([0, maxPrice]);
    setSearchTerm('');
  };

  const loadMore = () => setVisibleCount(prev => prev + 12);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-10 h-10 border-2 border-black border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafafa] pb-28"> {/* espace pour BottomNav */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* HEADER PREMIUM */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-semibold text-gray-900">
            Boutique
          </h1>
          <p className="text-gray-500 mt-2">
            Explorez nos collections exclusives
          </p>
        </div>

        {/* SEARCH + FILTER */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Rechercher un produit..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12 rounded-full border-gray-200 shadow-sm"
              />
            </div>

            <div className="md:hidden">
              <FiltersMobile
                categories={categories}
                selectedCategory={selectedCategory}
                selectedGender={selectedGender}
                selectedStyle={selectedStyle}
                priceRange={priceRange}
                maxPrice={maxPrice}
                onCategoryChange={setSelectedCategory}
                onGenderChange={setSelectedGender}
                onStyleChange={setSelectedStyle}
                onPriceChange={setPriceRange}
                onReset={handleResetFilters}
              />
            </div>
          </div>

          <div className="hidden md:block">
            <FiltersDesktop
              categories={categories}
              selectedCategory={selectedCategory}
              selectedGender={selectedGender}
              selectedStyle={selectedStyle}
              priceRange={priceRange}
              maxPrice={maxPrice}
              onCategoryChange={setSelectedCategory}
              onGenderChange={setSelectedGender}
              onStyleChange={setSelectedStyle}
              onPriceChange={setPriceRange}
              onReset={handleResetFilters}
            />
          </div>
        </div>

        {/* RESULT COUNT */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-sm text-gray-500">
            {filteredProducts.length} produits
          </p>
        </div>

        {/* GRID */}
        {displayedProducts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500">Aucun produit trouvé</p>
            <button
              onClick={handleResetFilters}
              className="mt-4 text-black underline"
            >
              Réinitialiser
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-8">
              {displayedProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>

            {hasMore && (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="text-center mt-12"
              >
                <button
                  onClick={loadMore}
                  className="px-10 py-3 bg-black text-white rounded-full hover:bg-gray-900 transition"
                >
                  Charger plus
                </button>
              </motion.div>
            )}
          </>
        )}
      </div>
    </div>
  );
}


// =========================
// ✅ PRODUCT CARD (IMPROVED UX)
// =========================

/*
👉 Objectifs:
- Image + nom + prix = bloc cliquable
- Feedback visuel (mobile & desktop)
- Effet premium (comme Zara / Nike)
*/

export function ProductCardImproved({ product, index }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="group cursor-pointer"
    >
      {/* BLOC CLIQUABLE */}
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition">

        {/* IMAGE */}
        <div className="relative overflow-hidden">
          <img
            src={product.image_main}
            alt={product.name}
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
          />

          {/* INDICATEUR MOBILE (cliquable) */}
          <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full md:hidden">
            Voir
          </div>
        </div>

        {/* INFOS PRODUIT */}
        <div className="p-3 space-y-1">
          <h3 className="text-sm font-medium text-gray-800 line-clamp-2">
            {product.name}
          </h3>

          <p className="text-sm font-semibold text-black">
            {product.price.toLocaleString()} FCFA
          </p>
        </div>
      </div>
    </motion.div>
  );
}
