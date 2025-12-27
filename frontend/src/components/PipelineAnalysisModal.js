import '../styles/nodeStyles.css';

export const PipelineAnalysisModal = ({ isOpen, data, onClose }) => {
  if (!isOpen || !data) return null;

  const { num_nodes, num_edges, is_dag } = data;
  const dagStatus = is_dag ? 'Valid DAG' : 'Contains Cycles';
  const statusIcon = is_dag ? '✅' : '⚠️';
  const statusClass = is_dag ? 'modal-status--valid' : 'modal-status--invalid';

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Pipeline Analysis</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>

        <div className="modal-body">
          <div className="analysis-item">
            <label className="analysis-label">Nodes</label>
            <div className="analysis-value">{num_nodes}</div>
          </div>

          <div className="analysis-item">
            <label className="analysis-label">Edges</label>
            <div className="analysis-value">{num_edges}</div>
          </div>

          <div className={`analysis-item ${statusClass}`}>
            <label className="analysis-label">DAG Status</label>
            <div className="analysis-value">
              <span className="status-icon">{statusIcon}</span>
              {dagStatus}
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn btn-primary" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
