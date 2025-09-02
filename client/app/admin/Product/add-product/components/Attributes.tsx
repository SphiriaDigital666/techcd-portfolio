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
  onAttributesChange: (attributes: Record<string, { enabled: boolean; selectedValues: string[] }>) => void;
}

const Attributes: React.FC<AttributesProps> = ({ onAttributesChange }) => {
  const [enabledAttributes, setEnabledAttributes] = useState<Record<string, boolean>>({});
  const [selectedValues, setSelectedValues] = useState<Record<string, string[]>>({});
  const [attributes, setAttributes] = useState<Array<{ _id: string; name: string; variations: string[] }>>([]);
  const [loading, setLoading] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState<Record<string, boolean>>({});

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
          const newSelectedValues: Record<string, string[]> = {};
          
          attributesData.forEach((attr: { _id: string; name: string; variations: string[] }) => {
            // Enable color and size by default, disable others
            const isColorOrSize = attr.name.toLowerCase().includes('color') || 
                                 attr.name.toLowerCase().includes('colour') || 
                                 attr.name.toLowerCase().includes('size');
            
            newEnabledAttributes[attr._id] = isColorOrSize;
            
            // Set default selected values if variations exist (empty array for multi-select)
            newSelectedValues[attr._id] = [];
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

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.multi-select-container')) {
        setOpenDropdowns({});
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
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

  // Helper function to toggle selected value in multi-select
  const toggleSelectedValue = (attributeId: string, value: string) => {
    const currentValues = selectedValues[attributeId] || [];
    const newValues = currentValues.includes(value)
      ? currentValues.filter(v => v !== value)
      : [...currentValues, value];
    
    const newSelectedValues = {
      ...selectedValues,
      [attributeId]: newValues
    };
    setSelectedValues(newSelectedValues);
    notifyParent(enabledAttributes, newSelectedValues);
  };

  // Helper function to remove a selected value
  const removeSelectedValue = (attributeId: string, value: string) => {
    const currentValues = selectedValues[attributeId] || [];
    const newValues = currentValues.filter(v => v !== value);
    
    const newSelectedValues = {
      ...selectedValues,
      [attributeId]: newValues
    };
    setSelectedValues(newSelectedValues);
    notifyParent(enabledAttributes, newSelectedValues);
  };

  // Helper function to toggle dropdown
  const toggleDropdown = (attributeId: string) => {
    setOpenDropdowns(prev => ({
      ...prev,
      [attributeId]: !prev[attributeId]
    }));
  };

  // Helper function to select all values for an attribute
  const selectAllValues = (attributeId: string) => {
    const attribute = attributes.find(attr => attr._id === attributeId);
    if (attribute) {
      const newSelectedValues = {
        ...selectedValues,
        [attributeId]: [...attribute.variations]
      };
      setSelectedValues(newSelectedValues);
      notifyParent(enabledAttributes, newSelectedValues);
    }
  };

  // Helper function to deselect all values for an attribute
  const deselectAllValues = (attributeId: string) => {
    const newSelectedValues = {
      ...selectedValues,
      [attributeId]: []
    };
    setSelectedValues(newSelectedValues);
    notifyParent(enabledAttributes, newSelectedValues);
  };

  // Helper function to check if all values are selected
  const areAllValuesSelected = (attributeId: string) => {
    const attribute = attributes.find(attr => attr._id === attributeId);
    if (!attribute) return false;
    const currentValues = selectedValues[attributeId] || [];
    return currentValues.length === attribute.variations.length;
  };

  // Notify parent component of changes
  const notifyParent = (enabled: Record<string, boolean>, selected: Record<string, string[]>) => {
    const attributesData: Record<string, { enabled: boolean; selectedValues: string[] }> = {};
    
    attributes.forEach(attr => {
      attributesData[attr._id] = {
        enabled: enabled[attr._id] || false,
        selectedValues: selected[attr._id] || []
      };
    });
    
    onAttributesChange(attributesData);
  };

  return (
    <div>
      <h3 className="text-white text-[24px] font-semibold mb-6 break-words">Attributes</h3>
      <div className="rounded-3xl border border-[#172D6D] min-h-screen bg-black/30 backdrop-blur-[500px] p-6 overflow-hidden">
        
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
                  <div className="relative multi-select-container">
                    {/* Multi-select container */}
                    <div 
                      className="w-full min-h-[48px] px-4 py-3 rounded-lg border border-[#172D6D] bg-black/30 text-white focus-within:border-[#3B82F6] transition-colors cursor-pointer"
                      onClick={() => toggleDropdown(attribute._id)}
                    >
                      {/* Selected tags */}
                      <div className="flex flex-wrap gap-2 mb-2">
                        {(selectedValues[attribute._id] || []).map((value, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center gap-1 px-3 py-1 bg-blue-500 text-white text-sm rounded-full"
                          >
                            {value}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                removeSelectedValue(attribute._id, value);
                              }}
                              className="ml-1 hover:bg-blue-600 rounded-full p-0.5"
                            >
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </span>
                        ))}
                      </div>
                      
                      {/* Placeholder or dropdown trigger */}
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-400">
                          {(selectedValues[attribute._id] || []).length === 0 
                            ? `Select ${attribute.name}` 
                            : `${(selectedValues[attribute._id] || []).length} selected`
                          }
                        </span>
                        <svg 
                          className={`w-4 h-4 text-white transition-transform ${openDropdowns[attribute._id] ? 'rotate-180' : ''}`} 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>

                    {/* Dropdown menu */}
                    {openDropdowns[attribute._id] && (
                      <div className="absolute z-10 w-full mt-1 bg-black/90 backdrop-blur-sm border border-[#172D6D] rounded-lg shadow-lg max-h-48 overflow-y-auto">
                        {/* Select All / Deselect All option */}
                        <div
                          className="px-4 py-3 cursor-pointer hover:bg-gray-700 transition-colors flex items-center justify-between border-b border-gray-600"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (areAllValuesSelected(attribute._id)) {
                              deselectAllValues(attribute._id);
                            } else {
                              selectAllValues(attribute._id);
                            }
                          }}
                        >
                          <span className="text-white text-sm font-medium">
                            {areAllValuesSelected(attribute._id) ? 'Deselect All' : 'Select All'}
                          </span>
                          {areAllValuesSelected(attribute._id) && (
                            <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                        
                        {/* Individual options */}
                        {attribute.variations.map((variation, index) => {
                          const isSelected = (selectedValues[attribute._id] || []).includes(variation);
                          return (
                            <div
                              key={index}
                              className={`px-4 py-3 cursor-pointer hover:bg-gray-700 transition-colors flex items-center justify-between ${
                                isSelected ? 'bg-blue-500/20' : ''
                              }`}
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleSelectedValue(attribute._id, variation);
                              }}
                            >
                              <span className="text-white text-sm">{variation}</span>
                              {isSelected && (
                                <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
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