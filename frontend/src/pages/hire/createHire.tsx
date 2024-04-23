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
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { RootState, useAppDispatch, useAppSelector } from "../../store/store";
import { iniitalHireState } from "../hire/data";
import { useState } from "react";
import { IHireInput, RequestStatus } from "../../models";
import { addHire, getAllHires } from "../../store/hire/hireSlice";
import PropTypes from 'prop-types';

const CreateHire = ({ onClose }:any) => {
  const dispatch = useAppDispatch();
  const { drivers } = useAppSelector((state: RootState) => state.auth);
  const { allVehicles } = useAppSelector((state: RootState) => state.vehicles);

  const [baseData, setBaseData] = useState(iniitalHireState);

  const handleBaseChange = (event: any) => {
    const { name, value } = event.target;
    setBaseData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const payload: IHireInput = {
      ...baseData,
    };

    await dispatch(addHire(payload)).then((res) => {
      if (res.meta.requestStatus === RequestStatus.Fulfiled) {
        dispatch(getAllHires());
      }
    });
  };

  return (
    <Box sx={{ padding: "20px" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <Typography variant="h3">Create Hire</Typography>
        <IconButton aria-label="delete">
          <CloseOutlinedIcon  onClick={onClose} />
        </IconButton>
      </Box>
      <Divider sx={{ mb: 3, mt: 2 }} />
      <Grid container rowSpacing={4}>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-type">Hire Type</InputLabel>
            <Select
              label="Hire Type"
              name="hireType"
              value={baseData.hireType}
              onChange={handleBaseChange}
            >
              <MenuItem value="import">Import</MenuItem>
              <MenuItem value="export">Export</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Grid sx={{ mt: 1 }} container rowSpacing={4}>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-vehicle">Vehicle</InputLabel>
            <Select
              label="Vehicle"
              name="vehicle"
              value={baseData.vehicle}
              onChange={handleBaseChange}
            >
              {allVehicles.map((vehicle) => (
                <MenuItem
                  key={vehicle._id}
                  value={vehicle._id}
                >{`${vehicle.type} - ${vehicle.chassieNumber}`}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Driver</InputLabel>
            <Select
              label="Driver"
              name="driver"
              value={baseData.driver}
              onChange={handleBaseChange}
            >
              {drivers.map((driver) => (
                <MenuItem
                  key={driver._id}
                  value={driver._id}
                >{`${driver.name}`}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Grid sx={{ mt: 1, mb: 4 }} container rowSpacing={4}>
        <Grid item xs={12}>
          <TextField
            required
            id="date"
            name="date"
            label="Date"
            value={baseData.date}
            onChange={handleBaseChange}
            fullWidth
          />
        </Grid>
      </Grid>

      <Grid container rowSpacing={4}>
        <Grid item xs={12}>
          <TextField
            required
            id="startTime"
            name="startTime"
            label="Start time"
            value={baseData.startTime}
            onChange={handleBaseChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="startLocation"
            name="startLocation"
            label="Start Location"
            value={baseData.startLocation}
            onChange={handleBaseChange}
            fullWidth
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            required
            id="endTime"
            name="endTime"
            label="End time"
            value={baseData.endTime}
            onChange={handleBaseChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="endLocation"
            name="endLocation"
            label="End Location"
            value={baseData.endLocation}
            onChange={handleBaseChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="distance"
            name="distance"
            label="Distance"
            value={baseData.distance}
            onChange={handleBaseChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="amount"
            name="amount"
            label="Amount"
            value={baseData.amount}
            onChange={handleBaseChange}
            fullWidth
          />
        </Grid>
      </Grid>
      <Button
        sx={{ mt: 3, mb: 2, ms: 3 }}
        variant="contained"
        type="submit"
        onClick={handleSubmit}
      >
        Save
      </Button>
    </Box>
  );
};

export default CreateHire;

CreateHire.propTypes = {
  onClose: PropTypes.func
};