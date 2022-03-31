import Player from "./classes/Player";

const handleHostMessage = (msg, addPlayer, handleError = () => console.error(msg)) => {
  const data = JSON.parse(msg)

  if (data.error) {
    handleError(data.error)
  }

  switch (data.message) {
    case "newPlayer":
      addPlayer(new Player(data.username))
      break
    case "raffleStarted":
      break
    default:
      throw new Error('Unexpected incoming message: ' + msg)
  }
}

const handlePlayerMessage = (msg, handleError = () => console.error(msg)) => {
  const data = JSON.parse(msg)

  if (data.error) {
    handleError(data.error)
  }
}

export { handleHostMessage, handlePlayerMessage }