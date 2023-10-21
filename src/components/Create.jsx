import React, { useEffect, useState } from "react";
import {
  Container,
  Title,
  Input,
  TextArea,
  ImageContainer,
  Image,
  Button,
} from "./styles"; 
import { FcImageFile } from "react-icons/fc";
import { useLocation } from "react-router-dom";


export default function Create() {
  const [title, setTitle] = useState("");
  const [username, setUsername] = useState("");
  const [text, setText] = useState("");
  const location = useLocation();


  function handleSubmit(event) {
    event.preventDefault();
    console.log("Título:", title);
    console.log("Usuario:", username);
    console.log("Texto:", text);
  }

  useEffect(() => {
    const currentPath = location.pathname;
    localStorage.setItem("lastVisitedPage", currentPath);
  }, [location.pathname]);


  return (
    <Container>
      <Title>Crear Publicación</Title>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Nombre de Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{marginTop: "20px"}}
        />
        <Title>
          Click para cargar una imagen <FcImageFile />{" "}
        </Title>
        <ImageContainer>
          <Image
            src="https://via.placeholder.com/150"
            alt="Imagen de ejemplo"
          />
        </ImageContainer>
        <br />
        <TextArea
          placeholder="Escribe tu mensaje..."
          rows={5}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <Button
          style={{ background: "green", marginRight: "10px" }}
          type="submit"
        >
          Enviar
        </Button>
        <Button style={{ background: "black" }} type="reset">
          Limpiar
        </Button>
      </form>
    </Container>
  );
}
