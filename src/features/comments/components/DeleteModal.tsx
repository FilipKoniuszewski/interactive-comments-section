import { useEffect, useRef } from "react";
import { useComments } from "@/features/comments/hooks/useComments";

export function DeleteModal() {
  const { modalOpen, deleteComment, closeModal } = useComments();
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) {
      return;
    }

    if (modalOpen && !dialog.open) {
      dialog.showModal();
    } else if (!modalOpen && dialog.open) {
      dialog.close();
    }
  }, [modalOpen]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) {
      return;
    }

    const handleCancel = (event: Event) => {
      event.preventDefault();
      closeModal();
    };

    dialog.addEventListener("cancel", handleCancel);
    return () => dialog.removeEventListener("cancel", handleCancel);
  }, [closeModal]);

  const handleBackdropClick = (event: React.MouseEvent<HTMLDialogElement>) => {
    if (event.target === dialogRef.current) {
      closeModal();
    }
  };

  return (
    <dialog ref={dialogRef} className="modal" onClick={handleBackdropClick}>
      <div className="modal__dialog">
        <h2 className="modal__title">Delete comment</h2>
        <p className="modal__text">
          Are you sure you want to delete this comment? This will remove the
          comment and can&apos;t be undone.
        </p>
        <div className="modal__actions">
          <button type="button" className="modal__button modal__button--cancel" onClick={closeModal}>
            no, cancel
          </button>
          <button type="button" className="modal__button modal__button--delete" onClick={deleteComment}>
            yes, delete
          </button>
        </div>
      </div>
    </dialog>
  );
}
