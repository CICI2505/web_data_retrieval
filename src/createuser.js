import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import {
  AppBar, Toolbar, Drawer, List, ListItem, ListItemIcon, ListItemText,
  CssBaseline, Box, Typography, Button, Collapse, TextField
} from '@mui/material';
import {
  Dashboard as DashboardIcon, ListAlt, Info, AccountCircle, ExpandLess, ExpandMore, Search, Description
} from '@mui/icons-material';
import logo from './image/logo.png';
import { googleLogout } from '@react-oauth/google';

function CreateUser() {
  const location = useLocation();
  const navigate = useNavigate();
  const profile = location.state?.profile || JSON.parse(localStorage.getItem('profile'));

  const [openDataItems, setOpenDataItems] = useState(false);
  const [fileName, setFileName] = useState(''); // Initialize fileName state

  const handleDataItemsClick = () => {
    setOpenDataItems((prev) => !prev);
  };

  const handleLogout = () => {
    googleLogout();
    localStorage.removeItem('profile');
    navigate('/');
  };

  if (!profile) {
    return (
      <Typography variant="h5" align="center" sx={{ mt: 4 }}>
        Tidak ada profil ditemukan. Silakan login.
      </Typography>
    );
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: 'black' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box display="flex" alignItems="center">
            <img src={logo} alt="Logo" style={{ height: '50px', marginRight: '10px' }} />
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography variant="h7" color="white">
                PT SAT NUSAPERSADA Tbk
              </Typography>
              <Typography variant="body2" sx={{ fontSize: '0.85rem', color: 'white', fontWeight: 'bold' }}>
                High Technology Electronics Manufacturers
              </Typography>
            </Box>
          </Box>
          <Button variant="contained" color="error" onClick={handleLogout}>
            Log Out
          </Button>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        sx={{
          width: 240,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 240,
            boxSizing: 'border-box',
          },
        }}
      >
        <Toolbar />
        <List>
          <ListItem button component={Link} to="/dashboarduser">
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button onClick={handleDataItemsClick}>
            <ListItemIcon>
              <ListAlt />
            </ListItemIcon>
            <ListItemText primary="Data Items" />
            {openDataItems ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openDataItems} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button sx={{ pl: 4 }} component={Link} to="/searchuser">
                <ListItemIcon>
                  <Search />
                </ListItemIcon>
                <ListItemText primary="Search" />
              </ListItem>
              <ListItem button sx={{ pl: 4 }} component={Link} to="/createuser">
                <ListItemIcon>
                  <Description />
                </ListItemIcon>
                <ListItemText primary="Create" />
              </ListItem>
            </List>
          </Collapse>
          <ListItem button component={Link} to="/aboutuser">
            <ListItemIcon>
              <Info />
            </ListItemIcon>
            <ListItemText primary="About" />
          </ListItem>
          <ListItem button component={Link} to="/accountuser">
            <ListItemIcon>
              <AccountCircle />
            </ListItemIcon>
            <ListItemText primary="Account" />
          </ListItem>
        </List>
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          backgroundColor: '#f0f0f0',
          height: '100vh',
        }}
      >
        <Toolbar />

        {/* DATA ITEMS */}
        <Box sx={{ bgcolor: 'white', p: 2, borderRadius: '8px', mb: 3 }}>
          <Typography variant="h4" gutterBottom sx={{ color: 'black', fontWeight: 'bold' }}>
            DATA ITEMS
          </Typography>
        </Box>

        {/* DATA TABLE */}
        <Box sx={{ bgcolor: 'white', p: 2, borderRadius: '8px', mb: 3 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mb: 0 }}>
            <Typography variant="h4" gutterBottom sx={{ color: 'black', fontWeight: 'bold' }}>
              CREATE FILE
            </Typography>
          </Box>

          <Typography variant="h5" align="center" sx={{ fontWeight: 'bold', mt: 1, width: '100%', textAlign: 'center' }}>
            LIST ITEMS
          </Typography>

          <Box component="table" style={{ width: '100%', borderCollapse: 'collapse', marginTop: '16px' }}>
            <thead>
              <tr>
                <th style={{ border: '3px solid #ddd', padding: '8px', backgroundColor: '#e0e0e0' }}>NO</th>
                <th style={{ border: '3px solid #ddd', padding: '8px', backgroundColor: '#e0e0e0' }}>ITEM</th>
                <th style={{ border: '3px solid #ddd', padding: '8px', backgroundColor: '#e0e0e0' }}>TYPE</th>
                <th style={{ border: '3px solid #ddd', padding: '8px', backgroundColor: '#e0e0e0' }}>CREATION DATE</th>
                <th style={{ border: '3px solid #ddd', padding: '8px', backgroundColor: '#e0e0e0', textAlign: 'center' }}>DETAIL</th>
              </tr>
            </thead>
            <tbody>
              {/* Data rows can be added here */}
              <tr>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>1</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>Item 1</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>Type A</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>2024-10-24</td>
                <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>
                  <Button variant="outlined">Detail</Button>
                </td>
              </tr>
              {/* More rows can be added as needed */}
            </tbody>
          </Box>

          {/* Format File Section */}
          <Typography variant="body1" sx={{ fontWeight: 'bold', mt: 2 }}>
            Format File: <span style={{ fontWeight: 'normal' }}>Microsoft Excel</span>
          </Typography>

          {/* File Name Section */}
          <Box display="flex" alignItems="center" sx={{ mt: 2 }}>
            <Typography variant="body1" sx={{ fontWeight: 'bold', mr: 2 }}> {/* Menambahkan margin right */}
              Nama File:
            </Typography>
            <TextField
              variant="outlined"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              placeholder="Masukkan nama file"
              size="small"
              sx={{ width: '300px' }} // Setting width
            />
          </Box>

          <Button variant="contained" color="success" sx={{ mt: 2 }}>
            Create & DOWNLOAD
          </Button>
          
        </Box>
      </Box>
    </Box>
  );
}

export default CreateUser;
