import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import "./index.css";
import Home from "./pages/Home";
import Nav from "./components/ui/Nav";
import Intro from "./pages/Intro";
import Scan from "./pages/Scan";
import DemoStart from "./pages/DemoStart";
import Demographics from "./pages/Demographics";
import Camera from "./pages/Camera";
import { ResultProvider } from "./context/ResultContext";

function App() {
  return (
    <ResultProvider>
    <Router>
      <div className="App">
        <Nav />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/Intro" element={<Intro />}></Route>
          <Route path="/Scan" element={<Scan />}></Route>
          <Route path="/DemoStart" element={<DemoStart />}></Route>
          <Route path="/Demographics" element={<Demographics />}></Route>
          <Route path="/Camera" element={<Camera />}></Route>
        </Routes>
      </div>
    </Router>
    </ResultProvider>
  );
}

export default App;
