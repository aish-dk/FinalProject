import { FETCH_POST, FETCH_CATEGORIES } from "../actionType";
const initialState = {
  post: [],
  categories: [],
};
export const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_POST:
      return {
        ...state,
        post: action.payload,
      };
    case FETCH_CATEGORIES:
      return { ...state, categories: action.payload };
    default:
      return state;
  }
};
