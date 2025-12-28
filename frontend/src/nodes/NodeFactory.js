// NodeFactory.js

import { Position } from 'reactflow';

export const HandlePositions = {
  SOURCE_RIGHT: {
    type: 'source',
    position: Position.Right,
  },

  TARGET_LEFT: {
    type: 'target',
    position: Position.Left,
  },
};

export const createTextInput = (label, value, onChange) => (
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

export const createSelectInput = (label, value, onChange, options) => (
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
  ...options, // label, offsetY, etc.
});

export const createHandleGroup = ({
  nodeId,
  count,
  side,
  idPrefix = 'input',
  labelPrefix = '',
  contentTop = 48,      // header + padding
  contentHeight = 120,  // expected content area 
  handleSize = 10,   // approximate handle height
  gap = 24,          // spacing between handles
}) => {
  if (count <= 0) return [];
   const centerY = contentTop + contentHeight / 2;
  const totalHeight =
    count * handleSize + (count - 1) * gap;

  const startOffset = centerY - totalHeight / 2;

  return Array.from({ length: count }, (_, i) =>
    createHandle(`${nodeId}-${idPrefix}-${i}`, side, {
      label: labelPrefix ? `${labelPrefix} ${i + 1}` : undefined,
      offsetY: startOffset + i * (handleSize + gap),
    })
  );
};

export const PresetHandles = {
  // One output only
  INPUT_ONLY: (id) =>
    createHandleGroup({
      nodeId: id,
      count: 1,
      side: HandlePositions.SOURCE_RIGHT,
      idPrefix: 'output',
      labelPrefix: 'Output',
    }),

  // One input only
  OUTPUT_ONLY: (id) =>
    createHandleGroup({
      nodeId: id,
      count: 1,
      side: HandlePositions.TARGET_LEFT,
      idPrefix: 'input',
      labelPrefix: 'Input',
    }),

  // One input + one output
  PASSTHROUGH: (id) => [
    ...createHandleGroup({
      nodeId: id,
      count: 1,
      side: HandlePositions.TARGET_LEFT,
      idPrefix: 'input',
      labelPrefix: 'Input',
    }),
    ...createHandleGroup({
      nodeId: id,
      count: 1,
      side: HandlePositions.SOURCE_RIGHT,
      idPrefix: 'output',
      labelPrefix: 'Output',
    }),
  ],

  // Multiple inputs on the left
  MULTI_INPUT: (id, count = 3) =>
    createHandleGroup({
      nodeId: id,
      count,
      side: HandlePositions.TARGET_LEFT,
      idPrefix: 'input',
      labelPrefix: 'Value',
    }),

  // Multiple outputs on the right
  MULTI_OUTPUT: (id, count = 2) =>
    createHandleGroup({
      nodeId: id,
      count,
      side: HandlePositions.SOURCE_RIGHT,
      idPrefix: 'out',
      labelPrefix: 'Out',
    }),
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
