import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Schedule from "./pages/Schedule";
import Saved from "./pages/Saved";
import "./App.css";
import Room from "./pages/Room";
import Meeting from "./pages/Meeting";
import Register from "./pages/Register";
import Login from "./pages/Login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/meet" element={<Meeting />} /> */}
        <Route path="/room" element={<Room />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/saved" element={<Saved />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
