import { createContext, useContext, useEffect, useReducer } from "react";
import axios from "axios";
import { postReducer } from "../../reducers/facebook/postReducer";
import {
  apiUrl,
  POST_ADDED_FAILED,
  POST_ADDED_SUCCESS,
  POST_LOADED_FAILED,
  POST_LOADED_SUCCESS,
} from "../constant";
import { AuthContext } from "../AuthContext";

export const PostContext = createContext();
const PostContextProvider = ({ children }) => {
  const [postState, dispatch] = useReducer(postReducer, {
    posts: [],
    postLoading: true,
  });
  const {
    authState: { user },
  } = useContext(AuthContext);
  const getPosts = async () => {
    try {
      const response = await axios.get(`${apiUrl}/post`);
      if (response.data.success) {
        dispatch({
          type: POST_LOADED_SUCCESS,
          payload: response.data.posts,
        });
      }
    } catch (error) {
      console.log("load failed");
      dispatch({
        type: POST_LOADED_FAILED,
      });
    }
  };
  // getPosts();
  useEffect(() => {
    getPosts();
  }, []);

  const submitPost = async (postForm) => {
    const data = new FormData();
    const fileName = Date.now() + postForm.image.name;
    data.append("name", fileName);
    data.append("file", postForm.image);
    postForm.image = Date.now() + postForm.image.name;
    await axios.post(`${apiUrl}/upload`, data);
    try {
      const response = await axios.post(`${apiUrl}/post/${user._id}`, postForm);
      console.log(response.data);
      if (response.data.success) {
        dispatch({
          type: POST_ADDED_SUCCESS,
          payload: response.data.newPost,
        });
      }
    } catch (error) {
      console.log(error.message);
      dispatch({
        type: POST_ADDED_FAILED,
      });
    }
  };

  const postContextData = { postState, submitPost, getPosts };
  return (
    <PostContext.Provider value={postContextData}>
      {children}
    </PostContext.Provider>
  );
};

export default PostContextProvider;
