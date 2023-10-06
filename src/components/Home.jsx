import React from "react";
import "../App.css";

function Home() {
  return (
    <div className="home-container">
      <div>
        <img
          style={{ width: "74%", objectFit: "cover", marginTop: "10px" }}
          src={"https://cdn.wallpapersafari.com/59/87/lBXpxN.jpg"}
          alt=""
        />
      </div>
    </div>
  );
}

export default Home;
