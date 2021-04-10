import './App.css';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import Layout from './components/Layout/Layout';
import Products from "./components/Products/Products"

function App() {
  return (
    <Router>
      <Switch>
    <div className="App">
        <Layout>
          <Route path="/">
                <Products/>
              </Route>
            <Route path="/:category">
              <Products/>
            </Route>
         </Layout> 
    </div>
    </Switch>
    </Router>
  );
}

export default App;
