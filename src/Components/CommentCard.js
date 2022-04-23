import React, {useEffect, useState} from 'react';
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


export default function CommentCard(
    {commentId, currentUser, deleteComment, setModalOpen, editComment, upVote, downVote, content, createdAt, score, user, replies}) {
    
    const [isCommentOwner, setIsCommentOwner] = useState(false);
    
    const [isUpVoted, setIsUpVoted] = useState(false);

    const [isDownVoted, setIsDownVoted] = useState(false);
    
    TimeAgo.addLocale(en)
    
    
    let userImage = require(`../Assets/Images/avatars/${user.image.png}`)
    
    
    useEffect(() => {
        if (currentUser.username === user.username) {
            setIsCommentOwner(true);
        }
    }, [])
    
    function HandleReply() {
        
    }
    
    function HandleDelete() {
        setModalOpen(true);
    }

    function HandleEdit() {

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
            <div className="comment-card">
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
                                    <img src={deleteIcon} alt=""/>
                                    Delete
                                </div>
                                <div className="edit" onClick={HandleEdit}>
                                    <img src={editIcon} alt="" />
                                    Edit
                                </div>
                            </div> 
                            :
                            <div className="reply" onClick={HandleReply}>
                                <img src={replyIcon} alt="" />
                                <span>Reply</span>
                            </div>
                        }
                    </div>
                    <div className="comment-content">
                        {content}
                    </div>
                </div>
            </div>
            {replies.length !== 0 && <ReplySection
                setModalOpen={setModalOpen}
                currentUser={currentUser}
                upVote={upVote}
                downVote={downVote}
                replies={replies}
            />}
        </>
    );
}