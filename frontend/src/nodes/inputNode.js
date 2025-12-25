// inputNode.js

import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';
import { HandlePositions, createHandle } from './NodeFactory';

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data.inputType || 'Text');

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setInputType(e.target.value);
  };

  const config = {
    title: 'Input',
    content: (
      <div>
        <label style={{ display: 'block', marginBottom: '4px' }}>
          Name:
          <input 
            type="text" 
            value={currName} 
            onChange={handleNameChange}
            style={{ width: '100%', padding: '2px' }}
          />
        </label>
        <label style={{ display: 'block' }}>
          Type:
          <select value={inputType} onChange={handleTypeChange} style={{ width: '100%', padding: '2px' }}>
            <option value="Text">Text</option>
            <option value="File">File</option>
          </select>
        </label>
      </div>
    ),
    handles: [createHandle(`${id}-input`, HandlePositions.SOURCE_RIGHT)],
  };

  return <BaseNode id={id} config={config} />;
}
