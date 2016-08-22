import delay from './delay';

// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.
const categories = [
    {
        id: 'Pastas',
        name: 'Pastas'
    },
    {
        id: 'Salads',
        name: 'Salads'
    },
    {
        id: 'Meats',
        name: 'Meats'
    },
    {
        id: 'Desserts',
        name: 'Desserts'
    }
];

//This would be performed on the server in a real app. Just stubbing in.
const generateId = (category) => {
    return category.name.toLowerCase();
};

export default class CategoryApi {
    static getAllCategories() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(Object.assign([], categories));
            }, delay);
        });
    }

    static saveCategory(category) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simulate server-side validation
                const minCategoryNameLength = 3;
                if (category.name.length < minCategoryNameLength) {
                    reject(`Name must be at least ${minCategoryNameLength} characters.`);
                }

                if (category.id) {
                    const existingCategoryIndex = categories.findIndex(a => a.id == category.id);
                    categories.splice(existingCategoryIndex, 1, category);
                } else {
                    //Just simulating creation here.
                    //The server would generate ids for new authors in a real app.
                    //Cloning so copy returned is passed by value rather than by reference.
                    category.id = generateId(category);
                    categories.push(category);
                }

                resolve(Object.assign({}, category));
            }, delay);
        });
    }

    static deleteCategory(categoryId) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const indexOfCategoryToDelete = categories.findIndex(category => {
                    category.categoryId == categoryId;
                });
                categories.splice(indexOfCategoryToDelete, 1);
                resolve();
            }, delay);
        });
    }
}
