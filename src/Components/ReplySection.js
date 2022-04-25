import React, {useEffect, useState} from 'react';
import "../Style/ReplySection.css";
import ReplyCard from "./ReplyCard";
import NewReply from "./NewReply";

export default function ReplySection(
    {
        setModalOpen, 
        userComment, 
        commentId, 
        reply, 
        setReply, 
        editComment, 
        setCommentToDelete, 
        currentUser, 
        upVote, 
        downVote, 
        replies,
        addReply
    }) {
    
    const [replyTo, setReplyTo] = useState(userComment);
    
    const [replyOrder, setReplyOrder] = useState(-1);
    
    useEffect(() => {
        setReplyTo(userComment)
    }, [])
    
    return (
        <div className={`reply-section ${(replies.length === 0 && !reply) && 'delete-space'}`}>
            {replies.map((replyCard, index) => 
                <ReplyCard 
                    key={replyCard.id}
                    order={index}
                    setReplyOrder={setReplyOrder}
                    reply={reply}
                    setReply={setReply}
                    setReplyTo={setReplyTo}
                    setModalOpen={setModalOpen}
                    replyId={replyCard.id}
                    setCommentToDelete={setCommentToDelete}
                    currentUser={currentUser}
                    editComment={editComment}
                    content={replyCard.content}
                    createdAt={replyCard.createdAt}
                    score={replyCard.score}
                    user={replyCard.user}
                    upVote={upVote}
                    downVote={downVote}
                    replyTo={replyCard.replyingTo}/>)}
            {reply && replyTo && <NewReply
                replyTo={replyTo}
                replyOrder={replyOrder}
                setReplyOrder={setReplyOrder}
                userComment={userComment}
                setReplyTo={setReplyTo}
                addReply={addReply}
                currentUser={currentUser}
                commentId={commentId}
                setReply={setReply}/>}
        </div>
    );
}
