import React from "react";
import { useContext, useEffect, useState, useRef } from "react";
import { MessageContext } from "../../context/messenger/MessageContext";
import io from "socket.io-client";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { apiUrl } from "../../context/constant";
const MessengerChat = () => {
  // window.location.reload();
  const { messages, sendMessage, setMessages, currentChat, name } =
    useContext(MessageContext);
  const [message, setMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const {
    authState: { user },
    socket,
    loadSocket,
  } = useContext(AuthContext);
  const scrollRef = useRef();
  let body = null;
  useEffect(() => {
    loadSocket();
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
      });
    });
  }, []);
  useEffect(() => {
    arrivalMessage &&
      currentChat &&
      setMessages((prev) => [
        ...prev,
        {
          friendId: user._id,
          userId: currentChat,
          message_user: arrivalMessage.text,
        },
      ]);
  }, [arrivalMessage]);

  useEffect(() => {
    user && socket.current.emit("addUser", user._id);
    socket.current.on("getUsers", (users) => {
      // console.log(users);
    });
  }, [user, currentChat]);
  const onChangeMessage = (event) => {
    setMessage(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    sendMessage(message);
    setMessages([
      ...messages,
      {
        message_user: message,
      },
    ]);
    socket.current.emit("sendMessage", {
      senderId: user,
      receiverId: currentChat,
      text: message,
    });
    setMessage("");
  };
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    // window.scrollTo(0, 0);
  }, [messages]);
  if (!name) {
    return "Click friend to chat";
  }
  if (!messages) return "Loading...";
  if (!messages.length) {
    body = "Start chat";
  } else {
    body = messages.map((message, index) => {
      if (message.friendId !== user._id)
        return (
          <div class="user-chat" ref={scrollRef} key={index}>
            <div class="user-chat-message">{message.message_user}</div>
          </div>
        );
      else
        return (
          <div class="friend-chat" ref={scrollRef} key={index}>
            <div class="friend-chat-image">
              <img
                src="images/178412364_2317768181699840_7230214891038452462_n.jpg"
                alt="friend image"
              />
            </div>
            <div class="friend-chat-message">{message.message_user}</div>
          </div>
        );
    });
  }
  return (
    <div class="message">
      <div class="message-header">
        <div class="message-info-friend">
          <div class="message-info-image">
            <img
              src="images/178412364_2317768181699840_7230214891038452462_n.jpg"
              alt="user info image"
            />
          </div>
          <div class="message-info-title">
            <h3>{name}</h3>
          </div>
        </div>
        <div class="message-info-action">
          <div class="border-action">
            <img src="images/phone-call.svg" alt="phone call" />
          </div>
          <div class="border-action">
            <img src="images/video-camera.svg" alt="video call" />
          </div>
          <div class="border-action">
            <img src="images/three-dots.png" alt="choose menu" />
          </div>
        </div>
      </div>
      <div class="message-body">{body}</div>
      <div class="message-footer">
        <form onSubmit={onSubmit}>
          <div class="chat-area">
            <input
              type="text"
              name="message"
              placeholder="Aa"
              onChange={onChangeMessage}
              value={message}
            />
          </div>
          <div class="border-image">
            <button>
              <img src="images/send.svg" alt="send message" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default MessengerChat;
