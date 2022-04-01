import Player from "./classes/Player";

const handleHostMessage = (msg, addPlayer, removePlayer, setJoinCode, handleError = () => console.error(msg)) => {
  const data = JSON.parse(msg)

  if (data.error) {
    handleError(data.error)
    return
  }

  switch (data.message) {
    case "newPlayer":
      addPlayer(new Player(data.username))
      break
    case "raffleStarted":
      setJoinCode(data.joinCode)
      break
    case "playerLeft":
      removePlayer(data.username)
      break
    default:
      throw new Error('Unexpected incoming message: ' + msg)
  }
}

const handlePlayerMessage = (msg, setPlayer, handleError = () => console.error(msg)) => {
  const data = JSON.parse(msg)

  if (data.error) {
    handleError(data.error)
  }

  switch (data.message) {
    case "joinedRaffle":
      const player = new Player(data.username)
      setPlayer(player)
      break;
    default:
      throw new Error('Unexpected incoming message: ' + msg)
  }
}

export { handleHostMessage, handlePlayerMessage }