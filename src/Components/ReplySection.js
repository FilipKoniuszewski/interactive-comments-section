import React from 'react';
import "../Style/ReplySection.css";
import ReplyCard from "./ReplyCard";

export default function ReplySection({setModalOpen, setCommentToDelete, currentUser, upVote, downVote, replies}) {
    return (
        <div className="reply-section">
            {replies.map((reply) => 
                <ReplyCard 
                    key={reply.id}
                    setModalOpen={setModalOpen}
                    replyId={reply.id}
                    setCommentToDelete={setCommentToDelete}
                    currentUser={currentUser}
                    content={reply.content}
                    createdAt={reply.createdAt}
                    score={reply.score}
                    user={reply.user}
                    upVote={upVote}
                    downVote={downVote}
                    replyTo={reply.replyingTo}/>)}
        </div>
    );
}
