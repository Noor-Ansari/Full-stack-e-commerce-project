import React, { useState, useEffect } from "react";
import Products from "../Products/Products";
import axios from "axios";
import Loader from "react-loader-spinner";
import "./HomePage.css";

function HomePage() {
	const [products, setProducts] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		axios
			.get("http://localhost:4000/api/allproducts/")
			.then(({ data }) => {
				setTimeout(() => {
					setProducts(data);
					setIsLoading(false);
				}, 1000);
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
				<Products products={products} />
			)}
		</>
	);
}

export default HomePage;
