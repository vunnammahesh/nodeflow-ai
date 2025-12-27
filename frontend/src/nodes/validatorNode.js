// validatorNode.js

import { useState } from 'react';
import { BaseNode } from './BaseNode';
import { createSelectInput, ValidationOptions, PresetHandles } from './NodeFactory';
import { useStore } from '../store';
import '../styles/nodeStyles.css';

export const ValidatorNode = ({ id, data }) => {
  const [validationType, setValidationType] = useState(data?.validationType || 'email');
  const updateNodeField = useStore((state) => state.updateNodeField);

  const handleValidationChange = (e) => {
    const value = e.target.value;
    setValidationType(value);
    updateNodeField(id, 'validationType', value);
  };

  const config = {
    title: 'Validator',
    content: (
      <div className="flex-col gap-md">
        {createSelectInput('Type', validationType, handleValidationChange, ValidationOptions)}
      </div>
    ),
    handles: PresetHandles.PASSTHROUGH(id),
  };

  return <BaseNode id={id} config={config} />;
};
