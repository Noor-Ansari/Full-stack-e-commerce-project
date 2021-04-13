import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";
import CategoriesPage from "./components/CategoriesPage/CategoriesPage";
import SingleProduct from "./components/SingleProduct/SingleProduct";
import SignInPage from "./components/SignInPage/SignInPage";
import Navbar from "./components/Navbar/Navbar";
import React, {useState} from "react";

function App() {
	const [user, setUser] = useState(JSON.parse(sessionStorage.getItem('user')));
	return (
		<Router>
			<div className='App'>
					<Switch>
						<Route path='/allproducts/product/:id'>
						<Navbar user={user} />
							<SingleProduct />
						</Route>
						<Route path='/allproducts/:category'>
						<Navbar user={user} />
							<CategoriesPage />
						</Route>
						<Route path='/signin'>
							<SignInPage setUser={setUser} />
						</Route>
						<Route path='/'>
						<Navbar user={user} />
							<HomePage />
						</Route>
					</Switch>
			</div>
		</Router>
	);
}

export default App;
