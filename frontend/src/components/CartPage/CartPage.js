import "./CartPage.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import CartItem from "../CartItem/CartItem";

function CartPage({ user, setUser }) {
	const [cartProducts, setCartProducts] = useState([]);
	
	useEffect(() => {
		axios.get(`http://localhost:4000/api/getcart/${user._id}`)
		.then(({data}) => setCartProducts(data.products))
		.catch((err) => console.log(err))
	}, [])

	return (
		<>
			{
				cartProducts.map((cartProduct) => (
					<CartItem  product = {cartProduct.product_id} quantity = {cartProduct.quantity} />
				))
			}
		</>
	);
}

export default CartPage;
