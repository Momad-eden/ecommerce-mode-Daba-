'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Search, ShoppingBag } from 'lucide-react';
import { Input } from '@/components/ui/input';
import ProductCard from '@/components/shop/ProductCard';
import FiltersDesktop from '@/components/shop/FiltersDesktop';
import FiltersMobile from '@/components/shop/FiltersMobile';
import { getProducts, getCategories } from '@/services/api';
import { Product, Category } from '@/types/product';

export default function BoutiquePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500000]);
  const [maxPrice, setMaxPrice] = useState(500000);
  const [visibleCount, setVisibleCount] = useState(12);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [allProducts, allCategories] = await Promise.all([
          getProducts(),
          getCategories()
        ]);
        setProducts(allProducts || []);
        setCategories(allCategories || []);
        
        // Calculer le prix max
        const max = Math.max(...(allProducts || []).map(p => p.price), 500000);
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

  useEffect(() => {
    let filtered = [...products];
    
    // Filtre par recherche
    if (searchTerm) {
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filtre par catégorie
    if (selectedCategory) {
      filtered = filtered.filter(p => 
        p.categories.some(c => c.slug === selectedCategory)
      );
    }
    
    // Filtre par genre
    if (selectedGender) {
      filtered = filtered.filter(p => 
        p.categories.some(c => c.gender === selectedGender)
      );
    }
    
    // Filtre par style
    if (selectedStyle) {
      filtered = filtered.filter(p => 
        p.categories.some(c => c.style === selectedStyle)
      );
    }
    
    // Filtre par prix
    filtered = filtered.filter(p => p.price <= priceRange[1]);
    
    setFilteredProducts(filtered);
  }, [products, searchTerm, selectedCategory, selectedGender, selectedStyle, priceRange]);

  const handleResetFilters = () => {
    setSelectedCategory('');
    setSelectedGender('');
    setSelectedStyle('');
    setPriceRange([0, maxPrice]);
    setSearchTerm('');
  };

  const loadMore = () => {
    setVisibleCount(prev => prev + 12);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-charcoal border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-stone text-sm">Chargement...</p>
        </div>
      </div>
    );
  }

  const displayedProducts = filteredProducts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProducts.length;

  return (
    <div className="min-h-screen bg-cream">
      <div className="container-luxury px-4 sm:px-6 md:px-8 py-8 md:py-12">
        {/* Header de la page */}
        <div className="mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl font-light text-charcoal mb-4">Boutique</h1>
          <p className="text-stone text-sm md:text-base">
            Découvrez notre collection de pièces uniques
          </p>
        </div>

        {/* Barre de recherche et filtres */}
        <div className="flex flex-col gap-4 mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone" />
              <Input
                type="text"
                placeholder="Rechercher un produit..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white border-stone/20 rounded-full"
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
          
          {/* Filtres desktop */}
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

        {/* Résultats */}
        <div className="mb-4">
          <p className="text-sm text-stone">
            {filteredProducts.length} produit(s) trouvé(s)
          </p>
        </div>

        {/* Grille produits */}
        {displayedProducts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-stone">Aucun produit ne correspond à vos critères</p>
            <button
              onClick={handleResetFilters}
              className="mt-4 text-charcoal underline hover:no-underline"
            >
              Réinitialiser les filtres
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
              {displayedProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
            
            {/* Load more */}
            {hasMore && (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="text-center mt-12"
              >
                <button
                  onClick={loadMore}
                  className="px-8 py-3 border border-charcoal/30 text-charcoal hover:bg-charcoal hover:text-white rounded-full transition-all duration-300"
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