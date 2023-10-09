import React from "react";
import "../App.css";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";

function Home() {
  return (
    <>
      <Box>
        <Toolbar component="img" />
        <img
          style={{ marginTop: "-10px" }}
          className="imagen-home" // Clase para escritorio
          src="https://cdn.wallpapersafari.com/59/87/lBXpxN.jpg"
          alt="Portada"
        />
      </Box>
      <ul style={{ marginBottom: "5%", marginTop: "5%" }}>
        <li>
          <p style={{ color: "white" }}>Actividad 1</p>
        </li>
        <li>
          <p style={{ color: "white" }}>Actividad 2</p>
        </li>
        <li>
          <p style={{ color: "white" }}>Actividad 3</p>
        </li>
        <li>
          <p style={{ color: "white" }}>Actividad 4</p>
        </li>
      </ul>
      <p
        style={{
          color: "white",
          margin: "5%",
          textAlign: "initial",
          marginBottom: "10%",
        }}
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
        finibus iaculis lacinia. Sed mauris urna, accumsan vitae enim pharetra,
        lobortis varius metus. Aliquam iaculis cursus massa nec tincidunt.
        Interdum et malesuada fames ac ante ipsum primis in faucibus. Proin
        dapibus bibendum quam ut consectetur. Phasellus rutrum sem neque, nec
        varius augue condimentum in. Duis sodales blandit velit. Sed egestas
        turpis id lorem tristique consectetur. Vestibulum ante ipsum primis in
        faucibus orci luctus et ultrices posuere cubilia curae; Donec sagittis
        accumsan magna, eu viverra quam suscipit sed. Pellentesque quis leo leo.
        Donec pellentesque molestie quam sed sollicitudin. Proin vitae enim
        tellus. Pellentesque tristique porttitor nisl non pellentesque.
        Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere
        cubilia curae; Donec sit amet augue sit amet leo pellentesque interdum
        et sit amet nisi. Nam interdum fermentum tellus nec porttitor. Clases
        online en vivo dictadas por expertos de la industria, enfoque 100%
        práctico, mentorías personalizadas y acceso a una comunidad de +210.000
        estudiantes.
      </p>
    </>
  );
}

export default Home;
