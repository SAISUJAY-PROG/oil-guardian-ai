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
import DashboardView from "./components/dashboard/DashboardView";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <TargetCursor
        spinDuration={1.2}
        hideDefaultCursor={true}
        parallaxOn={true}
        cursorColor="#ffffff"
        cursorColorOnTarget="#f28a18"
      />

      <Routes>
        <Route
          path="/"
          element={
            <AuthProvider>
              <Login />
            </AuthProvider>
          }
        />
        <Route
          path="/login"
          element={
            <AuthProvider>
              <Login />
            </AuthProvider>
          }
        />
        <Route
          path="/employee"
          element={
            <AuthProvider>
              <Employee />
            </AuthProvider>
          }
        />
        <Route
          path="/officer"
          element={
            <AuthProvider>
              <Officer />
            </AuthProvider>
          }
        />

        {/* Phase 4 Dashboard Preview (Bypasses auth loader) */}
        <Route
          path="/dashboard"
          element={
            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1.5rem', minHeight: '100vh', background: '#0a0e17' }}>
              <DashboardView />
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;