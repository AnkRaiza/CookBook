import React from 'react';
import expect from 'expect';
import {mount, shallow} from 'enzyme';
import {ManageRecipePage} from './ManageRecipePage';

describe('Manage recipe page', () => {
    it('sets error message when trying to save empty name', () => {
        const props = {
            categories: [],
            actions: { saveRecipe: () => { return Promise.resolve(); } },
            recipe: { id: '', name: '', category: '', chef: '', description: '', ingredients: [] }
        };

        const wrapper = mount(<ManageRecipePage {...props}/>);
        const saveButton = wrapper.find('input').last();
        expect(saveButton.prop('type')).toBe('submit');
        saveButton.simulate('click');
        expect(wrapper.state().errors.name).toBe('Name must be at least 5 characters.');
    });
});