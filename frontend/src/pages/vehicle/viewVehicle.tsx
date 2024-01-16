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

export const ViewVehicle = () => {
  return (

    <Box sx={{ padding: '20px' }}>
    <Stack className="mt-2 p-2">
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
        <Typography variant="h3">View Hire</Typography>
        <IconButton aria-label="delete">
          <CloseOutlinedIcon />
        </IconButton>
      </Box>
    </Stack>
    <Divider sx={{ mb: 3, mt: 2 }} />
    <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      <Grid item xs={6}>
        <Typography>Ownership</Typography>
        <Typography>1102</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography>Type</Typography>
        <Typography>John</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography>Fuel Type</Typography>
        <Typography>Doe</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography>Chassie No</Typography>
        <Typography>+947123456789</Typography>
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
