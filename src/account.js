import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Drawer,
  CssBaseline,
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  List,
  ListItem,
  Grid,
  ListItemIcon,
  ListItemText,
  Collapse,
} from "@mui/material";
import {
  AccountCircle,
  Info,
  Storage,
  ListAlt,
  Search,
  Description,
} from "@mui/icons-material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import logo from "./image/logo.png";

function Account() {
  const { userId } = useParams();
  const [profile, setProfile] = useState(null);
  const [openAccountSettings, setOpenAccountSettings] = useState(false);
  const [openDataItems, setOpenDataItems] = useState(false);
  const navigate = useNavigate();

  const handleDataItemsClick = () => {
    setOpenDataItems((prev) => !prev);
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`/api/profileuser/${userId}`, {
          method: "GET",
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          setProfile(data);
        } else {
          navigate("/login");
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, [userId, navigate]);

  const handleLogout = () => {
    fetch("http://127.0.0.1:5000/api/logout", {
      method: "POST",
      credentials: "include",
    })
      .then(() => {
        localStorage.removeItem("profile");
        navigate("/loginform");
      })
      .catch((err) => console.error("Logout failed:", err));
  };

  const handleAccountSettingsClick = () => {
    setOpenAccountSettings((prev) => !prev);
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
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: "black",
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box display="flex" alignItems="center">
            <img
              src={logo}
              alt="Logo"
              style={{ height: "50px", marginRight: "10px" }}
            />
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography variant="h7" color="white">
                PT SAT NUSAPERSADA Tbk
              </Typography>
              <Typography
                variant="body2"
                sx={{ fontSize: "0.85rem", color: "white", fontWeight: "bold" }}
              >
                High Technology Electronics Manufacturers
              </Typography>
            </Box>
          </Box>
          <Button variant="contained" color="error" onClick={handleLogout}>
            Log Out
          </Button>
        </Toolbar>
      </AppBar>

      {/* Drawer / Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: 40,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 240,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <List>
          {/* Menu Dashboard */}
          <ListItem button component={Link} to="/dashboarduser">
            <ListItemIcon>
              <Storage />
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

          {/* Menu About */}
          <ListItem button component={Link} to="/aboutuser">
            <ListItemIcon>
              <Info />
            </ListItemIcon>
            <ListItemText primary="About" />
          </ListItem>

          {/* Menu Account Settings with Dropdown */}
          <ListItem button onClick={handleAccountSettingsClick}>
            <ListItemIcon>
              <AccountCircle />
            </ListItemIcon>
            <ListItemText primary="Account" />
            {openAccountSettings ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse
            in={openAccountSettings}
            button
            sx={{ pl: 2 }}
            c
            timeout="auto"
            unmountOnExit
          >
            <List component="div" disablePadding>
              <ListItem
                button
                component={Link}
                to={`/account/${userId}/editprofile`}
              >
                <ListItemIcon>
                  <AccountCircle />
                </ListItemIcon>
                <ListItemText primary="Edit Profile" />
              </ListItem>
            </List>
          </Collapse>
        </List>
      </Drawer>

      {/* Main content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 2,
          ml: "200px",
          mt: 2,
          backgroundColor: "#f0f0f0",
          height: "85vh",
        }}
      >
        <Typography variant="h3" gutterBottom sx={{ fontWeight: "bold" }}>
          Account
        </Typography>

        <Grid container spacing={8}>
          <Grid item xs={4}>
            <Box display="flex" flexDirection="column" sx={{ height: "100%" }}>
              <Card sx={{ display: "flex", alignItems: "center", p: 2, mb: 5 }}>
                <AccountCircle sx={{ fontSize: 30, marginRight: 2 }} />
                <CardContent sx={{ p: 0 }}>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ fontSize: "0.9rem" }}
                  >
                    Name:
                  </Typography>
                  <Typography variant="h4" sx={{ fontSize: "1.5rem" }}>
                    {profile.name}
                  </Typography>
                </CardContent>
              </Card>

              <Card sx={{ display: "flex", alignItems: "center", p: 2, mb: 5 }}>
                <AccountCircle sx={{ fontSize: 30, marginRight: 2 }} />
                <CardContent sx={{ p: 0 }}>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ fontSize: "0.9rem" }}
                  >
                    NIK:
                  </Typography>
                  <Typography variant="h4" sx={{ fontSize: "1.5rem" }}>
                    {profile.nik}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          </Grid>

          <Grid item xs={8}>
            <Typography variant="h6" gutterBottom>
              User Information
            </Typography>
            <Box
              sx={{
                backgroundColor: "white",
                padding: 2,
                borderRadius: 8,
                height: "100%",
              }}
            >
              <Typography variant="body1">Phone: {profile.no_hp}</Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default Account;
