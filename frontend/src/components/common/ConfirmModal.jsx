function ConfirmModal({ show, title, message, onConfirm, onClose, loading }) {

    if (!show) {
        return null;
    }
    return (
        <div className="modal d-block" tabIndex={-1} style={{
            backgroundColor: "rgba(0,0,0,0.3)"
        }}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{title}</h5>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        <p>{message}</p>
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-secondary" onClick={onClose}>
                            Cancel
                        </button>
                        <button className="btn btn-danger" onClick={onConfirm} disabled={loading}>{loading ? "Deleting" : "Delete"}</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ConfirmModal