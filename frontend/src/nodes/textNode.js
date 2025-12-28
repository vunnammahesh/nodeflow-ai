// textNode.js

import { useState, useEffect, useRef } from 'react';
import { useReactFlow } from 'reactflow';
import { BaseNode } from './BaseNode';
import { PresetHandles } from './NodeFactory';
import { useStore } from '../store';
import '../styles/nodeStyles.css';

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '');
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const [autocompletePos, setAutocompletePos] = useState({ top: 0, left: 0 });
  const [filterText, setFilterText] = useState('');
  const [selectedSuggestion, setSelectedSuggestion] = useState(0);
  const [pendingConnection, setPendingConnection] = useState(null);
  
  const textareaRef = useRef(null);
  const updateNodeField = useStore((state) => state.updateNodeField);
  const onConnect = useStore((state) => state.onConnect);
  const { getNodes } = useReactFlow();

  /**
   * Get all available output node IDs from the editor
   */
  const getAvailableVariables = () => {
    const nodes = getNodes();
    return nodes
      .filter((node) => node.id !== id)
      .map((node) => {
        // Get custom name if available, otherwise use node ID
        const customName = node.data?.inputName || node.id;
        return {
          id: customName,
          type: node.type,
          label: customName,
        };
      })
      .sort((a, b) => a.id.localeCompare(b.id));
  };

  /**
   * Extract variables from text
   */
  const extractVariables = (text) => {
    const variableRegex = /\{\{\s*([a-zA-Z_$][\w$-]*)\s*\}\}/g;
    const variables = new Set();
    let match;
    while ((match = variableRegex.exec(text)) !== null) {
      variables.add(match[1]);
    }
    return Array.from(variables).sort();
  };

  /**
   * Find cursor position and detect if we're typing after {{
   */
  const detectAutocomplete = (textarea, text) => {
    const cursorPos = textarea.selectionStart;
    const textBeforeCursor = text.substring(0, cursorPos);
    const lastOpenBracket = textBeforeCursor.lastIndexOf('{{');
    
    if (lastOpenBracket === -1) {
      setShowAutocomplete(false);
      return;
    }

    const textAfterBracket = text.substring(lastOpenBracket + 2);
    const closeIndex = textAfterBracket.indexOf('}}');

    if (closeIndex !== -1 && closeIndex < (cursorPos - lastOpenBracket - 2)) {
      setShowAutocomplete(false);
      return;
    }

    const filterStr = text.substring(lastOpenBracket + 2, cursorPos).trim();
    setFilterText(filterStr);
    setSelectedSuggestion(0);
    setShowAutocomplete(true);

    // Calculate viewport coordinates for fixed positioning
    const lines = textBeforeCursor.split('\n');
    const currentLine = lines.length - 1;
    const charInLine = lines[lines.length - 1].length;

    setAutocompletePos({
      top: currentLine*50  ,  // 20px below line start
      left:charInLine*80 ,
    });
  };

  /**
   * Handle variable selection from autocomplete
   */
  const handleSelectVariable = (variableId) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const cursorPos = textarea.selectionStart;
    const textBeforeCursor = currText.substring(0, cursorPos);
    const lastOpenBracket = textBeforeCursor.lastIndexOf('{{');

    if (lastOpenBracket === -1) return;

    const before = currText.substring(0, lastOpenBracket);
    const after = currText.substring(cursorPos);
    const newText = `${before}{{${variableId}}}${after}`;

    setCurrText(newText);
    updateNodeField(id, 'text', newText);
    setShowAutocomplete(false);

    // Store pending connection to be created after state updates
    setPendingConnection(variableId);
  };

  // Create connection after pendingConnection is set
  useEffect(() => {
    if (!pendingConnection) return;

    // Get the source node by custom name (data.inputName) or node ID
    const sourceNode = getNodes().find(
      (n) => n.data?.inputName === pendingConnection || n.id === pendingConnection
    );
    if (!sourceNode) {
      setPendingConnection(null);
      return;
    }

    // Use the actual node ID for the handle names
    const sourceHandle = `${sourceNode.id}-output`;
    const targetHandle = `${id}-input`; // Single input handle for all variables

    // Create connection
    const connection = {
      source: sourceNode.id,
      target: id,
      sourceHandle: sourceHandle,
      targetHandle: targetHandle,
    };

    console.log('Creating connection:', connection);
    onConnect(connection);
    setPendingConnection(null);
  }, [pendingConnection, id, getNodes, onConnect]);

  const detectedVariables = extractVariables(currText);
  const availableVariables = getAvailableVariables();
  const availableVarIds = availableVariables.map(v => v.id);
  
  // Check which variables are invalid (not in available list)
  const invalidVariables = detectedVariables.filter(varName => !availableVarIds.includes(varName));
  
  const filteredSuggestions = availableVariables.filter((v) =>
    v.id.toLowerCase().includes(filterText.toLowerCase())
  );

  // Use PASSTHROUGH handles: single input for variables, single output for text
  const allHandles = PresetHandles.PASSTHROUGH(id);

  const handleTextChange = (e) => {
    const newText = e.target.value;
    setCurrText(newText);
    updateNodeField(id, 'text', newText);
    detectAutocomplete(e.target, newText);
  };

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.width = 'auto';

      const newHeight = Math.max(textarea.scrollHeight, 60);
      textarea.style.height = `${newHeight}px`;

      const newWidth = Math.max(Math.min(textarea.scrollWidth + 10, 400), 150);
      textarea.style.width = `${newWidth}px`;
    }
  }, [currText]);

  const config = {
    title: 'Text',
    content: (
      <div className="textarea-wrapper">
        <textarea
          ref={textareaRef}
          value={currText}
          onChange={handleTextChange}
          placeholder="Type text with {{variables}}"
          className="node-textarea input-base"
        />

        {/* Autocomplete Dropdown */}
        {showAutocomplete && filteredSuggestions.length > 0 && (
          <div className="autocomplete-dropdown" style={{ top: autocompletePos.top, left: autocompletePos.left }}>
            {filteredSuggestions.map((suggestion, idx) => (
              <div
                key={suggestion.id}
                onClick={() => handleSelectVariable(suggestion.id)}
                className={`autocomplete-item ${idx === selectedSuggestion ? 'selected' : ''}`}
                onMouseEnter={() => setSelectedSuggestion(idx)}
              >
                {suggestion.id}
              </div>
            ))}
          </div>
        )}

        {detectedVariables.length > 0 && (
          <div className="helper-text">
            <strong>Variables:</strong>
            {detectedVariables.map((varName) => (
              <span
                key={varName}
                className={`variable-badge ${invalidVariables.includes(varName) ? 'variable-badge--invalid' : 'variable-badge--valid'}`}
              >
                {varName}
              </span>
            ))}
          </div>
        )}
      </div>
    ),
    handles: allHandles,
  };

  return <BaseNode id={id} config={config} />;
};

