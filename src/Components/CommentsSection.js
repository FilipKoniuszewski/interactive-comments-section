import React from 'react';
import CommentCard from "./CommentCard";
import NewComment from "./NewComment";

export default function CommentsSection({addComment, deleteComment, setModalOpen, upVote, downVote, editComment, currentUser, comments}) {
    return (
        <section className="comments-section">
            {comments.map((comment) => 
            <CommentCard 
                key={comment.id}
                commentId={comment.id}
                currentUser={currentUser}
                deleteComment={deleteComment}
                setModalOpen={setModalOpen}
                editComment={editComment}
                upVote={upVote}
                downVote={downVote}
                content={comment.content}
                createdAt={comment.createdAt}
                score={comment.score}
                user={comment.user}
                replies={comment.replies}/>)}
            
            <NewComment currentUser={currentUser} 
                        addComment={addComment}/>
        </section>
        
    );
}