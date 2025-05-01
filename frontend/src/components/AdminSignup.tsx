import React, { useState } from "react";
import { adminSignup } from "../api/api";
import { Button, TextField, Typography } from "@mui/material";

export default function AdminSignup({ onSignup }: { onSignup: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSignup = async () => {
    setError(""); setSuccess("");
    try {
      await adminSignup({ email, password });
      setSuccess("Signup successful! Please log in.");
      onSignup();
    } catch (e: any) {
      setError(e?.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "auto" }}>
      <Typography variant="h5">Admin Signup</Typography>
      {error && <Typography color="error">{error}</Typography>}
      {success && <Typography color="primary">{success}</Typography>}
      <TextField label="Email" value={email} onChange={e => setEmail(e.target.value)} fullWidth margin="normal" />
      <TextField label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} fullWidth margin="normal" />
      <Button onClick={handleSignup}>Sign Up</Button>
    </div>
  );
}
