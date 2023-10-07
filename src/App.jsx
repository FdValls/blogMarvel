import * as React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ResponsiveDrawer from "./components/Nav/ResponsiveDrawer";
import Home from "./components/Home";
import Create from "./components/Create";
import Post from "./components/Post";
import Feature from "./components/Feature";
// import { AuthProvider } from "../src/components/context/AuthContext.js"; // Importa AuthProvider
import RouterMain from "./components/routes/RouterMain";

function App() {

  return (
    <>
      <RouterMain/>
    </>
  );
}

export default App;
