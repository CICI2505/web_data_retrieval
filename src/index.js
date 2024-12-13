import React from 'react';
import ReactDOM from 'react-dom/client';
import { GoogleOAuthProvider } from '@react-oauth/google'; 
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import App from './App';

// Membuat root untuk React 18
const root = ReactDOM.createRoot(document.getElementById('root'));

const theme = createTheme();

// Render aplikasi dengan tema dan Google OAuth
root.render(
  <GoogleOAuthProvider clientId="221933595181-h5s5ok4c4h9v9r1kvh3eo4og4alr0av9.apps.googleusercontent.com"> 
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </GoogleOAuthProvider>
);
