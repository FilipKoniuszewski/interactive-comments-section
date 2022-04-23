import React, {useState} from 'react';
import "../Style/EditComment.css"

export default function EditComment({commentId, content, setEdit, editComment, isReply}) {
    
    let [newCommentContent, setNewCommentContent] = useState(content)
    
    function HandleSubmit(e) {
        e.preventDefault()
        editComment(commentId, content, isReply)
        setEdit(false);
    }
    
    return (
        <form className="edit-comment-form">
            <label htmlFor="commentContent" />
            <textarea name="comment"
                      id="commentContent"
                      autoComplete="off"
                      placeholder="edit a comment..."
                      value={newCommentContent}
                      onChange={e => setNewCommentContent(e.target.value)}
            />
            <input type="submit"
                   name="submit"
                   id="add-comment"
                   onClick={(e) => HandleSubmit(e)}
                   value="UPDATE"/>
        </form>
    );
}

