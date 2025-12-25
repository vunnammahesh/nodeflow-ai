// jsonInputNode.js

import { useState } from 'react';
import { BaseNode } from './BaseNode';
import { HandlePositions, createHandle } from './NodeFactory';

export const JSONInputNode = ({ id, data }) => {
  const [jsonValue, setJsonValue] = useState(data?.jsonValue || '{}');
  const [isValid, setIsValid] = useState(true);

  const handleJsonChange = (e) => {
    const value = e.target.value;
    setJsonValue(value);

    // Lightweight JSON validation
    try {
      JSON.parse(value);
      setIsValid(true);
    } catch {
      setIsValid(false);
    }
  };

  const config = {
    title: 'JSON Input',
    content: (
      <div>
        <textarea
          value={jsonValue}
          onChange={handleJsonChange}
          style={{
            width: '100%',
            height: '80px',
            padding: '4px',
            fontSize: '11px',
            fontFamily: 'monospace',
            border: isValid ? '1px solid #ccc' : '1px solid #ff6b6b',
            borderRadius: '2px',
            backgroundColor: isValid ? '#fff' : '#ffe0e0',
            color: isValid ? '#000' : '#d32f2f',
            resize: 'none',
          }}
          placeholder='{"key": "value"}'
        />
        {!isValid && (
          <div style={{ color: '#d32f2f', fontSize: '10px', marginTop: '2px' }}>
            Invalid JSON
          </div>
        )}
      </div>
    ),
    handles: [createHandle(`${id}-output`, HandlePositions.SOURCE_RIGHT)],
    containerStyle: {
      width: 240,
      height: 'auto',
      minHeight: 140,
    },
  };

  return <BaseNode id={id} config={config} />;
};
