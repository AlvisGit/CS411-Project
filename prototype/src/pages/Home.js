import React, {useState } from 'react'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import { auth, firestore } from '../firebase';

function Home() {
    const [user] = useAuthState(auth);
    const [recipeData, setrecipeData] = useState([]);
    const [ingredients, setIngredients] = useState("");
    const [numRecipes, setnumRecipes] = useState("");
  
    function handleIngredientsChange(e  ) {
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
        <header>
          <h1>Cookible</h1>
        </header>
        <section className="search-section">
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
    
          <Link to={`/favorites`}>
            <button>View Favorites</button>
          </Link>
        </section>
        {recipeData.length > 0 && (
          <section className="recipe-section">
            {recipeData.map(recipe => (
              <div key={recipe.id}>
                <h1>{recipe.title}</h1>
                <img src={recipe.image} alt={recipe.title} />
                <h5>Used Ingredients: {recipe.usedIngredientCount} Missing Ingredients: {recipe.missedIngredientCount}</h5>
                <Link to={`/recipe/${recipe.id}`}>
                  <button>View Recipe</button>
                </Link>
              </div>
            ))}
          </section>
        )}
        <SignOut />
      </div>
    );
  }

  function SignOut() {
    return auth.currentUser && (
      <button className="signout-button" onClick={() => auth.signOut()}>Sign Out</button>
    )
  }
  

export default Home