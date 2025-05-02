import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // ✅ correct
import "./App.css";
import "./index.css";
import Home from "./pages/Home";
import Nav from "./components/ui/Nav";

function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <Routes>
          <Route path="/" element={<Home />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
