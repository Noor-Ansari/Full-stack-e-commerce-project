import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";
import CategoriesPage from "./components/CategoriesPage/CategoriesPage";
import SingleProduct from "./components/SingleProduct/SingleProduct";
import SignInPage from "./components/SignInPage/SignInPage";
import Navbar from "./components/Navbar/Navbar";
import React, {useState} from "react";
import CartPage from "./components/CartPage/CartPage";

function App() {
	return (
		<Router>
			<div className='App'>
					<Switch>
						<Route path='/allproducts/product/:id'>
						<Navbar />
							<SingleProduct />
						</Route>
						<Route path='/allproducts/:category'>
						<Navbar  />
							<CategoriesPage />
						</Route>
						<Route path='/signin'>
							<SignInPage  />
						</Route>
						<Route path='/user/cart'>
							<CartPage />
						</Route>
						<Route path='/'>
						<Navbar/>
							<HomePage />
						</Route>
					</Switch>
			</div>
		</Router>
	);
}

export default App;
