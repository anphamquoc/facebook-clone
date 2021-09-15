import {
  POST_ADDED_FAILED,
  POST_ADDED_SUCCESS,
  POST_LOADED_FAILED,
  POST_LOADED_SUCCESS,
} from "../../context/constant";

export const postReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case POST_LOADED_SUCCESS:
      return {
        ...state,
        posts: payload,
        postLoading: false,
      };
    case POST_LOADED_FAILED:
      return {
        ...state,
        posts: [],
        postLoading: false,
      };
    case POST_ADDED_SUCCESS:
      return {
        ...state,
        posts: [state.posts, payload],
      };
    case POST_ADDED_FAILED:
      return state;
    default:
      return state;
  }
};
