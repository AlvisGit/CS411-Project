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

app.get('/recipes', (req,res) => {
    const passedIngredients = req.query.ingredients
    const passednumRecipes = req.query.numRecipes
    'recipes'
    fetch(
        `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${process.env.REACT_APP_API_KEY}&ingredients=${passedIngredients}&number=${passednumRecipes}&ranking=1`
      )
        .then((response) => response.json())
        .then((data) => {
            res.json(data)
            console.log(data)
        })
        .catch(() => {
          console.log("error");
        });
})



app.listen(PORT, () => console.log('Server running on PORT ${PORT}'))
