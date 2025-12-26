// NodeFactory.js

import { Position } from 'reactflow';

export const HandlePositions = {
  // Source handles (output only)
  SOURCE_RIGHT: {
    type: 'source',
    position: Position.Right,
  },
  
  // Target handles (input only)
  TARGET_LEFT: {
    type: 'target',
    position: Position.Left,
  }
};

export const createTextInput = (label, value, onChange, style = {}) => (
  <label style={{ display: 'block', marginBottom: '4px', ...style }}>
    {label}:
    <input
      type="text"
      value={value}
      onChange={onChange}
      style={{ width: '100%', padding: '2px', marginTop: '2px' }}
    />
  </label>
);

export const createSelectInput = (label, value, onChange, options, style = {}) => (
  <label style={{ display: 'block', marginBottom: '4px', ...style }}>
    {label}:
    <select
      value={value}
      onChange={onChange}
      style={{ width: '100%', padding: '2px', marginTop: '2px' }}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </label>
);


export const createHandle = (id, position, options = {}) => ({
  id,
  ...position,
  ...options,
});

export const PresetHandles = {
  // Input only (data source)
  INPUT_ONLY: (id) => [
    createHandle(`${id}-output`, HandlePositions.SOURCE_RIGHT),
  ],

  // Output only (data sink)
  OUTPUT_ONLY: (id) => [
    createHandle(`${id}-input`, HandlePositions.TARGET_LEFT),
  ],

  // Simple pass-through (input → output)
  PASSTHROUGH: (id) => [
    createHandle(`${id}-input`, HandlePositions.TARGET_LEFT),
    createHandle(`${id}-output`, HandlePositions.SOURCE_RIGHT),
  ],
};

/**
 * Centralized validation type options
 */
export const ValidationOptions = [
  { value: 'email', label: 'Email' },
  { value: 'url', label: 'URL' },
  { value: 'numeric', label: 'Numeric' },
  { value: 'alphanumeric', label: 'Alphanumeric' },
  { value: 'length', label: 'Length' },
  { value: 'custom', label: 'Custom Regex' },
];

/**
 * Centralized text format options
 */
export const TextFormatOptions = [
  { value: 'uppercase', label: 'Uppercase' },
  { value: 'lowercase', label: 'Lowercase' },
  { value: 'trim', label: 'Trim' },
  { value: 'capitalize', label: 'Capitalize' },
];

/**
 * Centralized log level options
 */
export const LogLevelOptions = [
  { value: 'log', label: 'Log' },
  { value: 'info', label: 'Info' },
  { value: 'warn', label: 'Warn' },
  { value: 'error', label: 'Error' },
];
