export interface Category {
  id: number;
  name: string;
  slug: string;
  gender: string;
  style: string;
  description?: string;
  image?: string;
}

export interface ProductVariant {
  id: number;
  size: string;
  color: string;
  color_code?: string;
  price?: number;
  stock: number;
  image?: string;
  sku: string;
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: number;
  categories: Category[];
  image_main: string;
  image_secondary_1?: string;
  image_secondary_2?: string;
  image_secondary_3?: string;
  featured: boolean;
  best_seller: boolean;
  new_arrival: boolean;
  variants: ProductVariant[];
  created_at: string;
  updated_at: string;
}

export interface Promotion {
  id: number;
  name: string;
  description?: string;
  promotion_type: 'percentage' | 'fixed';
  value: number;
  start_date: string;
  end_date: string;
  active: boolean;
}

export interface CartItem {
  product: Product;
  variant: ProductVariant;
  quantity: number;
}