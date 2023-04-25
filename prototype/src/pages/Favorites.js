import React, { useEffect, useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { Link } from 'react-router-dom';

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
const firestore = firebase.firestore();

function Favorites() {
  const [user] = useAuthState(auth);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (user) {
      const favoritesRef = firestore.collection('favorites').doc(user.uid);
      favoritesRef.get()
        .then(doc => {
            if (doc.exists) {
                const favorites = [];
                for (const key in doc.data()) {
                    const recipe = doc.data()[key];
                    recipe.id = key; // Add the key to the recipe object
                    favorites.push(recipe)
                }
                setFavorites(favorites);
                console.log(favorites);
            }})
        .catch(error => {
            console.log(error);
      });
    }
  }, [user]);

  if (!user) {
    return <div>You need to sign in to view your favorites.</div>;
  }

  if (favorites.length === 0) {
    return <div>You haven't favorited any recipes yet.</div>;
  }

  return (
    <div>
      <h1>Your Favorites</h1>
      <ul>
        {favorites.map(recipe => (
          <li key={recipe.id}>
            <h2>{recipe.title}</h2>
            <img src={recipe.image} alt={recipe.title} />
            <Link to={`/recipe/${recipe.id}`}>
                      <button>View Recipe</button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Favorites;
