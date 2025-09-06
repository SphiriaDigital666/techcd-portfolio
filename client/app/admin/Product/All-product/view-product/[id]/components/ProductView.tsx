'use client'

import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { productApi, Product } from '@/lib/api/productApi'
import ProductDetailsView from './ProductDetailsView'
import PublishingMetadataView from './PublishingMetadataView'
import AttributesView from './AttributesView'

const ProductView = () => {
  const params = useParams()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (params.id && typeof params.id === 'string') {
          const productData = await productApi.getProductById(params.id)
          console.log('View product data:', productData);
          console.log('View product quantity:', productData.quantity);
          setProduct(productData)
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch product')
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [params.id])

  if (loading) {
    return (
      <div className="min-h-screen text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p>Loading product...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 mb-4">Error: {error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen text-white flex items-center justify-center">
        <p>Product not found</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen text-white">
      <div className="max-w-7xl  space-y-8">
        <div className="flex items-center gap-4">
          <h1 className="text-[28px] font-bold sm:text-[24px] md:text-[26px] lg:text-[28px] xl:text-[30px] text-[#E5E5E5]">
            Products
          </h1>
          <span className="text-[17px] text-[#E5E5E5] font-semibold sm:text-[18px] md:text-[19px] lg:text-[20px] xl:text-[20px] mt-2">
            View Product
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left Column - Product Details */}
          <div className="lg:col-span-3">
            <div className="relative rounded-3xl border border-[#172D6D] bg-black/30 backdrop-blur-[500px] p-6">
              <ProductDetailsView product={product} />
            </div>
            <div className='mt-6'>
              <AttributesView product={product} />
            </div>
          </div>

          {/* Right Column - Publishing & Metadata */}
          <div className="lg:col-span-2 space-y-6">
            <PublishingMetadataView product={product} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductView
