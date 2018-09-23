import axios from '../../axios';

export const fetchCategoriesSuccess = categories => {
  return {
    type: 'FETCH_CATEGORIES_SUCCESS',
    categories
  };
};
export const fetchCategoriesPending = () => {
  return {
    type: 'FETCH_CATEGORIES_PENDING'
  };
};

export const fetchCategoriesError = () => {
  return {
    type: 'FETCH_CATEGORIES_ERROR'
  };
};

const fetchCategories = path => {
  return async (dispatch, getState) => {
    try {
      const country = getState().userReducer.user.country || 'US';
      const response = await axios.get(
        `/browse/${path}country=${country}&limit=28`
      );
      const result =
        response.data.categories ||
        response.data.playlists ||
        response.data.albums;
      dispatch(fetchCategoriesSuccess(result));
      return result;
    } catch (error) {
      dispatch(fetchCategoriesError());
      return error;
    }
  };
};

export const fetchGenres = () => {
  return async dispatch => {
    dispatch(fetchCategories('categories?offset=1&'));
  };
};

export const fetchNewReleases = () => {
  return async dispatch => {
    dispatch(fetchCategories('new-releases?'));
  };
};

export const fetchFeatured = () => {
  return async dispatch => {
    dispatch(fetchCategories('featured-playlists?'));
  };
};

export const fetchCharts = () => {
  return async dispatch => {
    dispatch(fetchCategories(`categories/toplists/playlists?&`));
  };
};

export const fetchPlaylistForCategory = id => {
  return async dispatch => {
    dispatch(fetchCategories(`categories/${id}/playlists?`));
  };
};
