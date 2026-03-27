'use client';

import { motion } from 'framer-motion';

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <div className="container-luxury py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h1 className="text-4xl md:text-5xl font-light mb-8">Notre Histoire</h1>
          <div className="w-12 h-px bg-stone/30 mx-auto mb-12" />
          
          <div className="space-y-6 text-stone">
            <p className="text-lg leading-relaxed">
              Fondée en 2020, ÉLÉGANCE est née d'une passion pour la mode intemporelle et les matières nobles.
            </p>
            <p className="leading-relaxed">
              Chaque pièce de notre collection est pensée pour célébrer la beauté de la simplicité et l'élégance du minimalisme. 
              Nous croyons que la mode ne devrait pas être éphémère, mais durable et significative.
            </p>
            <p className="leading-relaxed">
              Nos créations sont inspirées par l'architecture méditerranéenne, la lumière naturelle et l'art du drapé. 
              Chaque vêtement est confectionné avec une attention méticuleuse aux détails, dans des matières soigneusement sélectionnées.
            </p>
            <p className="leading-relaxed">
              ÉLÉGANCE, c'est l'art de porter l'essentiel avec raffinement.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}