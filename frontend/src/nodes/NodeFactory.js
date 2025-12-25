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
