'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AboutSection() {
  return (
    <section className="py-24 bg-beige">
      <div className="container-luxury">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Grille d'images */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="order-2 md:order-1"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="aspect-[3/4] overflow-hidden rounded-lg">
                  <img
                    src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070"
                    alt="Détail tissu en soie"
                    className="w-full h-full object-cover hover:scale-105 transition duration-700"
                  />
                </div>
                <div className="aspect-[4/3] overflow-hidden rounded-lg">
                  <img
                    src="https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=2071"
                    alt="Collection élégance"
                    className="w-full h-full object-cover hover:scale-105 transition duration-700"
                  />
                </div>
              </div>
              <div className="pt-12">
                <div className="aspect-[3/4] overflow-hidden rounded-lg">
                  <img
                    src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2070"
                    alt="Mode intemporelle"
                    className="w-full h-full object-cover hover:scale-105 transition duration-700"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Texte */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-center md:text-left order-1 md:order-2"
          >
            <span className="text-stone text-sm tracking-[0.2em] uppercase block mb-6 font-light">
              Notre histoire
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-charcoal mb-6 leading-tight">
              L'art de la<br />
              <span className="italic font-light text-stone">simplicité</span>
            </h2>
            <div className="space-y-4 text-stone">
              <p className="leading-relaxed">
                Depuis 2020, ÉLÉGANCE célèbre la beauté des matières naturelles et le savoir-faire artisanal. 
                Chaque pièce est conçue avec une attention méticuleuse aux détails, pour offrir une expérience 
                de luxe discret et intemporel.
              </p>
              <p className="leading-relaxed">
                Nos collections sont inspirées par la lumière méditerranéenne et l'architecture minimaliste, 
                créant des silhouettes fluides qui épousent parfaitement le corps.
              </p>
            </div>
            <div className="mt-8">
              <Link href="/a-propos">
                <Button 
                  variant="ghost" 
                  className="group px-0 hover:bg-transparent text-charcoal hover:text-stone transition-colors"
                >
                  En savoir plus
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}