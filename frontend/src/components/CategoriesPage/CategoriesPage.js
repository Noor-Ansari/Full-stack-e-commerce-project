import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { addProducts } from "../../redux/actionCreators";
import Products from "../Products/Products";
import axios from "axios";
import "./CategoriesPage.css";

function CategoriesPage({ addProducts }) {
	const [isLoading, setIsLoading] = useState(true);
	const { category } = useParams();
	const history = useHistory();

	useEffect(() => {
		axios
			.get(`http://localhost:4000/api/allproducts/${category}`)
			.then(({ data }) => {
				if (data.info) {
					alert(`${data.info}`);
					history.push("/");
				} else {
					addProducts(data);
				}
				setIsLoading(false);
			})
			.catch((err) => console.log(err));
		return () => {
			setIsLoading(true);
		};
	}, [category]);

	return <Products isLoading={isLoading} />;
}

const mapDispatchToProps = (dispatch) => {
	return {
		addProducts: (products) => dispatch(addProducts(products)),
	};
};

export default connect(null, mapDispatchToProps)(CategoriesPage);
