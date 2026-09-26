import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Employee from "./pages/Employee";
import Officer from "./pages/Officer";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Login />} />

        <Route path="/employee" element={<Employee />} />

        <Route path="/officer" element={<Officer />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;