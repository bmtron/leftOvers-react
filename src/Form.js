import React, { Component } from 'react';



export default class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userIngredients: [],
            tempIngredients: ''
        }
        
    }
    handleAddIngredients = (e) => {
        e.preventDefault();
        console.log('clicked')
        let dupe = this.state.userIngredients.find(item => {
            return item === this.state.tempIngredients;
        });
        if (dupe) {
            alert(`You've already added ${dupe}!`);
        }
        else if (!dupe) {
            this.setState({
                userIngredients: [...this.state.userIngredients, this.state.tempIngredients],
                tempIngredients: ''
            })
        }
    }
    onSearchChange(item) {
        this.setState({
           tempIngredients: item
        })
    }
    removeFromSearch = (item) => {
        console.log('click')
        let searchList = this.state.userIngredients;
        let idx = searchList.indexOf(item);
        if (idx !== -1) {
            searchList.splice(idx, 1)
            this.setState({
                userIngredients: searchList
            })
        }
        
    }
    render() {
        return (
            <div>
                <form className="Ingredients">
                    <label htmlFor="ing_search">Add Ingredients</label>
                    <input id="ing_search" name="ing_search" type="text" placeholder="Eggs, chicken, tortillas, etc." defaultValue="" onChange={(e) => this.onSearchChange(e.target.value)}/>
                    <button onClick={(e) => this.handleAddIngredients(e)}>Add Ingredient</button>
                </form>
                <button onClick={() => this.props.getIngredients(this.state.userIngredients)}>Search Ingredients</button>
                <section className="ingredients_box">
                    <ul>
                        {this.state.userIngredients.map((item, index) => {
                            return <li key={index}>{item}<button onClick={() => this.removeFromSearch(item)}>X</button></li>
                        })}
                    </ul>
                </section>
            </div>
        )
    }
}