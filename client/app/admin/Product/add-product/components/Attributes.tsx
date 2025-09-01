'use client'
import React, { useState, useEffect } from 'react'

// API functions for attributes
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

const attributeAPI = {
  getAttributes: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/attribute`);
      if (!response.ok) throw new Error('Failed to fetch attributes');
      return await response.json();
    } catch (error) {
      console.error('Error fetching attributes:', error);
      throw error;
    }
  },
};

interface AttributesProps {
  onAttributesChange: (attributes: Record<string, { enabled: boolean; selectedValue: string }>) => void;
}

const Attributes: React.FC<AttributesProps> = ({ onAttributesChange }) => {
  const [enabledAttributes, setEnabledAttributes] = useState<Record<string, boolean>>({});
  const [selectedValues, setSelectedValues] = useState<Record<string, string>>({});
  const [attributes, setAttributes] = useState<Array<{ _id: string; name: string; variations: string[] }>>([]);
  const [loading, setLoading] = useState(false);

  // Load attributes from API on component mount
  useEffect(() => {
    const loadAttributes = async () => {
      setLoading(true);
      try {
        const attributesData = await attributeAPI.getAttributes();
        setAttributes(attributesData);
        
        // Set default enabled states and selections for all attributes
        if (attributesData.length > 0) {
          const newEnabledAttributes: Record<string, boolean> = {};
          const newSelectedValues: Record<string, string> = {};
          
          attributesData.forEach((attr: { _id: string; name: string; variations: string[] }) => {
            // Enable color and size by default, disable others
            const isColorOrSize = attr.name.toLowerCase().includes('color') || 
                                 attr.name.toLowerCase().includes('colour') || 
                                 attr.name.toLowerCase().includes('size');
            
            newEnabledAttributes[attr._id] = isColorOrSize;
            
            // Set default selected value if variations exist
            if (attr.variations.length > 0) {
              newSelectedValues[attr._id] = attr.variations[0];
            }
          });
          
          setEnabledAttributes(newEnabledAttributes);
          setSelectedValues(newSelectedValues);
          
          // Notify parent component of initial state
          notifyParent(newEnabledAttributes, newSelectedValues);
        }
      } catch (error) {
        console.error('Error loading attributes:', error);
      } finally {
        setLoading(false);
      }
    };

    loadAttributes();
  }, []);

  // Helper function to toggle attribute enabled state
  const toggleAttribute = (attributeId: string) => {
    const newEnabledAttributes = {
      ...enabledAttributes,
      [attributeId]: !enabledAttributes[attributeId]
    };
    setEnabledAttributes(newEnabledAttributes);
    notifyParent(newEnabledAttributes, selectedValues);
  };

  // Helper function to update selected value
  const updateSelectedValue = (attributeId: string, value: string) => {
    const newSelectedValues = {
      ...selectedValues,
      [attributeId]: value
    };
    setSelectedValues(newSelectedValues);
    notifyParent(enabledAttributes, newSelectedValues);
  };

  // Notify parent component of changes
  const notifyParent = (enabled: Record<string, boolean>, selected: Record<string, string>) => {
    const attributesData: Record<string, { enabled: boolean; selectedValue: string }> = {};
    
    attributes.forEach(attr => {
      attributesData[attr._id] = {
        enabled: enabled[attr._id] || false,
        selectedValue: selected[attr._id] || ''
      };
    });
    
    onAttributesChange(attributesData);
  };

  return (
    <div>
      <h3 className="text-white text-[24px] font-semibold mb-6 break-words">Attributes</h3>
      <div className="rounded-3xl border border-[#172D6D] bg-black/30 backdrop-blur-[500px] p-6 overflow-hidden">
        
        {loading ? (
          <div className="flex items-center justify-center h-32">
            <div className="text-white text-lg">Loading attributes...</div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Display all attributes with toggle switches */}
            {attributes.map((attribute) => (
              <div key={attribute._id}>
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-white text-sm font-medium">
                    {attribute.name}
                  </label>
                  {/* Toggle Switch for all attributes */}
                  <button
                    onClick={() => toggleAttribute(attribute._id)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      enabledAttributes[attribute._id] ? 'bg-blue-500' : 'bg-gray-300 border border-[#172D6D]'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        enabledAttributes[attribute._id] ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
                
                {enabledAttributes[attribute._id] && (
                  <div className="relative">
                    <select 
                      value={selectedValues[attribute._id] || ''}
                      onChange={(e) => updateSelectedValue(attribute._id, e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border placeholder:text-sm text-sm border-[#172D6D] bg-black/30 text-white appearance-none focus:outline-none focus:border-[#3B82F6] transition-colors"
                    >
                      <option value="">Select {attribute.name}</option>
                      {attribute.variations.map((variation, index) => (
                        <option key={index} value={variation}>
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
                )}
              </div>
            ))}

            {/* Show message if no attributes found */}
            {attributes.length === 0 && !loading && (
              <div className="text-center py-8">
                <p className="text-gray-400 text-sm">No attributes found. Please create attributes first in the Attributes management page.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Attributes 