import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as recipeActions from '../../actions/recipeActions';
import { RecipeForm } from './RecipeForm';
import { categoriesFormattedForDropdown } from '../../selectors/selectors';
import toastr from 'toastr';
import autobind from 'autobind-decorator';

export class ManageRecipePage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            recipe: Object.assign({}, props.recipe),
            errors: {},
            saving: false
        };
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.recipe.id != nextProps.recipe.id) {
            // Necessary to populate form when existing course is loaded directly.
            this.setState({ recipe: Object.assign({}, nextProps.recipe) });// nextprops.recipe
        }
    }
    
    @autobind
    updateRecipeState(event) {
        if (!event.target) {
            const field = event.name;
            let recipe = this.state.recipe;
            recipe[field] = event.value;
            return this.setState({ recipe: recipe });
        } else {
            const field = event.target.name;
            let recipe = this.state.recipe;
            recipe[field] = event.target.value;
            return this.setState({ recipe: recipe });
        }
    }
    
    @autobind
    updateRecipeStateIngredient(event) {
        let recipe = this.state.recipe;
        const newIngredient = recipe["ingredients"].find((ingredient, index) => index == event.target.dataset.position);
        newIngredient[event.target.name] = event.target.value;
        return this.setState({ recipe: recipe });
    }
    
    @autobind
    addIngredient(event) {
        let recipe = this.state.recipe;
        const newIngredients = Object.assign([], recipe["ingredients"]);
        if (recipe["ingredients"].length >= 10) {
            return;
        } else {
            const newIngredient = { ingredient: "", ammount: "" };
            newIngredients.push(newIngredient);
            recipe.ingredients = newIngredients;
            return this.setState({ recipe: recipe });
        }
    }
    
    @autobind
    removeIngredient(event) {
        let recipe = this.state.recipe;
        if (recipe.ingredients.length <= 1) {
            return;
        } else {
            const newIngredients = recipe["ingredients"].filter((ingredient, index) => index != event.target.dataset.position);
            recipe.ingredients = newIngredients;
            return this.setState({ recipe: recipe });
        }
    }

    recipeFormIsValid() {
        let formIsValid = true;
        let errors = {};

        if (this.state.recipe.name.length < 5) {
            errors.name = 'Name must be at least 5 characters.';
            formIsValid = false;
        }

        this.setState({ errors: errors });
        return formIsValid;
    }
    
    @autobind
    saveRecipe(event) {
        event.preventDefault();

        if (!this.recipeFormIsValid()) {
            return;
        }

        this.setState({ saving: true });

        this.props.actions.saveRecipe(this.state.recipe)
            .then(() => this.redirect())
            .catch(error => {
                toastr.error(error);
                this.setState({ saving: false });
            });
    }

    redirect() {
        this.setState({ saving: false });
        toastr.success('Recipe saved');
        this.context.router.push('/recipes');
    }

    render() {
        return (
            <RecipeForm
                allCategories={this.props.categories}
                onChange={this.updateRecipeState}
                onChangeIngredient={this.updateRecipeStateIngredient}
                onAdd={this.addIngredient}
                onRemove={this.removeIngredient}
                onSave={this.saveRecipe}
                recipe={this.state.recipe}
                errors={this.state.errors}
                saving={this.state.saving}
                />
        );
    }
}

ManageRecipePage.propTypes = {
    recipe: PropTypes.object.isRequired,
    categories: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
};

//Pull in the React Router context so router is available on this.context.router.
ManageRecipePage.contextTypes = {
    router: PropTypes.object
};

function getRecipeById(recipes, id) {
    const recipe = recipes.filter(recipe => recipe.id == id);
    if (recipe.length) return recipe[0]; //since filter returns an array, have to grab the first.
    return null;
}

function mapStateToProps(state, ownProps) {
    const recipeId = ownProps.params.id; // from the path `/course/:id`

    let recipe = { id: '', name: '', category: '', chef: '', description: '' };

    if (recipeId && state.recipes.length > 0) {
        recipe = getRecipeById(state.recipes, recipeId);
    }

    return {
        recipe: recipe,
        categories: categoriesFormattedForDropdown(state.categories)
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(recipeActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageRecipePage);
