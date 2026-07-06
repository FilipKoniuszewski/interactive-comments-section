import { useEffect, useRef, useState, type FormEvent } from "react";
import { useComments } from "@/features/comments/hooks/useComments";
import { getAvatarUrl } from "@/features/comments/lib/avatars";

interface NewReplyProps {
  commentId: number;
  replyTo: string;
  userComment: string;
  onClose: () => void;
  setReplyOrder: (order: number) => void;
  setReplyTo: (username: string) => void;
}

export function NewReply({
  commentId,
  replyTo,
  userComment,
  onClose,
  setReplyOrder,
  setReplyTo,
}: NewReplyProps) {
  const { currentUser, addReply } = useComments();
  const [replyContent, setReplyContent] = useState(`@${replyTo} `);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const avatarUrl = getAvatarUrl(currentUser.image.png);

  useEffect(() => {
    const end = replyContent.length;
    textareaRef.current?.setSelectionRange(end, end);
  }, [replyContent.length]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const [, ...rest] = replyContent.split(" ");
    const updatedContent = rest.join(" ");

    if (!updatedContent.trim()) {
      return;
    }

    addReply(
      {
        id: Date.now(),
        content: updatedContent,
        createdAt: new Date(),
        score: 0,
        vote: "no",
        replyingTo: replyTo,
        user: currentUser,
      },
      commentId
    );

    setReplyContent("");
    onClose();
    setReplyTo(userComment);
    setReplyOrder(-1);
  }

  return (
    <div className="comment-form comment-form--reply">
      <form className="comment-form__inner" onSubmit={handleSubmit}>
        <img className="comment-form__avatar" src={avatarUrl} alt="" />
        <label htmlFor="replyContent" className="visually-hidden">
          Add a reply
        </label>
        <textarea
          className="comment-form__field"
          ref={textareaRef}
          id="replyContent"
          name="comment"
          autoFocus
          rows={5}
          autoComplete="off"
          placeholder="Add a reply..."
          value={replyContent}
          onChange={(event) => setReplyContent(event.target.value)}
        />
        <div className="comment-form__footer">
          <img className="comment-form__avatar comment-form__avatar--mobile" src={avatarUrl} alt="" />
          <button className="comment-form__submit" type="submit" name="submit">
            REPLY
          </button>
        </div>
      </form>
    </div>
  );
}
