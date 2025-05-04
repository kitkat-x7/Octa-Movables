import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Container, 
  Box, 
  CssBaseline,
  ThemeProvider,
  createTheme,
  Paper
} from '@mui/material';
import BookingForm from "./components/BookingForm";
import AdminSignup from "./components/AdminSignup";
import AdminLogin from "./components/AdminLogin";
import AdminDashboard from "./components/AdminDashboard";
import WebSocketDashboard from "./components/WebsocketDashboard";

// Create a theme instance
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

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
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Octa Movables
              </Typography>
              <Button color="inherit" component={Link} to="/">
                Home
              </Button>
              <Button color="inherit" component={Link} to="/booking">
                Book Vehicle
              </Button>
              <Button color="inherit" component={Link} to="/dashboard">
                Dashboard
              </Button>
              {adminToken && (
                <Button color="inherit" onClick={handleLogout}>
                  Logout
                </Button>
              )}
            </Toolbar>
          </AppBar>
        </Box>

        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Routes>
            <Route path="/" element={
              <Paper elevation={3} sx={{ p: 3 }}>
                {adminToken ? (
                  <AdminDashboard />
                ) : (
                  <Box>
                    {showLogin ? (
                      <Box sx={{ mb: 3 }}>
                        <AdminLogin onLogin={token => { 
                          setAdminToken(token); 
                          localStorage.setItem("adminToken", token); 
                        }} />
                        <Typography variant="body1" sx={{ mt: 2 }}>
                          Don't have an account?{" "}
                          <Button onClick={() => setShowLogin(false)}>Sign Up</Button>
                        </Typography>
                      </Box>
                    ) : (
                      <Box sx={{ mb: 3 }}>
                        <AdminSignup onSignup={() => setShowLogin(true)} />
                        <Typography variant="body1" sx={{ mt: 2 }}>
                          Already have an account?{" "}
                          <Button onClick={() => setShowLogin(true)}>Login</Button>
                        </Typography>
                      </Box>
                    )}
                  </Box>
                )}
              </Paper>
            } />
            <Route path="/booking" element={
              <Paper elevation={3} sx={{ p: 3 }}>
                <BookingForm />
              </Paper>
            } />
            <Route path="/dashboard" element={
              <Paper elevation={3} sx={{ p: 3 }}>
                <WebSocketDashboard />
              </Paper>
            } />
          </Routes>
        </Container>
      </Router>
    </ThemeProvider>
  );
}

export default App;
