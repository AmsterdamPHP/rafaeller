const wsUrl = process.env.REACT_APP_RAFFLER_SERVER;
const connect = () => {
  return new WebSocket(wsUrl)
}

/**
 * Ping the WebSocket server every so often to avoid the connection closing by timeout.
 */
const keepAlive = (ws, seconds = 25) => {
  const interval = window.setInterval(() => {
    if (ws.readyState !== ws.OPEN) {
      window.clearInterval(interval)
    }

    ws.send('ping')
  }, seconds * 1000 )
}

export {connect, keepAlive}
