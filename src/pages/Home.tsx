import React, { Component } from "react";
import { Link } from "react-router-dom";
import mapLogo from "../assets/biker-map.svg";
import fruits from "../assets/fruits-pasta.svg";

export class Home extends Component {
  render() {
    return (
      <div className="home-container">
        <Link to="/loja" className="button">
          <span className="button-text">Faça seu pedido</span>
        </Link>
        <div id="home-image-1" className="home-image">
          <img src={mapLogo} alt="" />
        </div>
        <div id="home-image-2" className="home-image">
          <img src={fruits} alt="" />
        </div>
      </div>
    );
  }
}
