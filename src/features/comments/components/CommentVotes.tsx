import plusIcon from "@/assets/images/icon-plus.svg";
import minusIcon from "@/assets/images/icon-minus.svg";
import type { VoteState } from "@/features/comments/types/comment.types";

interface CommentVotesProps {
  score: number;
  vote: VoteState;
  isOwner: boolean;
  onUpVote: () => void;
  onDownVote: () => void;
}

export function CommentVotes({
  score,
  vote,
  isOwner,
  onUpVote,
  onDownVote,
}: CommentVotesProps) {
  const upVoteLocked = vote === "upVote" || isOwner;
  const downVoteLocked = vote === "downVote" || isOwner;

  return (
    <div className="comment__votes">
      {upVoteLocked ? (
        <img src={plusIcon} alt="" className="comment__vote-icon comment__vote-icon--disabled" />
      ) : (
        <button
          type="button"
          className="comment__vote-icon"
          onClick={onUpVote}
          aria-label="Upvote"
        >
          <img src={plusIcon} alt="" />
        </button>
      )}
      <p className="comment__score">{score}</p>
      {downVoteLocked ? (
        <img src={minusIcon} alt="" className="comment__vote-icon comment__vote-icon--disabled" />
      ) : (
        <button
          type="button"
          className="comment__vote-icon"
          onClick={onDownVote}
          aria-label="Downvote"
        >
          <img src={minusIcon} alt="" />
        </button>
      )}
    </div>
  );
}
