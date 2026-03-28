'use client';

import { useState, useEffect } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface WhatsAppButtonProps {
  phoneNumber: string;
  message?: string;
}

export default function WhatsAppButton({ phoneNumber, message }: WhatsAppButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Masquer le bouton lors du scroll vers le bas
  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== 'undefined') {
        if (window.scrollY > lastScrollY && window.scrollY > 100) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
        setLastScrollY(window.scrollY);
      }
    };

    window.addEventListener('scroll', controlNavbar);
    return () => window.removeEventListener('scroll', controlNavbar);
  }, [lastScrollY]);

  const defaultMessage = "Bonjour ! Je souhaite obtenir plus d'informations sur vos produits.";

  const handleWhatsAppClick = () => {
    const finalMessage = message || defaultMessage;
    const encodedMessage = encodeURIComponent(finalMessage);
    const url = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(url, '_blank');
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-24 right-4 z-50 md:bottom-8"
        >
          {/* Menu déroulant (optionnel) */}
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute bottom-16 right-0 bg-white rounded-2xl shadow-xl p-3 w-64 mb-2"
            >
              <div className="space-y-2">
                <button
                  onClick={handleWhatsAppClick}
                  className="w-full text-left px-3 py-2 text-sm hover:bg-green-50 rounded-lg transition-colors flex items-center gap-3"
                >
                  <MessageCircle className="h-4 w-4 text-green-500" />
                  <span>Message général</span>
                </button>
                <div className="h-px bg-gray-100" />
                <p className="text-xs text-gray-500 px-3 pt-2">
                  Réponse garantie sous 24h
                </p>
              </div>
            </motion.div>
          )}

          {/* Bouton principal */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="relative group"
          >
            <div className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-75" />
            <div className="relative bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg transition-all duration-300 hover:scale-110">
              <MessageCircle className="h-6 w-6" />
            </div>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}