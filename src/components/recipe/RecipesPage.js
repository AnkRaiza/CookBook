import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as recipeActions from '../../actions/recipeActions';
import RecipeList from './RecipeList';

class RecipesPage extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    recipeRow(recipe, index) {
        return <div key={index}>{recipe.title}</div>;
    }

    render() {
        const {recipes} = this.props;
        return (
            <div>
                <h1>Recipes</h1>
                <RecipeList recipes={recipes}/>

            </div>
        );
    }
}

RecipesPage.propTypes = {
    recipes: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
    return {
        recipes: state.recipes
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(recipeActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipesPage);