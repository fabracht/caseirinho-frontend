import React from "react";

export function MainButton() {
  return (
    <div className="menu-button">
      <input
        type="checkbox"
        className="menu-button-input"
        id="menu-button-input"
        name="menu-button-input"
      />
      <label htmlFor="menu-button-input" className="menu-button-label">
        &nbsp;
      </label>
      <div className="menu-button-background">
        <ul className="menu-button-background-list">
          <li className="menu-button-background-list-item">
            <a href="/">Início</a>
          </li>
          <li className="menu-button-background-list-item">
            <a href="/loja">Loja</a>
          </li>
          <li className="menu-button-background-list-item">
            <a href="/sobre">Sobre</a>
          </li>
        </ul>
      </div>
    </div>
  );
}
