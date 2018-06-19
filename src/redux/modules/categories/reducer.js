import { LOAD_CATEGORIES_SUCCESS } from './actions';

const initialState = {
  all: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_CATEGORIES_SUCCESS:
      console.log(action.payload)
      return {
        ...state,
        all: [...action.payload.movies],
      };
    default:
      console.log(action.payload)
      return state;
  }
}
