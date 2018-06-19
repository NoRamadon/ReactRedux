export const LOAD_CATEGORIES = 'categ/LOAD_CATEGORIES';
export const LOAD_CATEGORIES_SUCCESS = 'categ/LOAD_CATEGORIES_S';
export const LOAD_CATEGORIES_FAIL = 'categ/LOAD_CATEGORIES_F';


export function loadCategories() {
  return {
    types: [LOAD_CATEGORIES, LOAD_CATEGORIES_SUCCESS, LOAD_CATEGORIES_FAIL],
    promise: {
      url: 'https://facebook.github.io/react-native/movies.json',
      method: 'GET',
    },
  };
}
