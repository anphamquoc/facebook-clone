import React, { useRef } from "react";
import { useContext, useEffect, useState } from "react";
import { FriendContext } from "../../context/messenger/FriendContext";
import { Link } from "react-router-dom";
import { MessageContext } from "../../context/messenger/MessageContext";
import io from "socket.io-client";
import { AuthContext } from "../../context/AuthContext";
const MessengerUser = () => {
  const { setCurrentChat, currentChat, setName } = useContext(MessageContext);
  const { socket, loadSocket } = useContext(AuthContext);
  const [userOnline, setuserOnline] = useState(null);
  useEffect(() => {
    loadSocket();
    socket.current.on("getUsers", (users) => {
      setuserOnline(users);
    });
  }, []);
  const {
    friendState: { friends, friendLoading },
    getFriends,
  } = useContext(FriendContext);
  useEffect(() => getFriends(), [friends]);
  let body = null;
  if (friendLoading == true) {
    body = "Loading...";
  } else if (friends.length === 0 || !userOnline) {
    body = "not user found";
  } else {
    // getMessages(Id);
    body = friends.map((friend, index) => {
      return (
        <div
          key={index}
          className={
            currentChat === friend._id
              ? "user-friend-chat active"
              : "user-friend-chat"
          }
          onClick={() => {
            setCurrentChat(friend._id);
            setName(friend.firstName + " " + friend.lastName);
          }}
        >
          <div className="user-friend-image">
            <img
              src="images/178412364_2317768181699840_7230214891038452462_n.jpg"
              alt="image friend's user"
            />
          </div>
          <div className="user-friend-chat-info">
            <div className="name">
              {friend.firstName + " " + friend.lastName}
            </div>
            <div className="message">
              <p>
                {userOnline.some((user) => user.userId === friend._id)
                  ? "Đang hoạt động"
                  : "Offline"}
              </p>
            </div>
          </div>
        </div>
      );
    });
  }
  return (
    <div className="user-chat">
      <div className="user-chat-info">
        <div className="user-chat-title">
          <img src="images/Logo-512px-acopy.png" alt="user image" />
          <h2>Chat</h2>
        </div>
        <div className="user-chat-action">
          <div className="border-image">
            <img src="images/three-dots.png" alt="menu" />
          </div>
          <div className="border-image">
            <img src="images/edit.svg" alt="edit" />
          </div>
        </div>
      </div>
      <div className="user-chat-search">
        <img
          src="images/search.png"
          className="search-icon"
          alt="search-icon"
        />
        <input
          type="text"
          className="input-search"
          name="search"
          placeholder="Tìm kiếm trên messenger"
        />
      </div>
      <div className="user-chat-box">{body}</div>
    </div>
  );
};

export default MessengerUser;
