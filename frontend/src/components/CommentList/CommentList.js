import "./CommentList.css";
import Comment from "../Comment/Comment";
import React, { useEffect, useState } from "react";
import axios from "axios";
import WithLoading from "../../HOC/WithLoading";

function CommentList({ product_id }) {
	const [comments, setComments] = useState([]);
	useEffect(() => {
		axios
			.get(`http://localhost:4000/api/comments/${product_id}`)
			.then(({ data }) => setComments(data))
			.catch((err) => console.log(err));
	}, [product_id]);

	return (
		<div className='classList-wrapper'>
			{comments.map(({ comment, time_stamp, user, _id }) => (
				<Comment
					key={_id}
					comment={comment}
					userName={user?.name}
					timeStamp={time_stamp}
				/>
			))}
		</div>
	);
}

export default WithLoading(CommentList);
