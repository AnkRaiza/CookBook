/*eslint-disable import/default */
import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import configureStore from './store/configureStore';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import routes from './routes';
import { loadRecipes } from './actions/recipeActions';
import { loadCategories } from './actions/categoryActions';
import material from '../node_modules/materialize-css/dist/css/materialize.min.css';
import toastr from '../node_modules/toastr/build/toastr.min.css';

const store = configureStore();
store.dispatch(loadRecipes());
store.dispatch(loadCategories());

render(
    <Provider store={store}>
        <Router history={browserHistory} routes={routes} />
    </Provider>,
    document.getElementById('app')
);
