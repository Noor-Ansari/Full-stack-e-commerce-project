import "./CartPage.css";
import React, { useEffect } from "react";
import axios from "axios";
import CartItem from "../CartItem/CartItem";
import CartSummary from "../CartSummary/CartSummary";
import { connect } from "react-redux";
import { addCart } from "../../redux/actionCreators";
import { Link } from "react-router-dom";

function CartPage({ user, cart, addCart }) {
	useEffect(() => {
		axios
			.get(`http://localhost:4000/api/getcart/${user._id}`)
			.then(({ data }) => addCart(data.products))
			.catch((err) => console.log(err));
	}, [user, addCart]);

	return (
		<div className='cart-items-wrapper'>
			{user ? (
				cart.length ? (
					<>
						<div className='cart-items-list'>
							<h3 className='cart-heading'>Your cart ({cart.length})</h3>
							{cart.map((cartProduct) => (
								<CartItem
									key={cartProduct._id}
									product={cartProduct.product_id}
									quantity={cartProduct.quantity}
								/>
							))}
						</div>
						<CartSummary cartProducts={cart} />
					</>
				) : (
					<div className='notification'>
						<h1 className='empty-cart-notification'>You cart is empty</h1>
						<Link to='/' className='home-link'>
							Add products
						</Link>
					</div>
				)
			) : (
				<div className='notification'>
					<h1 className='empty-cart-notification'>Sign in to view your cart</h1>
					<Link to='/signin' className='home-link'>
						Sign in
					</Link>
				</div>
			)}
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		user: state.user,
		cart: state.cart,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		addCart: (cart) => dispatch(addCart(cart)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(CartPage);
