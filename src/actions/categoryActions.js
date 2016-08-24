import CategoryApi from '../api/mockCategoryApi';
import * as types from './actionTypes';
import {beginAjaxCall} from './ajaxStatusActions';

export function loadCategoriesSuccess(categories) {
  return { type: types.LOAD_CATEGORIES_SUCCESS, categories };
}

export function loadCategories() {
  return async (dispatch, getState) => {
    dispatch(beginAjaxCall());
    const categories = await CategoryApi.getAllCategories();
    if (!categories) return;
    dispatch(loadCategoriesSuccess(categories));
  }
}