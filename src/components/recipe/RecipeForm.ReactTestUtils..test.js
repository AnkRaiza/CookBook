import expect from 'expect';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import RecipeForm from './RecipeForm';

function setup(saving) {
    let props = {
        recipe: {ingredients:[]}, saving: saving, errors: {},
        onSave: () => { },
        onChange: () => { },
        onAdd: () => { },
        onRemove: () => { }
    };
    let renderer = TestUtils.createRenderer();
    renderer.render(<RecipeForm {...props}/>);
    let output = renderer.getRenderOutput();
    return {
        props,
        output,
        renderer
    };
}

describe('RecipeForm via React Test Utils', () => {
    it('renders form and h1', () => {
        const {output} = setup();
        expect(output.type).toBe('form');
        let [h1] = output.props.children;
        expect(h1.type).toBe('h1');
    });

    it('save button is labeled "Save" when not saving', () => {
        const {output} = setup(false);
        const submitButton = output.props.children[6];
        expect(submitButton.props.value).toBe('Save');
    });

    it('save button is labeled "Saving..." when saving', () => {
        const {output} = setup(true);
        const submitButton = output.props.children[6];
        expect(submitButton.props.value).toBe('Saving...');
    });
});