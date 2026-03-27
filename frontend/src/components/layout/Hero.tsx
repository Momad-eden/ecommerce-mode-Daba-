'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Hero() {
  return (
    <section className="min-h-[90vh] flex items-center">
      <div className="container-luxury w-full">
        <div className="grid md:grid-cols-2 gap-12 md:gap-24 items-center">
          {/* Texte à gauche */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center md:text-left"
          >
            <span className="text-stone text-sm tracking-[0.2em] uppercase block mb-6">
              Nouvelle collection
            </span>
            <h1 className="mb-6">
              L'élégance<br />
              <span className="italic font-light">intemporelle</span>
            </h1>
            <p className="text-lg mb-8 max-w-md mx-auto md:mx-0">
              Des pièces uniques qui célèbrent la beauté du minimalisme et la qualité des matières nobles.
            </p>
            <Button 
              className="bg-transparent border border-charcoal text-charcoal hover:bg-charcoal hover:text-cream px-8 py-6 rounded-none transition-all duration-500"
            >
              Découvrir la collection
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>

          {/* Image à droite */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-[3/4] overflow-hidden bg-sand">
              <img
                src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1974"
                alt="Femme élégante en tenue fluide"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                loading="eager"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-24 h-24 border border-stone/20 hidden md:block" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}