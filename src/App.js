import "./App.css";
import Join from "./components/Join";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Host from "./components/Host";

function App() {
  console.log(process.env.PUBLIC_URL)
  return (
    <Router basename={`${process.env.PUBLIC_URL}/`}>
      <div className="App">
        <Routes>
          <Route path="/" element={<Host />} />
          <Route path="/join" element={<Join />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
