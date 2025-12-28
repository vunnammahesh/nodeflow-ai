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
  <div className="label-group">
    <label className="label">{label}</label>
    <input
      type="text"
      value={value}
      onChange={onChange}
      className="input-base"
    />
  </div>
);

export const createSelectInput = (label, value, onChange, options, style = {}) => (
  <div className="label-group">
    <label className="label">{label}</label>
    <select
      value={value}
      onChange={onChange}
      className="input-base"
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);


export const createHandle = (id, position, options = {}) => ({
  id,
  ...position,
  ...options,
});

export const PresetHandles = {
  INPUT_ONLY: (id) => [
    createHandle(`${id}-output`, HandlePositions.SOURCE_RIGHT),
  ],

  OUTPUT_ONLY: (id) => [
    createHandle(`${id}-input`, HandlePositions.TARGET_LEFT),
  ],

  PASSTHROUGH: (id) => [
    createHandle(`${id}-input`, HandlePositions.TARGET_LEFT),
    createHandle(`${id}-output`, HandlePositions.SOURCE_RIGHT),
  ],
};


export const ValidationOptions = [
  { value: 'email', label: 'Email' },
  { value: 'url', label: 'URL' },
  { value: 'numeric', label: 'Numeric' },
  { value: 'alphanumeric', label: 'Alphanumeric' },
  { value: 'length', label: 'Length' },
  { value: 'custom', label: 'Custom Regex' },
];


export const TextFormatOptions = [
  { value: 'uppercase', label: 'Uppercase' },
  { value: 'lowercase', label: 'Lowercase' },
  { value: 'trim', label: 'Trim' },
  { value: 'capitalize', label: 'Capitalize' },
];

export const LogLevelOptions = [
  { value: 'log', label: 'Log' },
  { value: 'info', label: 'Info' },
  { value: 'warn', label: 'Warn' },
  { value: 'error', label: 'Error' },
];
