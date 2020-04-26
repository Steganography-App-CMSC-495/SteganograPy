import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Encode, Decode, Team, About, Home } from "./pages";
import { Theme, Header } from "./components";

function App() {
  return (
    <Theme>
      <Router>
        <Header />
        <Switch>
          <Route exact path={"/"} component={Home}></Route>
          <Route path={"/encode"} component={Encode}></Route>
          <Route path={"/decode"} component={Decode}></Route>
          <Route path={"/about"} component={About}></Route>
          <Route path={"/team"} component={Team}></Route>
        </Switch>
      </Router>
    </Theme>
  );
}

export default App;
