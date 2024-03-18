// material-ui

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
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';

// project imports

// ==============================|| SAMPLE PAGE ||============================== //

const CreateHire = () => {
  return (
    <Box
      sx={{ padding: '20px' }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
        <Typography variant="h3">Create Hire</Typography>
        <IconButton aria-label="delete">
          <CloseOutlinedIcon />
        </IconButton>
      </Box>
      <Divider sx={{ mb: 3, mt: 2 }} />
      <Grid container rowSpacing={4}>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Hire Type</InputLabel>
            <Select label="Type">
              <MenuItem value={10}>Import</MenuItem>
              <MenuItem value={20}>Export</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Grid sx={{ mt: 1 }} container rowSpacing={4}>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Vehicle</InputLabel>
            <Select label="Title">
              <MenuItem value={10}>Van CAA-5321</MenuItem>
              <MenuItem value={20}>Lorry CA -4345</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Driver</InputLabel>
            <Select label="Gender">
              <MenuItem value={10}>Kamal</MenuItem>
              <MenuItem value={20}>Nimal</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Grid sx={{ mt: 1 }} container rowSpacing={4}>
        <Grid item xs={12}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              slotProps={{ textField: { fullWidth: true } }}
              label="Date"
            />
          </LocalizationProvider>
        </Grid>
      </Grid>
      <Grid container rowSpacing={4}>
        <Grid item xs={12}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['TimePicker']}>
        <TimePicker sx={{width:'100%'}} label="Start time " />
      </DemoContainer>
      </LocalizationProvider>
        </Grid>
        <Grid item xs={12}>
        <TextField
            required
            id="location"
            name="location"
            label="Start Location"
            fullWidth
          />
        </Grid>

        <Grid item xs={12}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['TimePicker']}>
        <TimePicker sx={{width:'100%'}} label="End time " />
      </DemoContainer>
      </LocalizationProvider>
        </Grid>
        <Grid item xs={12}>
        <TextField
            required
            id="location"
            name="location"
            label="End Location"
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
        <TextField
            required
            id="distance"
            name="distance"
            label="Distance"
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
        <TextField
            required
            id="amount"
            name="amount"
            label="Amount"
            fullWidth
          />
        </Grid>
      </Grid>
      <Button sx={{ mt: 3, mb: 2, ms: 3 }} variant="contained">
        Save
      </Button>
    </Box>
  )
};

export default CreateHire;
