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
  Stack,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

export const ViewUsers = () => {
  return (

    <Box sx={{ padding: '20px' }}>
    <Stack className="mt-2 p-2">
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
        <Typography variant="h3">View User</Typography>
        <IconButton aria-label="delete">
          <CloseOutlinedIcon />
        </IconButton>
      </Box>
    </Stack>
    <Divider sx={{ mb: 3, mt: 2 }} />
    <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      <Grid item xs={6}>
        <Typography>Type</Typography>
        <Typography>1102</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography>Full Name</Typography>
        <Typography>John</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography>Gender</Typography>
        <Typography>Doe</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography>Address</Typography>
        <Typography>+947123456789</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography>Mobile No</Typography>
        <Typography>11241024892093891</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography>Date Of Birth</Typography>
        <Typography>test@globalwavenet.com</Typography>
      </Grid>
      <Grid item xs={12}>
      <Typography>Licence Details</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography>NIC</Typography>
        <Typography>11922</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography>Start Date</Typography>
        <Typography>Admin</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography>End Date</Typography>
        <Typography>Admin</Typography>
      </Grid>

      <Grid item xs={12}>
      <Typography>Police Report Details</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography>Report No</Typography>
        <Typography>11922</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography>Start Date</Typography>
        <Typography>Admin</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography>End Date</Typography>
        <Typography>Admin</Typography>
      </Grid>

      <Grid item xs={12}>
      <Typography>Driving Licence Details</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography>Licence No</Typography>
        <Typography>11922</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography>Start Date</Typography>
        <Typography>Admin</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography>End Date</Typography>
        <Typography>Admin</Typography>
      </Grid>
    </Grid>
    <Divider sx={{ mb: 3, mt: 2 }} />
    <Stack>
      <Box>
        <Button size="large" type="submit" variant="contained" color="secondary">
          Close
        </Button>
      </Box>
    </Stack>
  </Box>
  );
};
