import React, { useState, useEffect } from "react";
import {
  Container,
  Title,
  Input,
  TextArea,
  ImageContainer,
  Image,
  Button,
} from "./styles";
import CustomSnackbar from "../util/CustomSnackbar";
import { useNavigate, useLocation } from "react-router-dom";
import wolve from "../assets/wolve1.jpg";

const Create = () => {
  const location = useLocation();
  const editCard = location.state && location.state.editCard;
  const cardData = location.state && location.state.cardData;
  const [title, setTitle] = useState(editCard ? cardData.title : "");
  const [username, setUsername] = useState(sessionStorage.getItem("userName"));
  const [text, setText] = useState(editCard ? cardData.text : "");
  const [warningSnackbar, setWarningSnackbar] = useState(false);
  const [successSnackbar, setSuccessSnackbar] = useState(false);
  const [clearSnackbar, setClearSnackbar] = useState(false);
  const [errorSnackbar, setErrorSnackbar] = useState(false);
  const [allClearSnackbar, setAllClearSnackbar] = useState(false);
  const [image, setImage] = useState(editCard ? cardData.image : null);
  const navigate = useNavigate();

  console.log(sessionStorage.getItem("userName"));

  const handleSnackbarClose = () => {
    setWarningSnackbar(false);
    setErrorSnackbar(false);
    setSuccessSnackbar(false);
    setClearSnackbar(false);
    setAllClearSnackbar(false);
  };

  const handleImageChange = (event) => {
    const selectedImage = event.target.files[0];
    console.log("Selecciono imagne");
    console.log(selectedImage);
    console.log("que tiene cardData.image");
    if (selectedImage) {
      setImage(URL.createObjectURL(selectedImage));
      cardData.image = selectedImage;
    }
  };

  const handleReset = (event) => {
    event.preventDefault();
    setClearSnackbar(true);
    setTitle("");
    setText("");
    setUsername(username);
    setImage(null);
  };

  const handleDelete = () => {
    setAllClearSnackbar(true);
    localStorage.clear();
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (editCard) {
      const newData = {
        image: image,
        title: title,
        username: username,
        text: text,
      };

      editarDato(cardData.id, newData);
      setSuccessSnackbar(true);
      navigate("/viewPost");
    } else {
      const titulo = title;
      const texto = text;

      if (titulo === "" || texto === "") {
        setWarningSnackbar(true);
        return;
      }

      const data = {
        image: image,
        title: title,
        username: username,
        text: text,
      };

      agregarDato(data);
      setSuccessSnackbar(true);
      navigate("/viewPost");
    }
  };

  useEffect(() => {
    const currentPath = location.pathname;
    localStorage.setItem("lastVisitedPage", currentPath);
  }, [location.pathname]);

  function agregarDato(data) {
    const listLocalStorage = localStorage.getItem("miLista");
    const miListaLocalStorage = JSON.parse(listLocalStorage) || [];
    miListaLocalStorage.push(data);
    const listaJSONActualizada = JSON.stringify(miListaLocalStorage);
    localStorage.setItem("miLista", listaJSONActualizada);
  }

  function editarDato(index, newData) {
    const listLocalStorage = localStorage.getItem("miLista");
    const miListaLocalStorage = JSON.parse(listLocalStorage) || [];

    miListaLocalStorage[index] = newData;
    const listaJSONActualizada = JSON.stringify(miListaLocalStorage);
    localStorage.setItem("miLista", listaJSONActualizada);
  }

  return (
    <Container>
      <CustomSnackbar
        open={warningSnackbar}
        onClose={handleSnackbarClose}
        message="Por favor, completa título y mensaje."
        severity="warning"
        duration={3000}
      />
      <CustomSnackbar
        open={successSnackbar}
        onClose={handleSnackbarClose}
        message="Publicación exitosa."
        severity="success"
        duration={2000}
      />
      <CustomSnackbar
        open={errorSnackbar}
        onClose={handleSnackbarClose}
        message="Error al realizar la publicación."
        severity="error"
        duration={3000}
      />
      <CustomSnackbar
        open={clearSnackbar}
        onClose={handleSnackbarClose}
        message="Se limpiaron todos los campos con éxito."
        severity="success"
        duration={3000}
      />
      <CustomSnackbar
        open={allClearSnackbar}
        onClose={handleSnackbarClose}
        message="Se borraron todos los posteos creados."
        severity="success"
        duration={3000}
      />
      <div>
        <Title>
          {editCard ? "Editar la Publicación" : "Crear Publicación"}
        </Title>
        {editCard ? (
          <h6 style={{ marginTop: "-5px" }}>
            Si no has editado ningun valor, clickea en editar para continuar
          </h6>
        ) : (
          <></>
        )}
      </div>
      <form onSubmit={handleSubmit} onReset={handleReset}>
        <h5 style={{ textAlign: "start", marginBottom: "-1px" }}>Username</h5>
        <Input
          type="text"
          placeholder="Nombre de Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          readOnly={true}
        />
        <h5 style={{ textAlign: "start", marginBottom: "-1px" }}>Titulo</h5>
        <Input
          type="text"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ marginTop: "1px", marginBottom: "20px" }}
        />
        <h5 style={{ textAlign: "start", marginBottom: "20px"}}>Carga una imagen</h5>
        <ImageContainer>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {/* <Image
            height="250"
            // src={cardData.image}
            src={editCard ? cardData.image : image}
            alt="Imagen cargada"
          /> */}
        </ImageContainer>
        <h5 style={{ textAlign: "start", marginBottom: "-1px"}}>Mensaje</h5>
        <TextArea
          style={{ marginTop: "1px" }}
          placeholder="Escribe tu mensaje..."
          rows={5}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <Button
          style={{ background: "green", marginRight: "10px" }}
          type="submit"
        >
          {editCard ? "Editar" : "Enviar"}
        </Button>
        <Button
          style={{ background: "black", marginRight: "10px" }}
          type="reset"
        >
          Limpiar
        </Button>
        {editCard ? (
          <></>
        ) : (
          <Button
            onClick={handleDelete}
            style={{ background: "red", marginTop: "20px" }}
            type="button"
          >
            Eliminar todos los posteos
          </Button>
        )}
      </form>
    </Container>
  );
};

export default Create;
