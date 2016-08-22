import React from 'react';
import {TextInput} from '../common/TextInput';
import {SelectInput} from '../common/SelectInput';
import {IngredientComponent} from '../common/IngredientComponent';

export const RecipeForm = ({recipe, allCategories, onSave, onChange, onChangeIngredient, onAdd, onRemove, saving, errors}) => {

    return (
        <form>
            <h1>Manage Recipe</h1>
            <TextInput
                name="name"
                label="Name"
                value={recipe.name}
                onChange={onChange}
                error={errors.name}/>

            <SelectInput
                name="category"
                label="Category"
                value={recipe.category}
                defaultOption="Select category"
                options={allCategories}
                onChange={onChange} error={errors.category}/>

            <TextInput
                name="chef"
                label="Chef"
                value={recipe.chef}
                onChange={onChange}
                error={errors.chef}/>

            <IngredientComponent
                name="ingredients"
                ingredients={recipe.ingredients}
                onChange={onChangeIngredient}
                onAdd={onAdd}
                onRemove={onRemove}
                />

            <TextInput
                name="description"
                label="Description"
                value={recipe.description}
                onChange={onChange}
                error={errors.description}/>

            <input
                type="submit"
                disabled={saving}
                value={saving ? 'Saving...' : 'Save'}
                className="btn btn-primary"
                onClick={onSave}/>
        </form>
    );
};

RecipeForm.propTypes = {
    recipe: React.PropTypes.object.isRequired,
    allCategories: React.PropTypes.array,
    onSave: React.PropTypes.func.isRequired,
    onChange: React.PropTypes.func.isRequired,
    onChangeIngredient: React.PropTypes.func.isRequired,
    onAdd: React.PropTypes.func.isRequired,
    onRemove: React.PropTypes.func.isRequired,
    saving: React.PropTypes.bool,
    errors: React.PropTypes.object
};