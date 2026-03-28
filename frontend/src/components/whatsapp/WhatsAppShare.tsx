'use client';

import { MessageCircle } from 'lucide-react';
import { useWhatsApp } from '@/hooks/useWhatsApp';

interface WhatsAppShareProps {
  variant?: 'button' | 'icon';
  className?: string;
}

export default function WhatsAppShare({ variant = 'button', className = '' }: WhatsAppShareProps) {
  const { openWhatsApp } = useWhatsApp();

  const shareMessage = "Bonjour ! Je découvre votre boutique ÉLÉGANCE et je souhaite en savoir plus sur vos collections.";

  if (variant === 'icon') {
    return (
      <button
        onClick={() => openWhatsApp(shareMessage)}
        className={`text-stone hover:text-green-500 transition-colors ${className}`}
        aria-label="Partager sur WhatsApp"
      >
        <MessageCircle className="h-5 w-5" />
      </button>
    );
  }

  return (
    <button
      onClick={() => openWhatsApp(shareMessage)}
      className={`flex items-center justify-center gap-2 bg-green-500 text-white hover:bg-green-600 rounded-full px-6 py-2 transition-all ${className}`}
    >
      <MessageCircle className="h-4 w-4" />
      <span className="text-sm">WhatsApp</span>
    </button>
  );
}