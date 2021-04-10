import './App.css';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import Layout from './components/Layout/Layout';
import HomePage from './components/HomePage/HomePage';
import CategoriesPage from './components/CategoriesPage/CategoriesPage';
import SingleProduct from "./components/SingleProduct/SingleProduct"

function App() {
  return (
    <Router>
    <div className="App">
        <Layout>
        <Switch>
        <Route path="/allproducts/product/:id">
             <SingleProduct/>
            </Route>
            <Route path="/allproducts/:category">
              <CategoriesPage/>
            </Route>
            <Route path="/">
                <HomePage/>
              </Route>
            </Switch>
         </Layout> 
    </div>
    </Router>
  );
}

export default App;
