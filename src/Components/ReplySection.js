import React from 'react';
import "../Style/ReplySection.css";
import ReplyCard from "./ReplyCard";

export default function ReplySection(props) {
    return (
        <div className="reply-section">
            {props.replies.map((reply) => 
                <ReplyCard 
                    key={reply.id}
                    content={reply.content}
                    createdAt={reply.createdAt}
                    score={reply.score}
                    user={reply.user}
                    replyTo={reply.replyingTo}/>)}
        </div>
    );
}
