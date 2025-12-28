// submit.js

import { useState } from 'react';
import './styles/nodeStyles.css';
import { useStore } from './store';
import { PipelineAnalysisModal } from './components/PipelineAnalysisModal';
import { ValidationErrorModal } from './components/ValidationErrorModal';
import { findDisconnectedNodes } from './Validations/pipelineValidation';

export const SubmitButton = () => {
    const { nodes, edges } = useStore((state) => ({
        nodes: state.nodes,
        edges: state.edges,
    }));

    const [modalOpen, setModalOpen] = useState(false);
    const [analysisData, setAnalysisData] = useState(null);
    const [errorModalOpen, setErrorModalOpen] = useState(false);
    const [validationError, setValidationError] = useState('');


    const handleSubmit = async () => {
        const disconnectedNodes = findDisconnectedNodes(nodes, edges);
        if (disconnectedNodes.length > 0) {
    setValidationError(
      `The following node(s) are not connected: ${disconnectedNodes
        .map((n) => n.id)
        .join(', ')}`
    );
    setErrorModalOpen(true);
    return; 
  }
        try {
            const response = await fetch('http://localhost:8000/pipelines/parse', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nodes: nodes,
                    edges: edges,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to parse pipeline');
            }

            const result = await response.json();
            setAnalysisData(result);
            setModalOpen(true);
        } catch (error) {
            alert(`Error: ${error.message}`);
            console.error('Error submitting pipeline:', error);
        }
    };

    return (
        <>
            <div className="button-submit-wrapper">
                <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
                    Submit
                </button>
            </div>
            <PipelineAnalysisModal 
                isOpen={modalOpen} 
                data={analysisData} 
                onClose={() => setModalOpen(false)} 
            />
            <ValidationErrorModal
                isOpen={errorModalOpen}
                error={validationError}
                onClose={() => setErrorModalOpen(false)}
            />
        </>
    );
}
