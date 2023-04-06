import './App.css';
import React, { useState } from "react";

function App() {
  const [recipeData, setrecipeData] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [numRecipes, setnumRecipes] = useState("");

  function handleChange(e) {
    setIngredients(e.target.value);
  }
  function handleChangeNum(e) {
    setnumRecipes(e.target.value);
  }

  function getrecipeData() {
    fetch(
      `https://api.spoonacular.com/recipes/findByIngredients?apiKey=a20214d2d06948209c5294fc65a0bcc8&ingredients=${ingredients}&number=${numRecipes}&ranking=1`
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
          onChange={handleChange}
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