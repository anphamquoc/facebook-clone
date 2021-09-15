import { createContext, createElement, useReducer } from "react";

import axios from "axios";
import { useState } from "react";
import { userReducer } from "../../reducers/messenger/messageReducer";
import { apiUrl, FRIEND_LOAD_FAILED, FRIEND_LOAD_SUCCESS } from "../constant";
import { friendReducer } from "../../reducers/messenger/friendReducer";
import { useEffect } from "react";

export const FriendContext = createContext();

const FriendContextProvider = ({ children }) => {
  const [friendState, dispatch] = useReducer(friendReducer, {
    friends: [],
    friendLoading: true,
  });
  const getFriends = async () => {
    try {
      const response = await axios.get(`${apiUrl}/messenger`);
      if (response.data.success) {
        dispatch({
          type: FRIEND_LOAD_SUCCESS,
          payload: response.data.user,
        });
      }
    } catch (error) {
      console.log(error.message);
      dispatch({
        type: FRIEND_LOAD_FAILED,
      });
    }
  };
  // getFriends, 500;
  // useEffect(() => getFriends, []);

  const friendContextData = {
    getFriends,
    friendState,
  };
  return (
    <FriendContext.Provider value={friendContextData}>
      {children}
    </FriendContext.Provider>
  );
};

export default FriendContextProvider;
