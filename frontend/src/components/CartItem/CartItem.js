import React from "react";
import "./CartItem.css";

function CartItem({ product, quantity }) {
	return (
		<div className='cart-product-card'>
			<div className='left-cart'>
				<img
					src={`data:image/jpeg;base64,${product.image}`}
					alt={product.name}
					className='cart-product-image'
				/>
			</div>
			<div className='right-cart'>
				<h3 className='cart-product-name'>{product.name}</h3>
				<p className='cart-product-description'>{product.description}</p>
				<p className='cart-product-price'>Quantity{quantity}</p>
				<div className='cart-product-links'>
					<button className='cart-product-button'>Remove from cart</button>
					<button className='cart-product-button' >
						Buy Now
					</button>
				</div>
			</div>
		</div>
	);
}

export default CartItem;
