const PORT = 8000
const express = require('express')
const cors = require('cors')
const axios = require('axios')
require('dotenv').config()

const app = express()

app.use(cors())

app.get('/', (req,res) => {
    res.json('hi')
})

app.get('/search-results', (req, res) => {
  const passedIngredients = req.query.ingredients;
  const passedNumRecipes = req.query.numRecipes;

  axios.get(`https://api.spoonacular.com/recipes/findByIngredients?apiKey=${process.env.REACT_APP_API_KEY}&ingredients=${passedIngredients}&number=${passedNumRecipes}&ranking=1`)
    .then(response => {
      res.json(response.data);
    })
    .catch(error => {
      console.log(error);
    });
});


app.get('/api/recipes/:rid', (req, res) => {
    const { rid } = req.params;
    console.log(`test: correctly received recipe`);
    axios.get(`https://api.spoonacular.com/recipes/${rid}/information?apiKey=${process.env.REACT_APP_API_KEY}`)
      .then(response => {
        res.send(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  });

app.get('/recipes/youtube/', (req, res) => {
  const passedSearch = req.query.q;
  console.log(passedSearch);
  axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${encodeURIComponent(passedSearch)}&key=${process.env.REACT_APP_YOUTUBE_API_KEY}}`)
  .then(response => {
        res.send(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  });

app.listen(PORT, () => console.log('Server running on PORT ' + PORT))