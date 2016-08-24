import * as types from './actionTypes';
import RecipeApi from '../api/mockRecipeApi';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';

export function loadRecipesSuccess(recipes) {
    return { type: types.LOAD_RECIPES_SUCCESS, recipes };
}

export function createRecipeSuccess(recipe) {
    return { type: types.CREATE_RECIPE_SUCCESS, recipe };
}

export function updateRecipeSuccess(recipe) {
    return { type: types.UPDATE_RECIPE_SUCCESS, recipe };
}

export function loadRecipes(filter = '') {
    return async (dispatch, getState) => {
        dispatch(beginAjaxCall());
        const recipes = await RecipeApi.getAllRecipes(filter);
        if (!recipes) return;
        dispatch(loadRecipesSuccess(recipes));
    };
}

export function saveRecipe(recipe) {
    return async (dispatch, getState) => {
        dispatch(beginAjaxCall());
        const savedRecipe = Object.assign({}, await RecipeApi.saveRecipe(recipe));
        recipe.id ? dispatch(updateRecipeSuccess(savedRecipe)) :
            dispatch(createRecipeSuccess(savedRecipe));
    };
}