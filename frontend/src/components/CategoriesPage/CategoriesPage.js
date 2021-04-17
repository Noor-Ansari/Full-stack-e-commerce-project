import React, { useState, useEffect } from "react";
import Products from "../Products/Products";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loader from "react-loader-spinner";
import "./CategoriesPage.css";

function CategoriesPage() {
	const [products, setProducts] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const { category } = useParams();

	useEffect(() => {
		axios
			.get(`http://localhost:4000/api/allproducts/${category}`)
			.then(({ data }) => {
				setTimeout(() => {
					setProducts(data);
					setIsLoading(false);
				}, 100);
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
				<Products products={products} />
			)}
		</>
	);
}

export default CategoriesPage;
