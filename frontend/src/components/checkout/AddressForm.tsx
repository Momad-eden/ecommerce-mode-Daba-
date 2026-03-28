'use client';

import { useState } from 'react';
import { User, Phone, Building2 } from 'lucide-react';
import { ShippingAddress } from '@/types/order';

interface AddressFormProps {
  onSubmit: (data: ShippingAddress) => void;
  initialData?: ShippingAddress;
}

export default function AddressForm({ onSubmit, initialData }: AddressFormProps) {
  const [formData, setFormData] = useState<ShippingAddress>(initialData || {
    firstName: '',
    lastName: '',
    phone: '',
    city: '',
    country: 'Sénégal',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-charcoal mb-1">Prénom</label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone" />
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-4 py-3 border border-stone/20 rounded-xl focus:outline-none focus:border-charcoal bg-white"
              placeholder="Jean"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-charcoal mb-1">Nom</label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone" />
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-4 py-3 border border-stone/20 rounded-xl focus:outline-none focus:border-charcoal bg-white"
              placeholder="Dupont"
            />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-charcoal mb-1">Téléphone</label>
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone" />
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full pl-10 pr-4 py-3 border border-stone/20 rounded-xl focus:outline-none focus:border-charcoal bg-white"
            placeholder="77 123 45 67"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-charcoal mb-1">Ville / Quartier</label>
        <div className="relative">
          <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone" />
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
            className="w-full pl-10 pr-4 py-3 border border-stone/20 rounded-xl focus:outline-none focus:border-charcoal bg-white"
            placeholder="Dakar, Plateau, Ouakam..."
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-charcoal mb-1">Pays</label>
        <select
          name="country"
          value={formData.country}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-stone/20 rounded-xl focus:outline-none focus:border-charcoal bg-white"
        >
          <option value="Sénégal">Sénégal</option>
          <option value="Côte d'Ivoire">Côte d'Ivoire</option>
          <option value="Mali">Mali</option>
          <option value="France">France</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full bg-charcoal text-white hover:bg-stone rounded-full py-4 transition-all duration-300"
      >
        Continuer
      </button>
    </form>
  );
}