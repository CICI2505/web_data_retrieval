import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import {
  AppBar, Toolbar, Drawer, CssBaseline, Box, Typography, Button, Card, CardContent, List, ListItem, Grid, ListItemIcon, ListItemText, Collapse, TextField,IconButton, } from "@mui/material"; 
  import { AccountCircle, Storage, ListAlt, Search, Description, Info,
} from "@mui/icons-material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import logo from "./image/logo.png";

function EditProfile() {
  const { userId } = useParams();
  const [profile, setProfile] = useState({
    name: "",
    nik: "",
    no_hp: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [openAccountSettings, setOpenAccountSettings] = useState(false);
  const [openDataItems, setOpenDataItems] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

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
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [userId, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`/api/account/${userId}/edit`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(profile),
      });

      if (response.ok) {
        alert("Profile updated successfully!");
        navigate(`/account/${userId}`);
      } else {
        alert("Failed to update profile.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleCancel = () => {
    navigate(`/account/${userId}`);
  };

  const handleAccountSettingsClick = () => {
    setOpenAccountSettings((prev) => !prev);
  };

  const handleDataItemsClick = () => {
    setOpenDataItems((prev) => !prev);
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  if (isLoading) {
    return (
      <Typography variant="h5" align="center" sx={{ mt: 4 }}>
        Loading...
      </Typography>
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
          <Button
            variant="contained"
            color="error"
            onClick={() => navigate("/loginform")}
          >
            Log Out
          </Button>
        </Toolbar>
      </AppBar>

      {/* Sidebar / Drawer */}
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
          <Collapse in={openAccountSettings} timeout="auto" unmountOnExit>
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
          Edit Profile
        </Typography>

        <Grid container spacing={8}>
          <Grid item xs={4}>
            <Card sx={{ display: "flex", flexDirection: "column", p: 2 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Name:
                </Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  name="name"
                  value={profile.name}
                  onChange={handleInputChange}
                />

                <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                  NIK:
                </Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  name="nik"
                  value={profile.nik}
                  onChange={handleInputChange}
                />

                <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                  Phone Number:
                </Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  name="no_hp"
                  value={profile.no_hp}
                  onChange={handleInputChange}
                />

                {/* Field untuk Password dengan ikon mata */}
                <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                  Password:
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={profile.password}
                    onChange={handleInputChange}
                  />
                  <IconButton
                    onClick={togglePasswordVisibility}
                    sx={{ ml: 1 }}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}{" "}
                    {/* Ikon mata */}
                  </IconButton>
                </Box>
              </CardContent>
              <Box sx={{ display: "flex", justifyContent: "flex-end", p: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSave}
                >
                  Save Changes
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={handleCancel}
                  sx={{ ml: 2 }}
                >
                  Cancel
                </Button>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default EditProfile;
