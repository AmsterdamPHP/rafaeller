import "./App.css";
import JoinCode from "./components/JoinCode"
import Participants from "./components/Participants";
import React, { useState } from 'react';
import HostKey from "./components/HostKey";
import Loading from "./components/Loading";

const ws = new WebSocket('ws://localhost:8080')

ws.onmessage = data => console.log(data)

function App() {
  const [hostKey, setHostKey] = useState("")
  const [connected, setConnected] = useState(false)
  const [joinCode, setJoinCode] = useState(false)
  const [participants] = useState([])

  ws.onopen = () => setConnected(true)
  const onChange = e => setHostKey(e.target.value)

  const onHostKeySubmit = e => {
    e.preventDefault()
    setJoinCode(Math.floor(1000 + Math.random() * 9000))

    ws.send(JSON.stringify({
      "message": "registerHost",
      "hostKey": hostKey,
      "joinCode": joinCode,
    }))

    setHostKey("")
  }

  return (
    <div className="App">
      <header className="App-header">
        { connected && !joinCode
          ? <HostKey
            value={hostKey}
            onSubmit={onHostKeySubmit}
            onChange={onChange}
          />
          : connected
            ? <JoinCode
              url="http://example.org/join"
              code={joinCode}
          />
            : <Loading message="waiting for raffle server..." />

        }
        <img
          className="banner"
          src={process.env.PUBLIC_URL + "amsterdamphp-raffler-logo.png"}
          alt="AmsterdamPHP raffler 2.0"
        />
        {
          connected && joinCode &&
            <Participants participants={participants} />
        }
      </header>
    </div>
  );
}

export default App;
