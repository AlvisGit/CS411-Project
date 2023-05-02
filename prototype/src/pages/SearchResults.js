import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function SearchResults() {
  const { ingredients, numRecipes } = useParams()
  const [recipeData, setRecipeData] = useState([]);

  useEffect(() => {
      fetch(
        `http://localhost:8000/search-results?ingredients=${encodeURIComponent(ingredients)}&numRecipes=${numRecipes}`
      )
        .then((res) => res.json())
        .then((data) => {
          console.log("test seach");
          setRecipeData(data);
        })
        .catch(() => {
          console.log("error");
        });
  }, [ingredients, numRecipes]);

  return (
    <div>
    <Link to={`/`}>
        <button>Home</button>
    </Link>
    <Link to={`/favorites`}>
        <button>View Favorites</button>
    </Link>
      {recipeData.length > 0 ? (
        <section className="recipe-section">
          {recipeData.map((recipe) => (
            <div key={recipe.id}>
              <h1>{recipe.title}</h1>
              <img src={recipe.image} alt={recipe.title} />
              <h5>
                Used Ingredients: {recipe.usedIngredientCount} Missing
                Ingredients: {recipe.missedIngredientCount}
              </h5>
              <Link to={`/recipe/${recipe.id}`}>
                <button>View Recipe</button>
              </Link>
            </div>
          ))}
        </section>
      ) : (
        <div>No Results Found</div>
      )}
    </div>
  );
}

export default SearchResults;
