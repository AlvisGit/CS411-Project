import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function SearchResults() {
  const { ingredients, numRecipes } = useParams()
  const [recipeData, setRecipeData] = useState([]);
  const [resultsLoaded, setResultsLoaded] = useState(false);

  useEffect(() => {
      fetch(
        `http://localhost:8000/search-results?ingredients=${encodeURIComponent(ingredients)}&numRecipes=${numRecipes}`
      )
        .then((res) => res.json())
        .then((data) => {
          console.log("test seach");
          setRecipeData(data);
          setResultsLoaded(true);
        })
        .catch(() => {
          console.log("error");
        });
  }, [ingredients, numRecipes]);

  return (
    <div>
      <div className="button-row">
        <Link to={`/`}>
          <button className="home-button">Home</button>
        </Link>
        <div style={{ width: "20px" }}></div>
        <Link to={`/favorites`}>
          <button className="home-button">View Favorites</button>
        </Link>
      </div>
      {resultsLoaded && recipeData.length === 0 ? (
        <div>No Results Found</div>
      ) : (
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
      )}
    </div>
  );
}

export default SearchResults;
