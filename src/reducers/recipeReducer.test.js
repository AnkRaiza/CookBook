import expect from 'expect';
import recipeReducer from './recipeReducer';
import * as actions from '../actions/recipeActions';

describe('Recipe Reducer', () => {
    it('should add recipe when passed CREATE_RECIPE_SUCCESS', () => {
        // arrange
        const initialState = [
            { title: 'A' },
            { title: 'B' }
        ];

        const newRecipe = { title: 'C' };

        const action = actions.createRecipeSuccess(newRecipe);

        //act
        const newState = recipeReducer(initialState, action);

        //assert
        expect(newState.length).toEqual(3);
        expect(newState[0].title).toEqual('A');
        expect(newState[1].title).toEqual('B');
        expect(newState[2].title).toEqual('C');
    });

    it('should update recipe when passed UPDATE_RECIPE_SUCCESS', () => {
        // arrange
        const initialState = [
            { id: 'A', title: 'A' },
            { id: 'B', title: 'B' },
            { id: 'C', title: 'C' }
        ];

        const recipe = { id: 'B', title: 'New Title' };
        const action = actions.updateRecipeSuccess(recipe);

        // act
        const newState = recipeReducer(initialState, action);
        const updatedRecipe = newState.find(a => a.id == recipe.id);
        const untouchedRecipe = newState.find(a => a.id == 'A');

        // assert
        expect(updatedRecipe.title).toEqual('New Title');
        expect(untouchedRecipe.title).toEqual('A');
        expect(newState.length).toEqual(3);
    });
});