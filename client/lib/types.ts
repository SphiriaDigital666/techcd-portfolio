export type FetchedProduct = {
  _id: string;
  title: string;
  smallDescription: string;
  description: string;
  productImages: string[];
  price: number;
  discountPrice: number;
  categories: { _id: string; name: string; description: string }[];
  attributes: {
    attribute: { _id: string; name: string; variations: string[] };
    selectedVariations: string[];
  }[];
};

export type Product = {
  id: string;
  title: string;
  smallDescription: string;
  description: string;
  productImages: string[];
  price: number;
  discountPrice: number;
  categories: { name: string; description: string }[];
  attributes: { name: string; variations: string[] }[];
};
