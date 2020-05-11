import React, { useState, useMemo } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Encode, Decode, Team, About, Home, CreateUser, LogIn } from "./pages";
import { Theme, Header } from "./components";
import { UserContext } from "./UserContext";
function App() {
  const [isLoggedIn, setLogin] = useState(false);
  const providerValue = useMemo(() => ({ isLoggedIn, setLogin }), [
    isLoggedIn,
    setLogin,
  ]);
  return (
    <Theme>
      <Router>
        <UserContext.Provider value={providerValue}>
          <Header />
          <Switch>
            <Route exact path={"/"} component={Home}></Route>
            <Route path={"/encode"} component={Encode}></Route>
            <Route path={"/decode"} component={Decode}></Route>
            <Route path={"/about"} component={About}></Route>
            <Route path={"/team"} component={Team}></Route>
            <Route path={"/create-user"} component={CreateUser}></Route>
            <Route path={"/log-in"} component={LogIn}></Route>
          </Switch>
        </UserContext.Provider>
      </Router>
    </Theme>
  );
}

export default App;
