import React, {useEffect} from 'react';
import plusIcon from "../Assets/Images/icon-plus.svg";
import minusIcon from "../Assets/Images/icon-minus.svg";
import replyIcon from "../Assets/Images/icon-reply.svg";
import editIcon from "../Assets/Images/icon-edit.svg";
import deleteIcon from "../Assets/Images/icon-delete.svg";
import "../Style/CommentCard.css";
import ReplySection from "./ReplySection";


export default function CommentCard(props) {
    
    let userImage = require(`../Assets/Images/avatars/${props.user.image.png}`)
    
    return (
        <>
            <div className="comment-card">
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
                    <div className="comment-content">
                        {props.content}
                    </div>
                </div>
            </div>
            {props.replies.length !== 0 && <ReplySection commentId={props.id} replies={props.replies} />}
        </>
    );
}