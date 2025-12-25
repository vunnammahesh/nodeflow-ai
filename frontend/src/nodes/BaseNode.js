// BaseNode.js

import { Handle, Position } from 'reactflow';

const NODE_STYLES = {
  container: {
    width: 200,
    height: 80,
    border: '1px solid black',
    backgroundColor: '#fff',
    borderRadius: '4px',
    padding: '0',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    padding: '8px',
    fontWeight: 'bold',
    borderBottom: '1px solid #e0e0e0',
    fontSize: '14px',
  },
  content: {
    padding: '8px',
    flex: 1,
    overflow: 'auto',
    fontSize: '12px',
  },
};

export const BaseNode = ({ id, config }) => {
  const { title, content, handles = [], containerStyle = {} } = config;

  const mergedContainerStyle = {
    ...NODE_STYLES.container,
    ...containerStyle,
  };

  return (
    <div style={mergedContainerStyle}>
      {title && <div style={NODE_STYLES.header}>{title}</div>}
      <div style={NODE_STYLES.content}>{content}</div>

      {/* Render all handles */}
      {handles.map((handle) => (
        <Handle
          key={handle.id}
          id={handle.id}
          type={handle.type}
          position={handle.position}
          label={handle.label}
          style={handle.style}
        />
      ))}
    </div>
  );
};
