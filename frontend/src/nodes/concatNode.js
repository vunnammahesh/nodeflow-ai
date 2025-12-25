// concatNode.js

import { useState } from 'react';
import { BaseNode } from './BaseNode';
import { HandlePositions, createHandle, createTextInput, createSelectInput } from './NodeFactory';
import { useStore } from '../store';

export const ConcatNode = ({ id, data }) => {
  const [numInputs, setNumInputs] = useState(data?.numInputs || 2);
  const [outputField, setOutputField] = useState(data?.outputField || 'merged');
  const updateNodeField = useStore((state) => state.updateNodeField);

  const handleInputsChange = (e) => {
    const value = parseInt(e.target.value);
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

  // Generate input handles for each input
  const inputHandles = Array.from({ length: numInputs }, (_, i) =>
    createHandle(`${id}-input-${i}`, HandlePositions.TARGET_LEFT, {
      label: `Value ${i + 1}`,
    })
  );

  const config = {
    title: 'Concat / Merge',
    content: (
      <div>
        {createSelectInput('Inputs', numInputs.toString(), handleInputsChange, inputOptions)}
        {createTextInput('Output Field', outputField, handleOutputChange)}
      </div>
    ),
    handles: [
      ...inputHandles,
      createHandle(`${id}-output`, HandlePositions.SOURCE_RIGHT),
    ],
    containerStyle: {
      width: 220,
      height: 120 + (numInputs - 2) * 15,
    },
  };

  return <BaseNode id={id} config={config} />;
};
