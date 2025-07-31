"use client";

import React, { useState } from 'react'

const ColorVariations = () => {
  const [colors, setColors] = useState([
    { id: 'white', color: 'bg-white', selected: false },
    { id: 'black', color: 'bg-black', selected: false },
    { id: 'red', color: 'bg-red-500', selected: true },
  ])

  const toggleColor = (id: string) => {
    setColors(colors.map(color => 
      color.id === id 
        ? { ...color, selected: !color.selected }
        : color
    ))
  }

  return (
    <div>
      <label className="block text-sm font-medium text-[#FFFFFF] text-[17px] mb-4">
        Color Variations
      </label>
      <div className="border border-[#172D6D] rounded-lg p-4 ">
        <div className="flex items-center space-x-4">
          <div className="flex space-x-2">
            {colors.map((colorItem) => (
              <div key={colorItem.id} className="relative">
                <div
                  className={`w-8 h-8 rounded-full border-2 border-white cursor-pointer ${colorItem.color} transition-all duration-200`}
                  onClick={() => toggleColor(colorItem.id)}
                >
                  {colorItem.selected && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg className={`w-4 h-4 ${colorItem.color === 'bg-black' ? 'text-white' : 'text-black'}`} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          {/* <input
            type="text"
            placeholder="Enter color name or add new color"
            className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 text-sm"
          /> */}
        </div>
      </div>
    </div>
  )
}

export default ColorVariations 