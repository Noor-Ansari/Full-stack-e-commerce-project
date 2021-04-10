import "./Products.css";
import React, {useState, useEffect} from "react";
import axios from "axios";

function Products() {
  const [ products, setProducts ]  = useState([]);
  console.log("run")  
  
  useEffect(() => {
      axios.get("http://localhost:4000/allproducts")
      .then(( { data })  => setProducts(data))
      .catch(err => console.log(err))
    }, [])

  return (
          <div className="product-row">
              {products &&
                  products.map((product) => (
                  <div className="product-card" key={product._id}>
                      <img
                      src={`data:image/jpeg;base64,${product.image}`}
                      alt={product.name}
                      className="card-image"
                      />
                      <div className="card-text">
                          {product.name}
                      </div>
                      <button className="card-button">Learn more</button>
                  </div>
                  ))}
          </div>
  );
}

export default Products;
