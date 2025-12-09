
'use client'
import { AppBar, Toolbar, Typography, Drawer, List, ListItem, ListItemText, Box } from "@mui/material";
import Notes from "../../components/Notes";

const drawerWidth = 240;

export default function Home() {
  return (
    <Box sx={{ display: "flex" }}>

      {/* ---------------- HEADER ---------------- */}
      <AppBar position="fixed" sx={{ zIndex: 1201, bgcolor: "#1976d2" }}>
        <Toolbar>
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            Java Learning Dashboard
          </Typography>
        </Toolbar>
      </AppBar>

      {/* ---------------- MAIN CONTENT ---------------- */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 4,
          mt: 8,
          backgroundColor: "#f5f7fa",
          minHeight: "100vh",
        }}
      >
        <Typography variant="h4" sx={{ mb: 3, fontWeight: 700 }}>
          Choose a Topic
        </Typography>

        {/* TOPICS UI (Your original logic improved) */}
        <Notes />

        {/* FOOTER */}
        <Box sx={{ textAlign: "center", mt: 10, color: "#777" }}>
          <Typography variant="body2">
            © 2025 Java Learning Portal. All Rights Reserved.
          </Typography>
        </Box>
      </Box>

    </Box>
  );
}
