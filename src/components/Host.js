import HostKey from "./HostKey";
import JoinCode from "./JoinCode";
import Loading from "./Loading";
import Players from "./Players";
import React, {useState} from "react";
import { handleHostMessage } from "../MessageHandler";
import Banner from "./Banner";

const wsUrl = process.env.NODE_ENV === "development" ? "ws://localhost:8000" : "wss://raffle-server.herokuapp.com"
const ws = new WebSocket(wsUrl)

const Host = () => {
  const [error, setError] = useState("")
  const [hostKey, setHostKey] = useState("")
  const [connected, setConnected] = useState(false)
  const [joinCode, setJoinCode] = useState(false)
  const [players, setPlayers] = useState([])

  const onHostKeySubmit = e => {
    e.preventDefault()
    setError("")
    const code = Math.floor(1000 + Math.random() * 9000)

    ws.send(JSON.stringify({
      "message": "registerHost",
      "hostKey": hostKey,
      "joinCode": code,
    }))

    setHostKey("")
  }

  ws.onopen = () => setConnected(true)
  ws.onclose = () => setConnected(false)
  const onChange = e => setHostKey(e.target.value)
  ws.onmessage = msg => handleHostMessage(msg.data, addPlayer, removePlayer, setJoinCode, setError)

  const addPlayer = player => {
    setPlayers([...players, player])
  }

  const removePlayer = username => {
    const filtered = players.filter((player) => player.username !== username)

    console.log(filtered)
    setPlayers(filtered)
  }

  return (
    <React.Fragment>
      <header className="App-header">
        { connected && !joinCode
          ? <HostKey
            value={hostKey}
            onSubmit={onHostKeySubmit}
            onChange={onChange}
            error={error}
          />
          : connected
            ? <JoinCode
              url={`${process.env.PUBLIC_URL}/join`}
              code={joinCode}
            />
            : <Loading message="not connected to raffle server..." />

        }
        <Banner />
      </header>
      {
        connected && joinCode &&
        <Players players={players} />
      }
    </React.Fragment>
  )
}

export default Host