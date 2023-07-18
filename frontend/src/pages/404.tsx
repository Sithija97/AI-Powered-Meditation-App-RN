import React from "react";
import { Button, Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <Container maxWidth="md" sx={{ textAlign: "center", mt: 10 }}>
      <Typography variant="h1" gutterBottom>
        404 Not Found
      </Typography>
      <Typography variant="h5" gutterBottom>
        Oops! The page you're looking for does not exist.
      </Typography>
      <Link to="/">
        <Button variant="contained" color="primary">
          Go Back Home
        </Button>
      </Link>
    </Container>
  );
};
