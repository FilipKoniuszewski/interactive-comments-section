import React, {useEffect, useState} from 'react';
import plusIcon from "../Assets/Images/icon-plus.svg";
import minusIcon from "../Assets/Images/icon-minus.svg";
import replyIcon from "../Assets/Images/icon-reply.svg";
import "../Style/CommentCard.css";
import deleteIcon from "../Assets/Images/icon-delete.svg";
import editIcon from "../Assets/Images/icon-edit.svg";
import EditComment from "./EditComment";
import ReactTimeAgo from "react-time-ago";

export default function ReplyCard(
    {
        setReplyOrder,
        setModalOpen, 
        order,
        replyId,
        reply,
        setReply,
        setReplyTo,
        editComment, 
        setCommentToDelete, 
        currentUser, 
        content, 
        createdAt, 
        score, 
        user, 
        upVote, 
        downVote, 
        replyTo}) {

    let userImage = require(`../Assets/Images/avatars/${user.image.png}`)

    const [isCommentOwner, setIsCommentOwner] = useState(false);

    const [isUpVoted, setIsUpVoted] = useState(false);

    const [isDownVoted, setIsDownVoted] = useState(false);

    const [edit, setEdit] = useState(false);

    useEffect(() => {
        if (currentUser.username === user.username) {
            setIsCommentOwner(true);
        }
    }, [])
    
    function HandleDelete() {
        setModalOpen(true);
        setCommentToDelete({
            id: replyId, 
            isReply: true
        })
    }
    
    function HandleReply() {
        setReply(!reply)
        setReplyTo(user.username)
        setReplyOrder(order)
        
    }

    function UpVote() {
        upVote(replyId, true);
        setIsUpVoted(true);
        setIsDownVoted(false);
    }

    function DownVote() {
        downVote(replyId, true);
        setIsDownVoted(true);
        setIsUpVoted(false);
    }
    
    return (
        <div className="comment-card reply-card" style={{order: `${order}`}}>
            <div className="stats-section">
                {isUpVoted || isCommentOwner
                    ? <img src={plusIcon} alt="" className='scored' />
                    : <img src={plusIcon} alt="" className='not-scored' onClick={UpVote}/>}
                <div className="stats-count">
                    {score}
                </div>
                {isDownVoted || isCommentOwner
                    ? <img src={minusIcon} alt="" className='scored' />
                    : <img src={minusIcon} alt="" className='not-scored' onClick={DownVote}/>}
            </div>
            <div className="comment-section">
                <div className="user">
                    <div className="user-info">
                        <img src={userImage} alt="" />
                        <span className="user-name">
                                {user.username}
                            </span>
                        <span className="comment-date">
                                {!isNaN(Date.parse(createdAt))
                                    ? <ReactTimeAgo date={createdAt} locale="en-US" timeStyle="twitter"/>
                                    : createdAt} 
                            </span>
                    </div>
                    {isCommentOwner
                        ?
                        <div className="comment-owner">
                            <div className="delete" onClick={HandleDelete}>
                                <img src={deleteIcon} alt="" />
                                Delete
                            </div>
                            <div className={`edit ${edit && 'active'}`} onClick={() => setEdit(!edit)}>
                                <img src={editIcon} alt="" />
                                Edit
                            </div>
                        </div>
                        :
                        <div className={`reply ${reply && 'active'}`} onClick={HandleReply}>
                            <img src={replyIcon} alt="" />
                            <span>Reply</span>
                        </div>
                    }
                </div>
                {edit
                    ? <EditComment
                        commentId={replyId}
                        content={content}
                        editComment={editComment}
                        setEdit={setEdit}
                        isReply={true}/>
                    :
                    <div className="reply-content">
                        <span className="replying-to">@{replyTo}</span>{content}
                    </div>
                }
            </div>
        </div>
    );
}