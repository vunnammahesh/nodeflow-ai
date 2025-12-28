export const ValidationErrorModal = ({ isOpen, error, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal modal-content">
        <div className="modal-header">
            <h2>Invalid Connection</h2>
            <button className="modal-close" onClick={onClose}>×</button>

        </div>
        <div className="modal-body"> 
          <p>{error}</p>
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
