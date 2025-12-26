// hooks/useNodeData.js
// Custom hook to standardize node state + store updates

import { useState } from 'react';
import { useStore } from '../store';

/**
 * Hook to manage node state with automatic store persistence
 * @param {string} id - Node ID
 * @param {string} fieldName - Data field name to track
 * @param {any} defaultValue - Default value if not in data
 * @returns {[any, function]} - [value, setValue]
 */
export const useNodeData = (id, fieldName, defaultValue) => {
  const updateNodeField = useStore((state) => state.updateNodeField);
  const [value, setValue] = useState(defaultValue);

  const handleChange = (newValue) => {
    setValue(newValue);
    updateNodeField(id, fieldName, newValue);
  };

  return [value, handleChange];
};

/**
 * Hook for managing multiple fields with a single data object
 * @param {string} id - Node ID
 * @param {Object} initialData - Object with field: defaultValue pairs
 * @returns {[Object, function]} - [data, updateField]
 */
export const useNodeDataObject = (id, initialData) => {
  const updateNodeField = useStore((state) => state.updateNodeField);
  const [data, setData] = useState(initialData);

  const updateField = (fieldName, newValue) => {
    const updated = { ...data, [fieldName]: newValue };
    setData(updated);
    updateNodeField(id, fieldName, newValue);
  };

  return [data, updateField];
};
