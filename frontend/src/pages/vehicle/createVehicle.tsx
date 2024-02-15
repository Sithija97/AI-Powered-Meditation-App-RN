import { useState } from "react";
import {
  Box,
  Button,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useAppDispatch } from "../../store/store";
import { addVehicle, getVehicles } from "../../store/vehicle/vehicleSlice";
import { useNavigate } from "react-router-dom";
import { RequestStatus } from "../../models";
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { ImageUploader } from "../../components/imageuploader";

const InitialState = {
  type: "",
  ownership: "",
  fuelType: "",
  chassieNumber: "",
};

interface IProps {
  onClose: () => void;
}

export const CreateVehicles = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(InitialState);

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    dispatch(addVehicle(formData)).then((res) => {
      if (res.meta.requestStatus === RequestStatus.Fulfiled) {
        // navigate("/vehicles");
        dispatch(getVehicles());

      }
    });
  };

  const { type, ownership, fuelType, chassieNumber } = formData;

  return (
    <Box
      sx={{ padding: '20px' }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
        <Typography variant="h3">Create Vehicle</Typography>
        <IconButton aria-label="delete">
          <CloseOutlinedIcon />
        </IconButton>
      </Box>
      <Divider sx={{ mb: 3, mt: 2 }} />
      <Grid sx={{ mt: 1 }} container spacing={2}>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Ownership</InputLabel>
            <Select
              label="Ownership"
              name="ownership"
              value={ownership}
              onChange={handleChange}
            >
              <MenuItem value={"owned"}>Owned</MenuItem>
              <MenuItem value={"hired"}>Hired</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Type</InputLabel>
            <Select
              label="Type"
              name="type"
              value={type}
              onChange={handleChange}
            >
              <MenuItem value={"car"}>Car</MenuItem>
              <MenuItem value={"van"}>Van</MenuItem>
              <MenuItem value={"prime motor"}>Prime Motor</MenuItem>
              <MenuItem value={"trailer"}>Trailer</MenuItem>
              <MenuItem value={"bicycle"}>Bicycle</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Fuel Type</InputLabel>
            <Select
              label="Fuel Type"
              name="fuelType"
              value={fuelType}
              onChange={handleChange}
            >
              <MenuItem value={"diesol"}>Diesol</MenuItem>
              <MenuItem value={"petrol"}>Petrol</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Grid sx={{ mt: 1 }} container spacing={2}>
        <Grid item xs={12}>
          <TextField
            required
            id="chassieNumber"
            name="chassieNumber"
            label="Chassie Number"
            value={chassieNumber}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
      </Grid>

      <Divider sx={{ mt: 2, mb: 2 }} />
      <Typography variant="h6" gutterBottom>
        Revenue Licence Details
      </Typography>
      <Grid sx={{ mt: 1 }} container spacing={2}>
        <Grid item xs={12}>
          <TextField required id="amount" name="amount" label="Amount" fullWidth />
        </Grid>
        <Grid item xs={12}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              slotProps={{ textField: { fullWidth: true } }}
              label="Effective Date"
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              slotProps={{ textField: { fullWidth: true } }}
              label="Reneival Date"
            />
          </LocalizationProvider>
        </Grid>

        <ImageUploader />
      </Grid>

      <Divider sx={{ mt: 2, mb: 2 }} />
      <Typography variant="h6" gutterBottom>
        Insurance Details
      </Typography>
      <Grid sx={{ mt: 1 }} container spacing={2}>
        <Grid item xs={12}>
          <TextField required id="amount" name="amount" label="Amount" fullWidth />
        </Grid>
        <Grid item xs={12}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              slotProps={{ textField: { fullWidth: true } }}
              label="Effective Date"
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              slotProps={{ textField: { fullWidth: true } }}
              label="Reneival Date"
            />
          </LocalizationProvider>
        </Grid>

        <ImageUploader />
      </Grid>

      <Divider sx={{ mt: 2, mb: 2 }} />
      <Typography variant="h6" gutterBottom>
        Smoke Test Details
      </Typography>
      <Grid sx={{ mt: 1 }} container spacing={2}>
        <Grid item xs={12}>
          <TextField required id="amount" name="amount" label="Amount" fullWidth />
        </Grid>
        <Grid item xs={12}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              slotProps={{ textField: { fullWidth: true } }}
              label="Effective Date"
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              slotProps={{ textField: { fullWidth: true } }}
              label="Reneival Date"
            />
          </LocalizationProvider>
        </Grid>

        <ImageUploader />
      </Grid>

      <Divider sx={{ mt: 2, mb: 2 }} />
      <Typography variant="h6" gutterBottom>
        Port permit Details
      </Typography>
      <Grid sx={{ mt: 1 }} container spacing={2}>
        <Grid item xs={12}>
          <TextField required id="amount" name="amount" label="Amount" fullWidth />
        </Grid>
        <Grid item xs={12}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              slotProps={{ textField: { fullWidth: true } }}
              label="Effective Date"
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              slotProps={{ textField: { fullWidth: true } }}
              label="Reneival Date"
            />
          </LocalizationProvider>
        </Grid>

        <ImageUploader />
      </Grid>

      <Divider sx={{ mt: 2, mb: 2 }} />
      <Typography variant="h6" gutterBottom>
        Leasing Details
      </Typography>
      <Grid sx={{ mt: 1 }} container spacing={2}>
        <Grid item xs={12}>
          <TextField required id="compnay" name="company" label="Company" fullWidth />
        </Grid>
        <Grid item xs={12}>
          <TextField required id="amount" name="amount" label="Amount" fullWidth />
        </Grid>
        <Grid item xs={12}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              slotProps={{ textField: { fullWidth: true } }}
              label="Effective Date"
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              slotProps={{ textField: { fullWidth: true } }}
              label="Reneival Date"
            />
          </LocalizationProvider>
        </Grid>

        <ImageUploader />

      </Grid>

      <Button
        sx={{ mt: 3, mb: 2 }}
        variant="contained"
        type="submit"
        onClick={handleSubmit}
      >
        Save
      </Button>
    </Box>
  );
};
