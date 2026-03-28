'use client';

import { CreditCard, Smartphone, Building } from 'lucide-react';

interface PaymentMethodProps {
  selectedMethod: string;
  onSelect: (method: string) => void;
}

export default function PaymentMethod({ selectedMethod, onSelect }: PaymentMethodProps) {
  const methods = [
    { id: 'orange_money', name: 'Orange Money', icon: Smartphone, color: 'text-orange-500' },
    { id: 'wave', name: 'Wave', icon: Smartphone, color: 'text-blue-500' },
    { id: 'card', name: 'Carte Bancaire', icon: CreditCard, color: 'text-purple-500' },
    { id: 'cash', name: 'Paiement à la livraison', icon: Building, color: 'text-green-500' },
  ];

  return (
    <div className="space-y-3">
      {methods.map((method) => (
        <button
          key={method.id}
          onClick={() => onSelect(method.id)}
          className={`w-full flex items-center gap-4 p-4 border rounded-xl transition-all ${
            selectedMethod === method.id
              ? 'border-charcoal bg-charcoal/5'
              : 'border-stone/20 hover:border-stone'
          }`}
        >
          <method.icon className={`h-6 w-6 ${method.color}`} />
          <span className="flex-1 text-left font-medium text-charcoal">{method.name}</span>
          <div className={`w-5 h-5 rounded-full border-2 ${
            selectedMethod === method.id
              ? 'border-charcoal bg-charcoal'
              : 'border-stone/30'
          }`} />
        </button>
      ))}
    </div>
  );
}