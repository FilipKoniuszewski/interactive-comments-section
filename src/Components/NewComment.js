import React, {useState} from 'react';
import "../Style/NewComment.css";

function NewComment(props) {
    
    let currentUserImage = require(`../Assets/Images/avatars/${props.currentUser.image.png}`)
    let [newCommentContent, setNewCommentContent] = useState("")
    
    function HandleSubmit(e) {
        e.preventDefault()
    }
    return (
        <div className="new-comment-section">
            <img src={currentUserImage} alt="" />
            <form>
                <label htmlFor="commentContent" />
                <textarea name="comment"
                          id="commentContent"
                          autoComplete="off"
                          placeholder="Add a comment..."
                          value={newCommentContent}
                          onChange={e => setNewCommentContent(e.target.value)}
                />
                <input type="submit"
                       name="submit"
                       id="add-comment"
                       onClick={(e) => HandleSubmit(e)}
                       value="SEND"/>
            </form>
        </div>
    );
}

export default NewComment;