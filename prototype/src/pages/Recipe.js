import React, { useState } from 'react'

function Recipe() {
    const path = window.location.pathname;
    const rid = path.split("/")[2];
    const [recipeData, setrecipeData] = useState([]);
    const nutrition = false;

    function getrecipeData() {
        fetch(
          `http://localhost:8000/recipe/recipeid=${rid}/nutrition=${nutrition}?`
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
    <div>
        <button onClick={getrecipeData}>Get Recipe</button>




    </div>
  )
}

export default Recipe