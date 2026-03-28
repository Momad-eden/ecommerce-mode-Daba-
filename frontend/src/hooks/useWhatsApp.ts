'use client';

import { CartItem } from '@/types/product';
import { Product, ProductVariant } from '@/types/product';
import { ShippingAddress } from '@/types/order';

interface WhatsAppMessageOptions {
  includeShipping?: boolean;
  includePayment?: boolean;
  includeContact?: boolean;
}

interface ProductMessageOptions {
  variant?: ProductVariant | null;
  quantity?: number;
  includeSku?: boolean;
  includeStock?: boolean;
}

export const useWhatsApp = () => {
  const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '221781234567';
  const storeName = 'ÉLÉGANCE';
  const storeWebsite = process.env.NEXT_PUBLIC_SITE_URL || 'https://elegance.com';

  /**
   * Formate le prix en FCFA
   */
  const formatPrice = (price: number): string => {
    return `${price.toLocaleString()} FCFA`;
  };

  /**
   * Génère un message pour un produit individuel
   */
  const generateProductMessage = (
    product: Product,
    options: ProductMessageOptions = {}
  ): string => {
    const {
      variant = null,
      quantity = 1,
      includeSku = true,
      includeStock = false
    } = options;

    const productPrice = variant?.price || product.price;
    const totalPrice = productPrice * quantity;
    
    let message = `👗 *DEMANDE DE RENSEIGNEMENT* 👗\n\n`;
    message += `🏷️ *${storeName}*\n`;
    message += `━━━━━━━━━━━━━━━━━━━━\n\n`;
    
    message += `*PRODUIT :*\n`;
    message += `📌 Nom : ${product.name}\n`;
    
    if (variant) {
      if (variant.size) message += `📏 Taille : ${variant.size}\n`;
      if (variant.color) message += `🎨 Couleur : ${variant.color}\n`;
    }
    
    if (includeSku && variant?.sku) {
      message += `🔖 SKU : ${variant.sku}\n`;
    }
    
    if (includeStock && variant?.stock !== undefined) {
      message += `📦 Stock disponible : ${variant.stock} unités\n`;
    }
    
    message += `🔢 Quantité : ${quantity}\n`;
    message += `💰 Prix unitaire : ${formatPrice(productPrice)}\n`;
    message += `💵 Total : ${formatPrice(totalPrice)}\n\n`;
    
    message += `━━━━━━━━━━━━━━━━━━━━\n\n`;
    message += `📝 *MESSAGE :*\n`;
    message += `Bonjour, je souhaite obtenir plus d'informations sur ce produit.\n\n`;
    message += `❓ Disponibilité ?\n`;
    message += `🚚 Délai de livraison ?\n`;
    message += `💳 Modes de paiement acceptés ?\n\n`;
    message += `Merci de me tenir informé(e) ! 🙏\n\n`;
    message += `🔗 ${storeWebsite}`;
    
    return message;
  };

  /**
   * Génère un message récapitulatif du panier
   */
  const generateCartMessage = (
    items: CartItem[],
    totalPrice: number,
    options: WhatsAppMessageOptions = {}
  ): string => {
    const { includeShipping = true, includePayment = true, includeContact = true } = options;
    
    const date = new Date().toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
    const time = new Date().toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit'
    });
    
    let message = `🛍️ *${storeName} - NOUVELLE COMMANDE* 🛍️\n`;
    message += `━━━━━━━━━━━━━━━━━━━━━━━━\n`;
    message += `📅 Date : ${date} à ${time}\n`;
    message += `━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;
    
    message += `*📋 DÉTAILS DE LA COMMANDE :*\n\n`;
    
    items.forEach((item, index) => {
      const price = item.variant?.price || item.product.price;
      const itemTotal = price * item.quantity;
      const variantInfo: string[] = [];
      
      if (item.variant?.size) variantInfo.push(`Taille ${item.variant.size}`);
      if (item.variant?.color) variantInfo.push(`Couleur ${item.variant.color}`);
      const variantText = variantInfo.length > 0 ? ` (${variantInfo.join(', ')})` : '';
      
      message += `${index + 1}. *${item.product.name}${variantText}*\n`;
      message += `   └─ 🔢 Quantité : ${item.quantity}\n`;
      message += `   └─ 💰 Prix unitaire : ${formatPrice(price)}\n`;
      if (item.variant?.sku) {
        message += `   └─ 🔖 SKU : ${item.variant.sku}\n`;
      }
      message += `   └─ 💵 Sous-total : ${formatPrice(itemTotal)}\n\n`;
    });
    
    message += `━━━━━━━━━━━━━━━━━━━━━━━━\n`;
    message += `*💰 RÉCAPITULATIF :*\n`;
    message += `📦 Sous-total : ${formatPrice(totalPrice)}\n`;
    message += `🚚 Frais de livraison : À confirmer\n`;
    message += `🎁 Remise : ${formatPrice(0)}\n`;
    message += `━━━━━━━━━━━━━━━━━━━━━━━━\n`;
    message += `*💵 TOTAL À PAYER : ${formatPrice(totalPrice)}*\n`;
    message += `━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;
    
    if (includeShipping) {
      message += `*🚚 INFORMATIONS DE LIVRAISON :*\n`;
      message += `📍 Zone de livraison : À préciser\n`;
      message += `⏱️ Délai estimé : 3-5 jours ouvrés\n`;
      message += `📦 Suivi de commande : Disponible\n\n`;
    }
    
    if (includePayment) {
      message += `*💳 MODES DE PAIEMENT :*\n`;
      message += `✓ Orange Money\n`;
      message += `✓ Wave\n`;
      message += `✓ Carte bancaire\n`;
      message += `✓ Paiement à la livraison\n\n`;
    }
    
    if (includeContact) {
      message += `*📞 INFORMATIONS CLIENT :*\n`;
      message += `Nom : À confirmer\n`;
      message += `Téléphone : À confirmer\n`;
      message += `Adresse : À confirmer\n\n`;
    }
    
    message += `━━━━━━━━━━━━━━━━━━━━━━━━\n`;
    message += `✨ *CONFIRMATION DE COMMANDE* ✨\n`;
    message += `Merci de confirmer la disponibilité des produits\n`;
    message += `et de me communiquer les modalités de paiement.\n\n`;
    message += `🔗 ${storeWebsite}`;
    
    return message;
  };

  /**
   * Génère un message avec les informations de livraison complètes
   */
  const generateFullOrderMessage = (
    items: CartItem[],
    totalPrice: number,
    shippingAddress: ShippingAddress,
    paymentMethod: string
  ): string => {
    const date = new Date().toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
    const time = new Date().toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit'
    });
    
    let message = `🛍️ *${storeName} - COMMANDE CONFIRMÉE* 🛍️\n`;
    message += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
    message += `📅 Date : ${date} à ${time}\n`;
    message += `🆔 Commande #CMD-${Date.now().toString().slice(-6)}\n`;
    message += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;
    
    message += `*👤 INFORMATIONS CLIENT :*\n`;
    message += `👨‍💼 Nom : ${shippingAddress.firstName} ${shippingAddress.lastName}\n`;
    message += `📞 Téléphone : ${shippingAddress.phone}\n`;
    message += `📍 Ville : ${shippingAddress.city}\n`;
    message += `🌍 Pays : ${shippingAddress.country}\n\n`;
    
    message += `*📋 DÉTAILS DE LA COMMANDE :*\n\n`;
    
    items.forEach((item, index) => {
      const price = item.variant?.price || item.product.price;
      const itemTotal = price * item.quantity;
      const variantInfo: string[] = [];
      
      if (item.variant?.size) variantInfo.push(`Taille ${item.variant.size}`);
      if (item.variant?.color) variantInfo.push(`Couleur ${item.variant.color}`);
      const variantText = variantInfo.length > 0 ? ` (${variantInfo.join(', ')})` : '';
      
      message += `${index + 1}. *${item.product.name}${variantText}*\n`;
      message += `   └─ 🔢 Quantité : ${item.quantity}\n`;
      message += `   └─ 💰 Prix unitaire : ${formatPrice(price)}\n`;
      if (item.variant?.sku) {
        message += `   └─ 🔖 SKU : ${item.variant.sku}\n`;
      }
      message += `   └─ 💵 Sous-total : ${formatPrice(itemTotal)}\n\n`;
    });
    
    message += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
    message += `*💰 TOTAL : ${formatPrice(totalPrice)}*\n`;
    message += `💳 Mode de paiement : ${getPaymentMethodName(paymentMethod)}\n`;
    message += `🚚 Livraison : Standard (3-5 jours)\n`;
    message += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;
    
    message += `✨ Merci pour votre commande ! ✨\n`;
    message += `Nous vous contacterons très prochainement pour confirmer\n`;
    message += `la disponibilité et organiser la livraison.\n\n`;
    message += `🔗 ${storeWebsite}`;
    
    return message;
  };

  /**
   * Convertit l'identifiant du mode de paiement en nom lisible
   */
  const getPaymentMethodName = (methodId: string): string => {
    const methods: Record<string, string> = {
      'orange_money': 'Orange Money',
      'wave': 'Wave',
      'card': 'Carte Bancaire',
      'cash': 'Paiement à la livraison'
    };
    return methods[methodId] || methodId;
  };

  /**
   * Ouvre WhatsApp avec le message préparé
   */
  const openWhatsApp = (message: string): void => {
    if (!message || message.trim() === '') {
      console.error('Message vide, impossible d\'ouvrir WhatsApp');
      return;
    }
    
    const encodedMessage = encodeURIComponent(message);
    const url = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(url, '_blank');
  };

  /**
   * Message simple pour contact général
   */
  const getGeneralContactMessage = (): string => {
    return `👋 Bonjour ! Je souhaite obtenir plus d'informations sur vos produits et services.\n\n` +
           `📱 ${storeName}\n` +
           `🔗 ${storeWebsite}\n\n` +
           `Merci de me contacter dès que possible. 🙏`;
  };

  return {
    phoneNumber,
    storeName,
    formatPrice,
    generateProductMessage,
    generateCartMessage,
    generateFullOrderMessage,
    getPaymentMethodName,
    openWhatsApp,
    getGeneralContactMessage,
  };
};