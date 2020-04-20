import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Encode from "./pages/encode";
import Header from "./components/header/Header";
import Team from "./pages/team/Team";
import About from "./pages/about/About";
import Decode from "./pages/decode/Decode";
function App() {
  // const [message, setMessage] = useState("");

  // const getMessage = (endpoint) => {
  //   axios.get(endpoint).then((res) => {
  //     setMessage(res.data.message);
  //   });
  // };
  // useEffect(() => {
  //   getMessage("/message");
  // }, []);
  // const display = `Message ----> ${message}`;
  return (
    <Router>
      <Header />
      <Switch>
        <Route path={"/encode"} component={Encode}></Route>
        <Route path={"/decode"} component={Decode}></Route>
        <Route path={"/about"} component={About}></Route>
        <Route path={"/team"} component={Team}></Route>
      </Switch>
    </Router>
  );
}

export default App;

/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>SteganograPy</h1>
          <div>{display}</div>
          <button onClick={() => getMessage("/message")}>Message 1</button>
          <button onClick={() => getMessage("/m2")}>Message 2</button>
        </header> */
