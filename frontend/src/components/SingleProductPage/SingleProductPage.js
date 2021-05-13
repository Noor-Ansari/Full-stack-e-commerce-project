import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./SingleProductPage.css";
import CommentList from "../CommentList/CommentList";
import CommentForm from "../CommentForm/CommentForm";
import SingleProductCard from "../SingleProductCard/SingleProductCard";

function SingleProduct() {
	const [product, setProduct] = useState("");
	const [isLoading, setIsLoading] = useState(true);
	const { id } = useParams();

	useEffect(() => {
		axios
			.get(`http://localhost:4000/api/allproducts/product/${id}`)
			.then(({ data }) => {
				setProduct(data);
				setIsLoading(false);
			})
			.catch((err) => console.log(err));
	}, [id]);

	return (
		<div className='main-wrapper'>
			<SingleProductCard isLoading={isLoading} productData={product} id={id} />
			<CommentForm isLoading={isLoading} product_id={id} />
			<CommentList isLoading={isLoading} product_id={id} />
		</div>
	);
}

export default SingleProduct;
