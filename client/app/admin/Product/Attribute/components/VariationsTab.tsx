"use client";

import React, { useState, useEffect, useRef } from 'react';
import SaveButton from './SaveButton';

interface VariationsTabProps {
  savedAttributes: Array<{ id: string; name: string; values: string[] }>;
  onSaveVariations?: (variations: Record<string, { values: string[] }>) => void;
  savedVariations?: Record<string, { values: string[] }>;
}

const VariationsTab: React.FC<VariationsTabProps> = ({ savedAttributes, onSaveVariations, savedVariations = {} }) => {
  console.log('VariationsTab received attributes:', savedAttributes);
  console.log('VariationsTab received saved variations:', savedVariations);
  
  const [variations, setVariations] = useState<Record<string, { values: string[] }>>(savedVariations);
  const [editingType, setEditingType] = useState<string | null>(null);
  const [newValue, setNewValue] = useState('');
  const variationsRef = useRef(variations);

  // Update ref when variations change
  useEffect(() => {
    variationsRef.current = variations;
  }, [variations]);

  // Update variations state when savedAttributes changes
  useEffect(() => {
    const initialVariations: Record<string, { values: string[] }> = {};
    savedAttributes.forEach(attr => {
      // Preserve existing variations for attributes that already exist
      if (variationsRef.current[attr.id]) {
        initialVariations[attr.id] = variationsRef.current[attr.id];
      } else {
        initialVariations[attr.id] = { values: attr.values };
      }
    });
    setVariations(initialVariations);
    console.log('Updated variations state:', initialVariations);
  }, [savedAttributes]);

  const addVariation = (id: string) => {
    setEditingType(id);
    setNewValue('');
  };

  const closeInput = () => {
    setEditingType(null);
    setNewValue('');
  };

  const handleSubmit = async (id: string) => {
    if (newValue.trim()) {
      const currentVariations = variations[id] || { values: [] };
      const updatedVariations = {
        ...variations,
        [id]: {
          values: [...currentVariations.values, newValue.trim()]
        }
      };
      setVariations(updatedVariations);
      console.log('Added variation for attribute', id, ':', newValue.trim());
      console.log('Current variations for this attribute:', currentVariations.values);
      console.log('Updated variations:', updatedVariations);
      
      // Immediately save the changes
      if (onSaveVariations) {
        try {
          await onSaveVariations(updatedVariations);
          console.log('Variations saved after adding');
        } catch (error) {
          console.error('Error saving variations after adding:', error);
        }
      }
    }
    closeInput();
  };

  const removeVariation = async (id: string, value: string) => {
    const updatedVariations = {
      ...variations,
      [id]: {
        ...variations[id],
        values: variations[id].values.filter(v => v !== value)
      }
    };
    setVariations(updatedVariations);
    console.log('Removed variation for attribute', id, ':', value);
    
    // Immediately save the changes
    if (onSaveVariations) {
      try {
        await onSaveVariations(updatedVariations);
        console.log('Variations saved after removal');
      } catch (error) {
        console.error('Error saving variations after removal:', error);
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent, id: string) => {
    if (e.key === 'Enter') {
      handleSubmit(id);
    }
  };

  const handleSaveChanges = () => {
    console.log('Saving variations...', variations);
    
    if (onSaveVariations) {
      onSaveVariations(variations);
    }
    
    // Add visual feedback
    alert('Variations saved successfully!');
    console.log('Variations saved:', variations);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-[#E5E5E5]">Variations</h2>

      <div className="space-y-6">
        {savedAttributes.map((attribute) => {
          const currentVariations = variations[attribute.id] || { values: [] };
          console.log(`Rendering attribute ${attribute.name} with variations:`, currentVariations);
          
          return (
            <div key={attribute.id} className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="block text-lg font-medium text-white">{attribute.name}</label>
                <button
                  onClick={() => addVariation(attribute.id)}
                  className="bg-[#028EFC] text-white px-3 py-2  transition-colors"
                >
                  Add
                </button>
              </div>
              {editingType === attribute.id && (
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    placeholder={`Enter ${attribute.name.toLowerCase()} variation`}
                    value={newValue}
                    onChange={(e) => setNewValue(e.target.value)}
                    onKeyPress={(e) => handleKeyPress(e, attribute.id)}
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
              {currentVariations.values.map((value, index) => (
                <div key={index} className="flex items-center justify-between ml-4">
                  <span className="text-white">{value}</span>
                  <button
                    onClick={() => removeVariation(attribute.id, value)}
                    className="text-red-500 text-sm hover:text-red-400 transition-colors"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          );
        })}
      </div>

      {/* Save Changes Button */}
      <div className="flex justify-end pt-6">
        <SaveButton identifier="save-variations-btn" buttonText="Save Changes" onClick={handleSaveChanges} />
      </div>
    </div>
  );
};

export default VariationsTab;
