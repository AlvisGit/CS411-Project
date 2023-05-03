import React, {useEffect, useState } from 'react'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import { auth, firestore } from '../utils/firebase';


function Home() {
    const [user] = useAuthState(auth);
    const [ingredients, setIngredients] = useState("");
    const [numRecipes, setnumRecipes] = useState("");
  
    function handleIngredientsChange(e  ) {
      setIngredients(e.target.value);
    }
    function handleChangeNum(e) {
      setnumRecipes(e.target.value);
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
          <Link to={`/search-results/${encodeURIComponent(ingredients)}/${numRecipes}`}>
            <button>Get Recipes</button>
          </Link>
          <Link to={`/favorites`}>
            <button>View Favorites</button>
          </Link>
        </section>
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