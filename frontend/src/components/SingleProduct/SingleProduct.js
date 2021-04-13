import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./SingleProduct.css";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import Loader from "react-loader-spinner";
import CommentList from "../CommentList/CommentList";
import CommentForm from "../CommentForm/CommentForm";

function SingleProduct() {
	const [product, setProduct] = useState("");
	const [isLoading, setIsLoading] = useState(true);
	const [comments,  setComments] = useState([])
	const { id } = useParams();

	useEffect(() => {
		axios
			.get(`http://localhost:4000/api/allproducts/product/${id}`)
			.then(({ data }) => {
				setTimeout(() => {
					setProduct(data.product);
					setComments(data.comments)
					setIsLoading(false);	
				}, 1000);
			})
			.catch((err) => console.log(err));
	}, [id]);

	return (
		<>
			{isLoading ? (
				<div className='loading-spinner'>
					<Loader type='Oval' color='#fff' height={100} width={100} />
				</div>
			) : (
				<div className="main-wrapper">
				<div className='card-wrapper'>
					<Link to='/' className='main-link'>
						<ArrowBackIosIcon /> Back to home
					</Link>
					<div className='product-wrapper'>
						<img
							src={`data:image/jpeg;base64,${product.image}`}
							alt={product.name}
							className='product-image '
						/>
						<div className='product-details'>
							<h1 className='product-name'>{product.name}</h1>
							<p className='product-price'>${product.price}.00</p>
							<small className='product-description'>
								{product.description}
							</small>
							<div className='product-links'>
								<button className='product-button'>Buy now</button>
								<button className='product-button'>Add to cart</button>
							</div>
						</div>
					</div>
				</div>
				<CommentForm product_id = {id} />
				{comments && <CommentList comments={comments }/>}
				</div>
			)}
		</>
	);
}

export default SingleProduct;
