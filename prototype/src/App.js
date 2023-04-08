import './App.css';
import React, { useState } from "react";

function App() {
  const [recipeData, setrecipeData] = useState([]);
  const [ingredients, setIngredients] = useState("");
  const [numRecipes, setnumRecipes] = useState("");

  function handleIngredientsChange(e) {
    setIngredients(e.target.value);
  }
  function handleChangeNum(e) {
    setnumRecipes(e.target.value);
  }

  function getrecipeData() {
    fetch(
      `http://localhost:8000/recipes?ingredients=${encodeURIComponent(ingredients)}&numRecipes=${numRecipes}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setrecipeData(data);
      })
      .catch(() => {
        console.log("error");
      });
  }

  return (
    <div className="App">
      <section>
        <input
          type="text"
          placeholder="Search Ingredients"
          onChange={handleIngredientsChange}
        />
        <input
          type="text"
          placeholder="Number of Recipes"
          onChange={handleChangeNum}
        />
        <button onClick={getrecipeData}>Get Recipes</button>
      </section>
      {recipeData.map(recipe => (
        <div key={recipe.id}>
          <h1>{recipe.title}</h1>
          <img src={recipe.image}/>
          <h5>Used Ingredients: {recipe.usedIngredientCount} Missing Ingredients: {recipe.missedIngredientCount}</h5>
        </div>
      ))}
    </div>
  );
}

export default App;