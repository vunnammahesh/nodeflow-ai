// toolbar.js

import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {

    return (
        <div style={{ padding: '10px' }}>
            <div style={{ marginTop: '20px', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                <DraggableNode type='customInput' label='Input' />
                <DraggableNode type='text' label='Text' />
                <DraggableNode type='jsonInput' label='JSON Input' />
                <DraggableNode type='textFormatter' label='Text Formatter' />
                <DraggableNode type='validator' label='Validator' />
                <DraggableNode type='concat' label='Concat / Merge' />
                <DraggableNode type='llm' label='LLM' />
                <DraggableNode type='consoleLog' label='Console Log' />
                <DraggableNode type='customOutput' label='Output' />
            </div>
        </div>
    );
};
