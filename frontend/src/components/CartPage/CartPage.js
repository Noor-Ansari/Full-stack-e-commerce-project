import "./CartPage.css";
import React, { useState } from "react";

function CartPage({ user, setUser }) {
	const [cartProducts, setCartProducts] = useState([]);

	return (
		<>
			{cartProducts.map((product) => (
				<h1>{product.name}</h1>
			))}
		</>
	);
}

export default CartPage;
