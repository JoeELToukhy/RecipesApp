import React, { useState, useEffect } from "react";
import RecipeDataService from "../services/RecipeService";
import Recipe from "./Recipe";

const RecipesList = () => {
  const [recipes, setRecipes] = useState([]);
  const [currentRecipe, setCurrentRecipe] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);

  const onDataChange = (items) => {
    let recipes = [];

    items.forEach((item) => {
      let key = item.key;
      let data = item.val();
      console.log(data)
      recipes.push({
        key: key,
        title: data.title,
        ingredient: data.ingredient,
        recipe: data.recipe,
        image: data.image
      });
    });

    setRecipes(recipes);
    console.log(recipes)
  };

  useEffect(() => {
    RecipeDataService.getAll().on("value", onDataChange);

    return () => {
      RecipeDataService.getAll().off("value", onDataChange);
    };
  }, []);

  const refreshList = () => {
    setCurrentRecipe(null);
    setCurrentIndex(-1);
  };

  const setActiveRecipe = (recipo, index) => {
    const { title, ingredient, recipe, image } = recipo;

    setCurrentRecipe({
      key: recipo.key,
      title,
      ingredient,
      recipe,
      image
    });

    setCurrentIndex(index);
  };

  const removeAllRecipes = () => {
    RecipeDataService.removeAll()
      .then(() => {
        refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className="list row">
      <div className="col-md-6">
        <h4>Recipes List</h4>

        <ul className="list-group">
          {recipes.map((recipe, index) => (
            <li
              className={"list-group-item " + (index === currentIndex ? "active" : "")}
              onClick={() => setActiveRecipe(recipe, index)}
              key={index}
            >
              {recipe.title}
            </li>
          ))}
        </ul>

        <button
          className="m-3 btn btn-sm btn-danger"
          onClick={removeAllRecipes}
        >
          Remove All
        </button>
      </div>
      <div className="col-md-6">
        {currentRecipe ? (
          <Recipe recipe={currentRecipe} refreshList={refreshList} />
        ) : (
          <div>
            <br />
            <p>Please click on a Recipe...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipesList;