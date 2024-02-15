import React from "react";
import { Dashboard } from "../../layouts";
import {
  Box,
  Button,
  Card,
  Container,
  Divider,
  FormControl,
  Grid,
  IconButton,
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
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { ImageUploader } from "../../components/imageuploader";

export const CreateUsers = () => {
  return (

    <Box
      sx={{ padding: '20px' }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
        <Typography variant="h3">Create User</Typography>
        <IconButton aria-label="delete">
          <CloseOutlinedIcon />
        </IconButton>
      </Box>
      <Divider sx={{ mb: 3, mt: 2 }} />
      <Grid container spacing={2}>
        <Grid item xs={12}>
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
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Title</InputLabel>
            <Select label="Title">
              <MenuItem value={10}>Mr</MenuItem>
              <MenuItem value={20}>Mrs</MenuItem>
              <MenuItem value={30}>Ms</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="fullName"
            name="fullName"
            label="Full Name"
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
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
        <Grid item xs={12}>
          <TextField
            required
            id="address"
            name="address"
            label="Address"
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="mobile"
            name="mobile"
            label="Mobile No"
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
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
        <Grid item xs={12}>
          <TextField required id="nic" name="nic" label="NIC" fullWidth />
        </Grid>
        <Grid item xs={12}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              slotProps={{ textField: { fullWidth: true } }}
              label="Start Date"
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              slotProps={{ textField: { fullWidth: true } }}
              label="End Date"
            />
          </LocalizationProvider>
        </Grid>

        <ImageUploader />
      </Grid>

      <Divider sx={{ mt: 2, mb: 2 }} />
      <Typography variant="h3" gutterBottom>
        Police Report Details
      </Typography>
      <Grid sx={{ mt: 1 }} container spacing={2}>
        <Grid item xs={12}>
          <TextField
            required
            id="reportNo"
            name="reportNo"
            label="Report No"
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              slotProps={{ textField: { fullWidth: true } }}
              label="Start Date"
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              slotProps={{ textField: { fullWidth: true } }}
              label="End Date"
            />
          </LocalizationProvider>
        </Grid>

        <ImageUploader />
      </Grid>
      <Divider sx={{ mt: 2, mb: 2 }} />
      <Typography variant="h6" gutterBottom>
        Driving Licence Details
      </Typography>
      <Grid sx={{ mt: 1 }} container spacing={2}>
        <Grid item xs={12}>
          <TextField
            required
            id="licenceNo"
            name="licenceNo"
            label="Licence No"
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              slotProps={{ textField: { fullWidth: true } }}
              label="Start Date"
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              slotProps={{ textField: { fullWidth: true } }}
              label="End Date"
            />
          </LocalizationProvider>
        </Grid>

        <ImageUploader />
      </Grid>
      <Button sx={{ mt: 3, mb: 2, ms: 3 }} variant="contained">
        Save
      </Button>

    </Box>
  );
};
