import React, { PropTypes } from 'react';
import { Link } from 'react-router';

export const RecipeListRow = ({recipe, onDelete}) => {
    return (
        <tr>
            <td>{recipe.name}</td>
            <td>{recipe.category}</td>
            <td>{recipe.chef}</td>
            <td>{recipe.description}</td>
            <td><Link to={'/recipe/' + recipe.id}>Edit</Link>|<input data-id={recipe.id} type="button" onClick={onDelete} value="delete"/></td>
        </tr>
    );
};

RecipeListRow.propTypes = {
    recipe: PropTypes.object.isRequired,
    onDelete: PropTypes.func
};