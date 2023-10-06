import React from "react";
import heroes from "../assets/heroes.jpg";

function Feature() {
  return (
    <div className="container" style={{ justifyContent: "center", background: "black" }}>
      <img
        style={{
          height: "100%",
          width: "42%",
          marginTop: "1%",
          marginBottom: "3%",
        }}
        src={heroes}
        alt=""
      />
    </div>
  );
}

export default Feature;
