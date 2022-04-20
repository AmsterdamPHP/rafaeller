import React from "react";
import {useState} from "react";
import Loading from "./Loading";
import OtpInput from "react-otp-input";
import {handlePlayerMessage} from "../MessageHandler";
import Banner from "./Banner";
import Avatar from "./Avatar";

const Join = (props) => {
  const {ws, connected, setConnected} = props
  const [error, setError] = useState(false)
  const [username, setUsername] = useState("")
  const [joinCode, setJoinCode] = useState("")
  const [player, setPlayer] = useState()
  const [result, setResult] = useState(false)

  ws.onclose = () => {
    setConnected(false)
    setPlayer(null)
  }

  ws.onmessage = (msg) => {
    handlePlayerMessage(msg.data, setPlayer, setResult, setError)
  }

  const onUsernameChange = (e) => setUsername(e.target.value)
  const onJoinCodeChange = (code) => {
    setJoinCode(code)
  }
  const validate = () => username.length > 0 && joinCode.length === 4
  const onSubmit = (e) => {
    setError(false)
    e.preventDefault()
    ws.send(JSON.stringify({
      "message": "registerPlayer",
      "username": username,
      "joinCode": joinCode,
    }))
  }

  React.useEffect(() => {
    if (result !== false) {
      window.setTimeout(() => setResult(false), 5000)
    }
  }, [result])

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
      {connected && player && !result &&
        <span className="playerJoined">
          <Avatar svg={player.avatar} />
          <p>You've joined the raffle as {username}! 🎉</p>
        </span>
      }
      {connected && player && result &&
        <p>{result}</p>
      }
      {!connected &&
        <Loading message="not connected to raffle server..." />
      }
    </div>
  )
}

export default Join