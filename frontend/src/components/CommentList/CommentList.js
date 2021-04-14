import "./CommentList.css";
import Comment from "../Comment/Comment"
import React, { useEffect, useState } from "react";
import axios from "axios";

function CommentList({ product_id }) {
	const [comments, setComments] =  useState([])
	
	useEffect(() => {
		axios.get(`http://localhost:4000/api/comments/${product_id}`)
		.then(({data}) => setComments(data))
		.catch((err) => console.log(err))
	}, [product_id])

	return (
		<div className="classList-wrapper">
			{comments.map(({text, time_stamp, user_name, id}) => (
				<Comment
					key={id}
					comment={text}
					userName={user_name}
					timeStamp={time_stamp}
				/>
			))}
		</div>
	);
}

export default CommentList;
