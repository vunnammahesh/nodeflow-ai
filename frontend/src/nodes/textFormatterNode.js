// textFormatterNode.js

import { useState } from 'react';
import { BaseNode } from './BaseNode';
import { HandlePositions, createHandle, createSelectInput } from './NodeFactory';
import { useStore } from '../store';

export const TextFormatterNode = ({ id, data }) => {
  const [format, setFormat] = useState(data?.format || 'uppercase');
  const updateNodeField = useStore((state) => state.updateNodeField);

  const handleFormatChange = (e) => {
    const value = e.target.value;
    setFormat(value);
    updateNodeField(id, 'format', value);
  };

  const formatOptions = [
    { value: 'uppercase', label: 'Uppercase' },
    { value: 'lowercase', label: 'Lowercase' },
    { value: 'trim', label: 'Trim' },
    { value: 'capitalize', label: 'Capitalize' },
  ];

  const config = {
    title: 'Text Formatter',
    content: (
      <div>
        {createSelectInput('Format', format, handleFormatChange, formatOptions)}
      </div>
    ),
    handles: [
      createHandle(`${id}-input`, HandlePositions.TARGET_LEFT),
      createHandle(`${id}-output`, HandlePositions.SOURCE_RIGHT),
    ],
  };

  return <BaseNode id={id} config={config} />;
};
