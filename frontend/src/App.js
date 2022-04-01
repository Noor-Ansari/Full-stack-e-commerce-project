import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import CategoriesPage from "./components/CategoriesPage";
import SingleProductPage from "./components/SingleProductPage";
import Layout from "./components/Layout";
import React from "react";
import CartPage from "./components/CartPage";
import LogInForm from "./components/forms/LogIn";
import RegisterForm from "./components/forms/Register";

function App() {
	return (
		<Router>
			<div className='App'>
				<Switch>
					<Route path='/login'>
						<LogInForm />
					</Route>
					<Route path='/register'>
						<RegisterForm />
					</Route>
					<Layout>
						<Switch>
							<Route path='/allproducts/product/:id'>
								<SingleProductPage />
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
