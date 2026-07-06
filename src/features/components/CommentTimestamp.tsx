import { ensureTimeAgoLocale } from "@/features/lib/timeAgo";
import ReactTimeAgo from "react-time-ago";
import { isParseableDate } from "@/features/lib/dates";

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
