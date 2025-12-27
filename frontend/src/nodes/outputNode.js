// outputNode.js

import { useState } from 'react';
import { BaseNode } from './BaseNode';
import '../styles/nodeStyles.css';
import { PresetHandles } from './NodeFactory';

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data.outputType || 'Text');

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setOutputType(e.target.value);
  };
  const config = {
    title : "Output",
    content:(<div className="flex-col gap-md">
        <div className="label-group">
          <label className="label">Name</label>
          <input 
            type="text" 
            value={currName} 
            onChange={handleNameChange}
            className="input-base"
            placeholder="output_0"
          />
        </div>
        <div className="label-group">
          <label className="label">Type</label>
          <select value={outputType} onChange={handleTypeChange} className="input-base">
            <option value="Text">Text</option>
            <option value="Image">Image</option>
          </select>
        </div>
    </div>),
    handles:PresetHandles.OUTPUT_ONLY(id)
  }

  return <BaseNode id={id} config = {config}/>
}
