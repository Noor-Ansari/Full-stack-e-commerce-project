import "./CartSummary.css";

import React from "react";

function CartSummary({ cartProducts }) {
	
    const getTotal = (cart) => {
		const productsTotal = cart.map(
			(product) => product.quantity * product.product_id.price
		);
		const grandTotal = productsTotal.reduce(
			(total, current) => total + current
		);
		return grandTotal;
	};

	const total = cartProducts.length ? getTotal(cartProducts) : [""];
	const delivery = 0;
	return (
		<div className='cart-summary-wrapper'>
			<h1>Summary</h1>
			<p>Subtotal : ${total}</p>
			<p>Delivery : ${delivery}</p>
			<p>Total : ${total + delivery}</p>
            <button className="simple-button">Checkout</button>
            <button className="paytm-button">Checkout with Paytm</button>
		</div>
	);
}

export default CartSummary;
