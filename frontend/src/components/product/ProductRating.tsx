'use client';

import { Star } from 'lucide-react';

interface ProductRatingProps {
  rating?: number;
  reviewsCount?: number;
}

export default function ProductRating({ rating = 4.8, reviewsCount = 128 }: ProductRatingProps) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-0.5">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${
              i < Math.floor(rating)
                ? 'fill-gold-500 text-gold-500'
                : 'fill-stone/20 text-stone/20'
            }`}
          />
        ))}
      </div>
      <span className="text-sm font-medium text-charcoal">{rating}</span>
      <span className="text-sm text-stone">({reviewsCount} avis)</span>
    </div>
  );
}