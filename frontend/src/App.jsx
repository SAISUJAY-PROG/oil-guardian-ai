import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";

import TargetCursor from "./components/TargetCursor";

import Login from "./pages/Login";
import Employee from "./pages/Employee";
import Officer from "./pages/Officer";

import "./App.css";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>

        <TargetCursor
          spinDuration={1.2}
          hideDefaultCursor={true}
          parallaxOn={true}
          cursorColor="#ffffff"
          cursorColorOnTarget="#f28a18"
        />

        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />

          <Route path="/employee" element={<Employee />} />
          <Route path="/officer" element={<Officer />} />
        </Routes>

      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;