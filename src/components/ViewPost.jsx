import React, { useEffect, useState } from "react";
import Card from "./Card/CardCustom.jsx";
import "../App.css";
import { useLocation } from "react-router-dom";
import Cartel from "./Cartel/Cartel.jsx";

export default function ViewPost() {
  const location = useLocation();
  const data = location.state;
  const [cards, setCards] = useState([]);
  const localStorageKey = "miLista";

  useEffect(() => {
    // Cargar tarjetas existentes desde el almacenamiento local
    const storedCards = JSON.parse(localStorage.getItem(localStorageKey)) || [];
    setCards(storedCards);
  }, []);

  useEffect(() => {
    if (data) {
      const { image, title, username, text } = data;
      const newCard = {
        image: image,
        title: title,
        username: username,
        text: text,
      };

      // Comprobar si la tarjeta ya existe en el array antes de agregarla
      if (!cards.some((card) => card.title === newCard.title)) {
        // Copiar las tarjetas existentes y agregar la nueva tarjeta
        const updatedCards = [...cards, newCard];
        setCards(updatedCards);

        // Actualizar el almacenamiento local con las tarjetas actualizadas
        localStorage.setItem(localStorageKey, JSON.stringify(updatedCards));
      }
    }
  }, [data, cards]);

  const handleCardDelete = (index) => {
    // Copia las tarjetas existentes, eliminando la tarjeta con el índice proporcionado
    const updatedCards = cards.filter((card, i) => i !== index);
    setCards(updatedCards);

    // Actualiza el almacenamiento local con las tarjetas actualizadas
    localStorage.setItem(localStorageKey, JSON.stringify(updatedCards));
  };

  return (
    <>
      {" "}
      {cards.length == 0 ? (
        <div className="imagen-empty">
          <h1>
            <Cartel content="🚧 La lista esta vacía 🙁" />
          </h1>
        </div>
      ) : (
        <div className="container" style={{ justifyContent: "center" }}>
          <div className="grid">
            {cards.map((item, index) => (
              <div key={index}>
                <Card
                  data={item}
                  id={index}
                  onDelete={() => handleCardDelete(index)}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
