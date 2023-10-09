import React from "react";
import heroes from "../assets/heroes.jpg";
import Box from "@mui/material/Box";
import "../App.css";
import Toolbar from "@mui/material/Toolbar";

function Feature() {
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
