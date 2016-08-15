import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as recipeActions from '../../actions/recipeActions';
import RecipeForm from './RecipeForm';
import {authorsFormattedForDropdown} from '../../selectors/selectors';
import toastr from 'toastr';

export class ManageRecipePage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            recipe: Object.assign({}, props.recipe),
            errors: {},
            saving: false
        };

        this.updateRecipeState = this.updateRecipeState.bind(this);
        this.saveRecipe = this.saveRecipe.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.recipe.id != nextProps.recipe.id) {
            // Necessary to populate form when existing course is loaded directly.
            this.setState({ recipe: Object.assign({}, nextProps.recipe) });
        }
    }

    updateRecipeState(event) {
        const field = event.target.name;
        let recipe = this.state.recipe;
        recipe[field] = event.target.value;
        return this.setState({ recipe: recipe });
    }

    recipeFormIsValid() {
        let formIsValid = true;
        let errors = {};

        if (this.state.recipe.title.length < 5) {
            errors.title = 'Title must be at least 5 characters.';
            formIsValid = false;
        }

        this.setState({ errors: errors });
        return formIsValid;
    }


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
                allAuthors={this.props.authors}
                onChange={this.updateRecipeState}
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
    authors: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
};

//Pull in the React Router context so router is available on this.context.router.
ManageRecipePage.contextTypes = {
    router: PropTypes.object
};

function getRecipeById(recipes, id) {
    const recipe = recipes.filter(recipe => recipe.id == id);
    if (recipe) return recipe[0]; //since filter returns an array, have to grab the first.
    return null;
}

function mapStateToProps(state, ownProps) {
    const recipeId = ownProps.params.id; // from the path `/course/:id`

    let recipe = { id: '', watchHref: '', title: '', authorId: '', length: '', category: '' };

    if (recipeId && state.recipes.length > 0) {
        recipe = getRecipeById(state.recipes, recipeId);
    }

    return {
        recipe: recipe,
        authors: authorsFormattedForDropdown(state.authors)
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(recipeActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageRecipePage);
