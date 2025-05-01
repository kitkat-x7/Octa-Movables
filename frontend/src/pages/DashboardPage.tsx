import React from "react";
import WebSocketDashboard from "../components/WebsocketDashboard";

export default function DashboardPage() {
  const token = localStorage.getItem("adminToken");
  if (!token) return <div>Please login as admin to view the dashboard.</div>;
  return <WebSocketDashboard />;
}