// toolbar.js

import { DraggableNode } from './draggableNode';
import './styles/nodeStyles.css';

export const PipelineToolbar = () => {

    return (
        <div className="toolbar">
            <div className="toolbar__grid">
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
