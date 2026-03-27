'use client';

import Image from 'next/image';
import { useState } from 'react';

interface ProductImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  className?: string;
  sizes?: string;
  priority?: boolean;
}

export default function ProductImage({ 
  src, 
  alt, 
  fill = false, 
  width,
  height,
  className = '',
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  priority = false
}: ProductImageProps) {
  const [error, setError] = useState(false);

  // Utiliser un placeholder en base64 (image grise)
  const placeholderImage = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="500" height="500" viewBox="0 0 24 24" fill="none" stroke="%239ca3af" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"%3E%3Crect x="3" y="3" width="18" height="18" rx="2" ry="2"%3E%3C/rect%3E%3Ccircle cx="8.5" cy="8.5" r="1.5"%3E%3C/circle%3E%3Cpolyline points="21 15 16 10 5 21"%3E%3C/polyline%3E%3C/svg%3E';

  if (error) {
    return (
      <div className={`bg-gray-100 flex items-center justify-center ${className}`} style={fill ? { position: 'absolute', inset: 0 } : { width, height }}>
        <div className="text-center text-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            <circle cx="8.5" cy="8.5" r="1.5"></circle>
            <polyline points="21 15 16 10 5 21"></polyline>
          </svg>
          <p className="text-sm mt-2">Image non disponible</p>
        </div>
      </div>
    );
  }

  if (fill) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        className={`object-cover ${className}`}
        sizes={sizes}
        onError={() => setError(true)}
        priority={priority}
        unoptimized={process.env.NODE_ENV === 'development'}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width || 500}
      height={height || 500}
      className={`object-cover ${className}`}
      onError={() => setError(true)}
      priority={priority}
      unoptimized={process.env.NODE_ENV === 'development'}
    />
  );
}