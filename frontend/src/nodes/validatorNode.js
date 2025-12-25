// validatorNode.js

import { useState } from 'react';
import { BaseNode } from './BaseNode';
import { HandlePositions, createHandle, createSelectInput } from './NodeFactory';
import { useStore } from '../store';

export const ValidatorNode = ({ id, data }) => {
  const [validationType, setValidationType] = useState(data?.validationType || 'email');
  const updateNodeField = useStore((state) => state.updateNodeField);

  const handleValidationChange = (e) => {
    const value = e.target.value;
    setValidationType(value);
    updateNodeField(id, 'validationType', value);
  };

  const validationOptions = [
    { value: 'email', label: 'Email' },
    { value: 'url', label: 'URL' },
    { value: 'numeric', label: 'Numeric' },
    { value: 'alphanumeric', label: 'Alphanumeric' },
    { value: 'length', label: 'Length' },
    { value: 'custom', label: 'Custom Regex' },
  ];

  const config = {
    title: 'Validator',
    content: (
      <div>
        {createSelectInput('Type', validationType, handleValidationChange, validationOptions)}
      </div>
    ),
    handles: [
      createHandle(`${id}-input`, HandlePositions.TARGET_LEFT),
      createHandle(`${id}-output`, HandlePositions.SOURCE_RIGHT),
    ],
  };

  return <BaseNode id={id} config={config} />;
};
