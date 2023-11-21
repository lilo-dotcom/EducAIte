import { useContext } from "react";
import { AccountContext } from "../Auth/AccountContext";

const { Outlet, Navigate } = require("react-router");

const useAuth = () => {
  const { user } = useContext(AccountContext);
  if (user.token) {
    user.loggedIn = true;
  } else {
    user.loggedIn = false;
  }
  return user && user.loggedIn;
};

const PrivateRoutes = () => {
  const isAuth = useAuth();
  return isAuth ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoutes;