import React, { useState, useEffect } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import {
  Button, TextField, Typography, Box, Container, Paper, Dialog, DialogContent, DialogActions, IconButton
} from '@mui/material';
import { CheckCircle, Cancel } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import logo from './image/logo.png';

function Login() {
  const [nik, setNik] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [openErrorModal, setOpenErrorModal] = useState(false);
  const navigate = useNavigate();

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log('Login Failed:', error),
  });

  useEffect(() => {
    // Set default credentials untuk admin
    localStorage.setItem('nik', '123456778910');
    localStorage.setItem('password', 'admin123');
  }, []);

  useEffect(() => {
    if (user) {
      axios
        .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
            Accept: 'application/json',
          },
        })
        .then((res) => {
          localStorage.setItem('profile', JSON.stringify(res.data));
          navigate('/dashboarduser', { state: { profile: res.data } });
        })
        .catch((err) => console.log(err));
    }
  }, [user, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const storedNik = localStorage.getItem('nik');
    const storedPassword = localStorage.getItem('password');
  
    if (nik === storedNik && password === storedPassword) {
      const dummyProfile = {
        name: 'Admin User',
        email: 'admin@example.com',
      };
      localStorage.setItem('profile', JSON.stringify(dummyProfile)); // Simpan profil dummy
      setOpenSuccessModal(true);
    } else {
      setError('NIK atau password salah');
      setOpenErrorModal(true);
    }
  };
  

  const handleCloseSuccessModal = () => {
    setOpenSuccessModal(false);
    navigate('/dashboard');
  };

  const handleCloseErrorModal = () => {
    setOpenErrorModal(false);
    setError(''); // Hapus pesan error setelah modal ditutup
  };

  return (
    <Container component="main" maxWidth="md" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <Paper elevation={3} sx={{ p: 4, width: '95%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Box sx={{ width: '40%', textAlign: 'center', mr: 5 }}>
          <img src={logo} alt="PT Sat Nusapersada" width={250} />
          <Typography variant="h6" sx={{ mt: 2 }}>PT SAT NUSAPERSADA Tbk</Typography>
          <Typography variant="subtitle1">High Technology Electronics Manufactures</Typography>
        </Box>

        <Box sx={{ width: '50%' }}>
          <Typography component="h1" variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
            WELCOME
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            "Please enter your identity"
          </Typography>
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="NIK"
              value={nik}
              onChange={(e) => setNik(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ mb: 2 }}
            />

            {error && <Typography color="error">{error}</Typography>}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
              <Button fullWidth variant="outlined" color="error" type="submit">
                Login
              </Button>
            </Box>
          </Box>

          <Typography align="center" variant="body1" sx={{ mt: 3 }}>
            Or login with Google
          </Typography>
          <Button
            onClick={login}
            fullWidth
            variant="contained"
            color="error"
            sx={{ mt: 1 }}>
            Sign in with Google
          </Button>
        </Box>
      </Paper>

      <Dialog open={openSuccessModal} onClose={handleCloseSuccessModal}>
        <DialogContent sx={{ textAlign: 'center' }}>
          <IconButton>
            <CheckCircle color="success" sx={{ fontSize: 50 }} />
          </IconButton>
          <Typography>Login berhasil!</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseSuccessModal} color="primary">OK</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openErrorModal} onClose={handleCloseErrorModal}>
        <DialogContent sx={{ textAlign: 'center' }}>
          <IconButton>
            <Cancel color="error" sx={{ fontSize: 50 }} />
          </IconButton>
          <Typography>{error}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseErrorModal} color="primary">OK</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default Login;
