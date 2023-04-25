import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function Recipe() {
  const { rid } = useParams();
  const [recipe, setRecipe] = useState(null);
  useEffect(() => {
    axios.get(`http://localhost:8000/api/recipes/${rid}`)
      .then(response => {
        setRecipe(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [rid]);
  if (!recipe) {
    return <div>Loading... Please wait</div>;
  }

  return (
    <div>
      <h1>{recipe.title}</h1>
      <img src={recipe.image} alt={recipe.title} />
      <h2>Ingredients:</h2>
      <ul>
        {recipe.extendedIngredients.map(ingredient => (
          <li key={ingredient.id}>{ingredient.original}</li>
        ))}
      </ul>
      <h2>Instructions:</h2>
      <div dangerouslySetInnerHTML={{ __html: recipe.instructions }} />
    </div>
  );
}

export default Recipe;