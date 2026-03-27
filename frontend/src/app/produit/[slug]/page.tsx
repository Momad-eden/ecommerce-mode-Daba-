'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import ProductImage from '@/components/ui/ProductImage';
import { Button } from '@/components/ui/button';
import { getProductBySlug } from '@/services/api';
import { Product } from '@/types/product';

export default function ProductPage() {
  const { slug } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      getProductBySlug(slug as string)
        .then(setProduct)
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Chargement...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Produit non trouvé</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Images */}
        <div className="relative h-[500px] md:h-[600px]">
          <ProductImage
            src={product.image_main}
            alt={product.name}
            fill
            className="rounded-lg"
          />
        </div>

        {/* Infos produit */}
        <div>
          <h1 className="text-3xl font-light mb-4">{product.name}</h1>
          <p className="text-2xl font-semibold mb-4">
            {product.price.toLocaleString()} FCFA
          </p>
          <p className="text-gray-600 mb-6">{product.description}</p>
          
          <Button className="w-full mb-3">Ajouter au panier</Button>
          <Button variant="outline" className="w-full">WhatsApp</Button>
        </div>
      </div>
    </div>
  );
}