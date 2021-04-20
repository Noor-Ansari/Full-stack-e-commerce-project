import "./CartPage.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import CartItem from "../CartItem/CartItem";
import CartSummary from "../CartSummary/CartSummary";

function CartPage({ user, setUser }) {
	const [cartProducts, setCartProducts] = useState([]);
	useEffect(() => {
		axios
			.get(`http://localhost:4000/api/getcart/${user._id}`)
			.then(({ data }) => setCartProducts(data.products))
			.catch((err) => console.log(err));
	}, []);
	return (
		<div className='cart-items-wrapper'>
			<div className='cart-items-list'>
				<h3 className='cart-heading'>Your cart ({cartProducts.length})</h3>
				{cartProducts.map((cartProduct) => (
					<CartItem
					key = {cartProduct._id}
						product={cartProduct.product_id}
						quantity={cartProduct.quantity}
					/>
				))}
			</div>
			<CartSummary cartProducts={cartProducts} />
		</div>
	);
}

export default CartPage;
