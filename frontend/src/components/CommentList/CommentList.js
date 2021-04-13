import "./CommentList.css";
import Comment from "../Comment/Comment"
import React from "react";

function CommentList({ comments }) {
	return (
		<div className="classList-wrapper">
			{comments.map((comment) => (
				<Comment
					key={comment.time_stamp}
					comment={comment.text}
					userName={comment.user_name}
					timeStamp={comment.time_stamp}
				/>
			))}
		</div>
	);
}

export default CommentList;
