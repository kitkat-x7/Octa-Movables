import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BookingForm from "./components/BookingForm";
import AdminLogin from "./components/AdminLogin";
import AdminDashboard from "./components/AdminDashboard";
import WebSocketDashboard from "./components/WebsocketDashboard";

function App() {
  const [adminToken, setAdminToken] = useState<string | null>(null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<BookingForm />} />
        <Route path="/admin" element={
          adminToken
            ? <AdminDashboard token={adminToken} />
            : <AdminLogin onLogin={setAdminToken} />
        } />
        <Route path="/dashboard" element={<WebSocketDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
