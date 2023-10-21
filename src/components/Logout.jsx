import { useEffect, useContext } from "react";
import { AuthContext } from "./context/AuthContext.js";
import { useNavigate, useLocation } from "react-router-dom";

const Logout = () => {
  const { setAuth, setUserName } = useContext(AuthContext);
  const navigate = useNavigate();

  const handler = () => {
    sessionStorage.removeItem("isAuthenticated");
    sessionStorage.removeItem("userName");
    setAuth(false);
    navigate("/");
  };

  useEffect(() => {
    handler();
  }, [location.pathname]);

  return <></>;
};

export default Logout;
