"use client";

import React, { useState, useEffect } from 'react'
import ProductGallery from './ProductGallery'

interface ProductDetailsProps {
  initialData: {
    title: string;
    shortDescription: string;
    description: string;
    price: string;
    discountPrice: string;
  };
  onProductDataChange: (data: {
    title: string;
    shortDescription: string;
    description: string;
    price: string;
    discountPrice: string;
  }) => void;
  onFilesChange: (files: Array<{
    id: string;
    file: File;
    name: string;
    size: number;
    type: string;
    lastModified: number;
  }>) => void;
  existingImages?: string[];
}

const ProductDetails = ({ 
  initialData, 
  onProductDataChange, 
  onFilesChange, 
  existingImages = [] 
}: ProductDetailsProps) => {
  const [formData, setFormData] = useState(initialData);

  // Update local state when initialData changes
  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  // Handle input changes
  const handleInputChange = (field: string, value: string) => {
    const newData = { ...formData, [field]: value };
    setFormData(newData);
    onProductDataChange(newData);
  };

  return (
    <div className="space-y-6">
      {/* Product Title */}
      <div>
        <label className="block font-medium text-[#FFFFFF] text-[17px] mb-2">
          Product Title
        </label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => handleInputChange('title', e.target.value)}
          className="w-full px-4 py-3 rounded-lg border border-[#172D6D] bg-black/30 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Enter product title"
        />
      </div>

      {/* Product Short Description */}
      <div>
        <label className="block font-medium text-[#FFFFFF] text-[17px] mb-2">
          Product Short Description
        </label>
        <textarea
          rows={3}
          value={formData.shortDescription}
          onChange={(e) => handleInputChange('shortDescription', e.target.value)}
          className="w-full px-4 py-3 rounded-lg border border-[#172D6D] bg-black/30 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 text-sm resize-none"
          placeholder="Enter short description"
        />
      </div>

      {/* Product Description */}
      <div>
        <label className="block font-medium text-[#FFFFFF] text-[17px] mb-2">
          Product Description
        </label>
        <textarea
          rows={6}
          value={formData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          className="w-full px-4 py-3 rounded-lg border border-[#172D6D] bg-black/30 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 text-sm resize-none"
          placeholder="Enter detailed description"
        />
      </div>

      {/* Product Gallery */}
      <ProductGallery 
        onFilesChange={onFilesChange}
        existingImages={existingImages}
      />

      {/* Price Section */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block font-medium text-[#FFFFFF] text-[17px] mb-2">
            Price
          </label>
          <input
            type="number"
            step="0.01"
            value={formData.price}
            onChange={(e) => handleInputChange('price', e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-[#172D6D] bg-black/30 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 text-sm"
            placeholder="0.00"
          />
        </div>
        <div>
          <label className="block font-medium text-[#FFFFFF] text-[17px] mb-2">
            Discount Price
          </label>
          <input
            type="number"
            step="0.01"
            value={formData.discountPrice}
            onChange={(e) => handleInputChange('discountPrice', e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-[#172D6D] bg-black/30 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 text-sm"
            placeholder="0.00"
          />
        </div>
      </div>
    </div>
  )
}

export default ProductDetails 