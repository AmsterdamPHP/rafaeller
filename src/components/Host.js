import HostKey from "./HostKey";
import JoinCode from "./JoinCode";
import Loading from "./Loading";
import Players from "./Players";
import React, {useState} from "react";
import { handleHostMessage } from "../MessageHandler";
import Banner from "./Banner";
import HostInstruction from "./HostInstruction";
import PickingWinner from "./PickingWinner";
import Winner from "./Winner";

const Host = (props) => {
  const {ws, connected} = props

  const [error, setError] = useState("")
  const [hostKey, setHostKey] = useState("")
  const [joinCode, setJoinCode] = useState(false)
  const [players, setPlayers] = useState([])
  const [pickingWinner, setPickingWinner] = useState(false)
  const [winner, setWinner] = useState(false)

  document.body.onkeyup = function(e) {
    if (shouldPickWinner(e, players.length, pickingWinner)) {
      ws.send(JSON.stringify({"message": "pickWinner"}))
      setPickingWinner(true)
    }
  }

  const onHostKeySubmit = e => {
    e.preventDefault()
    setError("")
    const code = Math.floor(Math.random() * 9999).toString().padStart(4, '0')

    ws.send(JSON.stringify({
      "message": "registerHost",
      "hostKey": hostKey,
      "joinCode": code,
    }))

    setHostKey("")
  }

  const onChange = e => setHostKey(e.target.value)
  ws.onmessage = msg => handleHostMessage(msg.data, addPlayer, removePlayer, setJoinCode, setWinner, setError)

  const addPlayer = player => {
    setPlayers([...players, player])
  }

  const removePlayer = username => {
    const filtered = players.filter((player) => player.username !== username)
    setPlayers(filtered)
  }

  return (
    <React.Fragment>
      {connected && players.length > 1 && !pickingWinner &&
        <HostInstruction winnerPicked={winner !== false} />
      }
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
        { !pickingWinner ?
            !winner
              ? <Banner />
              : <Winner winner={winner} />
          : <PickingWinner {...{
            setPickingWinner,
            players,
          }} />
        }
      </header>
      {
        connected && joinCode &&
        <Players players={players} />
      }
    </React.Fragment>
  )
}

const shouldPickWinner = (e, playerCount, pickingWinner) => {
  return pickingWinner === false && playerCount > 1 &&
    (e.code === "Space" || e.keyCode === 32) /*for IE compatibility should we need it, god forbid.*/
}

export default Host