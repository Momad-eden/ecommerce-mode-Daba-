'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle, MessageCircle } from 'lucide-react';
import AddressForm from '@/components/checkout/AddressForm';
import PaymentMethod from '@/components/checkout/PaymentMethod';
import OrderSummary from '@/components/checkout/OrderSummary';
import { useCartStore } from '@/store/cartStore';
import { ShippingAddress } from '@/types/order';
import { toast } from 'sonner';
import { useWhatsApp } from '@/hooks/useWhatsApp';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, clearCart } = useCartStore();
  const { generateCartMessage, openWhatsApp } = useWhatsApp();
  const [step, setStep] = useState(1);
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress | null>(null);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderTotal, setOrderTotal] = useState(0);

  useEffect(() => {
    if (items.length === 0) {
      toast.error('Votre panier est vide');
      router.push('/boutique');
    }
  }, [items, router]);

  // Calculer le total
  useEffect(() => {
    const total = items.reduce((sum, item) => {
      const price = item.variant?.price || item.product.price;
      return sum + price * item.quantity;
    }, 0);
    setOrderTotal(total);
  }, [items]);

  const handleAddressSubmit = (data: ShippingAddress) => {
    setShippingAddress(data);
    setStep(2);
    window.scrollTo(0, 0);
  };

  const handlePaymentSelect = (method: string) => {
    setPaymentMethod(method);
  };

  const handlePlaceOrder = async () => {
    if (!paymentMethod) {
      toast.error('Veuillez sélectionner un mode de paiement');
      return;
    }

    setIsProcessing(true);

    // Simulation de traitement de commande
    setTimeout(() => {
      console.log('Commande créée', {
        items,
        shippingAddress,
        paymentMethod,
      });
      
      clearCart();
      setStep(3);
      setIsProcessing(false);
      
      toast.success('Commande confirmée !');
    }, 2000);
  };

  const handleWhatsAppShare = () => {
    const message = generateCartMessage(items, orderTotal);
    openWhatsApp(message);
  };

  if (items.length === 0) {
    return null;
  }

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-cream/80 backdrop-blur-md border-b border-stone/10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="p-2 hover:bg-stone/10 rounded-full transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="text-lg font-light">Validation de commande</h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Steps */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step >= 1 ? 'bg-charcoal text-white' : 'bg-stone/20 text-stone'
            }`}>
              1
            </div>
            <span className="text-sm">Livraison</span>
          </div>
          <div className="w-12 h-px bg-stone/30" />
          <div className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step >= 2 ? 'bg-charcoal text-white' : 'bg-stone/20 text-stone'
            }`}>
              2
            </div>
            <span className="text-sm">Paiement</span>
          </div>
          <div className="w-12 h-px bg-stone/30" />
          <div className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step >= 3 ? 'bg-charcoal text-white' : 'bg-stone/20 text-stone'
            }`}>
              3
            </div>
            <span className="text-sm">Confirmation</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Formulaires */}
          <div className="lg:col-span-2">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {step === 1 && (
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h2 className="text-xl font-light mb-6">Informations de livraison</h2>
                  <AddressForm onSubmit={handleAddressSubmit} />
                </div>
              )}

              {step === 2 && (
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h2 className="text-xl font-light mb-6">Mode de paiement</h2>
                  <PaymentMethod selectedMethod={paymentMethod} onSelect={handlePaymentSelect} />
                  
                  <div className="mt-8 flex gap-4">
                    <button
                      onClick={() => setStep(1)}
                      className="flex-1 border border-stone/30 text-charcoal hover:border-charcoal rounded-full py-4 transition-all"
                    >
                      Retour
                    </button>
                    <button
                      onClick={handlePlaceOrder}
                      disabled={isProcessing || !paymentMethod}
                      className="flex-1 bg-charcoal text-white hover:bg-stone rounded-full py-4 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isProcessing ? 'Traitement...' : 'Confirmer la commande'}
                    </button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
                  <div className="flex justify-center mb-6">
                    <CheckCircle className="h-20 w-20 text-green-500" />
                  </div>
                  <h2 className="text-2xl font-light mb-4">Commande confirmée !</h2>
                  <p className="text-stone mb-6">
                    Merci pour votre commande. Vous recevrez un email de confirmation avec les détails de livraison.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                      onClick={() => router.push('/boutique')}
                      className="bg-charcoal text-white hover:bg-stone rounded-full px-8 py-4 transition-all"
                    >
                      Continuer mes achats
                    </button>
                    <button
                      onClick={handleWhatsAppShare}
                      className="border border-green-500 text-green-600 hover:bg-green-500 hover:text-white rounded-full px-8 py-4 transition-all flex items-center justify-center gap-2"
                    >
                      <MessageCircle className="h-4 w-4" />
                      Partager sur WhatsApp
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>

          {/* Résumé */}
          {step !== 3 && (
            <div className="lg:col-span-1">
              <OrderSummary shippingCost={0} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}