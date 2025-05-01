import React, { useState } from "react";
import AdminSignup from "../components/AdminSignup";
import AdminLogin from "../components/AdminLogin";
import AdminDashboard from "../components/AdminDashboard";

export default function AdminPage() {
  const [showLogin, setShowLogin] = useState(true);
  const [token, setToken] = useState<string | null>(localStorage.getItem("adminToken"));

  if (token) {
    return <AdminDashboard />;
  }

  return (
    <div>
      {showLogin ? (
        <>
          <AdminLogin onLogin={setToken} />
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
    </div>
  );
}
