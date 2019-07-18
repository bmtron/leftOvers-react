import React from 'react';


export default function Results(props) {
    const results = props.recipe || {};
    const ownedIngredients = props.ingredients || [];
    let calories = results.nutrition || {};
    let searchIngredients = results.extendedIngredients || [];
    let neededIngredients = [];
    searchIngredients = searchIngredients.map(item => {
        return item.originalString.toLowerCase()
    });
    searchIngredients.map(item => {
        for (let i = 0; i < ownedIngredients.length; i++) {
            if(item.includes(ownedIngredients[i])) {
                let idx = searchIngredients.indexOf(item);
                neededIngredients.push(item);
                searchIngredients.splice(idx, 1, '');
            }
        }
    });
   
    return (
        <div className="results">
           <p>{results.title}</p>
            <p>
               {calories.nutrients ? calories.nutrients[0].amount : null}
            </p>
           <ul>
               {neededIngredients.map((item, index) => {
                   return <li className="owned_ingredient" key={index}>{item}</li>
               })}
               {searchIngredients.map((item, index) => {
                   if (item !== '')  {
                       return <li key={index}>{item}</li>
                   }
               })}
           </ul>
           <div>
               {results.analyzedInstructions ? <div>Instructions: {results.analyzedInstructions[0].steps.map((item, index) => {
                   return <div key={index}>{index + 1}. {item.step}</div>;
               })}</div> : null}
           </div>
           <button onClick={() => props.history.push('/')}>Go Back</button>
        </div>
    )
}