import React, { useState, useEffect } from "react";
import Products from "../Products/Products";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loader from "react-loader-spinner";
import "./CategoriesPage.css";
import { connect } from "react-redux";
import { addProducts } from "../../redux/actionCreators";

function CategoriesPage({ addProducts }) {
	const [isLoading, setIsLoading] = useState(true);
	const { category } = useParams();

	useEffect(() => {
		axios
			.get(`http://localhost:4000/api/allproducts/${category}`)
			.then(({ data }) => {
				addProducts(data);
				setIsLoading(false);
			})
			.catch((err) => console.log(err));
	}, [category]);

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

export default connect(null, mapDispatchToProps)(CategoriesPage);
