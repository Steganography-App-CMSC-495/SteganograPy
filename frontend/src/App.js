import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios.get("/message").then((res) => {
      setMessage(res.data.message);
      console.log("res", res);
    });
  }, []);
  const display = `Message ----> ${message}`;
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>SteganograPy</h1>
        <div>{display}</div>
      </header>
    </div>
  );
}

export default App;
