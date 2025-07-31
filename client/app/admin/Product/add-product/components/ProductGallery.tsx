import React from 'react'

const ProductGallery = () => {
  return (
    <div>
      <label className="block  font-medium text-[#FFFFFF] text-[17px] mb-2">
        Product Gallery
      </label>
      <div className="border-2 border-dashed  rounded-lg  border-[#172D6D]   p-8 text-center hover:border-gray-500 transition-colors cursor-pointer">
        <div className="space-y-2">
          <div className="text-gray-400">
            <svg className="mx-auto h-12 w-12" stroke="currentColor" fill="none" viewBox="0 0 48 48">
              <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="text-gray-400 font-medium">
            Drop files here to upload
          </div>
          <div className="text-sm text-gray-500">
            or click to browse
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductGallery 