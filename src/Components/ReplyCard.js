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
        userComment,
        setReplyOrder,
        replyOrder,
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
        vote,
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
        if (reply === true) {
            setReplyOrder(-1)
            setReplyTo(userComment)
        }
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
            <div className="stats-container">
                <div className="stats-section">
                    {(vote === 'upVote') || isCommentOwner
                        ? <img src={plusIcon} alt="plusIcon" className='scored' />
                        : <img src={plusIcon} alt="plusIcon" className='not-scored' onClick={UpVote}/>}
                    <div className="stats-count">
                        {score}
                    </div>
                    {(vote === 'downVote') || isCommentOwner
                        ? <img src={minusIcon} alt="minus" className='scored' />
                        : <img src={minusIcon} alt="minus" className='not-scored' onClick={DownVote}/>}
                </div>
                {isCommentOwner 
                    ? <div className="comment-owner-mobile comment-owner-mobile-reply">
                    <div className="delete" onClick={HandleDelete}>
                        <img src={deleteIcon} alt="deleteIcon"/>
                        Delete
                    </div>
                    <div className={`edit ${edit && 'active'}`} onClick={() => setEdit(!edit)}>
                        <img src={editIcon} alt="editIcon" />
                        {edit ? 'Cancel' : 'Edit'}
                    </div>
                </div>
                    : <div className={`reply-mobile ${reply && replyOrder === order && 'active'}`} onClick={HandleReply}>
                        <img src={replyIcon} alt="replyIcon" />
                        <span>{reply && replyOrder === order ? 'Cancel' : 'Reply'}</span>
                    </div>
                }
            </div>
            <div className="comment-section">
                <div className="user">
                    <div className="user-info user-info-reply-mobile">
                        <img src={userImage} alt="userImage" />
                        <span className="user-name user-name-reply-mobile">
                                {user.username} {isCommentOwner && <span className="you-mark">you</span>}
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
                                <img src={deleteIcon} alt="deleteIcon" />
                                Delete
                            </div>
                            <div className={`edit ${edit && 'active'}`} onClick={() => setEdit(!edit)}>
                                <img src={editIcon} alt="editIcon" />
                                {edit ? 'Cancel' : 'Edit'}
                            </div>
                        </div>
                        :
                        <div className={`reply ${reply && replyOrder === order && 'active'}`} onClick={HandleReply}>
                            <img src={replyIcon} alt="replyIcon" />
                            <span>{reply && replyOrder === order ? 'Cancel' : 'Reply'}</span>
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