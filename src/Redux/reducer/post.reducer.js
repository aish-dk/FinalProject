import { CREATE_POST, FETCH_POST, FETCH_CATEGORIES } from "../actionType";
const initialState = {
  post: [],
  categories: [
    // "Technology",
    // "Lifestyle",
    // "Health",
    // "Science",
    // "Sports",
    // "Literature",
    // "Music",
    // "History",
    // "Relationships",
    // "Politics",
  ],
};
export const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_POST:
      return state;
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
