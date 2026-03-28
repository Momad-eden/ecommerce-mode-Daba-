'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Trash2, Plus, Minus } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';

export default function CartDrawer({ isOpen, onClose }: any) {
  const { items, removeItem, updateQuantity, getTotalItems, getTotalPrice } = useCartStore();

  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();

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
                            onClick={() => removeItem(item.product.id, item.variant?.id)}
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
                      {/* Bouton principal */}
                      <button
                        className="w-full bg-black text-white py-4 rounded-2xl font-medium
                        hover:bg-gray-900 active:scale-[0.98] transition"
                      >
                        Commander
                      </button>

                      {/* Bouton secondaire */}
                      <button
                        onClick={onClose}
                        className="w-full border-charcoal text-charcoal hover:bg-charcoal hover:text-white rounded-full py-5 transition-all bg-white/90 backdrop-blur-sm"
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