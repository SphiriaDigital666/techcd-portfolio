"use client";

import React, { useState } from 'react';
import SaveButton from './SaveButton';

const AttributesTab = () => {
  const [attributes, setAttributes] = useState([
    { id: 1, name: 'Color', values: [] }
  ]);
  const [inputFields, setInputFields] = useState<Array<{ id: number; value: string }>>([]);

  const addAttribute = () => {
    const validInputs = inputFields.filter(input => input.value.trim());
    if (validInputs.length > 0) {
      const newAttributes = validInputs.map(input => ({
        id: Date.now() + Math.random(),
        name: input.value,
        values: []
      }));
      setAttributes([...attributes, ...newAttributes]);
      setInputFields([]);
    }
  };

  const removeAttribute = (id: number) => {
    setAttributes(attributes.filter(attr => attr.id !== id));
  };

  const handleAddClick = () => {
    const newInputField = {
      id: Date.now() + Math.random(),
      value: ''
    };
    setInputFields([...inputFields, newInputField]);
  };

  const updateInputValue = (id: number, value: string) => {
    setInputFields(inputFields.map(input => 
      input.id === id ? { ...input, value } : input
    ));
  };

  const removeInputField = (id: number) => {
    setInputFields(inputFields.filter(input => input.id !== id));
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
        
        <div className="space-y-4">
         
          
          {inputFields.map((input, index) => (
            <div key={input.id} className="flex items-center space-x-2">
              <input
                type="text"
                value={input.value}
                onChange={(e) => updateInputValue(input.id, e.target.value)}
     
                className="px-3 py-1 border border-[#172D6D] rounded-md  text-white flex-1"
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
        <SaveButton identifier="save-attributes-btn" buttonText="Save Changes" />
      </div>
    </div>
  );
};

export default AttributesTab;
