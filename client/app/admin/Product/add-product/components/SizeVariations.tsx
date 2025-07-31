import React from 'react'

const SizeVariations = () => {
  const sizes = [
    { id: 'xs', label: 'XS', checked: false },
    { id: 'l', label: 'L', checked: true },
    { id: 'xl', label: 'XL', checked: true },
    { id: 'xll', label: 'XLL', checked: false },
    { id: 'xlll', label: 'XLLL', checked: false },
  ]

  return (
    <div className="border border-[#172D6D] rounded-lg p-4  ">
      <label className="block text-sm font-medium text-gray-300 mb-4">
        Size Variations
      </label>
      <div className="space-y-3">
        {sizes.map((size) => (
          <div key={size.id} className="flex items-center">
            <div className="flex items-center w-16">
              <input
                type="checkbox"
                id={size.id}
                defaultChecked={size.checked}
                className="w-4 h-4 text-white bg-transparent border border-white rounded focus:ring-white focus:ring-1 appearance-none checked:bg-white checked:after:content-['✓'] checked:after:text-black checked:after:absolute checked:after:text-xs checked:after:font-bold checked:after:leading-none checked:after:top-0.5 checked:after:left-0.5 relative"
              />
              <label htmlFor={size.id} className="ml-2 text-sm font-medium text-gray-300">
                {size.label}
              </label>
            </div>
            <input
             
              placeholder="Enter Stock"
              className="w-1/2 px-3 py-2  rounded-lg border border-[#172D6D] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-[#172D6D] text-white placeholder-gray-400 text-sm"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default SizeVariations 