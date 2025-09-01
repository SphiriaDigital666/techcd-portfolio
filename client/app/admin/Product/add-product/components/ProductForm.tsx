"use client";

import React, { useState, useCallback } from 'react'
import ProductDetails from './ProductDetails'
import PublishingMetadata from './PublishingMetadata'
import Attributes from './Attributes'
import { productApi, CreateProductData } from '@/lib/api/productApi'

interface ProductFormData {
  // Product Details
  title: string;
  shortDescription: string;
  description: string;
  price: string;
  discountPrice: string;
  
  // Publishing & Metadata
  status: string;
  selectedCategories: string[];
  
  // Attributes
  attributes: Record<string, { enabled: boolean; selectedValue: string }>;
  
  // Gallery
  selectedFiles: Array<{
    id: string;
    name: string;
    size: number;
    type: string;
    lastModified: number;
  }>;
}

const ProductForm = () => {
  const [formData, setFormData] = useState<ProductFormData>({
    title: '',
    shortDescription: '',
    description: '',
    price: '',
    discountPrice: '',
    status: 'Draft',
    selectedCategories: [],
    attributes: {},
    selectedFiles: []
  });

  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [resetKey, setResetKey] = useState(0);

  // Handle product details changes
  const handleProductDataChange = useCallback((data: {
    title: string;
    shortDescription: string;
    description: string;
    price: string;
    discountPrice: string;
  }) => {
    setFormData(prev => ({
      ...prev,
      ...data
    }));
  }, []);

  // Handle publishing data changes
  const handlePublishingDataChange = useCallback((data: {
    status: string;
    selectedCategories: string[];
  }) => {
    setFormData(prev => ({
      ...prev,
      ...data
    }));
  }, []);

  // Handle attributes changes
  const handleAttributesChange = useCallback((attributes: Record<string, { enabled: boolean; selectedValue: string }>) => {
    setFormData(prev => ({
      ...prev,
      attributes
    }));
  }, []);

  // Handle gallery files changes
  const handleGalleryFilesChange = useCallback((files: Array<{
    id: string;
    name: string;
    size: number;
    type: string;
    lastModified: number;
  }>) => {
    setFormData(prev => ({
      ...prev,
      selectedFiles: files
    }));
  }, []);

  // Reset all form data
  const resetForm = useCallback(() => {
    setFormData({
      title: '',
      shortDescription: '',
      description: '',
      price: '',
      discountPrice: '',
      status: 'Draft',
      selectedCategories: [],
      attributes: {},
      selectedFiles: []
    });
    setResetKey(prev => prev + 1); // Force re-render of child components
  }, []);

  // Show success message
  const showSuccessMessage = useCallback((message: string) => {
    setSuccessMessage(message);
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setSuccessMessage('');
    }, 5000); // Hide after 5 seconds
  }, []);

  // Handle form submission
  const handleSubmit = useCallback(async () => {
    setLoading(true);
    
    try {
      // Validate required fields
      if (!formData.title.trim()) {
        alert('Product title is required');
        return;
      }
      
      if (!formData.price.trim()) {
        alert('Product price is required');
        return;
      }

      if (!formData.shortDescription.trim()) {
        alert('Product short description is required');
        return;
      }

      if (!formData.description.trim()) {
        alert('Product description is required');
        return;
      }

      if (formData.selectedCategories.length === 0) {
        alert('Please select at least one category');
        return;
      }

      if (formData.selectedFiles.length === 0) {
        alert('Please select at least one product image');
        return;
      }

      // Prepare product data for API
      const productData: CreateProductData = {
        title: formData.title.trim(),
        smallDescription: formData.shortDescription.trim(),
        description: formData.description.trim(),
        price: parseFloat(formData.price),
        discountPrice: formData.discountPrice ? parseFloat(formData.discountPrice) : undefined,
        categories: formData.selectedCategories,
        productImages: formData.selectedFiles.map(file => file.name), // Use file names for now
        attributes: Object.entries(formData.attributes)
          .filter(([_, attr]) => attr.enabled && attr.selectedValue)
          .map(([attrId, attr]) => ({
            attribute: attrId,
            selectedVariations: [attr.selectedValue]
          }))
      };

      console.log('Submitting product data:', productData);

      // Call the real API
      const createdProduct = await productApi.createProduct(productData);
      
      console.log('Product created successfully:', createdProduct);
      
      // Show success message
      showSuccessMessage(`Product "${formData.title}" has been added successfully!`);
      
      // Reset form
      resetForm();

    } catch (error: any) {
      console.error('Error adding product:', error);
      alert(`Failed to add product: ${error.message || 'Please try again.'}`);
    } finally {
      setLoading(false);
    }
  }, [formData, showSuccessMessage, resetForm]);

  return (
    <div className="min-h-screen  text-white ">
      {/* Success Message */}
      {showSuccess && (
        <div className="fixed top-4 right-4 z-50 bg-green-600 text-white px-6 py-4 rounded-lg shadow-lg border border-green-500 animate-in slide-in-from-right duration-300">
          <div className="flex items-center space-x-3">
            <svg className="w-6 h-6 text-green-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <div>
              <p className="font-medium">Success!</p>
              <p className="text-sm text-green-100">{successMessage}</p>
            </div>
            <button
              onClick={() => setShowSuccess(false)}
              className="text-green-200 hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex items-center gap-4">
          <h1 className="text-[28px] font-bold sm:text-[24px] md:text-[26px] lg:text-[28px] xl:text-[30px] text-[#E5E5E5]">
            Products
          </h1>
          <span className="text-[17px] text-[#E5E5E5] font-semibold sm:text-[18px] md:text-[19px] lg:text-[20px] xl:text-[20px] mt-2">
            Created products
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left Column - Product Details */}
          <div className="lg:col-span-3">
            <div className="relative rounded-3xl border border-[#172D6D] bg-black/30 backdrop-blur-[500px] p-6">
              <ProductDetails 
                key={`product-details-${resetKey}`}
                onProductDataChange={handleProductDataChange} 
                onFilesChange={handleGalleryFilesChange}
              />
            </div>
            
            <div className='mt-6'>
              <Attributes 
                key={`attributes-${resetKey}`}
                onAttributesChange={handleAttributesChange} 
              />
            </div>
          </div>

          {/* Right Column - Publishing & Metadata */}
          <div className="lg:col-span-2 space-y-6">
            <PublishingMetadata 
              key={`publishing-${resetKey}`}
              onPublishingDataChange={handlePublishingDataChange} 
              onSubmit={handleSubmit}
              loading={loading}
            />
          </div>
        </div>

        {/* Form Data Preview (for debugging - remove in production) */}
        {/* {process.env.NODE_ENV === 'development' && (
          <div className="mt-8 p-4 rounded-3xl border border-[#172D6D] bg-black/30 backdrop-blur-[500px]">
            <h3 className="text-lg font-medium text-white mb-4">Form Data Preview</h3>
            <pre className="text-xs text-gray-300 overflow-auto">
              {JSON.stringify(formData, null, 2)}
            </pre>
          </div>
        )} */}
      </div>
    </div>
  )
}

export default ProductForm 