import React, {useEffect, useRef, useState} from 'react';
import "../Style/ReplySection.css";

function NewReply(
    {
        replyOrder,
        setReplyOrder,
        replyTo,
        addReply,
        userComment,
        setReplyTo,
        currentUser, 
        commentId, 
        setReply
    }) {

    let userImage = require(`../Assets/Images/avatars/${currentUser.image.png}`)
    
    const [replyContent, setReplyContent] = useState(`@${replyTo} `)
    
    const textareaRef = useRef(null);
    
    useEffect(() => {
        let end = replyContent.length
        textareaRef.current.setSelectionRange(end, end);
    }, [])
    
    function HandleSubmit(e) {
        e.preventDefault()
        let content = replyContent.split(' ')
        let [, ...rest] = content;
        let updatedContent = rest.join(' ')
        
        if (updatedContent) {
            const newReply = {
                id: Math.floor(Math.random() * 100) + 5,
                content: updatedContent,
                createdAt: new Date(),
                score: 0,
                vote: "no",
                replyingTo: replyTo,
                user: currentUser,
            };
            addReply(newReply, commentId)
            setReplyContent("")
            setReply(false);
            setReplyTo(userComment)
            setReplyOrder(-1)
            
        }
    }
    
    return (
        <div className="new-reply-card reply-card" style={{order: `${replyOrder}`}}>
            <form className="new-reply-form">
                <img src={userImage} alt="userImage" />
                <label htmlFor="replyContent" />
                <textarea name="comment"
                          autoFocus
                          ref={textareaRef}
                          rows={5}
                          id="replyContent"
                          autoComplete="off"
                          placeholder="Add a reply..."
                          value={replyContent}
                          onChange={e => setReplyContent(e.target.value)}
                />
                <div className="add-comment-section">
                    <img src={userImage} alt="" />
                    <input type="submit"
                           name="submit"
                           id="add-comment"
                           onClick={(e) => HandleSubmit(e)}
                           value="REPLY"/>
                </div>
                
            </form>
        </div>
    );
}

export default NewReply;