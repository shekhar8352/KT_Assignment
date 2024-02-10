import React, { useState } from "react";
import { Box, Typography, TextField, Button, CircularProgress } from "@mui/material";
import useAdminLogin from "../hooks/admin/useAdminLogin";

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { loginAdmin, success, errors, loading } = useAdminLogin();

  const handleLogin = async (e) => {
    e.preventDefault();
    loginAdmin(username, password);
  };

  React.useEffect(() => {
    if (success) {
      // Redirect to admin-dashboard
      window.location.href = '/admin-dashboard';
    }
  }, [success]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh', // Set height to 100% of the viewport height
      }}
    >
      <Typography variant="h4" gutterBottom>
        Admin Login
      </Typography>
      <Box
        sx={{
          width: '300px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <form onSubmit={handleLogin} style={{ width: '300px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center', 
          }}>
          <TextField
            label="Username"
            type="text"
            variant="outlined"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            margin="normal"
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
          />
          <Button
            type="submit"
            variant="contained"
            disabled={loading}
            style={{ marginTop: '16px', alignSelf: 'center' }}
          >
            {loading ? <CircularProgress size={24} /> : 'Login'}
          </Button>
        </form>
      </Box>
      {errors && <Typography color="error" mt={2}>{errors[0].msg}</Typography>}
    </Box>
  );
};

export default AdminLogin;
