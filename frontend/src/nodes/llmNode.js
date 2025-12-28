// llmNode.js

import { BaseNode } from './BaseNode';
import { PresetHandles } from './NodeFactory';
import '../styles/nodeStyles.css';


export const LLMNode = ({ id, data }) => {
  const config = {
    title: 'LLM',
    content: (
      <div className="flex-col gap-md">
        <div className="label-group">
          <label className="label">This is a LLM Node</label>
        </div>
      </div>
    ),
    handles: [...PresetHandles.MULTI_INPUT(id,2),
      ...PresetHandles.MULTI_OUTPUT(id,1)
    ],
  };

  return <BaseNode id = {id} config = {config}/>
}
