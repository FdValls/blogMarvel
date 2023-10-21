import React, { useEffect } from "react";
import heroes from "../assets/heroes.jpg";
import Box from "@mui/material/Box";
import "../App.css";
import Toolbar from "@mui/material/Toolbar";
import { useLocation } from "react-router-dom";

function Feature() {
  const location = useLocation();

  useEffect(() => {
    const currentPath = location.pathname;
    localStorage.setItem("lastVisitedPage", currentPath);
  }, [location.pathname]);

  return (
    <>
      <Box>
        <Toolbar component="img" />
        <img
          className="imagen-desktop"
          src="https://i.pinimg.com/564x/b0/0d/fb/b00dfba37b43308b151ab69e1e9b1608.jpg"
          alt="Portada"
        />
      </Box>
    </>
  );
}

export default Feature;
