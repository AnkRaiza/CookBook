import * as types from '../actions/actionTypes';

export default function recipeReducer(state = [], action) {
    switch (action.type) {
        case types.LOAD_RECIPES_SUCCESS:
            return action.recipes;
        default:
            return state;
    }
}