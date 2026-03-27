'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Gift, Clock, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Promotion } from '@/types/product';

interface PromoBannerProps {
  promotions: Promotion[];
}

export default function PromoBanner({ promotions }: PromoBannerProps) {
  const mainPromo = promotions?.[0];
  
  if (!mainPromo) {
    return null;
  }

  // Calcul du pourcentage de temps restant (optionnel)
  const getRemainingPercentage = () => {
    const now = new Date();
    const start = new Date(mainPromo.start_date);
    const end = new Date(mainPromo.end_date);
    const total = end.getTime() - start.getTime();
    const elapsed = now.getTime() - start.getTime();
    const remaining = Math.max(0, Math.min(100, ((total - elapsed) / total) * 100));
    return Math.floor(remaining);
  };

  const remainingPercentage = getRemainingPercentage();

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-br from-charcoal via-charcoal/95 to-black">
      <div className="container-luxury px-4 sm:px-6 md:px-8">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          {/* Texte à gauche */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1 text-center lg:text-left"
          >
            {/* Badge Promotion */}
            <div className="inline-flex items-center gap-2 bg-gold-500/10 border border-gold-500/30 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 mb-4 sm:mb-6">
              <Tag className="h-3 w-3 sm:h-4 sm:w-4 text-gold-500" />
              <span className="text-gold-500 text-xs sm:text-sm tracking-wide">
                Offre limitée
              </span>
              <Clock className="h-3 w-3 sm:h-4 sm:w-4 text-gold-500 ml-1" />
            </div>

            {/* Icône cadeau */}
            <div className="mb-4 sm:mb-6">
              <Gift className="h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 text-gold-500 mx-auto lg:mx-0" />
            </div>
            
            {/* Titre promotion */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-white mb-3 sm:mb-4 leading-tight">
              {mainPromo.promotion_type === 'percentage' 
                ? `${mainPromo.value}% de réduction` 
                : `${mainPromo.value.toLocaleString()} FCFA`}
              <span className="block text-lg sm:text-xl md:text-2xl text-gold-500 mt-2">
                sur votre commande
              </span>
            </h2>
            
            {/* Nom et description */}
            <p className="text-white/90 text-lg sm:text-xl md:text-2xl font-light mb-2 sm:mb-3">
              {mainPromo.name}
            </p>
            {mainPromo.description && (
              <p className="text-gray-400 text-sm sm:text-base mb-6 sm:mb-8 max-w-md mx-auto lg:mx-0">
                {mainPromo.description}
              </p>
            )}
            
            {/* Barre de progression (optionnelle) */}
            {remainingPercentage > 0 && remainingPercentage < 100 && (
              <div className="max-w-xs mx-auto lg:mx-0 mb-6 sm:mb-8">
                <div className="flex justify-between text-xs text-gray-400 mb-1">
                  <span>Offre valable</span>
                  <span>{remainingPercentage}% restant</span>
                </div>
                <div className="w-full h-1 bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${remainingPercentage}%` }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className="h-full bg-gold-500 rounded-full"
                  />
                </div>
              </div>
            )}
            
            {/* Bouton CTA */}
            <Link href="/boutique">
              <Button 
                size="lg" 
                className="bg-white text-charcoal hover:bg-gold-500 hover:text-white rounded-none px-6 sm:px-8 md:px-10 py-4 sm:py-5 md:py-6 text-sm sm:text-base md:text-lg transition-all duration-300 group"
              >
                Profiter de l'offre
                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>
          
          {/* Image à droite */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2"
          >
            <div className="relative">
              {/* Image principale */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <div className="aspect-square sm:aspect-[4/3] lg:aspect-square max-w-md mx-auto lg:max-w-full">
                  <img
                    src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1974"
                    alt="Promotion spéciale"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
                
                {/* Badge flottant */}
                <div className="absolute top-4 right-4 sm:top-6 sm:right-6 bg-gold-500 text-charcoal rounded-full w-12 h-12 sm:w-16 sm:h-16 flex flex-col items-center justify-center shadow-lg">
                  <span className="text-lg sm:text-2xl font-bold">
                    {mainPromo.promotion_type === 'percentage' ? `${mainPromo.value}%` : `${Math.floor(mainPromo.value / 1000)}k`}
                  </span>
                  <span className="text-[8px] sm:text-[10px] uppercase tracking-wider">OFF</span>
                </div>
              </div>
              
              {/* Effet décoratif */}
              <div className="absolute -bottom-4 -left-4 w-24 h-24 sm:w-32 sm:h-32 border-2 border-gold-500/30 rounded-full -z-10 hidden md:block" />
              <div className="absolute -top-4 -right-4 w-16 h-16 sm:w-24 sm:h-24 border-2 border-gold-500/20 rounded-full -z-10 hidden md:block" />
            </div>
          </motion.div>
        </div>
        
        {/* Bannière supplémentaire pour les petites promotions (si plusieurs) */}
        {promotions.length > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-12 pt-8 border-t border-white/10"
          >
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {promotions.slice(1, 5).map((promo, index) => (
                <div key={promo.id} className="text-center p-3 sm:p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                  <p className="text-gold-500 text-lg sm:text-xl font-bold">
                    {promo.promotion_type === 'percentage' ? `${promo.value}%` : `${promo.value.toLocaleString()} FCFA`}
                  </p>
                  <p className="text-white/70 text-xs sm:text-sm mt-1">{promo.name}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}