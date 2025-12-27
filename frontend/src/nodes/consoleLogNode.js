// consoleLogNode.js

import { useState } from 'react';
import { BaseNode } from './BaseNode';
import { createTextInput, createSelectInput, LogLevelOptions, PresetHandles } from './NodeFactory';
import '../styles/nodeStyles.css';
import { useStore } from '../store';

export const ConsoleLogNode = ({ id, data }) => {
  const [logLevel, setLogLevel] = useState(data?.logLevel || 'log');
  const [label, setLabel] = useState(data?.label || 'Console Output');
  const updateNodeField = useStore((state) => state.updateNodeField);

  const handleLevelChange = (e) => {
    const value = e.target.value;
    setLogLevel(value);
    updateNodeField(id, 'logLevel', value);
  };

  const handleLabelChange = (e) => {
    const value = e.target.value;
    setLabel(value);
    updateNodeField(id, 'label', value);
  };

  const config = {
    title: 'Console Log',
    content: (
      <div className="flex-col gap-md">
        {createTextInput('Label', label, handleLabelChange)}
        {createSelectInput('Level', logLevel, handleLevelChange, LogLevelOptions)}
      </div>
    ),
    handles: PresetHandles.PASSTHROUGH(id),
  };

  return <BaseNode id={id} config={config} />;
};
