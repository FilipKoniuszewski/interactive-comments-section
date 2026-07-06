import replyIcon from "@/assets/images/icon-reply.svg";
import editIcon from "@/assets/images/icon-edit.svg";
import deleteIcon from "@/assets/images/icon-delete.svg";

interface CommentActionsProps {
  layout: "mobile" | "desktop";
  isOwner: boolean;
  isEditing: boolean;
  isReplyActive?: boolean;
  isCompact?: boolean;
  onDelete: () => void;
  onToggleEdit: () => void;
  onToggleReply?: () => void;
}

export function CommentActions({
  layout,
  isOwner,
  isEditing,
  isReplyActive = false,
  isCompact = false,
  onDelete,
  onToggleEdit,
  onToggleReply,
}: CommentActionsProps) {
  const layoutClass =
    layout === "mobile" ? "comment__actions comment__actions--mobile" : "comment__actions";
  const compactClass = isCompact ? " comment__actions--compact" : "";

  if (isOwner) {
    return (
      <div className={`${layoutClass}${compactClass}`}>
        <button
          type="button"
          className="comment__action comment__action--delete"
          onClick={onDelete}
        >
          <img src={deleteIcon} alt="" />
          Delete
        </button>
        <button
          type="button"
          className={`comment__action comment__action--edit${isEditing ? " comment__action--active" : ""}`}
          onClick={onToggleEdit}
        >
          <img src={editIcon} alt="" />
          {isEditing ? "Cancel" : "Edit"}
        </button>
      </div>
    );
  }

  if (!onToggleReply) {
    return null;
  }

  return (
    <button
      type="button"
      className={`comment__action comment__action--reply${layout === "mobile" ? " comment__action--mobile" : ""}${isReplyActive ? " comment__action--active" : ""}`}
      onClick={onToggleReply}
    >
      <img src={replyIcon} alt="" />
      <span>{isReplyActive ? "Cancel" : "Reply"}</span>
    </button>
  );
}
