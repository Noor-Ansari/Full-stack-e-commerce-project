import "./Products.css";
import React  from "react";
import { Link } from "react-router-dom";

function Products({ products }) {
	return (
		<div className='product-row'>
			{products &&
				products.map((product) => (
					<div className='product-card' key={product._id}>
						<img
							src={`data:image/jpeg;base64,${product.image}`}
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

export default Products;
