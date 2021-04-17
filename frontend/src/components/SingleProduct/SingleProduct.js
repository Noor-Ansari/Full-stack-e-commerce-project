import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./SingleProduct.css";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import Loader from "react-loader-spinner";
import CommentList from "../CommentList/CommentList";
import CommentForm from "../CommentForm/CommentForm";

function SingleProduct({user, setUser}) {
	const [product, setProduct] = useState("");
	const [isLoading, setIsLoading] = useState(true);
	const { id } = useParams();
	
	useEffect(() => {
		axios
			.get(`http://localhost:4000/api/allproducts/product/${id}`)
			.then(({ data }) => {
				setTimeout(() => {
					setProduct(data);
					setIsLoading(false);
				}, 100);
			})
			.catch((err) => console.log(err));
	}, [id]);

	const addToCart = () => {
		if (user._id){
			axios
			.post(`http://localhost:4000/api/addtocart`, {
				product_id: id,
				user_id : user._id
			})
			.then(({ data }) => {
				console.log(data)
			})
			.catch((err) => console.log(err));
		}else{
			alert("You need to login first.")
		}
	};

	return (
		<>
			{isLoading ? (
				<div className='loading-spinner'>
					<Loader type='Oval' color='#fff' height={100} width={100} />
				</div>
			) : (
				<div className='main-wrapper'>
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
									<button className='product-button' onClick={addToCart}>
										Add to cart
									</button>
								</div>
							</div>
						</div>
					</div>
					<CommentForm product_id={id} />
					<CommentList product_id={id} />
				</div>
			)}
		</>
	);
}

export default SingleProduct;
