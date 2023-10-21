import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  HashRouter,
} from "react-router-dom";
import Home from "../Home";
import ResponsiveDrawer from "../Nav/ResponsiveDrawer";
import Create from "../Create";
import Post from "../Post";
import Feature from "../Feature";
import Logout from "../Logout";
import { useState } from "react";
import { AuthContext, initAutenticacion } from "../context/AuthContext";
import SignInSide from "../SignInSide";

const RouterMain = () => {
  const [auth, setAuth] = useState(initAutenticacion());

  return (
    <>
      <AuthContext.Provider value={{ auth, setAuth }}>
        <HashRouter>
          <Routes>
            <Route path="/" element={<ResponsiveDrawer />}>
              <Route path="/home" element={<Home />} />
              <Route path="/create" element={<Create />} />
              <Route path="/post" element={<Post />} />
              <Route path="/feature" element={<Feature />} />
              <Route
                path="/login"
                element={auth ? <Navigate to="/home" replace /> : <Home />}
              />
              <Route path="/logout" element={<Logout />} />
            </Route>
          </Routes>
        </HashRouter>
      </AuthContext.Provider>
    </>
  );
};

export default RouterMain;
