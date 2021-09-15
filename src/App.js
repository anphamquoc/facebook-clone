import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AuthContextProvider from "./context/AuthContext";
import Auth from "./views/Auth";
import Facebook from "./views/Facebook";
import Messenger from "./views/Messenger";
import FriendContextProvider from "./context/messenger/FriendContext";
import MessageContextProvider from "./context/messenger/MessageContext";
import ProtectedRoute from "./components/routing/ProtectedRoute";
import LoginRegister from "./components/auth/LoginRegister";
import PostContextProvider from "./context/facebook/PostContext";
require("dotenv").config();
function App() {
  return (
    <AuthContextProvider>
      <FriendContextProvider>
        <Router>
          <Switch>
            <ProtectedRoute exact path="/" component={Facebook} />
            <Route
              exact
              path="/login"
              render={(props) => <Auth {...props} />}
            ></Route>
            <ProtectedRoute exact path="/dashboard" component={Facebook} />
            <ProtectedRoute exact path="/messenger" component={Messenger} />
          </Switch>
        </Router>
      </FriendContextProvider>
    </AuthContextProvider>
  );
}

export default App;
