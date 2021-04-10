import React, {useState, useEffect} from 'react';
import Products from "../Products/Products";
import axios from 'axios';

function HomePage() {
    const [ products, setProducts ]  = useState([]);
   
    useEffect(() => {
        axios.get("http://localhost:4000/api/allproducts/")
        .then(( { data })  => setProducts(data))
        .catch(err => console.log(err))
      }, [])

    return (
        <>
            <Products products = {products}/>
        </>
    )
}

export default HomePage;
