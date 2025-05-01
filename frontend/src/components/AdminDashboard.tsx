import React, { useEffect, useState } from "react";
import { getAdminDashboard } from "../api/api";
import { Typography, Button } from "@mui/material";

export default function AdminDashboard({ token }: { token: string }) {
  const [dashboard, setDashboard] = useState<any>(null);

  useEffect(() => {
    getAdminDashboard(token).then(res => setDashboard(res.data));
  }, [token]);

  return (
    <div>
      <Typography variant="h5">Admin Dashboard</Typography>
      <pre>{JSON.stringify(dashboard, null, 2)}</pre>
      {/* Add CRUD UI here */}
    </div>
  );
}
