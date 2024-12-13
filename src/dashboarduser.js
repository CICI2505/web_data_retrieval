import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Drawer,
  CssBaseline,
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  Button,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import {
  Dashboard as Storage,
  Category,
  AccountCircle,
  ListAlt,
  Search,
  Description,
  Info,
} from "@mui/icons-material";
import logo from "./image/logo.png";
import { googleLogout } from "@react-oauth/google";

function DashboardUser() {
  const navigate = useNavigate();
  const [openDataItems, setOpenDataItems] = useState(false);

  const handleDataItemsClick = () => {
    setOpenDataItems((prev) => !prev);
  };

  const handleLogout = () => {
    googleLogout();
    localStorage.removeItem("profile");
    navigate("/");
  };

  const recentItems = [
    {
      id: 1,
      name: "Redmi Note 9",
      type: "Headphone",
      creationDate: "2024-10-23",
    },
    {
      id: 2,
      name: "Samsung Galaxy S21",
      type: "Smartphone",
      creationDate: "2024-10-24",
    },
    {
      id: 3,
      name: "Apple iPhone 12",
      type: "Smartphone",
      creationDate: "2024-10-25",
    },
    {
      id: 4,
      name: "Sony WH-1000XM4",
      type: "Headphone",
      creationDate: "2024-10-26",
    },
  ];

  const userId = localStorage.getItem("userId");

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
          <Box>
            <Button variant="contained" color="error" onClick={handleLogout}>
              Log Out
            </Button>
          </Box>
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

          {/* Menu Data Items with Submenu */}
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

          <ListItem button component={Link} to="/accountuser">
            <ListItemIcon>
              <AccountCircle />
            </ListItemIcon>
            <ListItemText primary="Account" />
          </ListItem>

         
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
          Dashboard
        </Typography>

        <Grid container spacing={8}>
          <Grid item xs={4}>
            <Box display="flex" flexDirection="column" sx={{ height: "100%" }}>
              <Card sx={{ display: "flex", alignItems: "center", p: 2, mb: 5 }}>
                <Storage sx={{ fontSize: 30, marginRight: 2 }} />
                <CardContent sx={{ p: 0 }}>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ fontSize: "0.9rem" }}
                  >
                    Total Items :
                  </Typography>
                  <Typography
                    variant="h4"
                    component="div"
                    sx={{ fontSize: "1.5rem" }}
                  >
                    106 PCS
                  </Typography>
                </CardContent>
              </Card>

              <Card sx={{ display: "flex", alignItems: "center", p: 2, mb: 5 }}>
                <Category sx={{ fontSize: 30, marginRight: 2 }} />
                <CardContent sx={{ p: 0 }}>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ fontSize: "0.9rem" }}
                  >
                    Total Types :
                  </Typography>
                  <Typography variant="h4" sx={{ fontSize: "1.5rem" }}>
                    43 Types
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          </Grid>

          <Grid item xs={8}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Box
                  sx={{
                    backgroundColor: "white",
                    padding: 2,
                    borderRadius: 8,
                    height: "100%",
                  }}
                >
                  <Typography variant="h6" gutterBottom>
                    Recently Added Items
                  </Typography>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>No</TableCell>
                        <TableCell>Items</TableCell>
                        <TableCell>Type</TableCell>
                        <TableCell>Date Created</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {recentItems.map((item, index) => (
                        <TableRow key={item.id}>
                          <TableCell>{index + 1}</TableCell>
                          <TableCell>{item.name}</TableCell>
                          <TableCell>{item.type}</TableCell>
                          <TableCell>{item.creationDate}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default DashboardUser;
