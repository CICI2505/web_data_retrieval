import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import {
  AppBar, Toolbar, Drawer, List, ListItem, ListItemIcon, ListItemText,
  CssBaseline, Box, Typography, Button, Collapse, Divider
} from '@mui/material';
import {
  Dashboard as DashboardIcon, ListAlt, Info, AccountCircle, ExpandLess, ExpandMore, Search, Description,
} from '@mui/icons-material';
import logo from './image/logo.png';
import { googleLogout } from '@react-oauth/google';

function AboutUser() {
  const location = useLocation();
  const navigate = useNavigate();
  const profile = location.state?.profile || JSON.parse(localStorage.getItem('profile'));

  const [openDataItems, setOpenDataItems] = useState(false);

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

        {/* Kop Surat */}
        <Box display="flex" alignItems="center" sx={{ mb: 3 }}>
          <img src={logo} alt="Kop Logo" style={{ height: '150px', marginRight: '20px' }} />
          <Box>
            <Typography variant="h5" color="black" sx={{ fontWeight: 'bold' }}>
              PT SAT NUSAPERSADA Tbk
            </Typography>
            <Typography variant="subtitle1" color="black" sx={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
              High Technology Electronics Manufacturers
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ height: '7px', backgroundColor: 'black' }} />

        {/* Informasi Perusahaan */}
        <Typography variant="h4" gutterBottom sx={{ color: 'red', fontWeight: 'bold' }}>
          Informasi Perusahaan
        </Typography>

        <Typography variant="body1" gutterBottom sx={{ mt: 2 }}>
          Berdasarkan Akta Pendirian No. 5 tanggal 1 Juni 1990, Perusahaan Sat Nusapersada menjadi
          badan hukum yang berhak untuk melakukan usahanya secara mandiri dengan ruang lingkup
          usaha industri perakitan elektronik.
        </Typography>

        {/* Visi dan Misi dalam Kolom */}
        <Box display="flex" justifyContent="space-between" sx={{ mt: 4 }}>
          <Box sx={{ width: '48%', bgcolor: 'white', p: 2, borderRadius: '8px' }}>
            <Typography variant="h4" gutterBottom sx={{ color: 'red', fontWeight: 'bold' }}>
              Visi Kami
            </Typography>
            <Typography variant="body1" gutterBottom>
              Menjadi perusahaan manufaktur terkemuka di dunia yang menyediakan produk, layanan
              dan solusi yang terpadu dengan kualitas dunia dalam semua aspek operasi dan manajemen.
            </Typography>
          </Box>

          <Box sx={{ width: '48%', bgcolor: 'white', p: 2, borderRadius: '8px' }}>
            <Typography variant="h4" gutterBottom sx={{ color: 'red', fontWeight: 'bold' }}>
              Misi Kami
            </Typography>
            <Typography variant="body1" gutterBottom>
              Menjadi perusahaan yang memberikan kontribusi dalam mengurangi angka impor nasional.
              Menjadi basis produksi bagi brand owner untuk pasar dalam negeri maupun luar negeri.
              Menjadi perusahaan yang mempunyai tanggung jawab sosial serta memberikan nilai terbaik kepada para pemangku kepentingan.
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default AboutUser;
