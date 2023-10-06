import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "../Home";
import ResponsiveDrawer from "../Nav/ResponsiveDrawer";
import Create from "../Create";
import Post from "../Post";
import Feature from "../Feature";

const RouterMain = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ResponsiveDrawer />}>
            <Route path="/home" element={<Home />} />
            <Route path="/create" element={<Create />} />
            <Route path="/post" element={<Post />} />
            <Route path="/feature" element={<Feature />} />
            <Route path="/feature" element={<Feature />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default RouterMain;
