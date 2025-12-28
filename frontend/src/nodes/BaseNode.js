// BaseNode.js

import { Handle } from 'reactflow';
import { useStore } from '../store';
import '../styles/nodeStyles.css';

export const BaseNode = ({ id, config }) => {
  const { title, content, handles = [] } = config;
  const removeNode = useStore((state) => state.removeNode);

  return (
    <div className="node">
      {title && <div className="node__header">
        <span>{title}</span>
        <button
          className="node-remove-btn"
          onClick={() => removeNode(id)}
          title="Remove node"
        >
          ×
        </button>
        </div>}
      <div className="node__content">{content}</div>

      {handles.map((handle) => (
        <Handle
          key={handle.id}
          id={handle.id}
          type={handle.type}
          position={handle.position}
          label={handle.label}
          className={`node-handle node-handle--${handle.type}`}
        />
      ))}
    </div>
  );
};
