import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Header as HeaderHome } from "./layout/HeaderHome";
import { Store } from "./pages/Store";
import { Home } from "./pages/Home";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/loja">
            <Store />
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
    </div>
  );
}

export default App;
