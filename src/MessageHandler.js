const handleMessage = (msg, addPlayer) => {
  const data = JSON.parse(msg)

  switch (data.message) {
    case "newPlayer":
      addPlayer(data.username)
      break
    default:
      throw new Error('Unexpected incoming message: ' + msg)
  }
}

export default handleMessage