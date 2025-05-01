import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import BookingForm from "./components/BookingForm";
import AdminSignup from "./components/AdminSignup";
import AdminLogin from "./components/AdminLogin";
import AdminDashboard from "./components/AdminDashboard";
import WebSocketDashboard from "./components/WebsocketDashboard";

function App() {
  // Track admin token in state, initialized from localStorage
  const [adminToken, setAdminToken] = useState<string | null>(localStorage.getItem("adminToken"));
  const [showLogin, setShowLogin] = useState(true);

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    setAdminToken(null);
  };

  return (
    <Router>
      <nav style={{ padding: "1rem", textAlign: "right" }}>
        <Link to="/" style={{ margin: "0 1rem" }}>Home</Link>
        <Link to="/dashboard" style={{ margin: "0 1rem" }}>Dashboard</Link>
      </nav>
      <Routes>
        <Route path="/" element={
          adminToken ? (
            <div>
              <button onClick={handleLogout} style={{ float: "right", margin: "1rem" }}>Logout</button>
              <AdminDashboard />
            </div>
          ) : (
            <div>
              {showLogin ? (
                <>
                  <AdminLogin onLogin={token => { setAdminToken(token); localStorage.setItem("adminToken", token); }} />
                  <p>
                    Don't have an account?{" "}
                    <button onClick={() => setShowLogin(false)}>Sign Up</button>
                  </p>
                </>
              ) : (
                <>
                  <AdminSignup onSignup={() => setShowLogin(true)} />
                  <p>
                    Already have an account?{" "}
                    <button onClick={() => setShowLogin(true)}>Login</button>
                  </p>
                </>
              )}
              <hr />
              <BookingForm />
            </div>
          )
        } />
        <Route path="/dashboard" element={<WebSocketDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
