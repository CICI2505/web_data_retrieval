import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import {
  AppBar, Toolbar, Drawer, List, ListItem, ListItemIcon, ListItemText,
  CssBaseline, Box, Typography, Button, Collapse, IconButton, TextField,
  Modal, RadioGroup, FormControlLabel, Radio, InputLabel
} from '@mui/material';
import {
  Dashboard as DashboardIcon, ListAlt, Info, AccountCircle, ExpandLess, ExpandMore, Search, History, Description, FilterList, Add
} from '@mui/icons-material';
import logo from './image/logo.png';
import { googleLogout } from '@react-oauth/google';

function SearchAdmin() {
  const location = useLocation();
  const navigate = useNavigate();
  const profile = location.state?.profile || JSON.parse(localStorage.getItem('profile'));

  const [openDataItems, setOpenDataItems] = useState(false);
  const [openAccount, setOpenAccount] = useState(false);
  const [openSearchModal, setOpenSearchModal] = useState(false); // State untuk modal pencarian

  const handleDataItemsClick = () => {
    setOpenDataItems((prev) => !prev);
  };

  const handleAccountClick = () => {
    setOpenAccount((prev) => !prev);
  };

  const handleSearchModalOpen = () => setOpenSearchModal(true);
  const handleSearchModalClose = () => setOpenSearchModal(false);

  const logout = () => {
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
          <Button variant="contained" color="error" onClick={logout}>
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
          <ListItem button component={Link} to="/dashboardadmin">
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
              <ListItem button sx={{ pl: 4 }} component={Link} to="/searchadmin">
                <ListItemIcon>
                  <Search />
                </ListItemIcon>
                <ListItemText primary="Search" />
              </ListItem>
              <ListItem button sx={{ pl: 4 }} component={Link} to="/createadmin">
                <ListItemIcon>
                  <Description />
                </ListItemIcon>
                <ListItemText primary="Create" />
              </ListItem>
              <ListItem button sx={{ pl: 4 }} component={Link} to="/history">
                <ListItemIcon>
                  <History />
                </ListItemIcon>
                <ListItemText primary="History" />
              </ListItem>
            </List>
          </Collapse>

          <ListItem button component={Link} to="/aboutadmin">
            <ListItemIcon>
              <Info />
            </ListItemIcon>
            <ListItemText primary="About" />
          </ListItem>

          <ListItem button onClick={handleAccountClick}>
            <ListItemIcon>
              <AccountCircle />
            </ListItemIcon>
            <ListItemText primary="Account" />
            {openAccount ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openAccount} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button sx={{ pl: 4 }} component={Link} to="/profileadmin">
                <ListItemIcon>
                  <AccountCircle />
                </ListItemIcon>
                <ListItemText primary="Profile" />
              </ListItem>
              <ListItem button sx={{ pl: 4 }} component={Link} to="/manageadmin">
                <ListItemIcon>
                  <AccountCircle />
                </ListItemIcon>
                <ListItemText primary="Manage" />
              </ListItem>
            </List>
          </Collapse>
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
              placeholder="FILTER BY"
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
              placeholder="SEARCH"
              sx={{
                borderRadius: '20px',
                bgcolor: 'lightblue',
                width: '150px',
                '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
              }}
              InputProps={{
                startAdornment: (
                  <IconButton sx={{ p: 0, mr: 1 }} onClick={handleSearchModalOpen}> {/* Menambahkan aksi untuk membuka modal */}
                    <Search />
                  </IconButton>
                ),
              }}
            />
          </Box>

          {/* Ikon "+" ditempatkan di sini */}
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
                <th style={{ border: '3px solid #ddd', padding: '8px', backgroundColor: '#e0e0e0' }}>NO</th>
                <th style={{ border: '3px solid #ddd', padding: '8px', backgroundColor: '#e0e0e0' }}>ITEM</th>
                <th style={{ border: '3px solid #ddd', padding: '8px', backgroundColor: '#e0e0e0' }}>TYPE</th>
                <th style={{ border: '3px solid #ddd', padding: '8px', backgroundColor: '#e0e0e0' }}>CREATION DATE</th>
                <th style={{ border: '3px solid #ddd', padding: '8px', backgroundColor: '#e0e0e0', textAlign: 'center' }}>ACTION</th>
                <th style={{ border: '3px solid #ddd', padding: '8px', backgroundColor: '#e0e0e0' }}>ADD</th>
              </tr>
            </thead>
            <tbody>
              {/* Data tabel ditambahkan di sini */}
              <tr>
                <td style={{ border: '3px solid #ddd', padding: '8px' }}>1</td>
                <td style={{ border: '3px solid #ddd', padding: '8px' }}>Contoh Item 1</td>
                <td style={{ border: '3px solid #ddd', padding: '8px' }}>Handphone</td>
                <td style={{ border: '3px solid #ddd', padding: '8px' }}>01-01-2024</td>
                <td style={{ border: '3px solid #ddd', padding: '8px', textAlign: 'center' }}>
                  <Button variant="contained" color="primary">Detail</Button>
                </td>
                <td style={{ border: '3px solid #ddd', padding: '8px' }}></td>
              </tr>
              {/* Tambah data item lain di sini */}
            </tbody>
          </Box>
        </Box>

        {/* Modal Pencarian */}
        <Modal open={openSearchModal} onClose={handleSearchModalClose}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              bgcolor: 'white',
              boxShadow: 24,
              borderRadius: 2,
              p: 4,
              width: 400, // Ubah ukuran modal sesuai kebutuhan
            }}
          >
            <Typography variant="h5" align="center" sx={{ mb: 2 }}>
              ADD USER
            </Typography>
            <TextField
              fullWidth
              label="NAME"
              variant="outlined"
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="CODE ITEMS"
              variant="outlined"
              sx={{ mb: 2 }}
            />
            <InputLabel>TYPE</InputLabel>
            <RadioGroup row>
              <FormControlLabel value="Handphone" control={<Radio />} label="HANDPHONE" />
              <FormControlLabel value="Tablet" control={<Radio />} label="TABLET" />
            </RadioGroup>

            <Box>
              <InputLabel id="item-type-label" style={{ marginTop: '10px' }}>DATE CREATED</InputLabel>
              <input type="date" placeholder="xxxx-xx-xx" style={{ marginTop: '10px' }} />
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 15 }}>
              <Button variant="contained" onClick={handleSearchModalClose}>
                Search
              </Button>
            </Box>
          </Box>
        </Modal>
      </Box>
    </Box>
  );
}

export default SearchAdmin;
