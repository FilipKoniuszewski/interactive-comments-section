import { useState } from "react";
import type { Reply, User } from "@/features/types/comment.types";
import { useComments } from "@/features/hooks/useComments";
import { getAvatarUrl } from "@/features/lib/avatars";
import { EditComment } from "./EditComment";
import { CommentTimestamp } from "./CommentTimestamp";
import { CommentVotes } from "./CommentVotes";
import { CommentActions } from "./CommentActions";

interface CommentItemBase {
  id: number;
  content: string;
  createdAt: string | Date;
  score: number;
  vote: Reply["vote"];
  user: User;
}

interface ReplyControls {
  isActive: boolean;
  onToggle: () => void;
}

interface CommentItemProps {
  item: CommentItemBase;
  isReply: boolean;
  replyingTo?: string;
  isCompact?: boolean;
  replyControls?: ReplyControls;
}

export function CommentItem({
  item,
  isReply,
  replyingTo,
  isCompact = false,
  replyControls,
}: CommentItemProps) {
  const { currentUser, upVote, downVote, openDeleteModal } = useComments();
  const [isEditing, setIsEditing] = useState(false);

  const isOwner = currentUser.username === item.user.username;
  const avatarUrl = getAvatarUrl(item.user.image.png);

  const authorClass = isCompact
    ? "comment__author comment__author--compact"
    : "comment__author";
  const nameClass = isCompact
    ? "comment__name comment__name--compact"
    : "comment__name";

  return (
    <article className={`comment${isReply ? " comment--reply" : ""}`}>
      <div className="comment__toolbar">
        <CommentVotes
          score={item.score}
          vote={item.vote}
          isOwner={isOwner}
          onUpVote={() => upVote(item.id, isReply)}
          onDownVote={() => downVote(item.id, isReply)}
        />
        <CommentActions
          layout="mobile"
          isOwner={isOwner}
          isEditing={isEditing}
          isReplyActive={replyControls?.isActive}
          isCompact={isCompact}
          onDelete={() => openDeleteModal(item.id, isReply)}
          onToggleEdit={() => setIsEditing((editing) => !editing)}
          onToggleReply={replyControls?.onToggle}
        />
      </div>

      <div className="comment__body">
        <header className="comment__header">
          <div className={authorClass}>
            <img className="comment__avatar" src={avatarUrl} alt="" />
            <span className={nameClass}>
              {item.user.username}
              {isOwner && <span className="comment__badge">you</span>}
            </span>
            <time className="comment__date">
              <CommentTimestamp createdAt={item.createdAt} />
            </time>
          </div>
          <CommentActions
            layout="desktop"
            isOwner={isOwner}
            isEditing={isEditing}
            isReplyActive={replyControls?.isActive}
            onDelete={() => openDeleteModal(item.id, isReply)}
            onToggleEdit={() => setIsEditing((editing) => !editing)}
            onToggleReply={replyControls?.onToggle}
          />
        </header>

        {isEditing ? (
          <EditComment
            commentId={item.id}
            content={item.content}
            isReply={isReply}
            onCancel={() => setIsEditing(false)}
          />
        ) : isReply && replyingTo ? (
          <p className="comment__text comment__text--reply">
            <span className="comment__mention">@{replyingTo}</span>
            {item.content}
          </p>
        ) : (
          <p className="comment__text">{item.content}</p>
        )}
      </div>
    </article>
  );
}
