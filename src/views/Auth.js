import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { Redirect } from "react-router-dom";
import LoginRegister from "../components/auth/LoginRegister";

const Auth = ({ authRoute }) => {
  let body;
  const {
    authState: { authLoading, isAuthenticated },
  } = useContext(AuthContext);
  if (authLoading) {
    body = "Loading...";
  } else if (isAuthenticated) return <Redirect to="/dashboard" />;
  else {
    body = <LoginRegister />;
  }
  return <div>{body}</div>;
};
export default Auth;
