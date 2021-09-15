import {
  MESSAGE_LOADED_SUCCESS,
  MESSAGE_LOADED_FAILED,
  SEND_MESSAGE,
  SET_MESSAGE,
  MESSAGE_GET_SUCCESS,
} from "../../context/constant";

export const messageReducer = (state, action) => {
  const { type, payload, friendId } = action;
  switch (type) {
    case SET_MESSAGE:
      return {
        ...state,
        messages: [],
        messageLoading: false,
        friendId: "",
      };
    case MESSAGE_LOADED_SUCCESS:
      return {
        ...state,
        messages: payload,
        messageLoading: false,
        friendId: friendId,
      };
    case MESSAGE_LOADED_FAILED:
      return {
        ...state,
        messages: [],
        messageLoading: false,
      };
    case MESSAGE_GET_SUCCESS:
      return {
        ...state,
        messages: payload,
        messageLoading: false,
      };
    case SEND_MESSAGE:
      return {
        ...state,
        messages: [state.messages, payload],
      };

    default:
      return state;
  }
};
