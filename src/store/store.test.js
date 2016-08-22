import expect from 'expect';
import { createStore } from 'redux';
import {rootReducer} from '../reducers';
import initialState from '../reducers/initialState';
import * as recipeActions from '../actions/recipeActions';

describe('Store', function () {
    it('Should handle creating recipes', function () {
        // arrange
        const store = createStore(rootReducer, initialState);
        const recipe = {
            title: "Clean Code"
        };

        // act
        const action = recipeActions.createRecipeSuccess(recipe);
        store.dispatch(action);

        // assert
        const actual = store.getState().recipes[0];
        const expected = {
            title: "Clean Code"
        };

        expect(actual).toEqual(expected);
    });
});