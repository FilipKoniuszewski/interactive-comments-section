import React, {useEffect, useRef, useState} from 'react';
import plusIcon from "../Assets/Images/icon-plus.svg";
import minusIcon from "../Assets/Images/icon-minus.svg";
import replyIcon from "../Assets/Images/icon-reply.svg";
import editIcon from "../Assets/Images/icon-edit.svg";
import deleteIcon from "../Assets/Images/icon-delete.svg";
import "../Style/CommentCard.css";
import ReplySection from "./ReplySection";
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'
import ReactTimeAgo from "react-time-ago";
import EditComment from "./EditComment";


export default function CommentCard(
    {
        commentId, 
        vote,
        currentUser, 
        setCommentToDelete, 
        setModalOpen, 
        editComment, 
        upVote, 
        downVote, 
        content, 
        createdAt, 
        score, 
        user, 
        replies,
        addReply
    }) {
    
    const [isCommentOwner, setIsCommentOwner] = useState(false);
    
    const [isUpVoted, setIsUpVoted] = useState(false);

    const [isDownVoted, setIsDownVoted] = useState(false);
    
    const [edit, setEdit] = useState(false);
    
    const [reply, setReply] = useState(false);

    const [replyOrder, setReplyOrder] = useState(-1);
    
    TimeAgo.addLocale(en)
    
    let userImage = require(`../Assets/Images/avatars/${user.image.png}`)
    
    useEffect(() => {
        if (currentUser.username === user.username) {
            setIsCommentOwner(true);
        }
    }, [])
    
    function HandleDelete() {
        setModalOpen(true);
        setCommentToDelete({
            id: commentId,
            isReply: false
        })
    }
    
    function UpVote() {
        upVote(commentId, false);
        setIsUpVoted(true);
        setIsDownVoted(false);
    }
    
    function DownVote() {
        downVote(commentId, false);
        setIsDownVoted(true);
        setIsUpVoted(false);
    }
    
    return (
        <>
            <div className="comment-card card-space">
                <div className="stats-container">
                    <div className="stats-section">
                        {(vote === 'upVote') || isCommentOwner
                            ? <img src={plusIcon} alt="" className='scored' />
                            : <img src={plusIcon} alt="" className='not-scored' onClick={UpVote}/>}
                        <div className="stats-count">
                            {score}
                        </div>
                        {(vote === 'downVote') || isCommentOwner
                            ? <img src={minusIcon} alt="" className='scored' /> 
                            : <img src={minusIcon} alt="" className='not-scored' onClick={DownVote}/>}
                    </div>
                    {isCommentOwner 
                        ? 
                        <div className="comment-owner-mobile">
                            <div className="delete" onClick={HandleDelete}>
                                <img src={deleteIcon} alt=""/>
                                Delete
                            </div>
                            <div className={`edit ${edit && 'active'}`} onClick={() => setEdit(!edit)}>
                                <img src={editIcon} alt="" />
                                {edit ? 'Cancel' : 'Edit'}
                            </div>
                        </div> 
                        : 
                        <div className={`reply-mobile ${reply && replyOrder === -1 && 'active'}`} onClick={() => setReply(!reply)}>
                            <img src={replyIcon} alt="" />
                            <span>{reply && replyOrder === -1 ? 'Cancel' : 'Reply'}</span>
                        </div>}
                </div>
                <div className="comment-section">
                    <div className="user">
                        <div className="user-info">
                            <img src={userImage} alt="" />
                            <span className="user-name">
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
                                    <img src={deleteIcon} alt=""/>
                                    Delete
                                </div>
                                <div className={`edit ${edit && 'active'}`} onClick={() => setEdit(!edit)}>
                                    <img src={editIcon} alt="" />
                                    {edit ? 'Cancel' : 'Edit'}
                                </div>
                            </div> 
                            :
                            <div className={`reply ${reply && replyOrder === -1 && 'active'}`} onClick={() => setReply(!reply)}>
                                <img src={replyIcon} alt="" />
                                <span>{reply && replyOrder === -1 ? 'Cancel' : 'Reply'}</span>
                            </div>
                        }
                    </div>
                    {edit 
                        ? <EditComment 
                            commentId={commentId}
                            content={content}
                            editComment={editComment}
                            setEdit={setEdit}
                            isReply={false}/>
                        : 
                        <div className="comment-content">
                            {content}
                        </div>
                    }
                </div>
            </div>
            <ReplySection
                replyOrder={replyOrder}
                setReplyOrder={setReplyOrder}
                setModalOpen={setModalOpen}
                commentId={commentId}
                addReply={addReply}
                userComment={user.username}
                setCommentToDelete={setCommentToDelete}
                editComment={editComment}
                currentUser={currentUser}
                upVote={upVote}
                downVote={downVote}
                replies={replies}
                reply={reply}
                setReply={setReply}
            />
        </>
    );
}