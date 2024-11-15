import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import {
  AppBar, Toolbar, Drawer, List, ListItem, ListItemIcon, ListItemText,
  CssBaseline, Box, Typography, Button, Collapse, TextField, IconButton, Modal, RadioGroup, FormControlLabel, Radio, InputLabel
} from '@mui/material';
import {
  Dashboard as DashboardIcon, ListAlt, Info, AccountCircle, ExpandLess, ExpandMore, Search, Description, FilterList, Add
} from '@mui/icons-material';
import logo from './image/logo.png';
import { googleLogout } from '@react-oauth/google';

function SearchUser() {
  const location = useLocation();
  const navigate = useNavigate();
  const profile = location.state?.profile || JSON.parse(localStorage.getItem('profile'));

  const [openDataItems, setOpenDataItems] = useState(false);
  const [openSearchModal, setOpenSearchModal] = useState(false); // State untuk modal pencarian

  // State untuk menyimpan data items
  const [dataItems] = useState([
    { id: 1, name: 'Item A', type: 'Type 1', creationDate: '2024-10-26' },
    { id: 2, name: 'Item B', type: 'Type 2', creationDate: '2024-10-27' },
    { id: 3, name: 'Item C', type: 'Type 3', creationDate: '2024-10-28' },
  ]);

  const handleDataItemsClick = () => {
    setOpenDataItems((prev) => !prev);
  };

  // Fungsi untuk membuka dan menutup modal pencarian
  const handleSearchModalOpen = () => setOpenSearchModal(true);
  const handleSearchModalClose = () => setOpenSearchModal(false);

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
          <ListItem button component={Link} to="/account">
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
              DATA TABLES
            </Typography>
          </Box>

          <Box display="flex" justifyContent="flex-end" sx={{ mb: 2 }}>
            <TextField
              size="small"
              variant="outlined"
              placeholder="Filter BY"
              sx={{
                borderRadius: '20px',
                bgcolor: 'white',
                border: '1px solid black',
                width: '150px',
                '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
              }}
              InputProps={{
                startAdornment: (
                  <IconButton sx={{ p: 0, mr: 1 }}>
                    <FilterList />
                  </IconButton>
                ),
              }}
            />
            <TextField
              size="small"
              variant="outlined"
              placeholder="Search"
              sx={{
                borderRadius: '20px',
                bgcolor: 'lightblue',
                width: '150px',
                '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
              }}
              InputProps={{
                startAdornment: (
                  <IconButton sx={{ p: 0, mr: 1 }} onClick={handleSearchModalOpen}>
                    <Search />
                  </IconButton>
                ),
              }}
            />
          </Box>

          <Box display="flex" justifyContent="right" alignItems="center" sx={{ mb: 2 }}>
            <IconButton color="primary">
              <Add />
            </IconButton>
            <Typography variant="body2" sx={{ ml: 1 }}>
              ADD ALL
            </Typography>
          </Box>

          <Box component="table" style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ border: '1px solid #ddd', padding: '8px' }}>NO</th>
                <th style={{ border: '1px solid #ddd', padding: '8px' }}>ITEM</th>
                <th style={{ border: '1px solid #ddd', padding: '8px' }}>TYPE</th>
                <th style={{ border: '1px solid #ddd', padding: '8px' }}>CREATION DATE</th>
                <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>DETAIL</th>
                <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>ADD</th>
              </tr>
            </thead>
            <tbody>
              {dataItems.map((item) => (
                <tr key={item.id}>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>{item.id}</td>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>{item.name}</td>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>{item.type}</td>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>{item.creationDate}</td>
                  <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>
                    <Button variant="contained" size="small" onClick={() => alert(`Detail of ${item.name}`)}>Detail</Button>
                  </td>
                  <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>
                    <Button variant="contained" size="small" color="primary">Add</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Box>
        </Box>

        {/* Modal untuk pencarian */}
        <Modal open={openSearchModal} onClose={handleSearchModalClose}>
          <Box sx={{
            width: 400,
            bgcolor: 'white',
            p: 3,
            borderRadius: '8px',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            boxShadow: 24,
          }}>
            <Typography variant="h6" align="center" sx={{ mb: 2 }}>
              ADD USER
            </Typography>
            <TextField fullWidth label="Name" variant="outlined" margin="normal" />
            <TextField fullWidth label="Code Items" variant="outlined" margin="normal" />
            <InputLabel>Type</InputLabel>
            <RadioGroup row>
              <FormControlLabel value="O HANDPHONE" control={<Radio />} label="O HANDPHONE" />
              <FormControlLabel value="O TABLET" control={<Radio />} label="O TABLET" />
            </RadioGroup>
            <Box display="flex" justifyContent="center" sx={{ mt: 2 }}>
              <Button variant="contained" color="primary" onClick={handleSearchModalClose}>Submit</Button>
            </Box>
          </Box>
        </Modal>
      </Box>
    </Box>
  );
}

export default SearchUser;
