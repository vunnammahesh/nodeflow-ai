// textFormatterNode.js

import { useState } from 'react';
import { BaseNode } from './BaseNode';
import { createSelectInput, TextFormatOptions, PresetHandles } from './NodeFactory';
import { useStore } from '../store';

export const TextFormatterNode = ({ id, data }) => {
  const [format, setFormat] = useState(data?.format || 'uppercase');
  const updateNodeField = useStore((state) => state.updateNodeField);

  const handleFormatChange = (e) => {
    const value = e.target.value;
    setFormat(value);
    updateNodeField(id, 'format', value);
  };

  const config = {
    title: 'Text Formatter',
    content: (
      <div>
        {createSelectInput('Format', format, handleFormatChange, TextFormatOptions)}
      </div>
    ),
    handles: PresetHandles.PASSTHROUGH(id),
  };

  return <BaseNode id={id} config={config} />;
};
