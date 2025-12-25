// consoleLogNode.js

import { useState } from 'react';
import { BaseNode } from './BaseNode';
import { HandlePositions, createHandle, createTextInput, createSelectInput } from './NodeFactory';

export const ConsoleLogNode = ({ id, data }) => {
  const [logLevel, setLogLevel] = useState(data?.logLevel || 'log');
  const [label, setLabel] = useState(data?.label || 'Console Output');

  const handleLevelChange = (e) => {
    setLogLevel(e.target.value);
  };

  const handleLabelChange = (e) => {
    setLabel(e.target.value);
  };

  const logLevelOptions = [
    { value: 'log', label: 'Log' },
    { value: 'info', label: 'Info' },
    { value: 'warn', label: 'Warn' },
    { value: 'error', label: 'Error' },
  ];

  const config = {
    title: 'Console Log',
    content: (
      <div>
        {createTextInput('Label', label, handleLabelChange)}
        {createSelectInput('Level', logLevel, handleLevelChange, logLevelOptions)}
      </div>
    ),
    handles: [
      createHandle(`${id}-input`, HandlePositions.TARGET_LEFT),
      createHandle(`${id}-output`, HandlePositions.SOURCE_RIGHT),
    ],
  };

  return <BaseNode id={id} config={config} />;
};
