export type Product = {
  _id: string;
  title: string;
  smallDescription: string;
  description: string;
  productImages: string[];
  price: number;
  discountPrice: number;
  categories: { name: string; description: string }[];
  attributes: { name: string; variations: string[] }[];
};

export type Category = {
  name: string;
  description: string;
};
