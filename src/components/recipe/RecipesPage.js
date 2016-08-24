import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as recipeActions from '../../actions/recipeActions';
import {RecipeList} from './RecipeList';
import {browserHistory} from 'react-router';
import {SelectInput} from '../common/SelectInput';
import {categoriesFormattedForDropdown} from '../../selectors/selectors';
import autobind from 'autobind-decorator';

@connect(state => ({
    recipes: state.recipes,
    categories: categoriesFormattedForDropdown(state.categories)
}), dispatch => ({
    actions: bindActionCreators(recipeActions, dispatch)
}))
export class RecipesPage extends React.Component {
    static propTypes = {
        recipes: PropTypes.array.isRequired,
        categories: PropTypes.array.isRequired,
        actions: PropTypes.object.isRequired
    }
    
    constructor(props, context) {
        super(props, context);
    }

    @autobind
    onChange(event) {
        this.props.actions.loadRecipes(event.value);
    }

    recipeRow(recipe, index) {
        return <div key={index}>{recipe.name}</div>;
    }

    @autobind
    redirectToAddRecipePage() {
        browserHistory.push('/recipe');
    }

    render() {
        const {recipes} = this.props;
        const {categories} = this.props;
        return (
            <div>
                <h1>Recipes</h1>
                <input type="submit"
                    value="Add Recipe"
                    className="btn btn-primary"
                    onClick={this.redirectToAddRecipePage}/>
                <SelectInput
                    name="categories"
                    label="Select Category"
                    defaultOption="All"
                    options={categories}
                    actions={this.props.actions}
                    onChange={this.onChange}
                    />
                <RecipeList recipes={recipes}/>
            </div>
        );
    }
}

