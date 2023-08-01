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
import { useAppDispatch } from "../store/store";
import { addVehicle } from "../store/vehicle/vehicleSlice";
import { useNavigate } from "react-router-dom";
import { RequestStatus } from "../models";

const InitialState = {
  type: "",
  ownership: "",
  fuelType: "",
  chassieNumber: "",
};

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
        navigate("/vehicles");
      }
    });
  };

  const { type, ownership, fuelType, chassieNumber } = formData;

  return (
      <Box
        component="main"
        sx={{
          backgroundColor:"white",
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Container >
          <Typography sx={{ mt:12, mb: 5 }} variant="h5" gutterBottom>
            Add Vehicle
          </Typography>
            <Grid container spacing={2}>
              {/* <Grid item xs={12} sm={5} md={4}>
                <FormControl fullWidth disabled>
                  <InputLabel id="demo-simple-select-label">Type</InputLabel>
                  <Select label="Type">
                    <MenuItem value={"manager"}>Manager</MenuItem>
                    <MenuItem value={"coordinator"}>Coordinator</MenuItem>
                    <MenuItem value={"driver"}>Driver</MenuItem>
                    <MenuItem value={"helper"}>Helper</MenuItem>
                  </Select>
                </FormControl>
              </Grid> */}
            </Grid>

            <Grid sx={{ mt: 1 }} container spacing={2}>
              <Grid item xs={12} sm={4} md={4}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Ownership
                  </InputLabel>
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
              <Grid item xs={12} sm={4} md={4}>
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
              <Grid item xs={12} sm={4} md={4}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Fuel Type
                  </InputLabel>
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
              <Grid item xs={12} sm={4} md={4}>
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
              <Grid item xs={12} sm={4} md={4}>
                <TextField
                  disabled
                  required
                  id="licenses"
                  name="licenses"
                  label="Licenses"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={4} md={4}>
                <TextField
                  disabled
                  required
                  id="leasing"
                  name="leasing"
                  label="Leasing"
                  fullWidth
                />
              </Grid>
            </Grid>

            <Button
              sx={{ mt: 3, mb: 2 }}
              variant="contained"
              type="submit"
              onClick={handleSubmit}
            >
              Save
            </Button>
        </Container>
      </Box>
  );
};
