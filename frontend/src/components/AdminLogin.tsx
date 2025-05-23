import React, { useState } from "react";
import { adminSignin } from "../api/api";
import { Button, TextField, Typography } from "@mui/material";

export default function AdminLogin({ onLogin }: { onLogin: (token: string) => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");
    try {
      const res = await adminSignin({ email, password });
      localStorage.setItem("adminToken", res.data.payload); // Store token
      onLogin(res.data.payload);
    } catch (e: any) {
      setError(e?.response?.data?.message || "Login failed");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "auto" }}>
      <Typography variant="h5">Admin Login</Typography>
      {error && <Typography color="error">{error}</Typography>}
      <TextField label="Email" value={email} onChange={e => setEmail(e.target.value)} fullWidth margin="normal" />
      <TextField label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} fullWidth margin="normal" />
      <Button onClick={handleLogin}>Login</Button>
    </div>
  );
}
