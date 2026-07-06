import { useState, type FormEvent } from "react";
import { useComments } from "@/features/comments/hooks/useComments";
import { getAvatarUrl } from "@/features/comments/lib/avatars";

export function NewComment() {
  const { currentUser, addComment } = useComments();
  const [content, setContent] = useState("");

  if (!currentUser) {
    return null;
  }

  const avatarUrl = getAvatarUrl(currentUser.image.png);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!content.trim()) {
      return;
    }

    addComment({
      id: Date.now(),
      content,
      createdAt: new Date(),
      score: 0,
      vote: "no",
      user: currentUser,
      replies: [],
    });

    setContent("");
  }

  return (
    <form className="comment-form" onSubmit={handleSubmit}>
      <img className="comment-form__avatar" src={avatarUrl} alt="" />
      <label htmlFor="commentContent" className="visually-hidden">
        Add a comment
      </label>
      <textarea
        className="comment-form__field"
        id="commentContent"
        name="comment"
        autoComplete="off"
        placeholder="Add a comment..."
        value={content}
        onChange={(event) => setContent(event.target.value)}
      />
      <div className="comment-form__footer">
        <img className="comment-form__avatar comment-form__avatar--mobile" src={avatarUrl} alt="" />
        <button className="comment-form__submit" type="submit" name="submit">
          SEND
        </button>
      </div>
    </form>
  );
}
