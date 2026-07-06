import { useState, type FormEvent } from "react";
import { useComments } from "@/features/hooks/useComments";

interface EditCommentProps {
  commentId: number;
  content: string;
  isReply: boolean;
  onCancel: () => void;
}

export function EditComment({
  commentId,
  content,
  isReply,
  onCancel,
}: EditCommentProps) {
  const { editComment } = useComments();
  const [editedContent, setEditedContent] = useState(content);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!editedContent.trim()) {
      return;
    }

    editComment(commentId, editedContent, isReply);
    onCancel();
  }

  return (
    <form className="comment-edit" onSubmit={handleSubmit}>
      <label htmlFor="commentContent" className="visually-hidden">
        Edit comment
      </label>
      <textarea
        className="comment-edit__field"
        id="commentContent"
        name="comment"
        rows={5}
        autoComplete="off"
        placeholder="edit a comment..."
        value={editedContent}
        onChange={(event) => setEditedContent(event.target.value)}
      />
      <button className="comment-edit__submit" type="submit" name="submit">
        UPDATE
      </button>
    </form>
  );
}
