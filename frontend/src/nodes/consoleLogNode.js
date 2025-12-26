// consoleLogNode.js

import { useState } from 'react';
import { BaseNode } from './BaseNode';
import { createTextInput, createSelectInput, LogLevelOptions, PresetHandles } from './NodeFactory';

export const ConsoleLogNode = ({ id, data }) => {
  const [logLevel, setLogLevel] = useState(data?.logLevel || 'log');
  const [label, setLabel] = useState(data?.label || 'Console Output');

  const handleLevelChange = (e) => {
    setLogLevel(e.target.value);
  };

  const handleLabelChange = (e) => {
    setLabel(e.target.value);
  };

  const config = {
    title: 'Console Log',
    content: (
      <div>
        {createTextInput('Label', label, handleLabelChange)}
        {createSelectInput('Level', logLevel, handleLevelChange, LogLevelOptions)}
      </div>
    ),
    handles: PresetHandles.PASSTHROUGH(id),
  };

  return <BaseNode id={id} config={config} />;
};
