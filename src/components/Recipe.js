import React, { useState } from "react";
import RecipeDataService from "../services/RecipeService";

const Recipe = (props) => {
  const initialRecipeState = {
    key: null,
    title: "",
    ingredient: "",
    recipe: "",
    image: ""
  };
  const [currentRecipe, setCurrentRecipe] = useState(initialRecipeState);
  const [message, setMessage] = useState("");

  const { recipe } = props;
  if (currentRecipe.key !== recipe.key) {
    setCurrentRecipe(recipe);
    setMessage("");
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentRecipe({ ...currentRecipe, [name]: value });
    console.log(currentRecipe)
  };

  const updateRecipe = () => {
    const data = {
      title: currentRecipe.title,
      ingredient: currentRecipe.ingredient,
      recipe: currentRecipe.recipe,
      image: currentRecipe.image
    };

    RecipeDataService.update(currentRecipe.key, data)
      .then(() => {
        setMessage("The recipe was updated successfully!");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const deleteRecipe = () => {
    RecipeDataService.remove(currentRecipe.key)
      .then(() => {
        props.refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentRecipe ? (
        <div className="edit-form">
          <h4>Recipe</h4>
          <form>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={currentRecipe.title}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="ingredient">Ingredient</label>
              <input
                type="text"
                className="form-control"
                id="ingredient"
                name="ingredient"
                value={currentRecipe.ingredient}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="recipe">Recipe</label>
              <input
                type="text"
                className="form-control"
                id="recipe"
                name="recipe"
                value={currentRecipe.recipe}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <img src={currentRecipe.image}  alt="description of image" />
            </div>
          </form>
          <button className="badge badge-danger mr-2" onClick={deleteRecipe}>
            Delete
          </button>

          <button
            type="submit"
            className="badge badge-success"
            onClick={updateRecipe}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Recipe for details...</p>
        </div>
      )}
    </div>
  );
};

export default Recipe;