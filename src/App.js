import "./App.css";
import Join from "./components/Join";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Host from "./components/Host";
import * as ws from "./util/ws-util";
import {useState} from "react";

const conn = ws.connect()

function App() {
  const [connected, setConnected] = useState(false)

  conn.onopen = () => {
    ws.keepAlive(conn)
    setConnected(true)
  }

  conn.onclose = () => {
    setConnected(false)
  }

  return (
    <Router basename={`${process.env.PUBLIC_URL}/`}>
      <div className="App">
        <Routes>
          <Route path="/" element={<Host ws={conn} connected={connected} />} />
          <Route path="/join" element={<Join ws={conn} connected={connected} setConnected={setConnected} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
