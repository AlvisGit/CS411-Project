import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function Recipe() {
  const { rid } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [videoId, setVideoId] = useState(null);
  useEffect(() => {
    axios.get(`http://localhost:8000/api/recipes/${rid}`)
      .then(response => {
        setRecipe(response.data);
        axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${encodeURIComponent(response.data.title)}&key=AIzaSyDYj8nEVypQPyWGz9sXs12nAhUGDhwShGI`)
          .then(response => {
            console.log(response);
            setVideoId(response.data.items[0].id.videoId);
          })
          .catch(error => {
            console.log(error);
          });
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
      {videoId && (
        <div>
          <h2>Video:</h2>
          <iframe width="560" height="315" src={`https://www.youtube.com/embed/${videoId}`} title={recipe.title} allowFullScreen></iframe>
        </div>
      )}
    </div>
  );
}


export default Recipe;