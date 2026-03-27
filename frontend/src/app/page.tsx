'use client';

import { useEffect, useState } from 'react';
import Hero from '@/components/layout/Hero';
import AboutSection from '@/components/layout/AboutSection';
import NewCollection from '@/components/layout/NewCollection';
import CategoryGrid from '@/components/layout/CategoryGrid';
import BestSellers from '@/components/layout/BestSellers';
import PromoBanner from '@/components/layout/PromoBanner';
import CatalogGrid from '@/components/layout/CatalogGrid';
import Footer from '@/components/layout/Footer';
import { getBestSellers, getProducts, getCategories, getActivePromotions } from '@/services/api';
import { Product, Category, Promotion } from '@/types/product';

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [bestSellers, setBestSellers] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [allProducts, best, cats, promos] = await Promise.all([
          getProducts(),
          getBestSellers(),
          getCategories(),
          getActivePromotions()
        ]);

        console.log('Promotions:', promos);


        setProducts(allProducts || []);
        setBestSellers(best || []);
        setCategories(cats || []);
        setPromotions(promos || []);
      } catch (error) {
        console.error('Erreur:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

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

  return (
    <>
      <Hero />
      <AboutSection />
      <NewCollection />
      
      {/* Grille des catégories */}
      {categories.length > 0 && <CategoryGrid categories={categories} />}
      
      {/* Meilleures ventes */}
      {bestSellers.length > 0 && <BestSellers products={bestSellers} />}
      
      {/* Bannière promotionnelle */}
      {promotions.length > 0 && <PromoBanner promotions={promotions} />}
      
      {/* Catalogue général */}
      <CatalogGrid products={products.slice(0, 8)} title="Pièces intemporelles" />
      
      <Footer />
    </>
  );
}