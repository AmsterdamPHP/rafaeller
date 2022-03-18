import "./App.css";
import JoinCode from "./components/Code"
import Participants from "./components/Participants";
import React, { useState } from 'react';
import WebSocket from "ws";

function App() {
  const [participants] = useState([])
  const code = Math.floor(1000 + Math.random() * 9000);
  const url = "http://example.org/join"
  return (
    <div className="App">
      <header className="App-header">
        <JoinCode code={code} url={url} />
        <img
          className="banner"
          src={process.env.PUBLIC_URL + "amsterdamphp-raffler-logo.png"}
          alt="AmsterdamPHP raffler 2.0"
        />
        <Participants participants={participants} />
      </header>
    </div>
  );
}

export default App;
