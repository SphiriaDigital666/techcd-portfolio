"use client";

import React, { useState } from 'react';
import SaveButton from './SaveButton';

const VariationsTab = () => {
  const [variations, setVariations] = useState({
    color: { values: ['White'] },
    sizes: { values: [] },
    storage: { values: [] }
  });

  const [editingType, setEditingType] = useState<keyof typeof variations | null>(null);
  const [newValue, setNewValue] = useState('');

  const addVariation = (type: keyof typeof variations) => {
    setEditingType(type);
    setNewValue('');
  };

  const closeInput = () => {
    setEditingType(null);
    setNewValue('');
  };

  const handleSubmit = (type: keyof typeof variations) => {
    if (newValue.trim()) {
      setVariations({
        ...variations,
        [type]: {
          ...variations[type],
          values: [...variations[type].values, newValue.trim()]
        }
      });
    }
    closeInput();
  };

  const removeVariation = (type: keyof typeof variations, value: string) => {
    setVariations({
      ...variations,
      [type]: {
        ...variations[type],
        values: variations[type].values.filter(v => v !== value)
      }
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent, type: keyof typeof variations) => {
    if (e.key === 'Enter') {
      handleSubmit(type);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-[#E5E5E5]">Variations</h2>

      <div className="space-y-6">
        {/* Color Section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="block text-lg font-medium text-white">Color</label>
            <button
              onClick={() => addVariation('color')}
              className="bg-[#028EFC] text-white px-3 py-2  transition-colors"
            >
              Add
            </button>
          </div>
          {editingType === 'color' && (
            <div className="flex items-center space-x-2">
              <input
                type="text"
                placeholder="Enter color variation"
                value={newValue}
                onChange={(e) => setNewValue(e.target.value)}
                onKeyPress={(e) => handleKeyPress(e, 'color')}
                className="flex-1 px-4 py-2 border border-[#172D6D] rounded-xl text-white placeholder-gray-400 bg-transparent focus:outline-none focus:border-[#3B82F6] transition-colors"
                autoFocus
              />
              <button
                onClick={closeInput}
                className="text-red-500 hover:text-red-400 transition-colors p-2"
              >
                ✕
              </button>
            </div>
          )}
          {variations.color.values.map((value, index) => (
            <div key={index} className="flex items-center justify-between ml-4">
              <span className="text-white">{value}</span>
              <button
                onClick={() => removeVariation('color', value)}
                className="text-red-500 text-sm hover:text-red-400 transition-colors"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        {/* Sizes Section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="block text-lg font-medium text-white">Sizes</label>
            <button
              onClick={() => addVariation('sizes')}
              className="bg-[#028EFC] text-white px-3 py-2  transition-colors"
            >
              Add
            </button>
          </div>
          {editingType === 'sizes' && (
            <div className="flex items-center space-x-2">
              <input
                type="text"
                placeholder="Enter size variation"
                value={newValue}
                onChange={(e) => setNewValue(e.target.value)}
                onKeyPress={(e) => handleKeyPress(e, 'sizes')}
                className="flex-1 px-4 py-2 border border-[#172D6D] rounded-xl text-white placeholder-gray-400 bg-transparent focus:outline-none focus:border-[#3B82F6] transition-colors"
                autoFocus
              />
              <button
                onClick={closeInput}
                className="text-red-500 hover:text-red-400 transition-colors p-2"
              >
                ✕
              </button>
            </div>
          )}
          {variations.sizes.values.map((value, index) => (
            <div key={index} className="flex items-center justify-between ml-4">
              <span className="text-white">{value}</span>
              <button
                onClick={() => removeVariation('sizes', value)}
                className="text-red-500 text-sm hover:text-red-400 transition-colors"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        {/* Storage Section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="block text-lg font-medium text-white">Storage</label>
            <button
              onClick={() => addVariation('storage')}
              className="bg-[#028EFC] text-white px-3 py-2   transition-colors"
            >
              Add
            </button>
          </div>
          {editingType === 'storage' && (
            <div className="flex items-center space-x-2">
              <input
                type="text"
                placeholder="Enter storage variation"
                value={newValue}
                onChange={(e) => setNewValue(e.target.value)}
                onKeyPress={(e) => handleKeyPress(e, 'storage')}
                className="flex-1 px-4 py-2 border border-[#172D6D] rounded-xl text-white placeholder-gray-400 bg-transparent focus:outline-none focus:border-[#3B82F6] transition-colors"
                autoFocus
              />
              <button
                onClick={closeInput}
                className="text-red-500 hover:text-red-400 transition-colors p-2"
              >
                ✕
              </button>
            </div>
          )}
          {variations.storage.values.map((value, index) => (
            <div key={index} className="flex items-center justify-between ml-4">
              <span className="text-white">{value}</span>
              <button
                onClick={() => removeVariation('storage', value)}
                className="text-red-500 text-sm hover:text-red-400 transition-colors"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Save Changes Button */}
      <div className="flex justify-end pt-6">
        <SaveButton identifier="save-variations-btn" buttonText="Save Changes" />
      </div>
    </div>
  );
};

export default VariationsTab;
