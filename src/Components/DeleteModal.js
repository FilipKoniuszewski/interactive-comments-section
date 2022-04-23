import React from 'react';

export default function DeleteModal(
    {modalRef, setCommentToDelete, modalContentRef, deleteComment, setModalOpen}) {
    
    function HandleClose() {
        setModalOpen(false)
        setCommentToDelete(0);
    }
    
    function HandleDelete() {
        deleteComment();
        setModalOpen(false);
        
    }
    
    return (
        <div className="modal-container" ref={modalRef}>
            <div className="delete-modal" ref={modalContentRef}>
                <h2 className="modal-header">Delete comment</h2>
                <p>Are you sure you want to delete this comment?
                    This will remove the comment and can’t be undone.</p>
                <div className="modal-delete-section">
                    <div className="modal-cancel-button" onClick={HandleClose}>
                        no, cancel
                    </div>
                    <div className="modal-delete-button" onClick={HandleDelete}>
                        yes, delete
                    </div>
                </div>
            </div>
        </div>
    );
}