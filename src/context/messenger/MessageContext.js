import { createContext, useEffect } from "react";

import axios from "axios";
import { useState } from "react";
import { apiUrl } from "../constant";

export const MessageContext = createContext();

const MessageContextProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [name, setName] = useState(null);
  const [currentChat, setCurrentChat] = useState(null);
  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get(
          `${apiUrl}/messenger/${currentChat ? currentChat : ""}`
        );
        if (res.data.success) {
          setMessages(res.data.message);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getMessages();
  }, [currentChat]);
  const sendMessage = async (message) => {
    try {
      const res = await axios.post(`${apiUrl}/messenger/${currentChat}`, {
        message,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const messageValue = {
    setCurrentChat,
    messages,
    sendMessage,
    setMessages,
    currentChat,
    setName,
    name,
  };
  return (
    <MessageContext.Provider value={messageValue}>
      {children}
    </MessageContext.Provider>
  );
};

export default MessageContextProvider;
