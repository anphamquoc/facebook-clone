import React, { useContext } from "react";
import "../../Menu.css";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
const Menu = () => {
  const { logoutUser } = useContext(AuthContext);
  const logout = () => {
    logoutUser();
  };
  return (
    <div className="border-menu-header">
      <div className="menu-bar">
        <div className="fb-icon-search">
          <a href="#">
            <img
              src="images/fb-icon.png"
              className="fb-icon"
              alt="facebook-icon"
            />
          </a>
          <div className="search-fb">
            <img
              src="images/search.png"
              className="search-icon"
              alt="search-icon"
            />
            <input
              type="text"
              className="input-search"
              name="search"
              placeholder="Tìm kiếm trên facebook"
            />
          </div>
        </div>
        <div className="icon-menu-bar">
          <a href="#">
            <img src="images/home.png" alt="Trang chính" />
          </a>
          <a href="#">
            <img src="images/user.svg" alt="Nhóm" />
          </a>
          <a href="#">
            <img src="images/television.png" alt="Watch" />
          </a>
          <a href="#">
            <img src="images/flag.png" alt="Trang" />
          </a>
          <a href="#">
            <img
              src="images/election-event-on-a-calendar-with-star-symbol.png"
              alt=""
            />
          </a>
        </div>
        <div className="about-user">
          <span className="border-icon">
            <img src="images/dots-menu.png" alt="menu" />
          </span>
          <span className="border-icon">
            <NavLink to="/messenger">
              <img src="images/messenger.png" alt="messenger" />
            </NavLink>
          </span>
          <span className="border-icon">
            <a href="#">
              <img src="images/bell-icon.png" alt="bell" />
            </a>
          </span>
          <span className="border-icon" onClick={logout}>
            <img src="images/logout.svg" alt="log out" />
          </span>
        </div>
      </div>
    </div>
  );
};

export default Menu;
