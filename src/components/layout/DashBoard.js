import React, { useRef, useState } from "react";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import "../../DashBoard.css";
import io from "socket.io-client";
import { PostContext } from "../../context/facebook/PostContext";
import { format } from "timeago.js";
const DashBoard = () => {
  const PF = "https://chatapp-llication.herokuapp.com/images";
  // let userOnline = null;
  const {
    authState: { user },
  } = useContext(AuthContext);
  const {
    postState: { posts, postLoading },
    submitPost,
    getPosts,
  } = useContext(PostContext);
  // getPosts();
  const [aboutPost, setAboutPost] = useState({
    title: "",
    image: "",
  });
  const [file, setFile] = useState(null);
  // useEffect(() => {
  //   loadSocket();
  //   socket?.current?.on("getUsers", (users) => {
  //     userOnline = users;
  //   });
  //   // socket.current.disconnect();
  // }, []);
  // useEffect(() => {
  //   user && socket?.current.emit("addUser", user._id);
  // }, [user]);
  const onChangePost = (e) => {
    setAboutPost({
      ...aboutPost,
      [e.target.name]: e.target.value,
    });
  };
  const onSubmitPost = (e) => {
    e.preventDefault();
    aboutPost.image = file;
    submitPost(aboutPost);
    setAboutPost({
      title: "",
      image: "",
    });
    const timeOut = setTimeout(() => getPosts(), 1000);
    return () => clearTimeout(timeOut);
  };
  let displayUserOnline = "Open messenger to chat";
  // if (!userOnline) {
  //   displayUserOnline = "Loading...";
  // } else if (userOnline.length === 1) {
  //   displayUserOnline = "No user online";
  // } else {
  //   displayUserOnline = userOnline.map((userOnl, index) => {
  //     if (userOnl.userId !== user._id)
  //       return (
  //         <li className="user-bar-info" key={index}>
  //           <img src="images/Logo-512px-acopy.png" alt="info-user" />
  //           <div className="title">Bạn {index + 1}</div>
  //         </li>
  //       );
  //   });
  // }
  // setUserOnline(null);
  let displayPosts = null;
  if (postLoading) {
    displayPosts = "Loading posts";
  } else if (!posts.length) {
    displayPosts = "No posts to display";
  } else {
    displayPosts = posts
      .slice(0)
      .reverse()
      .map((post, index) => {
        return (
          <div className="post" key={index}>
            <div className="post-header">
              <img
                src={`images/Logo-512px-acopy.png`}
                alt="logo-img"
                className="logo-img"
              />
              <p className="name-user">
                {post.name
                  ? post.name[0].firstName + " " + post.name[0].lastName
                  : "Loading..."}
                <br />
                {format(post.createAt)}
              </p>
            </div>
            <div className="post-body">
              <div className="post-title">{post.title}</div>
              <img src={PF + "/" + post.image} alt="post-img" />
            </div>
            <div className="about-post">
              <img src="images/like-about.svg" alt="like" />
              <p className="quantity">{post.like}</p>
            </div>
            <hr />
            <div className="react-post">
              <button className="like-post-btn" onclick="changeStatus(0)">
                <img src="images/like.svg" alt="like-button" /> Like
              </button>
            </div>
            <hr />
          </div>
        );
      });
  }
  return (
    <div className="border-dashboard-all">
      <div className="border-menu">
        <div className="menu">
          <div className="about-user">
            <div className="img-about-user">
              <img
                src="images/Logo-512px-acopy.png"
                className="logo-img"
                alt="user image"
              />
            </div>
            <div className="title">{user.firstName + " " + user.lastName}</div>
          </div>
          <div className="about-user">
            <div className="img-about-user">
              <img src="images/user-color.png" alt="friend-user" />
            </div>

            <div className="title">Bạn bè</div>
          </div>
          <div className="about-user">
            <div className="img-about-user">
              <img src="images/saved.png" alt="saved" />
            </div>

            <div className="title">Đã lưu</div>
          </div>
          <div className="about-user">
            <div className="img-about-user">
              <img src="images/home-color.png" alt="marketplace" />
            </div>
            <div className="title">Marketplace</div>
          </div>
        </div>
      </div>
      <div className="dashboard">
        <div className="input-box">
          <form onSubmit={onSubmitPost}>
            <div className="input-area">
              <a href="#">
                <img
                  src="images/Logo-512px-acopy.png"
                  className="logo-img"
                  alt="info"
                />
              </a>
              <input
                id="input-area-text"
                placeholder="Bạn đang nghĩ gì thế?"
                name="title"
                onChange={onChangePost}
                required
              />
              <div className="insert-image">
                <input
                  type="file"
                  name="image"
                  onChange={(e) => setFile(e.target.files[0])}
                  accept=".png,.jpeg,.jpg"
                  required
                />
              </div>
            </div>
            <button type="submit" className="submit-btn">
              Đăng
            </button>
          </form>
        </div>
        {displayPosts}
      </div>

      <div className="border-contact-user">
        <div className="contact-user">
          <div className="search-bar">
            <h5>Người liên hệ</h5>
            <div className="search-bar-icon">
              <img src="images/search.png" alt="search icon" />
              <img src="images/three-dots.png" alt="dot-menu" />
            </div>
          </div>
          <div className="user-bar">
            <ul className="user-bar-list">{displayUserOnline}</ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
