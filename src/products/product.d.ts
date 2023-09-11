export interface ShopifyProductsResponse {
  id: number;
  created_at: string;
  title: string;
  product_type: string;
  image?: any;
}

export interface ProductResponse {
  date: string;
  numOfProducts: number;
  productIds: string[];
}
