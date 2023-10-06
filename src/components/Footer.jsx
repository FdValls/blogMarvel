import React from "react";
import { BsWhatsapp, BsInstagram, BsGithub } from "react-icons/bs";
import "../App.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="pFooter">
        <a href="#" className="icon-link">
          <BsWhatsapp />
        </a>
        <a href="#" className="icon-link">
          <BsInstagram />
        </a>
        <a href="#" className="icon-link">
          <BsGithub />
        </a>
      </div>
        <p style={{alignSelf: "center", fontSize: "20px"}}>© 2023 Company, Inc</p>
    </footer>
  );
}

export default Footer;
