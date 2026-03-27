'use client';

import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Instagram, Facebook, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <div className="container-luxury py-24">
        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="text-4xl md:text-5xl font-light mb-6">Contactez-nous</h1>
            <p className="text-stone mb-8">
              Une question ? Un conseil ? Notre équipe est à votre disposition pour vous accompagner.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <Mail className="h-5 w-5 text-stone" />
                <div>
                  <p className="font-medium">Email</p>
                  <a href="mailto:contact@elegance.com" className="text-stone hover:text-charcoal">
                    contact@elegance.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <Phone className="h-5 w-5 text-stone" />
                <div>
                  <p className="font-medium">Téléphone</p>
                  <a href="tel:+221781234567" className="text-stone hover:text-charcoal">
                    +221 78 123 45 67
                  </a>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <MapPin className="h-5 w-5 text-stone" />
                <div>
                  <p className="font-medium">Showroom</p>
                  <p className="text-stone">Dakar, Sénégal</p>
                </div>
              </div>
            </div>
            
            <div className="mt-8">
              <h3 className="font-medium mb-4">Suivez-nous</h3>
              <div className="flex gap-4">
                <Link href="#" className="text-stone hover:text-charcoal">
                  <Instagram className="h-5 w-5" />
                </Link>
                <Link href="#" className="text-stone hover:text-charcoal">
                  <Facebook className="h-5 w-5" />
                </Link>
                <Link href="#" className="text-stone hover:text-charcoal">
                  <Twitter className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <form className="space-y-6">
              <div>
                <label className="block text-sm mb-2">Nom complet</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-stone/20 rounded-lg focus:outline-none focus:border-charcoal bg-transparent"
                />
              </div>
              <div>
                <label className="block text-sm mb-2">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-3 border border-stone/20 rounded-lg focus:outline-none focus:border-charcoal bg-transparent"
                />
              </div>
              <div>
                <label className="block text-sm mb-2">Message</label>
                <textarea
                  rows={5}
                  className="w-full px-4 py-3 border border-stone/20 rounded-lg focus:outline-none focus:border-charcoal bg-transparent"
                />
              </div>
              <Button className="w-full bg-charcoal text-cream hover:bg-stone">
                Envoyer le message
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}