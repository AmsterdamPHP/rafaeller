import "./App.css";
import JoinCode from "./components/JoinCode"
import Players from "./components/Players";
import React, { useState } from 'react';
import HostKey from "./components/HostKey";
import Loading from "./components/Loading";
import handleMessage from "./MessageHandler";

const ws = new WebSocket('ws://localhost:8000')

function App() {
  const [hostKey, setHostKey] = useState("")
  const [connected, setConnected] = useState(false)
  const [joinCode, setJoinCode] = useState(false)
  const [players, setPlayers] = useState([])

  ws.onopen = () => setConnected(true)
  const onChange = e => setHostKey(e.target.value)

  const onHostKeySubmit = e => {
    e.preventDefault()
    const code = Math.floor(1000 + Math.random() * 9000)

    ws.send(JSON.stringify({
      "message": "registerHost",
      "hostKey": hostKey,
      "joinCode": code,
    }))

    setJoinCode(code)
    setHostKey("")
  }

  const addPlayer = username => {
    setPlayers([...players, {"username": username, "imageUrl": "example.org/avi.jpg"}])
  }

  ws.onmessage = msg => handleMessage(msg.data, addPlayer)

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
            <Players players={players} />
        }
      </header>
    </div>
  );
}

export default App;
