// Product API service
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

export interface ProductAttribute {
  attribute: string; // attribute ID
  selectedVariations: string[];
}

export interface CreateProductData {
  title: string;
  smallDescription: string;
  description: string;
  productImages: string[]; // For now, empty array since no file upload
  price: number;
  discountPrice?: number;
  categories: string[]; // category IDs
  attributes: ProductAttribute[];
}

export interface Product {
  _id: string;
  title: string;
  smallDescription: string;
  description: string;
  productImages: string[];
  price: number;
  discountPrice?: number;
  categories: Array<{
    _id: string;
    name: string;
    description: string;
  }>;
  attributes: Array<{
    attribute: {
      _id: string;
      name: string;
      variations: string[];
    };
    selectedVariations: string[];
  }>;
  createdAt: string;
  updatedAt: string;
}

export const productApi = {
  // Create new product
  createProduct: async (productData: CreateProductData): Promise<Product> => {
    try {
      const response = await fetch(`${API_BASE_URL}/product`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create product');
      }

      const result = await response.json();
      return result.data;
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  },

  // Get all products
  getProducts: async (): Promise<Product[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/product`);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch products');
      }

      const result = await response.json();
      return result.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },

  // Get product by ID
  getProductById: async (id: string): Promise<Product> => {
    try {
      const response = await fetch(`${API_BASE_URL}/product/${id}`);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch product');
      }

      const result = await response.json();
      return result.data;
    } catch (error) {
      console.error('Error fetching product:', error);
      throw error;
    }
  },

  // Update product
  updateProduct: async (id: string, productData: Partial<CreateProductData>): Promise<Product> => {
    try {
      const response = await fetch(`${API_BASE_URL}/product/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update product');
      }

      const result = await response.json();
      return result.data;
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  },

  // Delete product
  deleteProduct: async (id: string): Promise<void> => {
    try {
      const response = await fetch(`${API_BASE_URL}/product/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete product');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  },
};
