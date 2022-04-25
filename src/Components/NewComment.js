import React, {useState} from 'react';
import "../Style/NewComment.css";

function NewComment({currentUser, addComment}) {
    
    let currentUserImage = require(`../Assets/Images/avatars/${currentUser.image.png}`)
    
    let [newCommentContent, setNewCommentContent] = useState("")
    
    function HandleSubmit(e) {
        e.preventDefault()
        if (newCommentContent) {
            const newComment = {
                id: Math.floor(Math.random() * 100) + 5,
                content: newCommentContent,
                createdAt: new Date(),
                score: 0,
                vote: "no",
                user: currentUser,
                replies: [],
            };
            addComment(newComment)
            setNewCommentContent("")
        }
    }
    return (
        <form className="new-comment-form">
            <img src={currentUserImage} alt="" />
            <label htmlFor="commentContent" />
            <textarea name="comment"
                      id="commentContent"
                      autoComplete="off"
                      placeholder="Add a comment..."
                      value={newCommentContent}
                      onChange={e => setNewCommentContent(e.target.value)}
            />
            <div className="add-comment-section">
                <img src={currentUserImage} alt="" />
                <input type="submit"
                       name="submit"
                       id="add-comment"
                       onClick={(e) => HandleSubmit(e)}
                       value="SEND"/>
            </div>
        </form>
        
    );
}

export default NewComment;