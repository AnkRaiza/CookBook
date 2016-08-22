import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const RecipeListRow = ({recipe}) => {
    return (
        <tr>
            <td>{recipe.name}</td>
            <td>{recipe.category}</td>
            <td>{recipe.chef}</td>
            <td>{recipe.description}</td>
            <td><Link to={'/recipe/' + recipe.id}>Edit</Link></td>
        </tr>
    );
};

RecipeListRow.propTypes = {
    recipe: PropTypes.object.isRequired
};

export default RecipeListRow;