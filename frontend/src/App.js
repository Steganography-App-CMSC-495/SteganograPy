import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";

function App() {
  const [message, setMessage] = useState("");

  const getMessage = (endpoint) => {
    axios.get(endpoint).then((res) => {
      setMessage(res.data.message);
    });
  };
  useEffect(() => {
    getMessage("/message");
  }, []);
  const display = `Message ----> ${message}`;
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>SteganograPy</h1>
        <div>{display}</div>
        <button onClick={() => getMessage("/message")}>Message 1</button>
        <button onClick={() => getMessage("/m2")}>Message 2</button>
      </header>
    </div>
  );
}

export default App;
