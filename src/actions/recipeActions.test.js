import expect from 'expect';
import * as recipeActions from './recipeActions';
import * as types from './actionTypes';

import thunk from 'redux-thunk';
import nock from 'nock';
import configureMockStore from 'redux-mock-store';

// Test a sync action
describe('Recipe Actions', () => {
    describe('createRecipeSuccess', () => {
        it('should create a CREATE_RECIPE_SUCCESS action', () => {
            //arrange
            const recipe = { id: 'clean-code', title: 'Clean Code' };
            const expectedAction = {
                type: types.CREATE_RECIPE_SUCCESS,
                recipe: recipe
            };

            //act
            const action = recipeActions.createRecipeSuccess(recipe);

            //assert
            expect(action).toEqual(expectedAction);
        });
    });
});

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('Async Actions', () => {
    afterEach(() => {
        nock.cleanAll();
    });

    it('should create BEGIN_AJAX_CALL and LOAD_RECIPES_SUCCESS when loading recipes', (done) => {
        // Here's an example call to nock.
        // nock('http://example.com/')
        //   .get('/recipes')
        //   .reply(200, { body: { recipe: [{ id: 1, firstName: 'Cory', lastName: 'House'}] }});

        const expectedActions = [
            { type: types.BEGIN_AJAX_CALL },
            { type: types.LOAD_RECIPES_SUCCESS, body: { recipes: [{ id: 'clean-code', title: 'Clean Code' }] } }
        ];

        const store = mockStore({ recipes: [] }, expectedActions);
        store.dispatch(recipeActions.loadRecipes()).then(() => {
            const actions = store.getActions();
            expect(actions[0].type).toEqual(types.BEGIN_AJAX_CALL);
            expect(actions[1].type).toEqual(types.LOAD_RECIPES_SUCCESS);
            done();
        });
    });
});