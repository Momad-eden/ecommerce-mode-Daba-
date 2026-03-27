import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Products
export const getProducts = async (params?: any) => {
  const response = await api.get('/products/', { params });
  return response.data;
};

export const getProductBySlug = async (slug: string) => {
  const response = await api.get(`/products/${slug}/`);
  return response.data;
};

export const getFeaturedProducts = async () => {
  const response = await api.get('/products/featured/');
  return response.data;
};

// Categories
export const getCategories = async () => {
  const response = await api.get('/categories/');
  return response.data;
};

// Promotions
export const getActivePromotions = async () => {
  const response = await api.get('/promotions/active/');
  return response.data;
};

export default api;