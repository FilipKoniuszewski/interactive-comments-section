import { Fragment, useEffect, useState } from "react";
import type { Reply } from "@/features/comments/types/comment.types";
import { CommentItem } from "./CommentItem";
import { NewReply } from "./NewReply";

interface ReplySectionProps {
  commentId: number;
  replies: Reply[];
  userComment: string;
  replyOpen: boolean;
  onReplyOpenChange: (open: boolean) => void;
  replyOrder: number;
  setReplyOrder: (order: number) => void;
}

export function ReplySection({
  commentId,
  replies,
  userComment,
  replyOpen,
  onReplyOpenChange,
  replyOrder,
  setReplyOrder,
}: ReplySectionProps) {
  const [replyTo, setReplyTo] = useState(userComment);

  useEffect(() => {
    setReplyTo(userComment);
  }, [userComment]);

  const isVisible = replies.length > 0 || replyOpen;

  const newReplyProps = {
    commentId,
    userComment,
    onClose: () => onReplyOpenChange(false),
    setReplyOrder,
    setReplyTo,
  };

  return (
    <div className={`replies${isVisible ? " replies--visible" : " replies--hidden"}`}>
      {replyOpen && replyOrder === -1 && replyTo && (
        <NewReply replyTo={replyTo} {...newReplyProps} />
      )}
      {replies.map((reply, index) => {
        const isActiveReply = replyOpen && replyOrder === index;

        const handleReply = () => {
          if (replyOpen && replyOrder === index) {
            onReplyOpenChange(false);
            setReplyOrder(-1);
            setReplyTo(userComment);
            return;
          }

          onReplyOpenChange(!replyOpen);
          setReplyTo(reply.user.username);
          setReplyOrder(index);
        };

        return (
          <Fragment key={reply.id}>
            <CommentItem
              item={reply}
              isReply
              replyingTo={reply.replyingTo}
              isCompact
              replyControls={{
                isActive: isActiveReply,
                onToggle: handleReply,
              }}
            />
            {replyOpen && replyOrder === index && replyTo && (
              <NewReply replyTo={replyTo} {...newReplyProps} />
            )}
          </Fragment>
        );
      })}
    </div>
  );
}
