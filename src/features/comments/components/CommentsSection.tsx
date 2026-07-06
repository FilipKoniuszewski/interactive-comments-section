import { sortCommentsByScore } from "@/features/comments/lib/commentsReducer";
import { useComments } from "@/features/comments/hooks/useComments";
import { CommentCard } from "./CommentCard";
import { NewComment } from "./NewComment";

export function CommentsSection() {
  const { comments, currentUser } = useComments();

  if (!comments.length || !currentUser) {
    return null;
  }

  const sortedComments = sortCommentsByScore(comments);

  return (
    <section className="comments">
      {sortedComments.map((comment) => (
        <CommentCard key={comment.id} comment={comment} />
      ))}
      <NewComment />
    </section>
  );
}
