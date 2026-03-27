'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NewCollection() {
  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-cream">
      <div className="container-luxury px-4 sm:px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative rounded-xl sm:rounded-2xl overflow-hidden shadow-xl"
        >
          {/* Image de fond avec différents ratios selon l'appareil */}
          <div className="relative w-full">
            {/* Mobile (par défaut) */}
            <div className="block sm:hidden">
              <div className="aspect-[3/4]">
                <img
                  src="https://images.unsplash.com/photo-1581044777550-4cfa60707c03?q=80&w=800&h=1067&fit=crop"
                  alt="Nouvelle collection automne/hiver 2025"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            {/* Tablette */}
            <div className="hidden sm:block lg:hidden">
              <div className="aspect-[16/9]">
                <img
                  src="https://images.unsplash.com/photo-1581044777550-4cfa60707c03?q=80&w=1200&h=675&fit=crop"
                  alt="Nouvelle collection automne/hiver 2025"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            {/* Desktop */}
            <div className="hidden lg:block">
              <div className="aspect-[21/9]">
                <img
                  src="https://images.unsplash.com/photo-1581044777550-4cfa60707c03?q=80&w=1920&h=823&fit=crop"
                  alt="Nouvelle collection automne/hiver 2025"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            {/* Overlay adaptatif */}
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/50 to-charcoal/20 sm:bg-gradient-to-r sm:from-charcoal/80 sm:via-charcoal/50 sm:to-transparent" />
          </div>
          
          {/* Contenu - adapté à chaque appareil */}
          <div className="absolute inset-0 flex flex-col justify-end sm:justify-center items-center sm:items-start p-6 sm:p-8 md:p-10 lg:p-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="max-w-full sm:max-w-md md:max-w-lg lg:max-w-xl text-center sm:text-left"
            >
              {/* Badge Saison */}
              <span className="inline-block text-beige text-[10px] sm:text-xs md:text-sm tracking-[0.2em] uppercase mb-2 sm:mb-3 md:mb-4 font-light bg-charcoal/30 sm:bg-transparent px-3 sm:px-0 py-1 sm:py-0 rounded-full sm:rounded-none">
                Saison 2025
              </span>
              
              {/* Titre */}
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light text-white mb-2 sm:mb-3 md:mb-4 leading-tight">
                NEW<br className="block sm:hidden" />
                <span className="hidden sm:inline"> </span>
                COLLECTION
              </h2>
              
              {/* Description */}
              <p className="text-beige/90 text-xs sm:text-sm md:text-base mb-4 sm:mb-5 md:mb-6 lg:mb-8 max-w-xs sm:max-w-sm md:max-w-md mx-auto sm:mx-0 leading-relaxed">
                Des silhouettes fluides, des matières nobles, une élégance réinventée.
              </p>
              
              {/* Bouton */}
              <Link href="/collections">
                <Button 
                  variant="outline" 
                  className="border-white text-white hover:bg-white hover:text-charcoal rounded-none px-5 sm:px-6 md:px-7 lg:px-8 py-2 sm:py-3 md:py-4 lg:py-5 text-xs sm:text-sm md:text-base transition-all duration-300 group"
                >
                  <span className="hidden xs:inline">Explorer la collection</span>
                  <span className="xs:hidden">Explorer</span>
                  <ArrowRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}