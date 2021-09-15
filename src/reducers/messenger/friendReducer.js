import {
  FRIEND_LOAD_FAILED,
  FRIEND_LOAD_SUCCESS,
} from "../../context/constant";

export const friendReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case FRIEND_LOAD_SUCCESS:
      return {
        ...state,
        friends: payload,
        friendLoading: false,
      };
    case FRIEND_LOAD_FAILED:
      return {
        ...state,
        friends: [],
        friendLoading: false,
      };
    default:
      return state;
  }
};
