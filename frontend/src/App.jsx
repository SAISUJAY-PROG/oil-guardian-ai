import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Employee from "./pages/Employee";
import Officer from "./pages/Officer";
import TargetCursor from "./components/TargetCursor";

function App() {
  return (
    <Router>
      <TargetCursor
        spinDuration={1.2}
        cursorColor="#3b82f6"
        cursorColorOnTarget="#fafafb"
      />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/employee" element={<Employee />} />
        <Route path="/officer" element={<Officer />} />
      </Routes>
    </Router>
  );
}

export default App;