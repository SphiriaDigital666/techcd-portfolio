import React from 'react'
import { Product } from '@/lib/api/productApi'

interface AttributesViewProps {
  product: Product
}

const AttributesView: React.FC<AttributesViewProps> = ({ product }) => {
  return (
    <div>
      <h3 className="text-white text-[24px] font-semibold mb-6 break-words">Attributes</h3>
      <div className="rounded-3xl border border-[#172D6D] bg-black/30 backdrop-blur-[500px] p-6 overflow-hidden">
        <div className="space-y-6">
          {product.attributes && product.attributes.length > 0 ? (
            product.attributes.map((attr, index) => (
              <div key={attr.attribute._id}>
                <label className="block text-white text-sm font-medium mb-2">
                  {attr.attribute.name}
                </label>
                <div className="relative">
                  <select 
                    className="w-full px-4 py-3 rounded-lg border border-[#172D6D] bg-black/30 text-white appearance-none focus:outline-none focus:border-[#3B82F6] transition-colors"
                    disabled
                    value={attr.selectedVariations[0] || ''}
                  >
                    <option value="">Select {attr.attribute.name}</option>
                    {attr.attribute.variations.map((variation) => (
                      <option key={variation} value={variation}>
                        {variation}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                {attr.selectedVariations.length > 1 && (
                  <div className="mt-2">
                    <p className="text-sm text-gray-300 mb-2">Selected variations:</p>
                    <div className="flex flex-wrap gap-2">
                      {attr.selectedVariations.map((variation, idx) => (
                        <span 
                          key={idx}
                          className="px-2 py-1 bg-blue-600 text-white text-xs rounded"
                        >
                          {variation}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-400">
              <p>No attributes configured for this product</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AttributesView
