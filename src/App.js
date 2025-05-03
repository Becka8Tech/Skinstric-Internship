import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // ✅ correct
import "./App.css";
import "./index.css";
import Home from "./pages/Home";
import Nav from "./components/ui/Nav";
import Intro from "./pages/Intro";

function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/Intro" element={<Intro />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
