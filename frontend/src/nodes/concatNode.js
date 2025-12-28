// concatNode.js

import { useState } from 'react';
import { BaseNode } from './BaseNode';
import {
  createTextInput,
  createSelectInput,
  PresetHandles,
} from './NodeFactory';
import { useStore } from '../store';

export const ConcatNode = ({ id, data }) => {
  const [numInputs, setNumInputs] = useState(data?.numInputs || 2);
  const [outputField, setOutputField] = useState(data?.outputField || 'merged');

  const updateNodeField = useStore((state) => state.updateNodeField);

  const handleInputsChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setNumInputs(value);
    updateNodeField(id, 'numInputs', value);
  };

  const handleOutputChange = (e) => {
    const value = e.target.value;
    setOutputField(value);
    updateNodeField(id, 'outputField', value);
  };

  const inputOptions = [
    { value: '2', label: '2 Inputs' },
    { value: '3', label: '3 Inputs' },
    { value: '4', label: '4 Inputs' },
    { value: '5', label: '5 Inputs' },
  ];

  const config = {
    title: 'Concat / Merge',
    content: (
      <div>
        {createSelectInput(
          'Inputs',
          numInputs.toString(),
          handleInputsChange,
          inputOptions
        )}
        {createTextInput('Output Field', outputField, handleOutputChange)}
      </div>
    ),

    // 👇 Handles are now fully abstracted
    handles: [
      ...PresetHandles.MULTI_INPUT(id, numInputs),
      ...PresetHandles.MULTI_OUTPUT(id,1)
      
    ],
  };

  return <BaseNode id={id} config={config} />;
};
