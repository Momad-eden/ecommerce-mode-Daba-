'use client';

import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Trash2, Plus, Minus, MessageCircle } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { toast } from 'sonner';
import { useWhatsApp } from '@/hooks/useWhatsApp';

export default function CartDrawer({ isOpen, onClose }: any) {
  const router = useRouter();
  const { items, removeItem, updateQuantity, getTotalItems, getTotalPrice } = useCartStore();
  const { generateCartMessage, openWhatsApp } = useWhatsApp();

  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();

  const handleCheckout = () => {
    if (items.length === 0) {
      toast.error('Votre panier est vide');
      return;
    }
    onClose();
    router.push('/checkout');
  };

  const handleRemoveItem = (productId: number, variantId?: number) => {
    removeItem(productId, variantId);
    toast.info('Produit retiré du panier');
  };

  const handleWhatsAppShare = () => {
    if (items.length === 0) {
      toast.error('Votre panier est vide');
      return;
    }
    const message = generateCartMessage(items, totalPrice);
    openWhatsApp(message);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          />

          {/* Drawer */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ duration: 0.4 }}
            className="fixed bottom-0 left-0 right-0 h-[92%] bg-[#f5f5f5] z-50 rounded-t-3xl flex flex-col"
          >
            {/* CONTAINER CENTRÉ (desktop fix) */}
            <div className="w-full max-w-2xl mx-auto flex flex-col h-full">

              {/* HEADER */}
              <div className="flex items-center justify-between px-6 py-5">
                <h2 className="text-xl font-semibold text-gray-800">
                  Mon panier ({totalItems})
                </h2>

                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-200 transition rounded-full"
                >
                  <X />
                </button>
              </div>

              {/* CONTENT */}
              <div className="flex-1 overflow-y-auto px-5 space-y-5 pb-28">

                {items.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <ShoppingBag className="h-16 w-16 text-gray-300 mb-4" />
                    <p className="text-gray-500">Votre panier est vide</p>
                    <button
                      onClick={onClose}
                      className="mt-4 text-black underline"
                    >
                      Découvrir nos produits
                    </button>
                  </div>
                ) : (
                  <>
                    {/* PRODUITS */}
                    {items.map((item) => {
                      const price = item.variant?.price || item.product.price;

                      return (
                        <div
                          key={item.product.id}
                          className="bg-white rounded-2xl p-4 flex gap-4 shadow-sm hover:shadow-md transition"
                        >
                          <img
                            src={item.product.image_main}
                            alt={item.product.name}
                            className="w-20 h-24 object-cover rounded-xl"
                          />

                          <div className="flex-1">
                            <h3 className="text-sm font-semibold text-gray-800">
                              {item.product.name}
                            </h3>

                            <p className="text-xs text-gray-400 mt-1">
                              {item.variant?.size} / {item.variant?.color}
                            </p>

                            <div className="flex items-center justify-between mt-3">
                              <span className="font-semibold">
                                {price.toLocaleString()} FCFA
                              </span>

                              {/* QUANTITY */}
                              <div className="flex items-center gap-2 bg-gray-100 px-2 py-1 rounded-full">
                                <button
                                  onClick={() =>
                                    updateQuantity(item.product.id, item.quantity - 1, item.variant?.id)
                                  }
                                  className="hover:text-black"
                                >
                                  <Minus size={14} />
                                </button>

                                <span className="text-sm">{item.quantity}</span>

                                <button
                                  onClick={() =>
                                    updateQuantity(item.product.id, item.quantity + 1, item.variant?.id)
                                  }
                                  className="hover:text-black"
                                >
                                  <Plus size={14} />
                                </button>
                              </div>
                            </div>
                          </div>

                          {/* DELETE */}
                          <button
                            onClick={() => handleRemoveItem(item.product.id, item.variant?.id)}
                            className="text-gray-400 hover:text-red-500 transition"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      );
                    })}

                    {/* TOTAL */}
                    <div className="bg-white p-5 rounded-2xl shadow-sm space-y-3">
                      <div className="flex justify-between text-gray-500 text-sm">
                        <span>Sous-total</span>
                        <span>{totalPrice.toLocaleString()} FCFA</span>
                      </div>

                      <div className="flex justify-between font-semibold text-lg">
                        <span>Total</span>
                        <span>{totalPrice.toLocaleString()} FCFA</span>
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="space-y-3">
                      {/* Bouton principal - Commander */}
                      <button
                        onClick={handleCheckout}
                        className="w-full bg-black text-white py-4 rounded-2xl font-medium hover:bg-gray-900 active:scale-[0.98] transition"
                      >
                        Commander
                      </button>

                      {/* Bouton WhatsApp */}
                      <button
                        onClick={handleWhatsAppShare}
                        className="w-full bg-green-500 text-white py-4 rounded-2xl font-medium hover:bg-green-600 active:scale-[0.98] transition flex items-center justify-center gap-2"
                      >
                        <MessageCircle size={18} />
                        Valider par WhatsApp
                      </button>

                      {/* Bouton secondaire - Continuer les achats */}
                      <button
                        onClick={onClose}
                        className="w-full border border-gray-300 text-gray-700 hover:bg-gray-100 rounded-2xl py-4 font-medium transition"
                      >
                        Continuer mes achats
                      </button>
                    </div>
                  </>
                )}

              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}