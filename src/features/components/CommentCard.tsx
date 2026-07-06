import { useState } from "react";
import type { Comment } from "@/features/types/comment.types";
import { CommentItem } from "./CommentItem";
import { ReplySection } from "./ReplySection";

interface CommentCardProps {
  comment: Comment;
}

export function CommentCard({ comment }: CommentCardProps) {
  const [replyOpen, setReplyOpen] = useState(false);
  const [replyOrder, setReplyOrder] = useState(-1);

  const isTopLevelReplyActive = replyOpen && replyOrder === -1;

  const toggleTopLevelReply = () => {
    setReplyOpen((open) => {
      if (open) {
        setReplyOrder(-1);
      }
      return !open;
    });
  };

  return (
    <>
      <CommentItem
        item={comment}
        isReply={false}
        replyControls={{
          isActive: isTopLevelReplyActive,
          onToggle: toggleTopLevelReply,
        }}
      />
      <ReplySection
        commentId={comment.id}
        replies={comment.replies}
        userComment={comment.user.username}
        replyOpen={replyOpen}
        onReplyOpenChange={setReplyOpen}
        replyOrder={replyOrder}
        setReplyOrder={setReplyOrder}
      />
    </>
  );
}
