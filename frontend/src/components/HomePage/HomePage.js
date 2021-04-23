import React, { useState, useEffect } from "react";
import Products from "../Products/Products";
import axios from "axios";
import Loader from "react-loader-spinner";
import "./HomePage.css";
import { addProducts } from "../../redux/actionCreators";
import { connect } from "react-redux";

function HomePage({ addProducts }) {
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		axios
			.get("http://localhost:4000/api/allproducts/")
			.then(({ data }) => {
				addProducts(data);
				setIsLoading(false);
			})
			.catch((err) => console.log(err));
	}, []);

	return (
		<>
			{isLoading ? (
				<div className='loading-spinner'>
					<Loader type='Oval' color='#fff' height={100} width={100} />
				</div>
			) : (
				<Products />
			)}
		</>
	);
}

const mapDispatchToProps = (dispatch) => {
	return {
		addProducts: (products) => dispatch(addProducts(products)),
	};
};

export default connect(null, mapDispatchToProps)(HomePage);
