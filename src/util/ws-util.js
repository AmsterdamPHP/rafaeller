const wsUrl = 'wss://raffle-server.herokuapp.com'

const connect = () => {
  return new WebSocket(wsUrl)
}

/**
 * Ping the WebSocket server every so often to avoid the connection closing by timeout.
 */
const keepAlive = (ws, seconds = 25) => {
  while (ws.readyState === WebSocket.OPEN) {
    setTimeout(ws.send('ping'), seconds * 1000)
  }
}

export {connect, keepAlive}