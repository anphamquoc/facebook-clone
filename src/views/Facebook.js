import Menu from "../components/layout/Menu";
import React from "react";
import DashBoard from "../components/layout/DashBoard";
import PostContextProvider from "../context/facebook/PostContext";

const Facebook = () => {
  return (
    <div className="border-all">
      <PostContextProvider>
        <Menu />
        <DashBoard />
      </PostContextProvider>
    </div>
  );
};

export default Facebook;
