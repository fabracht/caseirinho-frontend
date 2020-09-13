import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Header as HeaderHome } from "./layout/HeaderHome";
import { Header as HeaderStore } from "./layout/HeaderStore";
import { Home } from "./pages/Home";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/loja">
            <HeaderStore />
          </Route>
          <Route path="/">
            <HeaderHome />
            <Home />
          </Route>
        </Switch>
      </Router>
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
              <a href="/"> menu item</a>
            </li>
            <li className="menu-button-background-list-item">
              <a href="/"> menu item</a>
            </li>
            <li className="menu-button-background-list-item">
              <a href="/"> menu item</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
