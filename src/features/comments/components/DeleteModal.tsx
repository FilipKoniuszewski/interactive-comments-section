import { useEffect, useRef } from "react";
import { useComments } from "@/features/comments/hooks/useComments";

export function DeleteModal() {
  const { modalOpen, deleteComment, closeModal } = useComments();
  const modalContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalOpen &&
        modalContentRef.current &&
        !modalContentRef.current.contains(event.target as Node)
      ) {
        closeModal();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [modalOpen, closeModal]);

  return (
    <div className={`modal${modalOpen ? " modal--open" : ""}`}>
      <div className="modal__dialog" ref={modalContentRef}>
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
    </div>
  );
}
