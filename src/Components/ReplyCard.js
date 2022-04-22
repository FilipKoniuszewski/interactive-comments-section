import React from 'react';
import plusIcon from "../Assets/Images/icon-plus.svg";
import minusIcon from "../Assets/Images/icon-minus.svg";
import replyIcon from "../Assets/Images/icon-reply.svg";
import "../Style/CommentCard.css";

function ReplyCard(props) {

    let userImage = require(`../Assets/Images/avatars/${props.user.image.png}`)
    
    return (
        <div className="comment-card reply-card">
            <div className="stats-section">
                <img src={plusIcon} alt="" />
                <div className="stats-count">
                    {props.score}
                </div>
                <img src={minusIcon} alt="" />
            </div>
            <div className="comment-section">
                <div className="user">
                    <div className="user-info">
                        <img src={userImage} alt="" />
                        <span className="user-name">
                                {props.user.username}
                            </span>
                        <span className="comment-date">
                                {props.createdAt}
                            </span>
                    </div>
                    <div className="reply">
                        <img src={replyIcon} alt="" />
                        <span>Reply</span>
                    </div>
                </div>
                <div className="comment-content reply-content">
                    <span className="replying-to">@{props.replyTo}</span>{props.content}
                </div>
            </div>
        </div>
    );
}

export default ReplyCard;