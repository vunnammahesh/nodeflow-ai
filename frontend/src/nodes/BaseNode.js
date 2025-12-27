// BaseNode.js

import { Handle, Position } from 'reactflow';
import '../styles/nodeStyles.css';

export const BaseNode = ({ id, config }) => {
  const { title, content, handles = [] } = config;

  return (
    <div className="node">
      {title && <div className="node__header">{title}</div>}
      <div className="node__content">{content}</div>

      {/* Render all handles */}
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
