import {useState} from "react";
import Loading from "./Loading";
import OtpInput from "react-otp-input";
import {handlePlayerMessage} from "../MessageHandler";
import Banner from "./Banner";
import Avatar from "./Avatar";
import * as ws from "../util/ws-util"

const conn = ws.connect()
ws.keepAlive(ws)

const Join = (props) => {
  const [error, setError] = useState(false)
  const [connected, setConnected] = useState(false)
  const [username, setUsername] = useState("")
  const [joinCode, setJoinCode] = useState("")
  const [player, setPlayer] = useState()

  conn.onopen = () => setConnected(true)
  conn.onclose = () => {
    setConnected(false)
    setPlayer(null)
  }
  conn.onmessage = (msg) => {
    handlePlayerMessage(msg.data, setPlayer, setError)
  }

  const onUsernameChange = (e) => setUsername(e.target.value)
  const onJoinCodeChange = (code) => {
    setJoinCode(code)
  }
  const validate = () => username.length > 0 && joinCode.length === 4
  const onSubmit = (e) => {
    setError(false)
    e.preventDefault()
    conn.send(JSON.stringify({
      "message": "registerPlayer",
      "username": username,
      "joinCode": joinCode,
    }))
  }

  return (
    <div className="join-container">
      <Banner />
      {connected && !player &&
      <form
        id="playerJoin"
        onSubmit={onSubmit}
      >
        <span className="error">{error && error}</span>
        <input
          type="text"
          placeholder="username"
          className="blackUnderlined"
          value={username}
          onChange={onUsernameChange}
        />
        <OtpInput
          value={joinCode}
          numInputs={4}
          onChange={onJoinCodeChange}
          separator={<span>-</span>}
          isInputNum={true}
          placeholder={"0000"}
          inputStyle="inputStyle"
        />
        <button
          type="submit"
          disabled={!validate()}
        >
          Join
        </button>
      </form>
      }
      {connected && player &&
        <span className="playerJoined">
          <Avatar svg={player.avatar} />
          <p>You've joined the raffle as {username}! 🎉</p>
        </span>
      }
      {!connected &&
        <Loading message="not connected to raffle server..." />
      }
    </div>
  )
}

export default Join