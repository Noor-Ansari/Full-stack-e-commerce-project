import "./CommentForm.css";
import axios from "axios";
import React, { useState } from "react";

function CommentForm({ product_id }) {
	const [comment, setComment] = useState("");
	const user = JSON.parse(sessionStorage.getItem("user"));
	
	const handleClick = (e) => {
		if (user) {
			if (!comment) {
				alert("Please type some text");
                e.preventDefault()
                return
			}
			axios
				.post("http://localhost:4000/api/comment", {
					user: user._id,
					product: product_id,
					comment: comment,
				})
				.then((res) => {
					e.preventDefault()
					console.log(res)
				})
				.catch((err) => console.log(err));
		} else {
			alert("Please login first");
            e.preventDefault()
		}
	};

	return (
        <form className='comment-form' onSubmit={ (e) => handleClick(e)}>
        <h1 className='comment-title'>Share your feedback</h1>
        <textarea
            className='comment-input'
            placeholder='Share feedback.... '
            onChange={(e) => setComment(e.target.value)}
        />
        <button type='submit' className='comment-button'>
            Submit
        </button>
    </form>
	);
}

export default CommentForm;
