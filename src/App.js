import React, { Component } from 'react';
import Form from './Form';
import Results from './Results';
import {Route} from 'react-router-dom';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredients: [],
      fetchResults: {}
    }
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
    let url = 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?number=1&ranking=1&ignorePantry=false&ingredients=';
	let newUrl = url;
	for (let i = 0; i < this.state.ingredients.length; i++) {
		if (i === this.state.ingredients.length - 1) {
		newUrl = newUrl + this.state.ingredients[i];
		}
		else {
		newUrl = newUrl + this.state.ingredients[i] + '%2C';
		}
    }
    console.log(newUrl);
    fetch(newUrl, HEAD)
    .then(response => response.json())
    .then(responseJson => this.getRecipeFromIngredientsById(responseJson[0].id));
  }
  handleFetchRandom = () => {
    const HEAD = {
      method: 'GET',
      headers: {
      'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
      'X-RapidAPI-Key': 'bc15ad6fe7msh92d4636d10a6e33p1eb30ajsnb776b028d741'
      }
    }
    const url = 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/random?number=1';
    fetch(url, HEAD)
    .then(response => response.json())
    .then(responseJson => this.getRandomById(responseJson));
  }
  getRandomById(responseJson) {
    const HEAD = {
      method: 'GET',
      headers: {
      'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
      'X-RapidAPI-Key': 'bc15ad6fe7msh92d4636d10a6e33p1eb30ajsnb776b028d741'
      }
    }
    const id = responseJson.recipes[0].id;
    let url = `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${id}/information?includeNutrition=true`;
    fetch(url, HEAD)
    .then(response => response.json())
    .then(responseJson => this.setState({
      fetchResults: responseJson
    }));
  }
  getRecipeFromIngredientsById(id) {
    const HEAD = {
      method: 'GET',
      headers: {
      'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
      'X-RapidAPI-Key': 'bc15ad6fe7msh92d4636d10a6e33p1eb30ajsnb776b028d741'
      }
    }
    
    let url = `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${id}/information?includeNutrition=true`;
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
          <p>Just looking for something new? Grab a random recipe by clicking the button below!</p>
          <button onClick={() => this.handleFetchRandom()}>Random Recipe</button>
          <Route exact path='/' render={() => <Form getIngredients={this.getIngredientsFromForm}/>}/>
          <Route path="/results" render={() => <Results recipe={this.state.fetchResults} ingredients={this.state.ingredients}/>} />
        </main>
      </div>
    );
  }
}

export default App;
