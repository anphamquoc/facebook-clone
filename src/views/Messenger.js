import React from "react";
import MessengerChat from "../components/layout/MessengerChat";
import MessengerUser from "../components/layout/MessengerUser";
import MessageContextProvider from "../context/messenger/MessageContext";
import "../messenger-user.css";
const Messenger = () => {
  return (
    <MessageContextProvider>
      <div className="border-messenger">
        <MessengerUser />
        <MessengerChat />
      </div>
    </MessageContextProvider>
  );
};

export default Messenger;
