import React, { useState, useEffect } from "react";
import Products from "../Products";
import axios from "axios";
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

	return <Products isLoading={isLoading} />;
}

const mapDispatchToProps = (dispatch) => {
	return {
		addProducts: (products) => dispatch(addProducts(products)),
	};
};

export default connect(null, mapDispatchToProps)(HomePage);
