import React from 'react';

export default function DeleteModal({modalRef, modalContentRef, setModalOpen}) {
    
    function handleClose() {
        setModalOpen(false)
    }
    
    return (
        <div className="modal-container" ref={modalRef}>
            <div className="delete-modal" ref={modalContentRef}>
                <h2 className="modal-header">Delete comment</h2>
                <p>Are you sure you want to delete this comment?
                    This will remove the comment and can’t be undone.</p>
                <div className="modal-delete-section">
                    <div className="modal-cancel-button" onClick={handleClose}>
                        no, cancel
                    </div>
                    <div className="modal-delete-button">
                        yes, delete
                    </div>
                </div>
            </div>
        </div>
    );
}