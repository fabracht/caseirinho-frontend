import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { MainButton } from "./components/MainButton";
// import ProductCard from "./components/ProductCard";
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
          {/* <Route path="/card">
            <ProductCard />
          </Route> */}
          <Route path="/">
            <HeaderHome />
            <Home />
          </Route>
        </Switch>
      </Router>
      <MainButton />
    </div>
  );
}

export default App;
