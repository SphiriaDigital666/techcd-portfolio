"use client";

import React, { useState, useEffect } from 'react';
import AttributesTab from './components/AttributesTab';
import VariationsTab from './components/VariationsTab';

// API functions
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

const attributeAPI = {
  // Get all attributes
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

  // Create new attribute
  createAttribute: async (attributeData: { name: string; variations: string[] }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/attribute`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(attributeData),
      });
      if (!response.ok) throw new Error('Failed to create attribute');
      return await response.json();
    } catch (error) {
      console.error('Error creating attribute:', error);
      throw error;
    }
  },

  // Update attribute
  updateAttribute: async (id: string, attributeData: { name: string; variations: string[] }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/attribute/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(attributeData),
      });
      if (!response.ok) throw new Error('Failed to update attribute');
      return await response.json();
    } catch (error) {
      console.error('Error updating attribute:', error);
      throw error;
    }
  },

  // Delete attribute
  deleteAttribute: async (id: string) => {
    try {
      console.log('Making DELETE request to:', `${API_BASE_URL}/attribute/${id}`);
      const response = await fetch(`${API_BASE_URL}/attribute/${id}`, {
        method: 'DELETE',
      });
      console.log('Delete response status:', response.status);
      console.log('Delete response ok:', response.ok);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Delete failed with status:', response.status, 'Error:', errorText);
        throw new Error(`Failed to delete attribute: ${response.status} ${errorText}`);
      }
      
      const result = await response.json();
      console.log('Delete response data:', result);
      return result;
    } catch (error) {
      console.error('Error deleting attribute:', error);
      throw error;
    }
  },
};

function AttributePage() {
  const [activeTab, setActiveTab] = useState('attributes');
  const [savedAttributes, setSavedAttributes] = useState<Array<{ id: string; name: string; values: string[] }>>([]);
  const [savedVariations, setSavedVariations] = useState<Record<string, { values: string[] }>>({});
  const [loading, setLoading] = useState(false);

  // Load data from API on component mount
  useEffect(() => {
    const loadDataFromAPI = async () => {
      setLoading(true);
      try {
        const attributes = await attributeAPI.getAttributes();
        
        // Transform API data to match our frontend structure
        const transformedAttributes = attributes.map((attr: { _id: string; name: string; variations?: string[] }) => ({
          id: attr._id,
          name: attr.name,
          values: attr.variations || []
        }));
        
        setSavedAttributes(transformedAttributes);
        
        // Transform variations data
        const variationsData: Record<string, { values: string[] }> = {};
        transformedAttributes.forEach((attr: { id: string; name: string; values: string[] }) => {
          variationsData[attr.id] = { values: attr.values };
        });
        setSavedVariations(variationsData);
        
        console.log('Loaded data from API:', { attributes: transformedAttributes, variations: variationsData });
      } catch (error) {
        console.error('Error loading data from API:', error);
        // Fallback to localStorage if API fails
        loadFromLocalStorage();
      } finally {
        setLoading(false);
      }
    };

    const loadFromLocalStorage = () => {
      try {
        const savedAttrs = localStorage.getItem('savedAttributes');
        const savedVars = localStorage.getItem('savedVariations');
        
        if (savedAttrs) {
          setSavedAttributes(JSON.parse(savedAttrs));
        }
        
        if (savedVars) {
          setSavedVariations(JSON.parse(savedVars));
        }
      } catch (error) {
        console.error('Error loading from localStorage:', error);
      }
    };

    loadDataFromAPI();
  }, []);

  const tabs = [
    { id: 'attributes', label: 'Attributes' },
    { id: 'variations', label: 'Variations' }
  ];

  const handleSaveAttributes = async (attributes: Array<{ id: string; name: string; values: string[] }>) => {
    // Check if there are any attributes to save
    if (attributes.length === 0) {
      console.log('No attributes to save - skipping API call');
      return;
    }
    
    setLoading(true);
    try {
      // Save to API
      for (const attr of attributes) {
        if (attr.id && attr.id.startsWith('temp_')) {
          // New attribute - create it
          await attributeAPI.createAttribute({
            name: attr.name,
            variations: attr.values
          });
        } else if (attr.id) {
          // Existing attribute - update it
          await attributeAPI.updateAttribute(attr.id, {
            name: attr.name,
            variations: attr.values
          });
        }
      }
      
      // Reload data from API
      const apiAttributes = await attributeAPI.getAttributes();
      const transformedAttributes = apiAttributes.map((attr: { _id: string; name: string; variations?: string[] }) => ({
        id: attr._id,
        name: attr.name,
        values: attr.variations || []
      }));
      
      setSavedAttributes(transformedAttributes);
      console.log('Attributes saved to API:', transformedAttributes);
      
      // Also save to localStorage as backup
      localStorage.setItem('savedAttributes', JSON.stringify(transformedAttributes));
    } catch (error) {
      console.error('Error saving to API:', error);
      // Fallback to localStorage only
      setSavedAttributes(attributes);
      localStorage.setItem('savedAttributes', JSON.stringify(attributes));
    } finally {
      setLoading(false);
    }
  };

  const handleSaveVariations = async (variations: Record<string, { values: string[] }>) => {
    // Check if there are any variations to save
    const hasVariations = Object.values(variations).some(v => v.values.length > 0);
    
    if (!hasVariations) {
      console.log('No variations to save - skipping API call');
      return;
    }
    
    setLoading(true);
    try {
      // Update each attribute with its variations
      for (const [attrId, variationData] of Object.entries(variations)) {
        const attribute = savedAttributes.find(attr => attr.id === attrId);
        if (attribute) {
          await attributeAPI.updateAttribute(attrId, {
            name: attribute.name,
            variations: variationData.values
          });
        }
      }
      
      setSavedVariations(variations);
      console.log('Variations saved to API:', variations);
      
      // Also save to localStorage as backup
      localStorage.setItem('savedVariations', JSON.stringify(variations));
    } catch (error) {
      console.error('Error saving variations to API:', error);
      // Fallback to localStorage only
      setSavedVariations(variations);
      localStorage.setItem('savedVariations', JSON.stringify(variations));
    } finally {
      setLoading(false);
    }
  };

  // Handle attribute deletion
  const handleDeleteAttribute = async (attributeId: string) => {
    console.log('handleDeleteAttribute called with ID:', attributeId);
    try {
      console.log('Calling API to delete attribute:', attributeId);
      // Delete from API
      const result = await attributeAPI.deleteAttribute(attributeId);
      console.log('API delete result:', result);
      
      // Remove from local state
      const updatedAttributes = savedAttributes.filter(attr => attr.id !== attributeId);
      setSavedAttributes(updatedAttributes);
      console.log('Updated local attributes:', updatedAttributes);
      
      // Update variations data
      const updatedVariations = { ...savedVariations };
      delete updatedVariations[attributeId];
      setSavedVariations(updatedVariations);
      
      // Update localStorage
      localStorage.setItem('savedAttributes', JSON.stringify(updatedAttributes));
      localStorage.setItem('savedVariations', JSON.stringify(updatedVariations));
      
      console.log('Attribute deletion completed successfully');
      return true; // Success
    } catch (error) {
      console.error('Error deleting attribute:', error);
      return false; // Failed
    }
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center h-64">
          <div className="text-white text-lg">Loading...</div>
        </div>
      );
    }

    switch (activeTab) {
      case 'attributes':
        return <AttributesTab onSaveAttributes={handleSaveAttributes} onDeleteAttribute={handleDeleteAttribute} savedAttributes={savedAttributes} />;
      case 'variations':
        return <VariationsTab savedAttributes={savedAttributes} onSaveVariations={handleSaveVariations} savedVariations={savedVariations} />;
      default:
        return <AttributesTab onSaveAttributes={handleSaveAttributes} savedAttributes={savedAttributes} />;
    }
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto container">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-6">
          {/* Left Navigation Panel */}
          <div className="lg:col-span-2">
            <div className="bg-[#0000004D]/30 backdrop-blur-[50px] rounded-3xl p-6 border border-[#172D6D]">
             
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full text-left px-4 py-2 rounded-md 2xl:text-[20px] text-[16px] transition-all duration-200 ${
                      activeTab === tab.id
                        ? 'bg-[#028EFC] text-white shadow-lg'
                        : 'text-[#E5E5E5]'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Right Content Panel */}
          <div className="lg:col-span-4">
            <div className="bg-[#0000004D]/30 backdrop-blur-[50px] rounded-3xl p-8 border border-[#172D6D]">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AttributePage;
