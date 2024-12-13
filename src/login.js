// Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Box } from '@mui/material';

function Login() {
  const [nik, setNik] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    // Cek kredensial NIK dan password, misalnya NIK: '123456789' dan password: 'adminpassword'
    if (nik === '123456789' && password === 'adminpassword') {
      // Simpan data profile admin di localStorage
      const profile = { nik };
      localStorage.setItem('profile', JSON.stringify(profile));

      // Redirect ke halaman dashboard
      navigate('/dashboardadmin');
    } else {
      alert('NIK atau password salah');
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Box sx={{ width: 300, p: 3, border: '1px solid #ccc', borderRadius: '8px' }}>
        <Typography variant="h5" align="center" sx={{ mb: 2 }}>Admin Login</Typography>
        <TextField
          label="NIK"
          variant="outlined"
          fullWidth
          value={nik}
          onChange={(e) => setNik(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Button variant="contained" fullWidth onClick={handleLogin}>Login</Button>
      </Box>
    </Box>
  );
}

export default Login;
