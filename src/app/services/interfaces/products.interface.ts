export type Product = {
  id: number;
  description: string;
  image_urls: string;
  name: string;
  price: number;
  category: string;
  price_id: string;
  stripe_id: string;
};
export type ProductCount = {
  id: number;
  description: string;
  image_urls: string;
  name: string;
  price: number;
  category: string;
  count: number;
  price_id: string;
  stripe_id: string;
};

export interface StripeProductResponse {
  product: StripeProduct;
  price: StripePrice;
}

export interface StripeProduct {
  id: string;
  object: string;
  active: boolean;
  attributes: string[];
  created: number;
  default_price: null;
  description: string;
  features: string[];
  images: string[];
  livemode: boolean;
  marketing_features: string[];
  metadata: Record<string, string>;
  name: string;
  package_dimensions: null;
  shippable: null;
  statement_descriptor: null;
  tax_code: null;
  type: string;
  unit_label: null;
  updated: number;
  url: null;
}

export interface StripePrice {
  id: string;
  object: string;
  active: boolean;
  billing_scheme: string;
  created: number;
  currency: string;
  custom_unit_amount: null;
  livemode: boolean;
  lookup_key: null;
  metadata: Record<string, string>;
  nickname: null;
  product: string;
  recurring: null;
  tax_behavior: string;
  tiers_mode: null;
  transform_quantity: null;
  type: string;
  unit_amount: number;
  unit_amount_decimal: string;
}
