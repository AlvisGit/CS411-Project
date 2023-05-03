import React, { useEffect, useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { Link } from 'react-router-dom';
import { auth, firestore } from '../utils/firebase';


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
      <Link to={`/`}>
            <button>Home</button>
      </Link>
      <section className="recipe-section">
        {favorites.map(recipe => (
          <div key={recipe.id}>
            <h1>{recipe.title}</h1>
            <img src={recipe.image} alt={recipe.title} />
            <Link to={`/recipe/${recipe.id}`}>
                      <button>View Recipe</button>
            </Link>
          </div>
        ))}
      </section>
      </ul>
    </div>
  );
}

export default Favorites;
