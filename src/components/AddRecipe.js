import React, { useState } from "react";
import RecipeDataService from "../services/RecipeService";

const AddRecipe = () => {
  const initiaRecipeState = {
    title: "",
    ingredient: "",
    recipe:"",
    image:""
  };
  const [recipe, setRecipe] = useState(initiaRecipeState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    if (name == "image") {
        let imagePrev = URL.createObjectURL(event.target.files[0])
        setRecipe({ ...recipe, [name]: imagePrev });

    } else {
        setRecipe({ ...recipe, [name]: value });
    }
  };

  const saveRecipe = () => {
    var data = {
      title: recipe.title,
      ingredient: recipe.ingredient,
      recipe: recipe.recipe,
      image: recipe.image,
    };
    console.log(data)

    RecipeDataService.create(data)
      .then(() => {
        setSubmitted(true);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newRecipe = () => {
    setRecipe(initiaRecipeState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newRecipe}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              required
              value={recipe.title}
              onChange={handleInputChange}
              name="title"
            />
          </div>

          <div className="form-group">
            <label htmlFor="ingredient">Ingredient</label>
            <input
              type="text"
              className="form-control"
              id="ingredient"
              required
              value={recipe.ingredient}
              onChange={handleInputChange}
              name="ingredient"
            />
          </div>

          <div className="form-group">
            <label htmlFor="recipe">Recipe</label>
            <input
              type="text"
              className="form-control"
              id="recipe"
              required
              value={recipe.recipe}
              onChange={handleInputChange}
              name="recipe"
            />
          </div>

          <div className="form-group">
            <label htmlFor="image">Image of the dish</label>
            <input
              type="file"
              className="form-control"
              id="image"
              required
            //   value={recipe.image}
              onChange={handleInputChange}
              name="image"
            />
          </div>

          <button onClick={saveRecipe} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddRecipe;