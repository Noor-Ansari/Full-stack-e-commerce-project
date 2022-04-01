import React, { useState } from "react";
import WithLoading from "../../HOC/WithLoading";
import "./SingleProductCard.css";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import Modal from "../Modal";

function SingleProductCard({ productData, user, id }) {
	const { name, price, description, image } = productData;
	const [modal, setModal] = useState(false);
	const [modalText, setModaltext] = useState("");

	const addToCart = () => {
		if (user) {
			axios
				.post(`http://localhost:4000/api/addtocart`, {
					product_id: id,
					user_id: user._id,
				})
				.then(() => {
					setModaltext(`${name} added to cart`);
					setModal(true);
				})
				.catch((err) => console.log(err));
		} else {
			setModaltext("You need to login first.");
			setModal(true);
		}
	};

	return (
		<>
			{modal && <Modal modalText={modalText} setModal={setModal} />}
			<div className='card-wrapper'>
				<Link to='/' className='main-link'>
					<ArrowBackIosIcon /> Back to home
				</Link>
				<div className='product-wrapper'>
					<img
						src={`http://localhost:4000/${image}`}
						alt={name}
						className='product-image '
					/>
					<div className='product-details'>
						<h1 className='product-name'>{name}</h1>
						<p className='product-price'>${price}.00</p>
						<small className='product-description'>{description}</small>
						<div className='product-links'>
							<button className='product-button'>Buy now</button>
							<button className='product-button' onClick={addToCart}>
								Add to cart
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

const mapStateToProps = (state) => {
	return {
		user: state.user,
	};
};

export default WithLoading(connect(mapStateToProps)(SingleProductCard));
