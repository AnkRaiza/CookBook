import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import {TextInput} from './TextInput';

export const IngredientRow = ({ingredient, position, onChange, onRemove}) => {
    return (
        <div>
            <input type="text"
                data-position={position}
                name="ingredient"
                value={ingredient.ingredient}
                onChange={onChange}/>
            <input type="text"
                data-position={position}
                name="ammount"
                value={ingredient.ammount}
                onChange={onChange}/>
            <input type="button"
                data-position={position}
                name="remove"
                value="X"
                onClick={onRemove}
                />
        </div>
    );
};

IngredientRow.propTypes = {
    ingredient: PropTypes.object.isRequired,
    position: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired
};