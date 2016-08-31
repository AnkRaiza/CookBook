import delay from './delay';
import superagent from 'superagent';



// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.
const recipes = [
    {
        id: "id-1",
        name: "Name 1",
        category: "Pastas",
        chef: "Cheff 1",
        ingredients: [{ ingredient: "ingredient", ammount: '1' }, { ingredient: "ingredient", ammount: '6' }, { ingredient: "ingredient", ammount: '3' }],
        description: "something 1"
    },
    {
        id: "id-2",
        name: "Name 2",
        category: "Salads",
        chef: "Cheff 2",
        ingredients: [{ ingredient: "ingredient", ammount: '1' }, { ingredient: "ingredient", ammount: '1' }],
        description: "something 2"
    },
    {
        id: "id-3",
        name: "Name 3",
        category: "Meats",
        chef: "Cheff 3",
        ingredients: [{ ingredient: "ingredient", ammount: '1' }],
        description: "something 3"
    },
    {
        id: "id-4",
        name: "Name 4",
        category: "Desserts",
        chef: "Cheff 4",
        ingredients: [{ ingredient: "ingredient", ammount: '1' }, { ingredient: "ingredient", ammount: '1' }],
        description: "something 4"
    },
    {
        id: "id-5",
        name: "Name 5",
        category: "Salads",
        chef: "Cheff 5",
        ingredients: [{ ingredient: "ingredient", ammount: '1' }],
        description: "something 5"
    }
];

function replaceAll(str, find, replace) {
    return str.replace(new RegExp(find, 'g'), replace);
}

//This would be performed on the server in a real app. Just stubbing in.
const generateId = (recipe) => {
    return replaceAll(recipe.name, ' ', '-');
};

export default class RecipeApi {
    static async getAllRecipes(filter = '') {
        var recipes = await superagent['get']('http://localhost:4000/api/recipes');
        return recipes.body;
    }

    static async getRecipeById(id) {
        var recipe = await superagent['get']('http://localhost:4000/api/recipe/' + id);
        return recipe.body;
    }

    static async saveRecipe(recipe) {
        const minRecipeNameLength = 1;
        if (recipe.name.length < minRecipeNameLength) {
            reject(`Recipe name must be at least ${minRecipeNameLength} characters.`);
        }

        if (recipe.id) {
            let insertRecipe = await superagent['put']('http://localhost:4000/api/recipes')
                .set('Content-Type', 'application/json')
                .send({ recipe });
            recipe.id = insertRecipe.body;
        } else {
            let insertRecipe = await superagent['post']('http://localhost:4000/api/recipes')
                .set('Content-Type', 'application/json')
                .send({ recipe });
            recipe.id = insertRecipe.body;
        }
        return Object.assign({}, recipe);
    }

    static async deleteRecipe(recipeId) {
        const deleted = await superagent['delete']('http://localhost:4000/api/recipe/' + recipeId);
        const indexOfRecipeToDelete = recipes.findIndex(recipe => {
            recipe.recipeId == recipeId;
        });
        recipes.splice(indexOfRecipeToDelete, 1);
    }
}
