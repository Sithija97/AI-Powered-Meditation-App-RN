import React from "react";
import { Dashboard } from "../layouts";
import { Box, Container, Toolbar } from "@mui/material";

export const Vehicles = () => {
  return (
    <Dashboard>
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Toolbar />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <h4>Vehicles</h4>
        </Container>
      </Box>
    </Dashboard>
  );
};
