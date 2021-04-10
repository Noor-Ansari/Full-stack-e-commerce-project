import React, {useState, useEffect } from 'react'
import Products from '../Products/Products';
import {useParams} from "react-router-dom";
import axios from 'axios';

function CategoriesPage() {
    const [products, setProducts] = useState([])
    const {category} = useParams()
   
    useEffect(() => {
        axios.get(`http://localhost:4000/api/allproducts/${category}`)
        .then(({data}) => setProducts(data))
        .catch((err) => console.log(err))
    }, [category])

    return (
        <>
            <Products products={products}/>
        </>
    )
}

export default CategoriesPage;
