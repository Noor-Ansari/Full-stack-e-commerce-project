import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";
import CategoriesPage from "./components/CategoriesPage/CategoriesPage";
import SingleProduct from "./components/SingleProduct/SingleProduct";
import SignInPage from "./components/SignInPage/SignInPage";
import Layout from "./components/Layout/Layout";
import React from "react";
import CartPage from "./components/CartPage/CartPage";

function App() {
	return (
		<Router>
			<div className='App'>
				<Switch>
					<Route path='/signin'>
						<SignInPage />
					</Route>
					<Layout>
						<Switch>
							<Route path='/allproducts/product/:id'>
								<SingleProduct />
							</Route>
							<Route path='/allproducts/:category'>
								<CategoriesPage />
							</Route>
							<Route path='/user/cart'>
								<CartPage />
							</Route>
							<Route path='/'>
								<HomePage />
							</Route>
						</Switch>
					</Layout>
				</Switch>
			</div>
		</Router>
	);
}

export default App;
