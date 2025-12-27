// inputNode.js

import { useState, useEffect } from 'react';
import { BaseNode } from './BaseNode';
import { PresetHandles } from './NodeFactory';
import { useStore } from '../store';
import '../styles/nodeStyles.css';

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data.inputType || 'Text');
  const updateNodeField = useStore((state) => state.updateNodeField);

  // Initialize node.data with default name if not already set
  useEffect(() => {
    if (!data?.inputName) {
      const defaultName = id.replace('customInput-', 'input_');
      updateNodeField(id, 'inputName', defaultName);
    }
  }, [id, data?.inputName, updateNodeField]);

  const handleNameChange = (e) => {
    const newName = e.target.value;
    setCurrName(newName);
    updateNodeField(id, 'inputName', newName);
  };

  const handleTypeChange = (e) => {
    setInputType(e.target.value);
    updateNodeField(id, 'inputType', e.target.value);
  };

  const config = {
    title: 'Input',
    content: (
      <div className="flex-col gap-md">
        <div className="label-group">
          <label className="label">Name</label>
          <input 
            type="text" 
            value={currName} 
            onChange={handleNameChange}
            className="input-base"
            placeholder="input_0"
          />
        </div>
        <div className="label-group">
          <label className="label">Type</label>
          <select value={inputType} onChange={handleTypeChange} className="input-base">
            <option value="Text">Text</option>
            <option value="File">File</option>
          </select>
        </div>
      </div>
    ),
    handles: PresetHandles.INPUT_ONLY(id),
  };

  return <BaseNode id={id} config={config} />;
}
