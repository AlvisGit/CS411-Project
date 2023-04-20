import './App.css';
import React, { useState } from "react";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

import { useAuthState } from 'react-firebase-hooks/auth';


firebase.initializeApp({
  apiKey: "AIzaSyCrJ8pX1hkCL2RuqwUYmc_jU5F_3Qj_I1Q",
  authDomain: "cs411-recipe.firebaseapp.com",
  projectId: "cs411-recipe",
  storageBucket: "cs411-recipe.appspot.com",
  messagingSenderId: "675123654750",
  appId: "1:675123654750:web:e4fd3cc6b3ccef87df84cf",
  measurementId: "G-W4135JVBHB"
})

const auth = firebase.auth();

function App() {
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
      {user ? (
        <>
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
          {recipeData.length > 0 && (
            <section>
              {recipeData.map(recipe => (
                <div key={recipe.id}>
                  <h1>{recipe.title}</h1>
                  <img src={recipe.image}/>
                  <h5>Used Ingredients: {recipe.usedIngredientCount} Missing Ingredients: {recipe.missedIngredientCount}</h5>
                </div>
              ))}
            </section>
          )}
        </>
      ) : (
        <SignIn />
      )}
      {console.log(user ? user.uid : "No user")}
      {user && <SignOut />}
    </div>
  );
}

function SignIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
    
  }

  return (
    <button onClick={signInWithGoogle}>Sign in with Google</button>
  )
}

function SignOut() {
  return auth.currentUser && (
    <button onClick={() => auth.signOut()}>Sign Out</button>
  )
}


export default App;