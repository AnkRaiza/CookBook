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
    return function (dispatch, getState) {
        dispatch(beginAjaxCall());
        return RecipeApi.getAllRecipes(filter).then(recipes => {
            dispatch(loadRecipesSuccess(recipes));
        }).catch(error => {
            throw (error);
        });
    };
}

export function saveRecipe(recipe) {
    return function (dispatch, getState) {
        dispatch(beginAjaxCall());
        return RecipeApi.saveRecipe(recipe).then(savedRecipe => {
            recipe.id ? dispatch(updateRecipeSuccess(savedRecipe)) :
                dispatch(createRecipeSuccess(savedRecipe));
        }).catch(error => {
            dispatch(ajaxCallError(error));
            throw (error);
        });
    };
}