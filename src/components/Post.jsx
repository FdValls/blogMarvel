import * as React from "react";
import "../App.css";
import Card from "./Card/Card.jsx";
import { requestAPIFirst, requestAPISecond } from "../api/requestAPI";
import { useState, useEffect } from "react";
import { getRandomArray } from "../util/arrayRandom.js";
import CircularProgress from "@mui/material/CircularProgress";
import { useLocation } from "react-router-dom";

function Post() {
  const [dataFirst, setDataFirst] = useState(null);
  const [dataSecond, setDataSecond] = useState(null);
  const [randomData, setRandomData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    requestAPIFirst
      .get()
      .then((response) => {
        setDataFirst(response);
      })
      .catch((error) => {
        console.error(error);
      });
    requestAPISecond
      .get()
      .then((response) => {
        setDataSecond(response);
      })
      .catch((error) => {
        console.error(error);
      });

    const currentPath = location.pathname;
    localStorage.setItem("lastVisitedPage", currentPath);
  }, [location.pathname]);

  useEffect(() => {
    if (dataFirst && dataSecond) {
      setRandomData(
        getRandomArray(dataFirst.data.results, dataSecond.data.results)
      );
      setIsLoading(false);
    }
  }, [dataFirst, dataSecond]);

  return (
    <>
      <div className="container" style={{ justifyContent: "center" }}>
        {/* Mostrar CircularProgress mientras se cargan los datos */}
        {isLoading ? (
          <CircularProgress size="11rem" />
        ) : (
          <div className="grid">
            {randomData.map((item, index) => (
              <div key={index}>
                <Card data={item} />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Post;
