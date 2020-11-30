import logo from './logo.svg';
import './App.css';
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import AddRecipe from "./components/AddRecipe";
import RecipesList from "./components/RecipesList";


function App() {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/recipes" className="navbar-brand">
          AIM
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/recipes"} className="nav-link">
              Recipes
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/add"} className="nav-link">
              Add
            </Link>
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <h2>Remember Your Recipes</h2>
        <Switch>
          <Route exact path={["/", "/recipes"]} component={RecipesList} />
          <Route exact path="/add" component={AddRecipe} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
