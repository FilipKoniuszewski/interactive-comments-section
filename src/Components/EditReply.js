import React, {useState} from 'react';
import "../Style/EditComment.css"

export default function EditReply({commentId, content, editComment}) {

    let [newCommentContent, setNewCommentContent] = useState(content)

    function HandleSubmit(e) {
        e.preventDefault()
        if (newCommentContent.trim()) {
            editComment(commentId, content, true)
        }
    }

    return (
        <form className="edit-comment-form">
            <label htmlFor="commentContent" />
            <textarea name="comment"
                      autoFocus
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