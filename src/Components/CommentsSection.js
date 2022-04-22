import React from 'react';
import CommentCard from "./CommentCard";
import NewComment from "./NewComment";

export default function CommentsSection(props) {
    console.log(props)
    return (
        <section className="comments-section">
            {props.comments.map((comment) => 
            <CommentCard 
                key={comment.id} 
                content={comment.content}
                createdAt={comment.createdAt}
                score={comment.score}
                user={comment.user}
                replies={comment.replies}/>)}
            <NewComment currentUser={props.currentUser}/>
        </section>
        
    );
}