import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import {
  AppBar, Toolbar, Drawer, List, ListItem, ListItemIcon, ListItemText,
  CssBaseline, Box, Typography, Button, Collapse, Modal, TextField
} from '@mui/material';
import {
  Dashboard as DashboardIcon, ListAlt, Info, AccountCircle, ExpandLess, ExpandMore, Search, Description
} from '@mui/icons-material';
import logo from './image/logo.png';
import { googleLogout } from '@react-oauth/google';

function Account() {
  const location = useLocation();
  const navigate = useNavigate();
  const profileFromStorage = JSON.parse(localStorage.getItem('profile'));
  const profile = location.state?.profile || profileFromStorage;

  const [openDataItems, setOpenDataItems] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [profileState, setProfile] = useState(profile);
  const [tempProfile, setTempProfile] = useState(profile);

  const handleDataItemsClick = () => {
    setOpenDataItems((prev) => !prev);
  };

  const handleLogout = () => {
    googleLogout();
    localStorage.removeItem('profile');
    navigate('/');
  };

  const handleOpenEditModal = () => {
    setTempProfile(profileState);
    setOpenEditModal(true);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
  };

  const handleUpdateProfile = () => {
    setProfile(tempProfile);
    setOpenEditModal(false);
  };

  if (!profile) {
    return (
      <React.Fragment>
        <Typography variant="h5" align="center" sx={{ mt: 4 }}>
          Tidak ada profil ditemukan. Silakan login.
        </Typography>
      </React.Fragment>
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
          <ListItem button>
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

        <Box sx={{ display: 'flex', gap: 1, height: '90%' }}>
          <Box sx={{ bgcolor: 'white', p: 6, borderRadius: '4px', flex: 14 }}>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
              Profile Details
            </Typography>
            <Typography>Name: {profileState.name}</Typography>
            <Typography>Email: {profileState.email}</Typography>
            <Typography>Phone: {profileState.phone}</Typography>
            <Button variant="contained" sx={{ mt: 2 }} onClick={handleOpenEditModal}>
              Edit Profile
            </Button>
          </Box>
        </Box>

        <Modal open={openEditModal} onClose={handleCloseEditModal}>
          <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 500, bgcolor: 'background.paper', p: 4, borderRadius: 5 }}>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
              Edit Profile
            </Typography>
            <TextField
              label="Name"
              value={tempProfile.name}
              onChange={(e) => setTempProfile({ ...tempProfile, name: e.target.value })}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="Email"
              value={tempProfile.email}
              onChange={(e) => setTempProfile({ ...tempProfile, email: e.target.value })}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="Phone"
              value={tempProfile.phone}
              onChange={(e) => setTempProfile({ ...tempProfile, phone: e.target.value })}
              fullWidth
            />
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
              <Button variant="contained" color="primary" onClick={handleUpdateProfile}>
                Update
              </Button>
              <Button variant="outlined" onClick={handleCloseEditModal} sx={{ ml: 2 }}>
                Cancel
              </Button>
            </Box>
          </Box>
        </Modal>
      </Box>
    </Box>
  );
}

export default Account;
