// submit.js

import { useState } from 'react';
import './styles/nodeStyles.css';
import { useStore } from './store';
import { PipelineAnalysisModal } from './components/PipelineAnalysisModal';

export const SubmitButton = () => {
    const { nodes, edges } = useStore((state) => ({
        nodes: state.nodes,
        edges: state.edges,
    }));

    const [modalOpen, setModalOpen] = useState(false);
    const [analysisData, setAnalysisData] = useState(null);

    const handleSubmit = async () => {
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
        </>
    );
}
