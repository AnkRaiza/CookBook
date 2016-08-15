import delay from './delay';

// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.
const recipes = [
    {
        id: "react-flux-building-applications",
        title: "Building Applications in React and Flux",
        watchHref: "http://www.pluralsight.com/courses/react-flux-building-applications",
        authorId: "cory-house",
        length: "5:08",
        category: "JavaScript"
    },
    {
        id: "clean-code",
        title: "Clean Code: Writing Code for Humans",
        watchHref: "http://www.pluralsight.com/courses/writing-clean-code-humans",
        authorId: "cory-house",
        length: "3:10",
        category: "Software Practices"
    },
    {
        id: "architecture",
        title: "Architecting Applications for the Real World",
        watchHref: "http://www.pluralsight.com/courses/architecting-applications-dotnet",
        authorId: "cory-house",
        length: "2:52",
        category: "Software Architecture"
    },
    {
        id: "career-reboot-for-developer-mind",
        title: "Becoming an Outlier: Reprogramming the Developer Mind",
        watchHref: "http://www.pluralsight.com/courses/career-reboot-for-developer-mind",
        authorId: "cory-house",
        length: "2:30",
        category: "Career"
    },
    {
        id: "web-components-shadow-dom",
        title: "Web Component Fundamentals",
        watchHref: "http://www.pluralsight.com/courses/web-components-shadow-dom",
        authorId: "cory-house",
        length: "5:10",
        category: "HTML5"
    }
];

function replaceAll(str, find, replace) {
    return str.replace(new RegExp(find, 'g'), replace);
}

//This would be performed on the server in a real app. Just stubbing in.
const generateId = (recipe) => {
    return replaceAll(recipe.title, ' ', '-');
};

class RecipeApi {
    static getAllRecipes() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(Object.assign([], recipes));
            }, delay);
        });
    }

    static saveRecipe(recipe) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simulate server-side validation
                const minRecipeTitleLength = 1;
                if (recipe.title.length < minRecipeTitleLength) {
                    reject(`Title must be at least ${minRecipeTitleLength} characters.`);
                }

                if (recipe.id) {
                    const existingRecipeIndex = recipes.findIndex(a => a.id == recipe.id);
                    recipes.splice(existingRecipeIndex, 1, recipe);
                } else {
                    //Just simulating creation here.
                    //The server would generate ids and watchHref's for new recipes in a real app.
                    //Cloning so copy returned is passed by value rather than by reference.
                    recipe.id = generateId(recipe);
                    recipe.watchHref = `http://www.pluralsight.com/courses/${recipe.id}`;
                    recipes.push(recipe);
                }

                resolve(Object.assign({}, recipe));
            }, delay);
        });
    }

    static deleteRecipe(recipeId) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const indexOfRecipeToDelete = recipes.findIndex(recipe => {
                    recipe.recipeId == recipeId;
                });
                recipes.splice(indexOfRecipeToDelete, 1);
                resolve();
            }, delay);
        });
    }
}

export default RecipeApi;
