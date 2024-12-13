import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

function ProfileUser() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Fungsi untuk mendapatkan profil pengguna
    const fetchProfile = async () => {
      try {
        // Meminta profil pengguna dari backend
        const response = await fetch("/api/profileuser", {
          method: "GET",
          credentials: "same-origin", // Pastikan session dikirim bersama dengan permintaan
        });

        if (response.ok) {
          const data = await response.json();
          setProfile(data);
        } else {
          // Jika pengguna tidak ditemukan atau tidak login
          navigate("/loginform"); // Redirect ke halaman login
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (profile) {
    return (
      <Box sx={{ p: 3, mt: 8 }}>
        <Typography variant="h4" gutterBottom>
          User Profile
        </Typography>
        <Card sx={{ maxWidth: 600 }}>
          <CardContent>
            <Typography variant="h6" color="textSecondary" gutterBottom>
              Name: {profile.name}
            </Typography>
            <Typography variant="body1" color="textSecondary" gutterBottom>
              Email: {profile.email}
            </Typography>
            <Typography variant="body1" color="textSecondary" gutterBottom>
              Phone: {profile.phone}
            </Typography>
            <Typography variant="body1" color="textSecondary" gutterBottom>
              Role: {profile.role}
            </Typography>
          </CardContent>
        </Card>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, mt: 8 }}>
      <Typography variant="h4" color="error" gutterBottom>
        Profile not found.
      </Typography>
    </Box>
  );
}

export default ProfileUser;
