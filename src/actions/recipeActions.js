import * as types from './actionTypes';
import recipeApi from '../api/mockRecipeApi';

export function loadRecipesSuccess(recipes) {
    return { type: types.LOAD_RECIPES_SUCCESS, recipes };
}

export function loadRecipes() {
    return function (dispatch) {
        return recipeApi.getAllRecipes().then(recipes => {
            dispatch(loadRecipesSuccess(recipes));
        }).catch(error => {
            throw (error);
        });
    };
}