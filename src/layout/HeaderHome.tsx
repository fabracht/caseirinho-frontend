import React from "react";
import logo from "../assets/logo-caseirinho-home.svg";

export class Header extends React.Component {
  render() {
    return (
      <div className="header-container">
        <img src={logo} alt="" className="header-logo" />
      </div>
    );
  }
}
