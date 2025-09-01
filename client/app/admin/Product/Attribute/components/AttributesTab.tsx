"use client";

import React, { useState, useEffect } from 'react';
import SaveButton from './SaveButton';

interface AttributesTabProps {
  onSaveAttributes: (attributes: Array<{ id: string; name: string; values: string[] }>) => void;
  savedAttributes?: Array<{ id: string; name: string; values: string[] }>;
}

const AttributesTab: React.FC<AttributesTabProps> = ({ onSaveAttributes, savedAttributes = [] }) => {
  const [attributes, setAttributes] = useState<Array<{ id: string; name: string; values: string[] }>>(savedAttributes);
  const [inputFields, setInputFields] = useState<Array<{ id: string; value: string }>>([]);
  const [nextId, setNextId] = useState(1); // Start from 1

  // Update local attributes when savedAttributes prop changes
  useEffect(() => {
    setAttributes(savedAttributes);
  }, [savedAttributes]);

  const addAttribute = () => {
    const validInputs = inputFields.filter(input => input.value.trim());
    if (validInputs.length > 0) {
      const newAttributes = validInputs.map(input => ({
        id: `temp_${nextId}_${Date.now()}`, // Use temp_ prefix for new attributes
        name: input.value,
        values: []
      }));
      setAttributes([...attributes, ...newAttributes]);
      setNextId(nextId + validInputs.length);
      setInputFields([]);
    }
  };

  const removeAttribute = async (id: string) => {
    const updatedAttributes = attributes.filter(attr => attr.id !== id);
    setAttributes(updatedAttributes);
    console.log('Removed attribute:', id);
    
    // Immediately save the changes
    try {
      await onSaveAttributes(updatedAttributes);
      console.log('Attributes saved after removal');
    } catch (error) {
      console.error('Error saving attributes after removal:', error);
    }
  };

  const handleAddClick = () => {
    const newInputField = {
      id: `input_${Date.now()}_${Math.random()}`,
      value: ''
    };
    setInputFields([...inputFields, newInputField]);
  };

  const updateInputValue = (id: string, value: string) => {
    setInputFields(inputFields.map(input => 
      input.id === id ? { ...input, value } : input
    ));
  };

  const removeInputField = (id: string) => {
    setInputFields(inputFields.filter(input => input.id !== id));
  };

  const handleSaveChanges = async () => {
    // Process any pending attributes from input fields
    const validInputs = inputFields.filter(input => input.value.trim());
    const newAttributes = validInputs.map((input, index) => ({
      id: `temp_${nextId + index}_${Date.now()}`, // Ensure unique IDs
      name: input.value,
      values: []
    }));
    
    // Combine existing attributes with new ones
    const allAttributes = [...attributes, ...newAttributes];
    
    // Check if there are any changes to save
    if (validInputs.length === 0) {
      console.log('No new attributes to save');
      return;
    }
    
    // Save all attributes
    try {
      await onSaveAttributes(allAttributes);
      
      // Update local state and clear input fields
      setAttributes(allAttributes);
      setNextId(nextId + validInputs.length);
      setInputFields([]);
      
      console.log('Saved attributes:', allAttributes);
    } catch (error) {
      console.error('Error saving attributes:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-[#E5E5E5]">Attributes</h2>
          <button
            onClick={handleAddClick}
            className="bg-[#028EFC] text-white px-3 py-1   transition-colors"
          >
            Add
          </button>
        </div>
        
        {/* Display existing attributes */}
        {attributes.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-lg font-medium text-white">Existing Attributes:</h3>
            {attributes.map((attr) => (
              <div key={attr.id} className="flex items-center justify-between p-3  rounded-md">
                <span className="text-white">{attr.name}</span>
                <button
                  onClick={() => removeAttribute(attr.id)}
                  className="text-red-500 hover:text-red-400 text-sm"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
        
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-white">Add New Attributes:</h3>
          {inputFields.map((input, index) => (
            <div key={input.id} className="flex items-center space-x-2">
              <input
                type="text"
                value={input.value}
                onChange={(e) => updateInputValue(input.id, e.target.value)}
     
                className="px-3 py-1 border border-[#172D6D] rounded-md  text-white flex-1"
                placeholder="Enter attribute name"
              />
              <button
                onClick={() => removeInputField(input.id)}
                className="text-red-500 hover:text-red-700 px-2 py-2"
              >
                X
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Save Changes Button */}
      <div className="flex justify-end pt-6">
        <SaveButton identifier="save-attributes-btn" buttonText="Save Changes" onClick={handleSaveChanges} />
      </div>
    </div>
  );
};

export default AttributesTab;
