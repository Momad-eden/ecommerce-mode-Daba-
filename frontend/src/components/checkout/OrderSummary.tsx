'use client';

import { ShoppingBag, Truck, Clock } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';

interface OrderSummaryProps {
  shippingCost?: number;
}

export default function OrderSummary({ shippingCost = 0 }: OrderSummaryProps) {
  const { items, getTotalPrice } = useCartStore();
  const subtotal = getTotalPrice();
  const total = subtotal + shippingCost;

  return (
    <div className="bg-beige/30 rounded-2xl p-6 space-y-5">
      <div className="flex items-center gap-2 pb-4 border-b border-stone/20">
        <ShoppingBag className="h-5 w-5 text-charcoal" />
        <h2 className="text-lg font-light">Récapitulatif</h2>
      </div>

      {/* Articles */}
      <div className="space-y-3 max-h-64 overflow-y-auto">
        {items.map((item) => {
          const price = item.variant?.price || item.product.price;
          const variantInfo = item.variant 
            ? `${item.variant.size} / ${item.variant.color}`
            : '';
          
          return (
            <div key={`${item.product.id}-${item.variant?.id}`} className="flex gap-3">
              <div className="w-12 h-12 rounded-lg overflow-hidden bg-sand/20 flex-shrink-0">
                <img
                  src={item.product.image_main}
                  alt={item.product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-charcoal line-clamp-1">
                  {item.product.name}
                </p>
                {variantInfo && (
                  <p className="text-xs text-stone">{variantInfo}</p>
                )}
                <p className="text-xs text-stone">Qté: {item.quantity}</p>
              </div>
              <p className="text-sm font-semibold text-charcoal">
                {(price * item.quantity).toLocaleString()} FCFA
              </p>
            </div>
          );
        })}
      </div>

      {/* Totaux */}
      <div className="space-y-2 pt-4 border-t border-stone/20">
        <div className="flex justify-between text-sm">
          <span className="text-stone">Sous-total</span>
          <span className="text-charcoal">{subtotal.toLocaleString()} FCFA</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-stone">Livraison</span>
          <span className="text-charcoal">
            {shippingCost === 0 ? 'Gratuite' : `${shippingCost.toLocaleString()} FCFA`}
          </span>
        </div>
        <div className="flex justify-between text-lg font-semibold pt-2 border-t border-stone/20">
          <span className="text-charcoal">Total</span>
          <span className="text-charcoal">{total.toLocaleString()} FCFA</span>
        </div>
      </div>

      {/* Informations livraison */}
      <div className="bg-white/50 rounded-xl p-4 space-y-2 text-sm">
        <div className="flex items-center gap-2 text-stone">
          <Truck className="h-4 w-4" />
          <span>Livraison estimée: 3-5 jours ouvrés</span>
        </div>
        <div className="flex items-center gap-2 text-stone">
          <Clock className="h-4 w-4" />
          <span>Retours offerts sous 14 jours</span>
        </div>
      </div>
    </div>
  );
}