import React, { Component } from 'react';
import Form from './Form';
import Results from './Results';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredients: [],
      fetchResults: {}
    }
  }
componentDidMount() {
}
  getIngredientsFromForm = (item) => {
    const p1 = new Promise((resolve, reject) => {
      this.setState({
        ingredients: item
      });
      resolve();
    })
    p1.then(() => {
      this.handleFetchRecipe();
    })
  }

  handleFetchRecipe = () => {
    const HEAD = {
      method: 'GET',
      headers: {
      'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
      'X-RapidAPI-Key': 'bc15ad6fe7msh92d4636d10a6e33p1eb30ajsnb776b028d741'
      }
    }
    const url = `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?number=1&ranking=1&ignorePantry=false&ingredients=`;
    let newUrl = url;
    for (let i = 0; i < this.state.ingredients.length; i++) {
      if ( i === (this.state.ingredients.length - 1)) {
        newUrl = newUrl + this.state.ingredients[i];
      }
      else {
        newUrl = newUrl + this.state.ingredients[i] + '%2C';
      }
    }
    fetch(newUrl, HEAD)
    .then(response => response.json())
    .then(responseJson =>  this.getRecipeFromIngredientsById(responseJson));
  }
  getRecipeFromIngredientsById(id) {
    const HEAD = {
      method: 'GET',
      headers: {
      'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
      'X-RapidAPI-Key': 'bc15ad6fe7msh92d4636d10a6e33p1eb30ajsnb776b028d741'
      }
    }
    let recipeId = id[0].id;
    let url = `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${recipeId}/information?includeNutrition=true`;
    fetch(url, HEAD)
    .then(response => response.json())
    .then(responseJson => this.setState({
      fetchResults: responseJson
    }));
  }
  
  render() {
    console.log(this.state.fetchResults)
    return (
      <div className="App">
        <header>
          <h1>
            leftOvers
          </h1>
        </header>
        <main>
          <Form getIngredients={this.getIngredientsFromForm}/>
          <Results recipe={this.state.fetchResults} ingredients={this.state.ingredients}/>
        </main>
      </div>
    );
  }
}

export default App;
