import axios from "axios";
import React from "react";
import "./CartItem.css";
import { connect } from "react-redux";
import { removeFromCart } from "../../redux/actionCreators";

function CartItem({ product, quantity, user, removeProduct }) {
	const removeFromCart = () => {
		axios
			.post("http://localhost:4000/api/removefromcart", {
				user_id: user._id,
				product_id: product._id,
			})
			.then(({ data }) => removeProduct(data.removedProduct))
			.catch((err) => console.log(err));
	};

	return (
		<div className='cart-product-card'>
			<div className='left-cart'>
				<img
					src={`http://localhost:4000/${product.image}`}
					alt={product.name}
					className='cart-product-image'
				/>
			</div>
			<div className='right-cart'>
				<h3 className='cart-product-name'>{product.name}</h3>
				<p className='cart-product-description'>{product.description}</p>
				<p className='cart-product-price'>
					<strong>Quantity :</strong>
					{quantity}
				</p>
				<div className='cart-product-links'>
					<button className='cart-product-button' onClick={removeFromCart}>
						Remove
					</button>
					<button className='cart-product-button'>Buy Now</button>
				</div>
			</div>
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		user: state.user,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		removeProduct: (removedProduct) => dispatch(removeFromCart(removedProduct)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(CartItem);
