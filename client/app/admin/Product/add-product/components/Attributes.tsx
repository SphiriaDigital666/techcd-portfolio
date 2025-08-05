import React from 'react'

const Attributes = () => {
  return (
    <div>
 <h3 className="text-white text-[24px] font-semibold mb-6 break-words">Attributes</h3>
<div className="rounded-3xl border border-[#172D6D] bg-black/30 backdrop-blur-[500px] p-6 overflow-hidden">
     
      
      <div className="space-y-6">
        {/* Color Selection */}
        <div>
          <label className="block text-white text-sm font-medium mb-2">
            Color
          </label>
          <div className="relative">
            <select className="w-full px-4 py-3 rounded-lg border placeholder:text-sm text-sm border-[#172D6D] bg-black/30 text-white appearance-none focus:outline-none focus:border-[#3B82F6] transition-colors">
              <option value="white">White</option>
              <option value="black">Black</option>
              <option value="red">Red</option>
              <option value="blue">Blue</option>
              <option value="green">Green</option>
              <option value="yellow">Yellow</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Sizes Selection */}
        <div>
          <label className="block text-white text-sm font-medium mb-2">
            Sizes
          </label>
          <div className="relative">
            <select className="w-full px-4 py-3 placeholder:text-sm text-sm rounded-lg border border-[#172D6D] bg-black/30 text-white appearance-none focus:outline-none focus:border-[#3B82F6] transition-colors">
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
              <option value="XXL">XXL</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Attributes 