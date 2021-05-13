import "./Products.css";
import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import WithLoading from "../../HOC/WithLoading";

function Products({ products }) {
	return (
		<div className='product-row'>
			{products &&
				products.map((product) => (
					<div className='product-card' key={product._id}>
						<img
							src={`http://localhost:4000/${product.image}`}
							alt={product.name}
							className='card-image'
						/>
						<div className='card-text'>{product.name}</div>
						<Link
							to={`/allproducts/product/${product._id}`}
							className='card-link'
						>
							Learn more{" "}
						</Link>
					</div>
				))}
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		products: state.products,
	};
};

export default WithLoading(connect(mapStateToProps)(Products));
