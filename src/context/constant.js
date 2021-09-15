export const apiUrl =
  process.env.NODE_ENV !== "production"
    ? "https://chatapp-llication.herokuapp.com/api"
    : "https://chatapp-llication.herokuapp.com/api";
export const LOCAL_STORAGE_TOKEN_NAME = "learnit-mern";
export const SEND_MESSAGE = "SEND_MESSAGE";
export const MESSAGE_LOADED_SUCCESS = "MESSAGE_LOADED_SUCCESS";
export const MESSAGE_LOADED_FAILED = "MESSAGE_LOADED_FAILED";
export const FRIEND_LOAD_SUCCESS = "FRIEND_LOAD_SUCCESS";
export const FRIEND_LOAD_FAILED = "FRIEND_LOAD_FAILED";
export const SET_MESSAGE = "SET_MESSAGE";
export const MESSAGE_GET_SUCCESS = "MESSAGE_GET_SUCCESS";
export const MESSAGE_GET_FAILED = "MESSAGE_GET_FAILED";
export const POST_LOADED_SUCCESS = "POST_LOADED_SUCCESS";
export const POST_LOADED_FAILED = "POST_LOADED_FAILED";
export const POST_ADDED_SUCCESS = "POST_ADDED_SUCCESS";
export const POST_ADDED_FAILED = "POST_ADDED_FAILED";
