import React, {PropTypes} from 'react';
import {RecipeListRow} from './RecipeListRow';

export const RecipeList = ({recipes}) => {
    return (
        <table className="table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Chef</th>
                    <th>Description</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {recipes.map(recipe =>
                    <RecipeListRow key={recipe.id} recipe={recipe}/>
                ) }
            </tbody>
        </table>
    );
};

RecipeList.propTypes = {
    recipes: PropTypes.array.isRequired
};