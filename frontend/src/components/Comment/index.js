import "./Comment.css"
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import React from 'react'

function Comment({comment, userName, timeStamp}) {
    return (
        <div className="comment-wrapper">
            <PersonOutlineIcon />
            <div className="comment-details">
                <p className="username">{userName}
                <span className="comment-time">({new Date(timeStamp).toUTCString()})</span>
                </p>
                <p className="comment-text">{comment}</p>
            </div>
        </div>
    )
}

export default Comment;
