import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from "react-firebase-hooks/firestore";
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

function Recipe() {
  const { rid } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [videoId, setVideoId] = useState(null);
  const [favorited, setFavorited] = useState(false);
  const [user] = useAuthState(auth);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/recipes/${rid}`)
      .then(response => {
        setRecipe(response.data);
        axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${encodeURIComponent(response.data.title)}&key=AIzaSyDYj8nEVypQPyWGz9sXs12nAhUGDhwShGI`)
          .then(response => {
            setVideoId(response.data.items[0].id.videoId);
          })
          .catch(error => {
            console.log(error);
          });
      })
      .catch(error => {
        console.log(error);
      });

    if (user) {
      const favoriteRef = firestore.collection('favorites').doc(user.uid);
      favoriteRef.get()
        .then(doc => {
          if (doc.exists && doc.data()[rid]) {
            setFavorited(true);
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  }, [rid, user]);

  const handleFavorite = () => {
    if (!favorited) {
      const favoriteRef = firestore.collection('favorites').doc(user.uid);
      favoriteRef.set({
        [rid]: {
          title: recipe.title,
          image: recipe.image
        }
      }, { merge: true })
        .then(() => {
          setFavorited(true);
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      const favoriteRef = firestore.collection('favorites').doc(user.uid);
      favoriteRef.update({
        [rid]: firebase.firestore.FieldValue.delete()
      })
        .then(() => {
          setFavorited(false);
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  if (!recipe) {
    return <div>Loading... Please wait</div>;
  }

  return (
    <div>
       <Link to={`/`}>
              <button>Home</button>
      </Link>
      <h1>{recipe.title}</h1>
      <img src={recipe.image} alt={recipe.title} />
      <h2>Ingredients:</h2>
      <ul>
        {recipe.extendedIngredients.map(ingredient => (
          <li key={ingredient.id}>{ingredient.original}</li>
        ))}
      </ul>
      {user && (
        <button onClick={handleFavorite}>
          {favorited ? 'Unfavorite' : 'Favorite'}
        </button>
      )}

      <h2>Instructions:</h2>
      <div dangerouslySetInnerHTML={{ __html: recipe.instructions }} />
      {videoId && (
        <div>
          <h2>Video:</h2>
          <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${videoId}`}
            title={recipe.title}
            frameBorder="0"
            allowFullScreen
          />
        </div>
      )}
      
    </div>
  );
}

export default Recipe;



