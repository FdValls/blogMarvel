import * as React from "react";
import "../App.css";
import Card from "./Card/Card.jsx";
import { requestAPIFirst, requestAPISecond } from "../api/RequestAPI";
import { useState, useEffect } from "react";
import { getRandomArray } from "../util/arrayRandom.js";

function Post() {
  const [dataFirst, setDataFirst] = useState(null);
  const [dataSecond, setDataSecond] = useState(null);
  const [randomData, setRandomData] = useState([]);

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
  }, []);

  useEffect(() => {
    if (dataFirst && dataSecond) {
      setRandomData(
        getRandomArray(dataFirst.data.results, dataSecond.data.results)
      );
    }
  }, [dataFirst, dataSecond]);

  return (
    <>
      <div className="container" style={{ justifyContent: "center" }}>
        <div className="grid">
        {randomData.map((item, index) => (
          <div key={index}>
            <Card data={item} />
          </div>
        ))}
        </div>
      </div>
    </>
  );
}

export default Post;
