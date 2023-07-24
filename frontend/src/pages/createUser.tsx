import React, { useState } from "react";
import { Dashboard } from "../layouts";
import {
  Box,
  Button,
  Card,
  Container,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export const CreateUsers = () => {
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
        <Container sx={{ mt: 4, mb: 4 }}>
          <Typography variant="h5" gutterBottom>
            Add User
          </Typography>

          <Card sx={{ p: 2, mt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={5} md={4}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Type</InputLabel>
                  <Select label="Type">
                    <MenuItem value={10}>Manager</MenuItem>
                    <MenuItem value={20}>Coordinator</MenuItem>
                    <MenuItem value={30}>Driver</MenuItem>
                    <MenuItem value={40}>Helper</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            <Grid sx={{ mt: 1 }} container spacing={2}>
              <Grid item xs={12} sm={4} md={4}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Title</InputLabel>
                  <Select label="Title">
                    <MenuItem value={10}>Mr</MenuItem>
                    <MenuItem value={20}>Mrs</MenuItem>
                    <MenuItem value={30}>Ms</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={4} md={4}>
                <TextField
                  required
                  id="fullName"
                  name="fullName"
                  label="Full Name"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={4} md={4}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                  <Select label="Gender">
                    <MenuItem value={10}>Male</MenuItem>
                    <MenuItem value={20}>Female</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            <Grid sx={{ mt: 1 }} container spacing={2}>
              <Grid item xs={12} sm={4} md={4}>
                <TextField
                  required
                  id="address"
                  name="address"
                  label="Address"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={4} md={4}>
                <TextField
                  required
                  id="mobile"
                  name="mobile"
                  label="Mobile No"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={4} md={4}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    slotProps={{ textField: { fullWidth: true } }}
                    label="Date Of Birth"
                  />
                </LocalizationProvider>
              </Grid>
            </Grid>
            <Divider sx={{ mt: 2, mb: 2 }} />
            <Typography variant="h6" gutterBottom>
              Licence Details
            </Typography>
            <Grid sx={{ mt: 1 }} container spacing={2}>
              <Grid item xs={12} sm={4} md={4}>
                <TextField required id="nic" name="nic" label="NIC" fullWidth />
              </Grid>
              <Grid item xs={12} sm={4} md={4}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    slotProps={{ textField: { fullWidth: true } }}
                    label="Start Date"
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} sm={4} md={4}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    slotProps={{ textField: { fullWidth: true } }}
                    label="End Date"
                  />
                </LocalizationProvider>
              </Grid>
            </Grid>

            <Divider sx={{ mt: 2, mb: 2 }} />
            <Typography variant="h6" gutterBottom>
              Police Report Details
            </Typography>
            <Grid sx={{ mt: 1 }} container spacing={2}>
              <Grid item xs={12} sm={4} md={4}>
                <TextField
                  required
                  id="reportNo"
                  name="reportNo"
                  label="Report No"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={4} md={4}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    slotProps={{ textField: { fullWidth: true } }}
                    label="Start Date"
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} sm={4} md={4}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    slotProps={{ textField: { fullWidth: true } }}
                    label="End Date"
                  />
                </LocalizationProvider>
              </Grid>
            </Grid>
            <Divider sx={{ mt: 2, mb: 2 }} />
            <Typography variant="h6" gutterBottom>
              Driving Licence Details
            </Typography>
            <Grid sx={{ mt: 1 }} container spacing={2}>
              <Grid item xs={12} sm={4} md={4}>
                <TextField
                  required
                  id="licenceNo"
                  name="licenceNo"
                  label="Licence No"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={4} md={4}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    slotProps={{ textField: { fullWidth: true } }}
                    label="Start Date"
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} sm={4} md={4}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    slotProps={{ textField: { fullWidth: true } }}
                    label="End Date"
                  />
                </LocalizationProvider>
              </Grid>
            </Grid>

            <Button sx={{ mt: 3, mb: 2 }} variant="contained">
              Save
            </Button>
          </Card>
        </Container>
      </Box>
    </Dashboard>
  );
};
