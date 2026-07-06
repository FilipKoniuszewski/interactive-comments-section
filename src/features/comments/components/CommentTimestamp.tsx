import { ensureTimeAgoLocale } from "@/features/comments/lib/timeAgo";
import ReactTimeAgo from "react-time-ago";
import { isParseableDate } from "@/features/comments/lib/dates";

ensureTimeAgoLocale();

interface CommentTimestampProps {
  createdAt: string | Date;
}

export function CommentTimestamp({ createdAt }: CommentTimestampProps) {
  if (isParseableDate(createdAt)) {
    const date = createdAt instanceof Date ? createdAt : new Date(createdAt);

    return (
      <ReactTimeAgo date={date} locale="en-US" timeStyle="twitter" />
    );
  }

  return <>{createdAt}</>;
}
