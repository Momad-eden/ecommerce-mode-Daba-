export interface ShippingAddress {
  firstName: string;
  lastName: string;
  phone: string;
  city: string;
  country: string;
}

export interface PaymentMethod {
  id: string;
  name: string;
  icon: string;
}

export interface OrderItem {
  productId: number;
  productName: string;
  variantId?: number;
  variantInfo?: string;
  quantity: number;
  price: number;
  image: string;
}

export interface Order {
  id?: number;
  items: OrderItem[];
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  subtotal: number;
  shippingCost: number;
  total: number;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  createdAt?: string;
}