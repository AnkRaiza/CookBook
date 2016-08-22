import React, {PropTypes} from 'react';
import {IngredientRow} from './IngredientRow';

export const IngredientComponent = ({name, ingredients, onChange, onAdd, onRemove}) => {
    let wrapperClass = 'form-group';

    return (
        <div className={wrapperClass}>
            <h4>Ingredients</h4>
            <input type="button"
                value="add Ingredient"
                onClick={onAdd}/>
            {ingredients.map((ingredient, index) =>
                <IngredientRow key={index} position={index} ingredient={ingredient} onChange={onChange} onRemove={onRemove} />) }
        </div>
    );
};

IngredientComponent.propTypes = {
    name: PropTypes.string.isRequired,
    ingredients: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
    onAdd: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired
};